import React, { useState, useEffect } from 'react'
import { Settings, Key, Save, AlertCircle, CheckCircle } from 'lucide-react'

const SettingsPanel: React.FC = () => {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim())
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key')
    setApiKey('')
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-500" />
          Settings
        </h2>
        <p className="text-gray-600 mb-6">
          Configure your API keys and application settings.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Gemini API Key
            </label>
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="input"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleClear}
                className="btn-secondary"
              >
                Clear
              </button>
            </div>
            {saved && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                API key saved successfully!
              </p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">
                  How to get your Google Gemini API Key:
                </h3>
                <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                  <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aistudio.google.com/app/apikey</a></li>
                  <li>Sign in with your Google account</li>
                  <li>Click "Create API Key"</li>
                  <li>Copy the key (starts with "AIza")</li>
                  <li>Paste it above and click Save</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">
              About AdmitEthos
            </h3>
            <p className="text-sm text-blue-700 mb-3">
              AdmitEthos is designed to help you write authentic personal statements while maintaining 
              strict ethical boundaries around AI usage.
            </p>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>What it does:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Generates brainstorming questions (not content)</li>
                <li>Analyzes your writing for authenticity</li>
                <li>Provides grammar and style suggestions</li>
                <li>Creates audit trails for your writing process</li>
              </ul>
              <p className="mt-2"><strong>What it doesn't do:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Generate essay content or ideas</li>
                <li>Write sentences or paragraphs for you</li>
                <li>Replace your personal voice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
