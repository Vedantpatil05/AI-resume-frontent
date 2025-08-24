import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Candidate } from "@/lib/types";

interface ExportMenuProps {
  candidates: Candidate[];
  jobDescription: string;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ candidates, jobDescription }) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: "excel" | "pdf") => {
    setIsExporting(true);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const exportPath = import.meta.env.VITE_EXPORT_PATH; // backend supports "/export-excel"

    const payload = {
      candidates: candidates.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        location: c.location,
        education: c.education,
        years_experience: c.years_of_experience, // ✅ fixed name
        source_filename: c.source_filename,

        // Match info
        match: {
          final_score: c.overall_score, // ✅ fixed
          overlap: c.overlap_score ?? 0, // ✅ fixed
          semantic: c.semantic_score ?? 0, // ✅ fixed
        },

        // Authenticity
        authenticity: {
          score: c.authenticity_score ?? 0,
          flags: c.authenticity_flags ?? [],
        },

        // Skills
        skills: {
          matched: c.matched_skills ?? [], // ✅ fixed
          missing: c.missing_skills ?? [], // ✅ fixed
          extras: c.extra_skills ?? [], // ✅ fixed
        },

        // Evidence & highlights
        evidence: c.evidence ?? [],
        highlights: c.highlights ?? [],
      })),
      format: format === "excel" ? "xlsx" : "pdf",
      jobDescription,
    };

    try {
      const response = await fetch(`${baseUrl}${exportPath}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Export failed: ${response.statusText}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        format === "excel"
          ? "resume_screening_results.xlsx"
          : "resume_screening_results.pdf";
      link.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: `Results exported as ${format.toUpperCase()}.`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Export failed",
        description: "Something went wrong while exporting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-2" disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport("excel")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportMenu;
