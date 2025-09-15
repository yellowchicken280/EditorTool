import { GoogleGenerativeAI } from '@google/generative-ai'

const getGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key')
  
  console.log('Debug - Environment key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Found' : 'Not found')
  console.log('Debug - Local storage key:', localStorage.getItem('gemini_api_key') ? 'Found' : 'Not found')
  console.log('Debug - Using key:', apiKey ? 'Found' : 'Not found')
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add it in Settings or environment variables.')
  }
  return new GoogleGenerativeAI(apiKey)
}

export const generateBrainstormingPrompts = async (theme: string): Promise<string[]> => {
  const genAI = getGemini()
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  
  const prompt = `Generate 5 thoughtful, open-ended questions to help someone brainstorm ideas for a personal statement about "${theme}". 
  
  The questions should:
  - Help them reflect on personal experiences
  - Encourage specific examples and stories
  - Avoid generic or cliché topics
  - Be thought-provoking and unique
  - Help them discover their authentic voice

  Return only the questions, one per line, without numbering or bullet points.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return text.split('\n').filter(q => q.trim().length > 0).slice(0, 5)
  } catch (error) {
    console.error('Error generating brainstorming prompts:', error)
    console.error('Error details:', error.message)
    console.error('Error type:', error.constructor.name)
    throw new Error(`Failed to generate brainstorming prompts: ${error.message}`)
  }
}

export const analyzePersonalVoice = async (text: string): Promise<any> => {
  const genAI = getGemini()
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  
  const prompt = `Analyze this personal statement for authenticity and personal voice. Look for:

  1. Generic phrases or clichés that could be more personal
  2. Overly complex sentences that might sound AI-generated
  3. Areas where specific personal anecdotes could be added
  4. Opportunities to make the writing more conversational and authentic

  Return a JSON object with this structure:
  {
    "authenticityScore": number (0-100),
    "issues": [
      {
        "type": "string",
        "description": "string", 
        "severity": "low|medium|high",
        "example": "string (optional)"
      }
    ],
    "suggestions": ["string"]
  }

  Text to analyze:
  "${text}"`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return JSON.parse(text)
  } catch (error) {
    console.error('Error analyzing personal voice:', error)
    console.error('Error details:', error.message)
    console.error('Error type:', error.constructor.name)
    throw new Error(`Failed to analyze personal voice: ${error.message}`)
  }
}

export const getGrammarSuggestions = async (text: string): Promise<any[]> => {
  const genAI = getGemini()
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  
  const prompt = `Analyze this text for grammar, style, and clarity improvements. Provide specific suggestions for:

  1. Grammar errors
  2. Awkward phrasing that could be clearer
  3. Sentence structure improvements
  4. Word choice improvements

  Return a JSON array of suggestions with this structure:
  [
    {
      "type": "string (e.g., 'Grammar', 'Clarity', 'Style')",
      "original": "string (the problematic text)",
      "suggestion": "string (the improved text)",
      "explanation": "string (why this change helps)"
    }
  ]

  Text to analyze:
  "${text}"`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return JSON.parse(text)
  } catch (error) {
    console.error('Error getting grammar suggestions:', error)
    console.error('Error details:', error.message)
    console.error('Error type:', error.constructor.name)
    throw new Error(`Failed to get grammar suggestions: ${error.message}`)
  }
}