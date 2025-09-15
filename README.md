# AdmitEthos - Authentic Writing Assistant

A web application built with React and TypeScript that provides ethical AI-assisted tools for writing authentic personal statements.

## Features

- **Structured Brainstorming**: AI-generated questions to help surface unique experiences
- **Personal Voice Analyzer**: Analyzes text for authenticity and flags generic phrases
- **Ethical AI Editor**: Grammar and style suggestions with strict content generation guardrails
- **Originality Report**: Generates PDF reports documenting the writing process

## Quick Start (One Day Setup)

### Prerequisites

1. **Install Node.js** (Required)
   - Download from https://nodejs.org/ (LTS version)
   - Verify installation: `node --version` and `npm --version`

2. **Get Google Gemini API Key** (Required)
   - Go to https://aistudio.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key (starts with "AIza")

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Configure API Key:**
   - **Option A (Environment Variable):** Create a `.env` file with:
     ```
     VITE_GEMINI_API_KEY=AIza-your-key-here
     ```
   - **Option B (Settings UI):** Go to http://localhost:3000 → Settings → Enter API key

### Usage

1. **Brainstorming Module:**
   - Select a theme (e.g., "Personal Growth")
   - Click "Generate Questions"
   - Answer the AI-generated questions
   - Save your session

2. **Voice Analyzer:**
   - Paste your essay draft
   - Click "Analyze for Authenticity"
   - Review issues and suggestions

3. **AI Editor:**
   - Paste your text
   - Click "Get Suggestions"
   - Apply grammar/style improvements
   - Save drafts

4. **Originality Report:**
   - Click "Generate & Download Report"
   - Get a PDF with your complete writing process

## Project Structure

```
src/
├── components/          # React components
│   ├── BrainstormingModule.tsx
│   ├── VoiceAnalyzer.tsx
│   ├── AIEditor.tsx
│   ├── OriginalityReport.tsx
│   └── SettingsPanel.tsx
├── services/           # API services
│   ├── aiService.ts    # OpenAI integration
│   └── pdfService.ts   # PDF generation
├── App.tsx            # Main application
├── main.tsx           # Entry point
└── index.css          # Styles
```

## API Keys Required

- **Google Gemini API Key**: For AI features (brainstorming, analysis, editing)
  - Get from: https://aistudio.google.com/app/apikey
  - Cost: FREE for most usage (generous free tier)
  - Uses Gemini-1.5-Flash model

## Ethical Guidelines

This application is designed with strict ethical boundaries:

✅ **What it does:**
- Generates brainstorming questions
- Analyzes writing for authenticity
- Provides grammar/style suggestions
- Creates audit trails

❌ **What it doesn't do:**
- Generate essay content or ideas
- Write sentences or paragraphs
- Replace personal voice

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Troubleshooting

**"npm not recognized" error:**
- Install Node.js from https://nodejs.org/

**"Gemini API key not found" error:**
- Go to Settings tab and enter your API key, or set VITE_GEMINI_API_KEY in .env file

**"Error generating prompts" error:**
- Check your API key is valid
- Ensure you have Google account access

## Next Steps for Full Production

1. Add user authentication
2. Implement database storage
3. Add more AI models
4. Deploy to cloud platform
5. Add comprehensive testing

## License

MIT License - see LICENSE file for details.