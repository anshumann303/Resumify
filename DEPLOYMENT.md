# Deployment Guide

## Vercel Deployment

### Prerequisites
1. [Vercel Account](https://vercel.com)
2. [OpenAI API Key](https://platform.openai.com/api-keys)

### Step-by-Step Deployment

#### 1. Prepare Your Repository
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 2. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect React Router v7 settings
5. Click "Deploy"

#### 3. Set Up Integrations

**Upstash Redis (Database)**
1. Go to your project dashboard
2. Click "Integrations" tab
3. Search for "Upstash Redis"
4. Click "Add Integration"
5. Follow the setup process

**Vercel Blob (File Storage)**
1. In your project dashboard
2. Click "Storage" tab
3. Click "Create Database"
4. Select "Blob"
5. Follow the setup process

#### 4. Configure Environment Variables
1. Go to your project settings
2. Click "Environment Variables"
3. Add the following:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - Other variables will be auto-configured by integrations

#### 5. Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Environment Variables Reference

| Variable | Description | Source |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for AI analysis | Manual |
| `UPSTASH_REDIS_REST_URL` | Redis database URL | Auto (Upstash integration) |
| `UPSTASH_REDIS_REST_TOKEN` | Redis database token | Auto (Upstash integration) |
| `BLOB_READ_WRITE_TOKEN` | Blob storage token | Auto (Vercel Blob) |

### Troubleshooting

**Build Errors**
- Ensure all dependencies are installed
- Check that environment variables are set
- Verify API routes are properly configured

**Runtime Errors**
- Check Vercel function logs
- Ensure OpenAI API key is valid
- Verify database connections

**File Upload Issues**
- Check Blob storage configuration
- Verify file size limits (default: 20MB)
- Ensure proper CORS settings

### Custom Domain (Optional)
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Monitoring
- Use Vercel Analytics for performance monitoring
- Check function logs for debugging
- Monitor API usage in OpenAI dashboard