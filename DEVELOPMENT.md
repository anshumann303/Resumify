# Development Guide

## 🚀 Running the Project

The project is now configured to work in development mode without requiring external services.

### Quick Start
```bash
npm install
npm run dev
```

Visit: http://localhost:5173/

## 🔧 Development Features

### Dynamic Mock Analysis
The application now includes intelligent, input-based analysis that varies results based on:

- **Company Name**: Different companies generate different base scores
- **Job Title**: Role-specific feedback (developer vs manager vs designer)
- **Job Description**: Keyword-based tips and scoring adjustments
- **Consistency**: Same input always produces the same output

### Mock Data & Fallbacks
The application includes intelligent fallbacks for development:

- **AI Analysis**: Returns realistic, dynamic feedback based on job details
- **File Storage**: Uses data URLs for actual file display in development
- **Database**: Uses in-memory storage when Redis is not available
- **Scoring Algorithm**: Generates unique scores for each job/company combination

### What Works in Development
✅ **UI/UX**: Full interface with all components  
✅ **Navigation**: All routes and page transitions  
✅ **File Upload**: UI works with real file display using data URLs  
✅ **Resume Analysis**: Shows dynamic, input-based feedback  
✅ **Resume Gallery**: Displays uploaded resumes with unique scores  
✅ **Responsive Design**: Mobile and desktop layouts  
✅ **Dynamic Scoring**: Different results for different job inputs  

### What Requires Production Setup
⚠️ **Real AI Analysis**: Needs OpenAI API key  
⚠️ **Persistent Storage**: Needs Redis database  
⚠️ **File Storage**: Needs Vercel Blob for real file uploads  

## 🛠️ Environment Variables

### Development (Optional)
Create a `.env` file with:
```bash
# Optional - will use mock data if not provided
OPENAI_API_KEY=your_openai_api_key_here
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
BLOB_READ_WRITE_TOKEN=your_blob_token
```

### Production (Required)
Set these in Vercel dashboard:
- `OPENAI_API_KEY` - Your OpenAI API key
- Redis and Blob tokens (auto-configured by Vercel integrations)

## 📱 Testing the App

1. **Home Page**: Shows welcome message and upload button
2. **Upload Page**: 
   - Fill out job details
   - Upload a PDF resume
   - See processing animation
   - Get redirected to results
3. **Results Page**: View detailed AI feedback with scores
4. **Resume Gallery**: See all uploaded resumes

## 🔄 Development Workflow

1. **Make Changes**: Edit files in `app/` directory
2. **Hot Reload**: Changes appear instantly in browser
3. **Test Features**: All UI functionality works
4. **Deploy**: Push to Vercel for full functionality

## 🐛 Troubleshooting

**Server Won't Start**
- Check Node.js version (18+)
- Run `npm install` again
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

**Build Errors**
- Run `npm run build` to check for TypeScript errors
- Fix any type issues before deploying

**Mock Data Not Showing**
- Check browser console for errors
- Ensure all API routes are working
- Restart development server

The app is designed to provide a complete development experience while gracefully handling missing production services.
#
# 📱 Testing Dynamic Scoring

### Basic Flow
1. **Home Page**: Shows welcome message and upload button
2. **Upload Page**: 
   - Fill out job details (company, title, description)
   - Upload a PDF resume
   - See processing animation with real file conversion
   - Get redirected to results
3. **Results Page**: View detailed AI feedback with dynamic scores
4. **Resume Gallery**: See all uploaded resumes with unique analysis

### Test Different Scenarios
Try these scenarios to see how scores and feedback change:

**Scenario 1 - Frontend Developer:**
- Company: Google
- Job Title: Frontend Developer  
- Description: "Looking for React developer with JavaScript, TypeScript, and Agile experience"

**Scenario 2 - Engineering Manager:**
- Company: Microsoft
- Job Title: Senior Engineering Manager
- Description: "Lead distributed team of 10+ engineers. Python and remote leadership required"

**Scenario 3 - UX Designer:**
- Company: Apple
- Job Title: UX Designer
- Description: "Create mobile app experiences. Portfolio required. Design systems knowledge preferred"

**Scenario 4 - Data Scientist:**
- Company: Netflix
- Job Title: Data Scientist
- Description: "Analyze user data with Python, SQL, machine learning. PhD preferred"

### What You'll Notice
- **Different Overall Scores**: Each scenario generates unique scores
- **Role-Specific Tips**: Feedback tailored to job type (technical vs management vs creative)
- **Keyword-Based Suggestions**: Tips that reference job description keywords
- **Consistent Results**: Same input always produces same output
- **Realistic Variation**: Scores vary realistically (not random)

This creates an authentic development experience that closely mimics real AI behavior!