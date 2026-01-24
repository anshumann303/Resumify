import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import FileUploader from "~/components/FileUploader";
import { useResumeAnalysisStore } from "~/lib/store";

export function meta() {
  return [
    { title: "Upload Resume - Resumify" },
    { name: "description", content: "Upload your resume and job description for AI-powered analysis" },
  ];
}

const Upload = () => {
  const navigate = useNavigate();
  const { 
    analyzeResume, 
    isAnalyzing, 
    error, 
    clearError,
    setJobDescription,
    jobDescription 
  } = useResumeAnalysisStore();
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setUploadedFile(file);
    clearError();
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      return;
    }
    
    if (!jobDescription.trim()) {
      return;
    }
    
    try {
      await analyzeResume(uploadedFile, jobDescription);
      navigate('/results');
    } catch (error) {
      // Error is handled by the store
      console.error('Analysis failed:', error);
    }
  };

  return (
    <>
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
        <Navbar />

        <section className="main-section">
          <div className="page-heading py-16">
            <h1>AI Resume Analyzer</h1>
            <h2>Upload your resume and job description for instant analysis</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4 max-w-2xl mx-auto">
                <p className="font-medium">Analysis Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 max-w-2xl mx-auto">
              {/* File Upload */}
              <div className="form-div">
                <label htmlFor="resume-upload" className="text-lg font-semibold">
                  Upload Resume (PDF or DOCX)
                </label>
                <FileUploader 
                  onFileSelect={handleFileSelect}
                  acceptedTypes={{
                    'application/pdf': ['.pdf'],
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                  }}
                />
              </div>

              {/* Job Description */}
              <div className="form-div">
                <label htmlFor="job-description" className="text-lg font-semibold">
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  placeholder="Paste the job description here..."
                  rows={8}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  required
                />
                <p className="text-sm text-gray-600 mt-2">
                  Include the full job description with requirements, skills, and responsibilities
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!uploadedFile || !jobDescription.trim() || isAnalyzing}
                className="primary-button text-xl font-semibold py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Analyzing Resume...
                  </div>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </form>

            {/* Features Preview */}
            <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">ATS Score</div>
                <p className="text-gray-700">Get your Applicant Tracking System compatibility score</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">Skills Match</div>
                <p className="text-gray-700">See how your skills align with job requirements</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">Probability</div>
                <p className="text-gray-700">Calculate your shortlisting probability percentage</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Upload;
