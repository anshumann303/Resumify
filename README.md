<div align="center">
  <br />
    <img src="public/readme/hero.webp" alt="Resumify Banner">
  <br />

  <div>
    <img alt="React" src="https://img.shields.io/badge/React-4c84f3?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Tailwind" src="https://img.shields.io/badge/-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
    <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  </div>

  <h3 align="center">Resumify – AI-Powered Resume Analyzer</h3>

  <div align="center">
    Simplify your job application process with AI insights, tailored feedback, and smart resume analysis.
  </div>
</div>

---

## 📋 Table of Contents
1. ✨ [Introduction](#introduction)  
2. ⚙️ [Tech Stack](#tech-stack)  
3. 🔋 [Features](#features)  
4. 🤸 [Quick Start](#quick-start)  
5. 🔗 [Assets](#assets)  
6. 🚀 [More](#more)  

---

## ✨ Introduction
**Resumify** is an AI-powered Resume Analyzer that helps job seekers improve their chances of landing interviews.  
Upload your resume, get an ATS (Applicant Tracking System) score, and receive personalized recommendations to optimize your resume for specific job descriptions.  

Whether you’re a student, fresher, or professional — Resumify gives you clear, actionable insights to stand out.  

---

## ⚙️ Tech Stack
- **[React](https://react.dev/)** – UI library for building reusable components.  
- **[React Router v7](https://reactrouter.com/)** – Routing and navigation for seamless page transitions.  
- **[OpenAI API](https://openai.com/)** – AI-powered resume analysis using GPT-4 Vision.  
- **[Vercel](https://vercel.com/)** – Deployment platform with integrated KV database and Blob storage.  
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS for fast, responsive UI design.  
- **[TypeScript](https://www.typescriptlang.org/)** – Strong typing for maintainable, scalable code.  
- **[Vite](https://vitejs.dev/)** – Lightning-fast bundler and dev server.  
- **[Zustand](https://github.com/pmndrs/zustand)** – Lightweight global state management.  

---

## 🔋 Features
👉 **AI Resume Analysis** – Get ATS scores and tailored feedback.  
👉 **Job Matching** – Compare resumes with job descriptions for relevancy.  
👉 **Secure Resume Storage** – Upload and manage multiple resumes in one place.  
👉 **Instant Feedback** – Improve formatting, keywords, and structure.  
👉 **Modern UI/UX** – Sleek design built with Tailwind CSS & shadcn/ui.  
👉 **Cross-Platform** – Works on desktop, tablet, and mobile.  

---

## 🤸 Quick Start

**Prerequisites**
- [Git](https://git-scm.com/)  
- [Node.js](https://nodejs.org/en)  
- [npm](https://www.npmjs.com/)  

**Clone the Repository**
```bash
git clone https://github.com/your-username/resumify.git
cd resumify
```

**Install Dependencies**
```bash
npm install
```

**Environment Setup**
```bash
cp .env.example .env
```
Add your OpenAI API key to the `.env` file.

**Run the Project**
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

## 🚀 Deploy to Vercel

**1. Install Vercel CLI**
```bash
npm i -g vercel
```

**2. Login to Vercel**
```bash
vercel login
```

**3. Deploy**
```bash
vercel
```

**4. Set up Environment Variables**
In your Vercel dashboard:
- Add `OPENAI_API_KEY` with your OpenAI API key
- Enable Upstash Redis integration (database will be auto-configured)
- Enable Vercel Blob integration (storage will be auto-configured)

**5. Redeploy**
```bash
vercel --prod
```

🔗 Assets
Project assets and resources are available inside the public/readme folder.

🚀 More
Resumify is still evolving 🚧.
Upcoming features include:

Multi-language support 🌍

Resume templates 📄

Job application tracking 📊

If you like this project, don’t forget to ⭐ star the repo and share feedback!