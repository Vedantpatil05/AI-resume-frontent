import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileDropzone from "@/components/FileDropzone";
import HealthBadge from "@/components/HealthBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { parseResumes, ParseResponse } from "@/lib/api"; // ✅ typed import

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [jobDescription, setJobDescription] = useState("");
  const [topCandidates, setTopCandidates] = useState<number>(10);
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      toast({
        variant: "destructive",
        title: "Job description required",
        description: "Please enter a job description before analyzing resumes.",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please upload at least one resume file.",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // ✅ Call backend parse API
      const response: ParseResponse = await parseResumes({
        jd: jobDescription,
        files,
        top_n: topCandidates,
      });

      const requestId = Date.now().toString();

      // ✅ Save results in localStorage
      localStorage.setItem(
        `carnival_request_${requestId}`,
        JSON.stringify({
          jobDescription,
          topCandidates,
          fileCount: files.length,
          timestamp: Date.now(),
          result: response, // backend results
        })
      );

      toast({
        title: "Analysis complete!",
        description: `Successfully analyzed ${files.length} resumes.`,
      });

      navigate(`/results?rid=${requestId}`);
    } catch (error) {
      console.error("Parse error", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-8 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">
            Upload & Analyze Resumes
          </h1>
          <p className="text-muted-foreground">
            Upload resumes and job description to get AI-powered candidate
            analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Job Description */}
          <div className="space-y-6">
            <div className="cosmic-card p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Job Description</h2>
                <HealthBadge />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="job-description">
                    Describe the role and requirements
                  </Label>
                  <Textarea
                    id="job-description"
                    placeholder="Enter the job description, required skills, experience, etc..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[200px] mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="top-candidates">
                    Top Candidates to Shortlist
                  </Label>
                  <Input
                    id="top-candidates"
                    type="number"
                    value={topCandidates}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val > 0 && val <= 50) {
                        setTopCandidates(val);
                      } else if (e.target.value === "") {
                        setTopCandidates(0);
                      }
                    }}
                    className="mt-2 w-32"
                    placeholder="Enter number"
                    min={1}
                    max={50}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a number between 1 and 50
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - File Upload */}
          <div className="space-y-6">
            <div className="cosmic-card p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Resume Upload</h2>
              <FileDropzone
                files={files}
                onFilesChange={setFiles}
                maxFiles={100}
                maxFileSize={5 * 1024 * 1024} // 5MB
                acceptedTypes={[".pdf", ".docx"]}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={
                isAnalyzing || !jobDescription.trim() || files.length === 0
              }
              className="w-full h-12 text-base"
            >
              {isAnalyzing ? "Analyzing Resumes..." : "Analyze Resumes"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
