import React, { useState } from 'react'
import { Lightbulb, RefreshCw, Save } from 'lucide-react'
import { generateBrainstormingPrompts } from '../services/aiService'

interface BrainstormingModuleProps {
  data: string[]
  onUpdate: (data: string[]) => void
}

const BrainstormingModule: React.FC<BrainstormingModuleProps> = ({ data, onUpdate }) => {
  const [prompts, setPrompts] = useState<string[]>([])
  const [responses, setResponses] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('')

  const themes = [
    'Personal Growth',
    'Academic Interests',
    'Career Goals',
    'Challenges Overcome',
    'Leadership Experience',
    'Community Service',
    'Cultural Identity',
    'Future Aspirations'
  ]

  const generatePrompts = async () => {
    if (!selectedTheme) return
    
    setLoading(true)
    try {
      const newPrompts = await generateBrainstormingPrompts(selectedTheme)
      setPrompts(newPrompts)
    } catch (error) {
      console.error('Error generating prompts:', error)
      alert('Error generating prompts. Please check your API key in settings.')
    } finally {
      setLoading(false)
    }
  }

  const handleResponseChange = (prompt: string, response: string) => {
    setResponses(prev => ({ ...prev, [prompt]: response }))
  }

  const saveSession = () => {
    const sessionData = prompts.map(prompt => `${prompt}\n\nResponse: ${responses[prompt] || 'Not answered'}`)
    onUpdate([...data, ...sessionData])
    alert('Brainstorming session saved!')
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
          Structured Brainstorming
        </h2>
        <p className="text-gray-600 mb-6">
          Select a theme and get AI-generated questions to help you surface your unique experiences and ideas.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose a theme for your personal statement:
          </label>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="input w-full max-w-md"
          >
            <option value="">Select a theme...</option>
            {themes.map(theme => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>

        <button
          onClick={generatePrompts}
          disabled={!selectedTheme || loading}
          className="btn-primary flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Generating...' : 'Generate Questions'}</span>
        </button>
      </div>

      {prompts.length > 0 && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Brainstorming Questions
            </h3>
            <button
              onClick={saveSession}
              className="btn-secondary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Session</span>
            </button>
          </div>

          <div className="space-y-6">
            {prompts.map((prompt, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Question {index + 1}:
                </h4>
                <p className="text-gray-700 mb-4">{prompt}</p>
                <textarea
                  placeholder="Write your response here..."
                  value={responses[prompt] || ''}
                  onChange={(e) => handleResponseChange(prompt, e.target.value)}
                  className="textarea"
                  rows={4}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Previous Sessions
          </h3>
          <div className="space-y-4">
            {data.map((session, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {session}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BrainstormingModule
