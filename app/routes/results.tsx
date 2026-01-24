import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useResumeAnalysisStore } from "~/lib/store";

export function meta() {
  return [
    { title: "Analysis Results - Resumify" },
    { name: "description", content: "View your resume analysis results and improvement suggestions" },
  ];
}

const Results = () => {
  const navigate = useNavigate();
  const { analysisResult, uploadedFile, jobDescription, error } = useResumeAnalysisStore();

  useEffect(() => {
    // Redirect to upload if no analysis result
    if (!analysisResult) {
      navigate('/upload');
    }
  }, [analysisResult, navigate]);

  if (!analysisResult) {
    return null; // Will redirect
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <>
      <main className="bg-gray-50 min-h-screen">
        <Navbar />

        <section className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Analysis Results</h1>
            <p className="text-xl text-gray-600">
              Analysis for: <span className="font-semibold">{uploadedFile?.name}</span>
            </p>
          </div>

          {/* Score Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* ATS Score */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysisResult.atsScore)}`}>
                {analysisResult.atsScore}
              </div>
              <div className="text-gray-600 text-lg font-medium mb-2">ATS Score</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    analysisResult.atsScore >= 80 ? 'bg-green-500' :
                    analysisResult.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.atsScore}%` }}
                ></div>
              </div>
            </div>

            {/* Skills Match */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysisResult.skillsMatchScore)}`}>
                {analysisResult.skillsMatchScore}%
              </div>
              <div className="text-gray-600 text-lg font-medium mb-2">Skills Match</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    analysisResult.skillsMatchScore >= 80 ? 'bg-green-500' :
                    analysisResult.skillsMatchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.skillsMatchScore}%` }}
                ></div>
              </div>
            </div>

            {/* Shortlisting Probability */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysisResult.shortlistingProbability)}`}>
                {analysisResult.shortlistingProbability}%
              </div>
              <div className="text-gray-600 text-lg font-medium mb-2">Shortlisting Probability</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    analysisResult.shortlistingProbability >= 80 ? 'bg-green-500' :
                    analysisResult.shortlistingProbability >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysisResult.shortlistingProbability}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Skills Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Analysis</h2>
              
              {/* Matched Skills */}
              {analysisResult.matchedSkills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-green-700 mb-3">✅ Matched Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.matchedSkills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {analysisResult.missingSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-red-700 mb-3">❌ Missing Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingSkills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.matchedSkills.length === 0 && analysisResult.missingSkills.length === 0 && (
                <p className="text-gray-600">No specific skills identified in the job description.</p>
              )}
            </div>

            {/* ATS Improvements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ATS Improvements</h2>
              
              {analysisResult.atsImprovements.length > 0 ? (
                <ul className="space-y-3">
                  {analysisResult.atsImprovements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{improvement}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-600 text-4xl mb-2">🎉</div>
                  <p className="text-green-700 font-medium">Great job! Your resume is well-optimized for ATS systems.</p>
                </div>
              )}
            </div>
          </div>

          {/* Overall Feedback */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Feedback</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {analysisResult.overallFeedback}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link 
              to="/upload" 
              className="primary-button text-center px-8 py-3 text-lg font-semibold"
            >
              Analyze Another Resume
            </Link>
            <button 
              onClick={() => window.print()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
            >
              Print Results
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Results;