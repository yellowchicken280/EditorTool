import React, { useState } from 'react'
import { Upload, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { analyzePersonalVoice } from '../services/aiService'

interface VoiceAnalyzerProps {
  onAnalyze: (analysis: any) => void
}

const VoiceAnalyzer: React.FC<VoiceAnalyzerProps> = ({ onAnalyze }) => {
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      const result = await analyzePersonalVoice(text)
      setAnalysis(result)
      onAnalyze(result)
    } catch (error) {
      console.error('Error analyzing text:', error)
      alert('Error analyzing text. Please check your API key in settings.')
    } finally {
      setLoading(false)
    }
  }

  const getIssueIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Upload className="w-6 h-6 mr-2 text-blue-500" />
          Personal Voice Analyzer
        </h2>
        <p className="text-gray-600 mb-6">
          Upload your draft essay to analyze it for authenticity. We'll identify generic phrases, 
          clichés, and overly complex sentences that might sound machine-generated.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste your essay draft here:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your personal statement or essay draft here..."
              className="textarea min-h-[300px]"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            className="btn-primary"
          >
            {loading ? 'Analyzing...' : 'Analyze for Authenticity'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Analysis Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.authenticityScore}%
              </div>
              <div className="text-sm text-blue-700">Authenticity Score</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {analysis.issues.length}
              </div>
              <div className="text-sm text-yellow-700">Issues Found</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {analysis.suggestions.length}
              </div>
              <div className="text-sm text-green-700">Suggestions</div>
            </div>
          </div>

          {analysis.issues.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Issues to Address:</h4>
              <div className="space-y-3">
                {analysis.issues.map((issue: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    {getIssueIcon(issue.severity)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{issue.type}</p>
                      <p className="text-sm text-gray-700">{issue.description}</p>
                      {issue.example && (
                        <p className="text-xs text-gray-600 mt-1 italic">
                          Example: "{issue.example}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.suggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Suggestions for Improvement:</h4>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VoiceAnalyzer
