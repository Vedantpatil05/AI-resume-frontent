import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

import { Candidate } from '@/lib/types';

interface ScoreChartProps {
  candidates: Candidate[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ candidates }) => {
  // Create score distribution data
  const scoreRanges = [
    { range: '90-100', min: 90, max: 100, color: '#10b981' },
    { range: '80-89', min: 80, max: 89, color: '#3b82f6' },
    { range: '70-79', min: 70, max: 79, color: '#f59e0b' },
    { range: '60-69', min: 60, max: 69, color: '#ef4444' },
    { range: '<60', min: 0, max: 59, color: '#6b7280' }
  ];

  const chartData = scoreRanges.map(range => ({
    range: range.range,
    count: candidates.filter(c => 
      c.overall_score >= range.min && c.overall_score <= range.max
    ).length,
    color: range.color
  }));

  return (
    <div className="cosmic-card p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Score Distribution</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="range" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 text-xs">
        {scoreRanges.map((range, index) => (
          <div key={range.range} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: range.color }}
            />
            <span className="text-muted-foreground">{range.range}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreChart;