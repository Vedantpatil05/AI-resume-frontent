import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Candidate } from "@/lib/types";

interface StatsPanelProps {
  candidates: Candidate[];
  summary: string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ candidates, summary }) => {
  const avgMatchScore =
    candidates.length > 0
      ? (candidates.reduce((sum, c) => sum + c.overall_score, 0) / candidates.length).toFixed(1)
      : "0";

  // Flatten skills
  const allSkills = candidates.flatMap((c) => c.matched_skills);

  const skillMap: Record<string, number> = {};
  allSkills.forEach((s) => {
    const key = s.toLowerCase();
    skillMap[key] = (skillMap[key] || 0) + 1;
  });

  const topSkills = Object.entries(skillMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{candidates.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Match Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{avgMatchScore}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {topSkills.map(([skill, freq], i) => (
              <li key={i} className="flex justify-between">
                <span>{skill}</span>
                <span className="text-muted-foreground">{freq}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
