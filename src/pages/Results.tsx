import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatsPanel from "@/components/StatsPanel";
import CandidateCard from "@/components/CandidateCard";
import CandidateModal from "@/components/CandidateModal";
import ExportMenu from "@/components/ExportMenu";
import ScoreChart from "@/components/ScoreChart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import type { ParseResponse, Candidate } from "@/lib/types";

const Results = () => {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("rid");

  const [data, setData] = useState<ParseResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"overall_score" | "semantic_score" | "overlap_score">(
    "overall_score"
  );
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (requestId) {
      const storedRequest = localStorage.getItem(`carnival_request_${requestId}`);
      if (storedRequest) {
        try {
          const parsed = JSON.parse(storedRequest);
          if (parsed.result) {
            setData(parsed.result as ParseResponse);
          }
        } catch (err) {
          console.error("Error parsing stored results", err);
        }
      }
    }
  }, [requestId]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Loading Results...</h2>
            <p className="text-muted-foreground">Analyzing candidate data</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const candidates: Candidate[] = data.shortlisted_candidates || [];

  const filteredCandidates = candidates
    .filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.matched_skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .filter((candidate) => candidate.overall_score >= minScore)
    .sort((a, b) => {
      if (sortBy === "overall_score") return b.overall_score - a.overall_score;
      if (sortBy === "semantic_score") return b.semantic_score - a.semantic_score;
      if (sortBy === "overlap_score") return b.overlap_score - a.overlap_score;
      return 0;
    });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const currentCandidates = filteredCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectCandidate = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedCandidates);
    if (selected) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedCandidates(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedCandidates.size === currentCandidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(currentCandidates.map((c) => c.id)));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-8 px-6 max-w-7xl mx-auto w-full">
        {/* Summary Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                {data.summary?.job_title || "Results"}
              </h1>
              {data.summary && (
                <p className="text-muted-foreground">
                  {data.summary.shortlisted_count} of {data.summary.total_candidates} candidates •
                  Avg Match: {data.summary.avg_match_score.toFixed(1)}% • Model:{" "}
                  {data.summary.model_name}
                </p>
              )}
            </div>
            <ExportMenu
              candidates={
                selectedCandidates.size > 0
                  ? filteredCandidates.filter((c) => selectedCandidates.has(c.id))
                  : candidates
              }
              jobDescription={data.summary?.job_title || "Job"}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <StatsPanel
              candidates={candidates}
              summary={`Analyzed ${data.summary.total_candidates} candidates for ${data.summary.job_title}`}
            />
            <ScoreChart candidates={candidates} />
          </div>
        </div>

        {/* Filters */}
        <div className="cosmic-card p-6 rounded-lg mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall_score">Sort by Overall Score</SelectItem>
                <SelectItem value="semantic_score">Sort by Semantic Score</SelectItem>
                <SelectItem value="overlap_score">Sort by Overlap Score</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Min Score"
                value={minScore || ""}
                onChange={(e) => setMinScore(parseInt(e.target.value) || 0)}
                className="w-24"
                min={0}
                max={100}
              />
            </div>

            <Button variant="outline" onClick={handleSelectAll}>
              {selectedCandidates.size === currentCandidates.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid gap-4 mb-6">
          {currentCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.has(candidate.id)}
              onSelect={(selected) => handleSelectCandidate(candidate.id, selected)}
              onViewDetails={() => setSelectedCandidate(candidate)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            ))}
          </div>
        )}

        {/* Candidate Detail Modal */}
        {selectedCandidate && (
          <CandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Results;
