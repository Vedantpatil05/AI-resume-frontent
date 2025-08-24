import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, GraduationCap, Calendar, Shield } from 'lucide-react';

import { Candidate } from '@/lib/types';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onViewDetails: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isSelected,
  onSelect,
  onViewDetails
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getAuthenticityColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="cosmic-card p-6 rounded-lg hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
          />
          <div>
            <h3 className="font-semibold text-lg">{candidate.name}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {candidate.years_of_experience} years exp
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                {candidate.education}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Shield className={`h-4 w-4 ${getAuthenticityColor(candidate.authenticity_score)}`} />
            <span className="text-sm">{candidate.authenticity_score}%</span>
          </div>
          <Badge 
            className={`${getScoreColor(candidate.overall_score)} text-white border-0`}
          >
            {candidate.overall_score}%
          </Badge>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3 mb-4">
        {/* Matched Skills */}
        {candidate.matched_skills.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Matched Skills</p>
            <div className="flex flex-wrap gap-1">
              {candidate.matched_skills.slice(0, 8).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  {skill}
                </Badge>
              ))}
              {candidate.matched_skills.length > 8 && (
                <Badge variant="secondary" className="bg-muted">
                  +{candidate.matched_skills.length - 8}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Missing Skills */}
        {candidate.missing_skills.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Missing Skills</p>
            <div className="flex flex-wrap gap-1">
              {candidate.missing_skills.slice(0, 6).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-muted text-muted-foreground">
                  {skill}
                </Badge>
              ))}
              {candidate.missing_skills.length > 6 && (
                <Badge variant="secondary" className="bg-muted">
                  +{candidate.missing_skills.length - 6}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Extra Skills */}
        {candidate.extra_skills.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Additional Skills</p>
            <div className="flex flex-wrap gap-1">
              {candidate.extra_skills.slice(0, 6).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {skill}
                </Badge>
              ))}
              {candidate.extra_skills.length > 6 && (
                <Badge variant="secondary" className="bg-muted">
                  +{candidate.extra_skills.length - 6}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Highlights */}
      {candidate.highlights.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Key Highlights</p>
          <ul className="space-y-1">
            {candidate.highlights.slice(0, 2).map((highlight, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <div className="h-1 w-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>Semantic: {candidate.semantic_score}%</span>
          <span>•</span>
          <span>Overlap: {candidate.overlap_score}%</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;