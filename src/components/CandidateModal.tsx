import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, Shield, Target, TrendingUp, Users } from 'lucide-react';

import { Candidate } from '@/lib/types';

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getAuthenticityColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl">{candidate.name}</span>
            <Badge className={`${getScoreColor(candidate.overall_score)} bg-muted border-0 text-lg px-3 py-1`}>
              {candidate.overall_score}% Match
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{candidate.years_of_experience} years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span>{candidate.education}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className={`h-5 w-5 ${getAuthenticityColor(candidate.authenticity_score)}`} />
                <span>Authenticity Score: {candidate.authenticity_score}%</span>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="cosmic-card p-4 rounded-lg">
              <h4 className="font-medium mb-3">Score Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Overall Score</span>
                  </div>
                  <span className={`font-semibold ${getScoreColor(candidate.overall_score)}`}>
                    {candidate.overall_score}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Semantic Score</span>
                  </div>
                  <span className={`font-semibold ${getScoreColor(candidate.semantic_score)}`}>
                    {candidate.semantic_score}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Overlap Score</span>
                  </div>
                  <span className={`font-semibold ${getScoreColor(candidate.overlap_score)}`}>
                    {candidate.overlap_score}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Sections */}
          <div className="space-y-6">
            {/* Matched Skills */}
            {candidate.matched_skills.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 text-green-400">
                  Matched Skills ({candidate.matched_skills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.matched_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {candidate.missing_skills.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 text-muted-foreground">
                  Missing Skills ({candidate.missing_skills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.missing_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Skills */}
            {candidate.extra_skills.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 text-blue-400">
                  Additional Skills ({candidate.extra_skills.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.extra_skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Highlights */}
          {candidate.highlights.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Key Highlights</h4>
              <div className="cosmic-card p-4 rounded-lg">
                <ul className="space-y-3">
                  {candidate.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;