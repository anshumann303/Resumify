import type { Route } from "./+types/api.analyze-resume";
import { extractTextFromFile, cleanText } from "~/lib/textExtraction";
import { 
  calculateATSScore, 
  extractSkillsFromText, 
  calculateSkillsMatch,
  calculateShortlistingProbability,
  generateOverallFeedback
} from "~/lib/scoring";
import OpenAI from 'openai';

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;
    
    if (!resumeFile) {
      return Response.json({ error: 'Resume file is required' }, { status: 400 });
    }
    
    if (!jobDescription?.trim()) {
      return Response.json({ error: 'Job description is required' }, { status: 400 });
    }
    
    console.log(`[API] Analyzing resume: ${resumeFile.name} (${resumeFile.size} bytes)`);
    
    // Extract text from resume
    const resumeText = await extractTextFromFile(resumeFile);
    const cleanedResumeText = cleanText(resumeText);
    const cleanedJobDescription = cleanText(jobDescription);
    
    console.log(`[API] Extracted ${cleanedResumeText.length} characters from resume`);
    
    // Calculate ATS score
    const atsResult = calculateATSScore(cleanedResumeText);
    
    // Extract skills from both resume and job description
    const resumeSkills = extractSkillsFromText(cleanedResumeText);
    const jobSkills = extractSkillsFromText(cleanedJobDescription);
    
    console.log(`[API] Found ${resumeSkills.length} skills in resume, ${jobSkills.length} in job description`);
    
    // Calculate skills match
    const skillsMatch = calculateSkillsMatch(resumeSkills, jobSkills);
    
    // Calculate shortlisting probability
    const shortlistingProbability = calculateShortlistingProbability(
      atsResult.score,
      skillsMatch.score
    );
    
    // Generate overall feedback
    let overallFeedback = generateOverallFeedback(
      atsResult.score,
      skillsMatch.score,
      shortlistingProbability
    );
    
    // Enhance feedback with AI if available
    if (process.env.OPENAI_API_KEY) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        
        const aiPrompt = `
        Analyze this resume against the job description and provide specific improvement suggestions.
        
        Resume Skills: ${resumeSkills.join(', ')}
        Job Required Skills: ${jobSkills.join(', ')}
        Missing Skills: ${skillsMatch.missing.join(', ')}
        ATS Score: ${atsResult.score}/100
        Skills Match: ${skillsMatch.score}%
        
        Provide 2-3 specific, actionable recommendations for improving this resume for this job.
        Keep it concise and professional.
        `;
        
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: aiPrompt }],
          max_tokens: 200,
          temperature: 0.7
        });
        
        if (aiResponse.choices[0]?.message?.content) {
          overallFeedback += "\n\nAI Recommendations:\n" + aiResponse.choices[0].message.content;
        }
      } catch (aiError) {
        console.error('AI enhancement failed:', aiError);
        // Continue without AI enhancement
      }
    }
    
    const result = {
      atsScore: atsResult.score,
      skillsMatchScore: skillsMatch.score,
      shortlistingProbability,
      missingSkills: skillsMatch.missing,
      matchedSkills: skillsMatch.matched,
      atsImprovements: atsResult.improvements,
      overallFeedback
    };
    
    console.log(`[API] Analysis complete:`, {
      atsScore: result.atsScore,
      skillsMatch: result.skillsMatchScore,
      probability: result.shortlistingProbability
    });
    
    return Response.json(result);
    
  } catch (error) {
    console.error('Resume analysis error:', error);
    
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Analysis failed' 
    }, { status: 500 });
  }
}