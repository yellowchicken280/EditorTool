import React, { useState } from 'react'
import { Edit3, Save, RotateCcw, CheckCircle } from 'lucide-react'
import { getGrammarSuggestions } from '../services/aiService'

interface Draft {
  content: string
  timestamp: Date
}

interface AIEditorProps {
  drafts: Draft[]
  onSaveDraft: (content: string) => void
}

const AIEditor: React.FC<AIEditorProps> = ({ drafts, onSaveDraft }) => {
  const [currentText, setCurrentText] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleGetSuggestions = async () => {
    if (!currentText.trim()) return

    setLoading(true)
    try {
      const result = await getGrammarSuggestions(currentText)
      setSuggestions(result)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error getting suggestions:', error)
      alert('Error getting suggestions. Please check your API key in settings.')
    } finally {
      setLoading(false)
    }
  }

  const applySuggestion = (suggestion: any) => {
    const newText = currentText.replace(suggestion.original, suggestion.suggestion)
    setCurrentText(newText)
    setSuggestions(prev => prev.filter(s => s !== suggestion))
  }

  const saveDraft = () => {
    if (currentText.trim()) {
      onSaveDraft(currentText)
      setCurrentText('')
      setSuggestions([])
      setShowSuggestions(false)
      alert('Draft saved successfully!')
    }
  }

  const loadDraft = (draft: Draft) => {
    setCurrentText(draft.content)
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Edit3 className="w-6 h-6 mr-2 text-green-500" />
          Ethical AI Editor
        </h2>
        <p className="text-gray-600 mb-6">
          Get grammar and style suggestions while maintaining strict ethical boundaries. 
          This tool only provides editing assistance, not content generation.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your essay text:
            </label>
            <textarea
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              placeholder="Paste your essay text here for grammar and style suggestions..."
              className="textarea min-h-[300px]"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleGetSuggestions}
              disabled={!currentText.trim() || loading}
              className="btn-primary"
            >
              {loading ? 'Analyzing...' : 'Get Suggestions'}
            </button>
            <button
              onClick={saveDraft}
              disabled={!currentText.trim()}
              className="btn-secondary"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </button>
          </div>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Grammar & Style Suggestions
          </h3>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium mb-1">
                    {suggestion.type}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="text-red-600 line-through">{suggestion.original}</span>
                    {' → '}
                    <span className="text-green-600 font-medium">{suggestion.suggestion}</span>
                  </p>
                  <p className="text-xs text-gray-600 mb-2">
                    {suggestion.explanation}
                  </p>
                  <button
                    onClick={() => applySuggestion(suggestion)}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Apply Suggestion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {drafts.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Saved Drafts
          </h3>
          <div className="space-y-3">
            {drafts.map((draft, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    Draft {index + 1}
                  </p>
                  <p className="text-xs text-gray-500">
                    {draft.timestamp.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {draft.content.substring(0, 100)}...
                  </p>
                </div>
                <button
                  onClick={() => loadDraft(draft)}
                  className="btn-secondary text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Load
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIEditor
