// Deterministic scoring logic for ATS and skills matching

export interface ScoringResult {
  atsScore: number;
  skillsMatchScore: number;
  shortlistingProbability: number;
  missingSkills: string[];
  matchedSkills: string[];
  atsImprovements: string[];
}

export function calculateATSScore(resumeText: string): { score: number; improvements: string[] } {
  const improvements: string[] = [];
  let score = 100;
  
  // Check for common ATS-friendly elements
  const checks = [
    {
      test: /contact|email|phone|address/i,
      penalty: 15,
      improvement: "Add clear contact information (email, phone, address)"
    },
    {
      test: /experience|work|employment/i,
      penalty: 20,
      improvement: "Include work experience section with clear job titles"
    },
    {
      test: /education|degree|university|college/i,
      penalty: 10,
      improvement: "Add education section with degrees and institutions"
    },
    {
      test: /skills|technical|proficient/i,
      penalty: 15,
      improvement: "Include a dedicated skills section"
    },
    {
      test: /\d{4}|\d{1,2}\/\d{4}|\d{1,2}-\d{4}/,
      penalty: 10,
      improvement: "Add dates for work experience and education"
    }
  ];
  
  checks.forEach(check => {
    if (!check.test.test(resumeText)) {
      score -= check.penalty;
      improvements.push(check.improvement);
    }
  });
  
  // Check for formatting issues
  if (resumeText.length < 500) {
    score -= 20;
    improvements.push("Resume appears too short - add more detailed descriptions");
  }
  
  if (resumeText.split('\n').length < 10) {
    score -= 10;
    improvements.push("Use better formatting with clear sections and line breaks");
  }
  
  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));
  
  return { score, improvements };
}

export function extractSkillsFromText(text: string): string[] {
  // Common technical and professional skills
  const skillPatterns = [
    // Programming languages
    /\b(javascript|python|java|c\+\+|c#|php|ruby|go|rust|swift|kotlin|typescript)\b/gi,
    // Frameworks and libraries
    /\b(react|angular|vue|node\.?js|express|django|flask|spring|laravel|rails)\b/gi,
    // Databases
    /\b(mysql|postgresql|mongodb|redis|elasticsearch|oracle|sql server)\b/gi,
    // Cloud and DevOps
    /\b(aws|azure|gcp|docker|kubernetes|jenkins|terraform|ansible)\b/gi,
    // Tools and technologies
    /\b(git|github|gitlab|jira|confluence|slack|figma|photoshop|excel)\b/gi,
    // Soft skills
    /\b(leadership|management|communication|teamwork|problem.solving|analytical)\b/gi,
    // Methodologies
    /\b(agile|scrum|kanban|waterfall|devops|ci\/cd)\b/gi
  ];
  
  const skills = new Set<string>();
  
  skillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => skills.add(match.toLowerCase()));
    }
  });
  
  return Array.from(skills);
}

export function calculateSkillsMatch(
  resumeSkills: string[],
  jobDescriptionSkills: string[]
): { score: number; matched: string[]; missing: string[] } {
  if (jobDescriptionSkills.length === 0) {
    return { score: 0, matched: [], missing: [] };
  }
  
  const matched: string[] = [];
  const missing: string[] = [];
  
  jobDescriptionSkills.forEach(skill => {
    const isMatched = resumeSkills.some(resumeSkill => 
      resumeSkill.includes(skill) || skill.includes(resumeSkill)
    );
    
    if (isMatched) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });
  
  const score = Math.round((matched.length / jobDescriptionSkills.length) * 100);
  
  return { score, matched, missing };
}

export function calculateShortlistingProbability(
  atsScore: number,
  skillsMatchScore: number
): number {
  // Weighted calculation: ATS score (40%) + Skills match (60%)
  const weightedScore = (atsScore * 0.4) + (skillsMatchScore * 0.6);
  
  // Apply probability curve (higher scores get disproportionately higher probability)
  let probability = Math.pow(weightedScore / 100, 1.5) * 100;
  
  // Ensure probability is between 0 and 100
  probability = Math.max(0, Math.min(100, probability));
  
  return Math.round(probability);
}

export function generateOverallFeedback(
  atsScore: number,
  skillsMatchScore: number,
  shortlistingProbability: number
): string {
  if (shortlistingProbability >= 80) {
    return "Excellent match! Your resume is well-optimized and closely aligns with the job requirements.";
  } else if (shortlistingProbability >= 60) {
    return "Good match! Your resume shows strong potential with some areas for improvement.";
  } else if (shortlistingProbability >= 40) {
    return "Moderate match. Consider addressing the missing skills and ATS improvements to increase your chances.";
  } else {
    return "Significant improvements needed. Focus on adding relevant skills and optimizing your resume format.";
  }
}