
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "Bulk Resume Upload",
      description: "Upload and process up to 100 resumes simultaneously with support for PDF and DOCX formats.",
      expandedDescription: "Drag and drop multiple resume files or browse to select them. Our system automatically extracts text, validates format, and prepares files for AI analysis. Support for various resume formats and layouts with intelligent parsing.",
      icon: (
        <Layers size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Intelligent Parsing",
      description: "AI-powered resume analysis with semantic understanding and skill extraction.",
      expandedDescription: "Advanced natural language processing extracts skills, experience, education, and key achievements. Semantic analysis understands context and relevance to job requirements. Machine learning models trained on millions of resumes for accurate parsing.",
      icon: (
        <Grid3x3 size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Skill Gap Analytics",
      description: "Identify missing skills and match candidates to job requirements with precision.",
      expandedDescription: "Compare candidate skills against job descriptions with detailed gap analysis. Visual skill matching reports show overlaps, missing competencies, and additional expertise. Data-driven insights for better hiring decisions.",
      icon: (
        <LayoutDashboard size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "CSV/Excel Export",
      description: "Export candidate data and analysis results in multiple formats for easy sharing.",
      expandedDescription: "Generate comprehensive reports with candidate rankings, skill analysis, and detailed profiles. Export to Excel or CSV with customizable fields. Share insights with hiring teams and stakeholders effortlessly.",
      icon: (
        <ListCheck size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Authenticity Scoring",
      description: "Advanced algorithms detect potential resume inconsistencies and authenticity issues.",
      expandedDescription: "Machine learning models analyze writing patterns, experience consistency, and skill alignment. Flag potential discrepancies and provide confidence scores. Ensure candidate authenticity with AI-powered verification.",
      icon: (
        <Star size={24} className="text-cosmic-accent" />
      )
    },
    {
      title: "Candidate Analytics",
      description: "Comprehensive dashboards with score distributions and ranking insights.",
      expandedDescription: "Interactive charts showing candidate score distributions, top skills, and filtering options. Sort by overall match, semantic similarity, or skill overlap. Visual analytics for data-driven recruitment decisions.",
      icon: (
        <BookOpen size={24} className="text-cosmic-accent" />
      )
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Powerful AI resume analysis tools
          </h2>
          <p className="text-cosmic-muted text-lg">
            Everything you need to streamline your hiring process with intelligent candidate screening
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-cosmic-light/40' : 'border-cosmic-light/20'} cosmic-gradient transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-cosmic-light/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-cosmic-muted transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-cosmic-muted">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-cosmic-light/10">
                  <p className="text-cosmic-muted">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-cosmic-accent hover:text-cosmic-accent/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
