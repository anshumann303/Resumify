import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumify - AI Resume Analyzer" },
    { name: "description", content: "AI-powered resume analysis and job matching tool" },
  ];
}

export default function Home() {
  return (
    <>
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
        <Navbar />

        <section className="main-section">
          <div className="page-heading py-16">
            <h1>AI-Powered Resume Analysis</h1>
            <h2>Get instant feedback on your resume and improve your job application success rate</h2>
            
            <div className="flex flex-col items-center justify-center mt-10 gap-4 pb-16">
              <Link
                to="/upload"
                className="primary-button w-fit text-xl font-semibold px-12 py-4"
              >
                Analyze Your Resume
              </Link>
              <p className="text-gray-600 text-lg">
                Upload your resume and job description for instant AI analysis
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gradient mb-6">Why Choose Resumify?</h2>
              <p className="text-2xl text-dark-200 max-w-3xl mx-auto">
                Get AI-powered insights that help you stand out from the competition
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">ATS Optimization</h3>
                <p className="text-dark-200 text-lg">
                  Get your resume past Applicant Tracking Systems with our AI-powered optimization
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Skills Matching</h3>
                <p className="text-dark-200 text-lg">
                  See exactly how your skills align with job requirements and what's missing
                </p>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Probability Score</h3>
                <p className="text-dark-200 text-lg">
                  Calculate your shortlisting probability based on resume quality and job match
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold text-gradient mb-8">About Resumify</h2>
            <p className="text-2xl text-dark-200 leading-relaxed mb-8">
              We're on a mission to help job seekers land their dream jobs by providing 
              AI-powered resume analysis and optimization tools. Our advanced algorithms 
              analyze your resume against industry standards and specific job requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div className="text-left">
                <h3 className="text-3xl font-bold text-black mb-4">Our Mission</h3>
                <p className="text-dark-200 text-lg">
                  To democratize access to professional resume optimization tools and 
                  help every job seeker present their best self to potential employers.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold text-black mb-4">Our Technology</h3>
                <p className="text-dark-200 text-lg">
                  Built with cutting-edge AI and modern web technologies to provide 
                  fast, accurate, and actionable feedback on your resume.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
