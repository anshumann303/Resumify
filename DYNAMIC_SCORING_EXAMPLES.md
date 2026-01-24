# Dynamic Scoring Examples

The mock analyzer now generates different scores and feedback based on your input. Here are some examples to test:

## Test Scenario 1: Frontend Developer
**Company:** Google  
**Job Title:** Frontend Developer  
**Job Description:** Looking for a React developer with 3+ years experience in JavaScript, TypeScript, and modern web technologies. Experience with Agile methodology preferred.

**Expected Behavior:**
- Higher scores for technical alignment
- Tips about React/JavaScript skills
- Suggestions about Agile experience
- ATS tips for developer keywords

## Test Scenario 2: Senior Engineering Manager
**Company:** Microsoft  
**Job Title:** Senior Engineering Manager  
**Job Description:** Lead a team of 10+ engineers in a distributed environment. Requires 5+ years management experience, Python expertise, and remote team leadership skills.

**Expected Behavior:**
- Different overall score than Scenario 1
- Leadership-focused feedback
- Tips about management skills
- Remote work experience suggestions
- Python keyword recommendations

## Test Scenario 3: UX Designer
**Company:** Apple  
**Job Title:** UX Designer  
**Job Description:** Create intuitive user experiences for mobile applications. Portfolio required. Experience with design systems and user research.

**Expected Behavior:**
- Design-specific feedback
- Portfolio-related tips
- Different scoring pattern
- Creative industry insights

## Test Scenario 4: Data Scientist
**Company:** Netflix  
**Job Title:** Data Scientist  
**Job Description:** Analyze user behavior data using Python, SQL, and machine learning. PhD preferred. Experience with big data technologies.

**Expected Behavior:**
- Analytics-focused scoring
- Technical skills emphasis
- Academic background considerations
- Big data keyword suggestions

## How It Works

The dynamic analyzer:
1. **Generates unique scores** based on company name, job title, and description
2. **Creates relevant tips** that match the job requirements
3. **Varies feedback** for different roles (technical vs. management vs. creative)
4. **Maintains consistency** - same input always produces same output
5. **Simulates real AI** behavior with contextual responses

## Testing Instructions

1. Try the same resume with different job descriptions
2. Notice how scores and tips change
3. Test with various job titles (developer, manager, designer, etc.)
4. Compare feedback for different companies
5. Observe how job description keywords influence tips

This creates a realistic development experience that closely mimics how the real AI analysis would behave in production.