import { create } from "zustand";

interface AnalysisResult {
  atsScore: number;
  skillsMatchScore: number;
  shortlistingProbability: number;
  missingSkills: string[];
  atsImprovements: string[];
  matchedSkills: string[];
  overallFeedback: string;
}

interface ResumeAnalysisStore {
  // State
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  error: string | null;
  uploadedFile: File | null;
  jobDescription: string;
  
  // Actions
  setUploadedFile: (file: File | null) => void;
  setJobDescription: (description: string) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
  
  // API Actions
  analyzeResume: (file: File, jobDescription: string) => Promise<void>;
}

export const useResumeAnalysisStore = create<ResumeAnalysisStore>((set, get) => ({
  // Initial state
  isAnalyzing: false,
  analysisResult: null,
  error: null,
  uploadedFile: null,
  jobDescription: '',
  
  // Basic actions
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setJobDescription: (description) => set({ jobDescription: description }),
  setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  reset: () => set({
    isAnalyzing: false,
    analysisResult: null,
    error: null,
    uploadedFile: null,
    jobDescription: ''
  }),
  
  // API action
  analyzeResume: async (file: File, jobDescription: string) => {
    set({ isAnalyzing: true, error: null });
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);
      
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }
      
      const result = await response.json();
      set({ 
        analysisResult: result,
        uploadedFile: file,
        jobDescription,
        isAnalyzing: false 
      });
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Analysis failed',
        isAnalyzing: false 
      });
    }
  }
}));