// src/lib/transform.ts
import { RawCandidate, Candidate, RawParseResponse, ParseResponse } from './types';

export function normalizeCandidate(raw: RawCandidate): Candidate {
  return {
    id: raw.id,
    name: raw.name ?? "Unknown",
    email: raw.email ?? null,
    phone: raw.phone ?? null,
    location: raw.location ?? null,
    years_of_experience: raw.years_experience ?? 0,
    education: raw.education ?? null,
    matched_skills: raw.skills?.matched ?? [],
    missing_skills: raw.skills?.missing ?? [],
    extra_skills: raw.skills?.extras ?? [],
    overall_score: raw.match?.final_score ?? 0,
    semantic_score: raw.match?.semantic ?? 0,
    overlap_score: raw.match?.overlap ?? 0,
    authenticity_score: raw.authenticity?.score ?? null,
    authenticity_flags: raw.authenticity?.flags ?? [],
    highlights: raw.highlights ?? [],
    evidence: raw.evidence ?? [],
    source_filename: raw.source_filename,
  };
}

export function normalizeResponse(raw: RawParseResponse): ParseResponse {
  return {
    summary: {
      job_title: raw.jd?.title_guess ?? "Unknown",
      total_candidates: raw.selection?.total_candidates ?? 0,
      shortlisted_count: raw.selection?.shortlisted_count ?? 0,
      avg_match_score: raw.stats?.avg_match ?? 0,
      model_name: raw.meta?.model?.embedding ?? "N/A",
      request_id: raw.meta?.request_id ?? "",
    },
    shortlisted_candidates: (raw.shortlisted ?? []).map(normalizeCandidate),
    all_candidates: raw.all_candidates ? raw.all_candidates.map(normalizeCandidate) : null,
    top_missing_skills: raw.stats?.top_missing_skills ?? [],
    raw,
  };
}
