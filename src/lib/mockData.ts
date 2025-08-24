export const mockParseResponse = {
  "summary": {
    "job_title": "Senior Full Stack Developer",
    "total_candidates": 25,
    "shortlisted_count": 8,
    "avg_match_score": 78.5,
    "model_name": "GPT-4",
    "request_id": "req_1234567890"
  },
  "shortlisted_candidates": [
    {
      "name": "Sarah Chen",
      "overall_score": 92,
      "semantic_score": 89,
      "overlap_score": 95,
      "years_of_experience": 7,
      "education": "BS Computer Science, Stanford University",
      "matched_skills": ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
      "missing_skills": ["GraphQL", "Kubernetes"],
      "extra_skills": ["Vue.js", "Python", "MongoDB"],
      "authenticity_score": 88,
      "highlights": [
        "Led development of microservices architecture serving 1M+ users",
        "Expertise in modern React patterns and state management"
      ]
    },
    {
      "name": "Michael Rodriguez",
      "overall_score": 87,
      "semantic_score": 84,
      "overlap_score": 90,
      "years_of_experience": 5,
      "education": "MS Software Engineering, MIT",
      "matched_skills": ["React", "Node.js", "AWS", "Docker", "MongoDB"],
      "missing_skills": ["TypeScript", "PostgreSQL", "Redis"],
      "extra_skills": ["Angular", "Java", "Spring Boot"],
      "authenticity_score": 85,
      "highlights": [
        "Built scalable e-commerce platform handling $10M+ transactions",
        "Strong background in system design and performance optimization"
      ]
    },
    {
      "name": "Emily Johnson",
      "overall_score": 84,
      "semantic_score": 88,
      "overlap_score": 80,
      "years_of_experience": 6,
      "education": "BS Computer Engineering, UC Berkeley",
      "matched_skills": ["React", "TypeScript", "PostgreSQL", "AWS"],
      "missing_skills": ["Node.js", "Docker", "Kubernetes", "Redis"],
      "extra_skills": ["Flutter", "Dart", "Firebase", "Swift"],
      "authenticity_score": 90,
      "highlights": [
        "Mobile-first developer with cross-platform expertise",
        "Led digital transformation project for Fortune 500 company"
      ]
    },
    {
      "name": "David Kim",
      "overall_score": 81,
      "semantic_score": 79,
      "overlap_score": 83,
      "years_of_experience": 4,
      "education": "BS Computer Science, Carnegie Mellon",
      "matched_skills": ["React", "Node.js", "TypeScript", "MongoDB"],
      "missing_skills": ["AWS", "Docker", "PostgreSQL", "Kubernetes"],
      "extra_skills": ["Next.js", "Prisma", "tRPC", "Tailwind"],
      "authenticity_score": 82,
      "highlights": [
        "Full-stack developer with strong focus on user experience",
        "Experience building SaaS applications from scratch"
      ]
    },
    {
      "name": "Jessica Wang",
      "overall_score": 79,
      "semantic_score": 82,
      "overlap_score": 76,
      "years_of_experience": 8,
      "education": "MS Computer Science, Georgia Tech",
      "matched_skills": ["Node.js", "PostgreSQL", "AWS", "Docker"],
      "missing_skills": ["React", "TypeScript", "Kubernetes"],
      "extra_skills": ["Express", "Sequelize", "Jenkins", "Terraform"],
      "authenticity_score": 86,
      "highlights": [
        "Backend specialist with DevOps expertise",
        "Implemented CI/CD pipelines reducing deployment time by 80%"
      ]
    },
    {
      "name": "Alex Thompson",
      "overall_score": 76,
      "semantic_score": 74,
      "overlap_score": 78,
      "years_of_experience": 3,
      "education": "BS Software Engineering, University of Washington",
      "matched_skills": ["React", "TypeScript", "Node.js"],
      "missing_skills": ["AWS", "Docker", "PostgreSQL", "Kubernetes", "Redis"],
      "extra_skills": ["Svelte", "Vite", "Supabase", "Vercel"],
      "authenticity_score": 79,
      "highlights": [
        "Strong foundation in modern web technologies",
        "Quick learner with passion for clean code practices"
      ]
    },
    {
      "name": "Maria Gonzalez",
      "overall_score": 74,
      "semantic_score": 77,
      "overlap_score": 71,
      "years_of_experience": 9,
      "education": "MS Information Technology, UT Austin",
      "matched_skills": ["PostgreSQL", "AWS", "Docker"],
      "missing_skills": ["React", "Node.js", "TypeScript", "Kubernetes"],
      "extra_skills": ["PHP", "Laravel", "MySQL", "Apache"],
      "authenticity_score": 84,
      "highlights": [
        "Senior developer with extensive database optimization experience",
        "Led team of 6 developers in enterprise application development"
      ]
    },
    {
      "name": "James Wilson",
      "overall_score": 72,
      "semantic_score": 70,
      "overlap_score": 74,
      "years_of_experience": 2,
      "education": "BS Computer Science, University of Michigan",
      "matched_skills": ["React", "Node.js", "MongoDB"],
      "missing_skills": ["TypeScript", "AWS", "Docker", "PostgreSQL", "Kubernetes"],
      "extra_skills": ["React Native", "Socket.io", "GraphQL"],
      "authenticity_score": 75,
      "highlights": [
        "Junior developer with strong React and real-time applications experience",
        "Built chat application serving 50K+ concurrent users"
      ]
    }
  ],
  "all_candidates": [],
  "top_missing_skills": [
    { "skill": "Kubernetes", "frequency": 6 },
    { "skill": "TypeScript", "frequency": 4 },
    { "skill": "Docker", "frequency": 4 },
    { "skill": "AWS", "frequency": 3 },
    { "skill": "PostgreSQL", "frequency": 3 },
    { "skill": "Redis", "frequency": 2 }
  ]
};