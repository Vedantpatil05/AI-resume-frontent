// src/lib/types.ts
export type Nullable<T> = T | null | undefined;

/* --------------------------------------------------
   Raw backend response (directly from API)
---------------------------------------------------*/
export interface RawCandidate {
  id: string;
  source_filename?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  years_experience?: number;
  education?: string | null;
  skills?: {
    matched?: string[];
    missing?: string[];
    extras?: string[];
  };
  match?: {
    semantic?: number;
    overlap?: number;
    final_score?: number;
  };
  authenticity?: {
    score?: number;
    flags?: string[];
  };
  highlights?: string[];
  evidence?: unknown[]; // was any[]
}

export interface RawParseResponse {
  meta?: {
    request_id?: string;
    received?: {
      resume_count?: number;
      max_files?: number;
      max_mb_each?: number;
    };
    model?: {
      embedding?: string;
    };
    notes?: string;
    file_warnings?: unknown[]; // was any[]
  };
  jd?: {
    title_guess?: string;
    skills_required?: string[];
  };
  selection?: {
    rule?: string;
    shortlisted_count?: number;
    total_candidates?: number;
  };
  stats?: {
    avg_match?: number;
    score_buckets?: Record<string, number>;
    top_missing_skills?: string[];
  };
  shortlisted?: RawCandidate[];
  all_candidates?: RawCandidate[];
}

/* --------------------------------------------------
   Normalized shapes (used by UI components)
---------------------------------------------------*/
export interface Candidate {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  years_of_experience: number;
  education?: string | null;

  matched_skills: string[];
  missing_skills: string[];
  extra_skills: string[];

  overall_score: number;     // from match.final_score
  semantic_score: number;    // from match.semantic
  overlap_score: number;     // from match.overlap

  authenticity_score?: number | null; // from authenticity.score
  authenticity_flags?: string[];      // from authenticity.flags

  highlights: string[];
  evidence: unknown[];
  source_filename?: string;
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
  all_candidates: Candidate[] | null;
  top_missing_skills: string[];
  raw?: RawParseResponse; // keep raw if needed for debug
}
