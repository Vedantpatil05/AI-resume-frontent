// src/lib/api.ts
import { mockParseResponse } from "@/lib/mockData";

/**
 * Environment (Vite)
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const HEALTH_PATH = import.meta.env.VITE_HEALTH_PATH || "/health";
const PARSE_PATH = import.meta.env.VITE_PARSE_PATH || "/parse";
const EXPORT_PATH = import.meta.env.VITE_EXPORT_PATH || "/export-excel";

function fullUrl(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Types exposed for UI code
 */
export interface Candidate {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  years_of_experience?: number | null;
  education?: string | null;
  matched_skills: string[];
  missing_skills: string[];
  extra_skills: string[];
  overall_score: number;   // match.final_score
  semantic_score: number;  // match.semantic
  overlap_score: number;   // match.overlap
  authenticity_score?: number | null;
  authenticity_flags?: string[];
  highlights: string[];
  evidence?: Record<string, unknown>[]; // 👈 no `any[]`
  source_filename?: string | null;
}

export interface ParseResponse {
  summary: {
    job_title: string;
    total_candidates: number;
    shortlisted_count: number;
    avg_match_score: number;
    model_name: string;
    request_id: string;
  };
  shortlisted_candidates: Candidate[];
  all_candidates?: Candidate[] | null;
  top_missing_skills: Array<{ skill: string; frequency?: number }>;
}

/**
 * Health check
 */
export async function getHealth(): Promise<{ ok: boolean; model_loaded?: boolean }> {
  if (USE_MOCK) {
    return { ok: true, model_loaded: true };
  }

  const url = fullUrl(HEALTH_PATH);
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}

/**
 * Normalize backend parse response -> ParseResponse (UI-friendly)
 */
function normalizeParseResponse(raw: unknown): ParseResponse {
  const r = raw as Record<string, unknown>;
  const meta = (r.meta as Record<string, unknown>) ?? {};
  const jd = (r.jd as Record<string, unknown>) ?? {};
  const selection = (r.selection as Record<string, unknown>) ?? {};
  const stats = (r.stats as Record<string, unknown>) ?? {};
  const rawShortlisted = (r.shortlisted ?? r.shortlisted_candidates) as Record<string, unknown>[] | undefined;

  const summary = {
    job_title: (jd.title_guess as string) ?? "Unknown",
    total_candidates: (selection.total_candidates as number) ?? (rawShortlisted?.length || 0),
    shortlisted_count: (selection.shortlisted_count as number) ?? (rawShortlisted?.length || 0),
    avg_match_score: (stats.avg_match as number) ?? 0,
    model_name: (meta?.model as Record<string, unknown>)?.embedding as string ?? "",
    request_id: (meta.request_id as string) ?? "",
  };

  const shortlisted_candidates: Candidate[] = (rawShortlisted || []).map((c) => {
    const candidate = c as Record<string, unknown>;
    const match = (candidate.match as Record<string, unknown>) ?? {};
    const skills = (candidate.skills as Record<string, unknown>) ?? {};
    const auth = (candidate.authenticity as Record<string, unknown>) ?? {};

    return {
      id: (candidate.id as string) ?? (candidate.source_filename as string) ?? Math.random().toString(36).slice(2),
      name: (candidate.name as string) ?? (candidate.source_filename as string) ?? "Unknown",
      email: (candidate.email as string) ?? null,
      phone: (candidate.phone as string) ?? null,
      location: typeof candidate.location === "string" ? candidate.location.trim() : (candidate.location as string) ?? null,
      years_of_experience: (candidate.years_experience as number) ?? null,
      education: (candidate.education as string) ?? null,
      matched_skills: Array.isArray(skills.matched) ? (skills.matched as string[]) : [],
      missing_skills: Array.isArray(skills.missing) ? (skills.missing as string[]) : [],
      extra_skills: Array.isArray(skills.extras) ? (skills.extras as string[]) : [],
      overall_score: typeof match.final_score === "number" ? (match.final_score as number) : (match.final as number) ?? 0,
      semantic_score: typeof match.semantic === "number" ? (match.semantic as number) : 0,
      overlap_score: typeof match.overlap === "number" ? (match.overlap as number) : 0,
      authenticity_score: (auth.score as number) ?? null,
      authenticity_flags: Array.isArray(auth.flags) ? (auth.flags as string[]) : [],
      highlights: Array.isArray(candidate.highlights) ? (candidate.highlights as string[]) : [],
      evidence: Array.isArray(candidate.evidence) ? (candidate.evidence as Record<string, unknown>[]) : [],
      source_filename: (candidate.source_filename as string) ?? null,
    };
  });

  const top_missing_skills = Array.isArray(stats.top_missing_skills)
    ? (stats.top_missing_skills as string[]).map((s) => ({ skill: s, frequency: 0 }))
    : [];

  return {
    summary,
    shortlisted_candidates,
    all_candidates: null,
    top_missing_skills,
  };
}

/**
 * Parse resumes
 */
export async function parseResumes({
  jd,
  files,
  top_n,
}: {
  jd: string;
  files: File[];
  top_n?: number | null;
}): Promise<ParseResponse> {
  if (USE_MOCK) {
    const raw = JSON.parse(JSON.stringify(mockParseResponse));
    return normalizeParseResponse(raw);
  }

  const url = fullUrl(PARSE_PATH);
  const form = new FormData();
  form.append("jd", jd);
  if (typeof top_n === "number" && top_n > 0) form.append("top_n", String(top_n));
  files.forEach((f) => form.append("resumes", f, f.name));

  const res = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "<no body>");
    throw new Error(`Parse request failed (${res.status}): ${text}`);
  }

  const json = await res.json();
  return normalizeParseResponse(json);
}

/**
 * Export candidates (Excel / CSV)
 */
export async function exportCandidates(payload: {
  candidates: Candidate[];
  format: "xlsx" | "csv";
}): Promise<Blob> {
  if (USE_MOCK) {
    const candidates = Array.isArray(payload?.candidates) ? payload.candidates : [];
    const header = [
      "Name",
      "FinalScore",
      "Semantic",
      "Overlap",
      "YearsExperience",
      "Education",
      "MatchedSkills",
      "MissingSkills",
      "Extras",
      "SourceFilename",
    ];
    const rows = candidates.map((c) => {
      const row = [
        (c.name || "").replace(/"/g, '""'),
        c.overall_score ?? "",
        c.semantic_score ?? "",
        c.overlap_score ?? "",
        c.years_of_experience ?? "",
        (c.education || "").replace(/"/g, '""'),
        (c.matched_skills || []).join(", ").replace(/"/g, '""'),
        (c.missing_skills || []).join(", ").replace(/"/g, '""'),
        (c.extra_skills || []).join(", ").replace(/"/g, '""'),
        c.source_filename || "",
      ];
      return `"${row.join('","')}"`;
    });
    const csv = [header.join(","), ...rows].join("\n");
    return new Blob([csv], { type: "text/csv" });
  }

  const url = fullUrl(EXPORT_PATH);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "<no body>");
    throw new Error(`Export failed (${res.status}): ${text}`);
  }

  return res.blob();
}

export default {
  getHealth,
  parseResumes,
  exportCandidates,
};
