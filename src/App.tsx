import React, { useState } from 'react'
import { Brain, FileText, Edit3, Download, Settings } from 'lucide-react'
import BrainstormingModule from './components/BrainstormingModule'
import VoiceAnalyzer from './components/VoiceAnalyzer'
import AIEditor from './components/AIEditor'
import OriginalityReport from './components/OriginalityReport'
import SettingsPanel from './components/SettingsPanel'

type Tab = 'brainstorming' | 'analyzer' | 'editor' | 'report' | 'settings'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('brainstorming')
  const [projectData, setProjectData] = useState({
    title: 'My Personal Statement',
    brainstorming: [] as string[],
    drafts: [] as { content: string; timestamp: Date }[],
    analysis: null as any
  })

  const tabs = [
    { id: 'brainstorming' as Tab, label: 'Brainstorming', icon: Brain },
    { id: 'analyzer' as Tab, label: 'Voice Analyzer', icon: FileText },
    { id: 'editor' as Tab, label: 'AI Editor', icon: Edit3 },
    { id: 'report' as Tab, label: 'Originality Report', icon: Download },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">AdmitEthos</h1>
              <span className="ml-2 text-sm text-gray-500">Authentic Writing Assistant</span>
            </div>
            <div className="text-sm text-gray-500">
              Project: {projectData.title}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'brainstorming' && (
          <BrainstormingModule 
            data={projectData.brainstorming}
            onUpdate={(data) => setProjectData(prev => ({ ...prev, brainstorming: data }))}
          />
        )}
        {activeTab === 'analyzer' && (
          <VoiceAnalyzer 
            onAnalyze={(analysis) => setProjectData(prev => ({ ...prev, analysis }))}
          />
        )}
        {activeTab === 'editor' && (
          <AIEditor 
            drafts={projectData.drafts}
            onSaveDraft={(draft) => setProjectData(prev => ({ 
              ...prev, 
              drafts: [...prev.drafts, { content: draft, timestamp: new Date() }]
            }))}
          />
        )}
        {activeTab === 'report' && (
          <OriginalityReport 
            projectData={projectData}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsPanel />
        )}
      </main>
    </div>
  )
}

export default App
