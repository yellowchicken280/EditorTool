import React, { useState } from 'react'
import { Download, FileText, Calendar, CheckCircle } from 'lucide-react'
import { generatePDFReport } from '../services/pdfService'

interface ProjectData {
  title: string
  brainstorming: string[]
  drafts: { content: string; timestamp: Date }[]
  analysis: any
}

interface OriginalityReportProps {
  projectData: ProjectData
}

const OriginalityReport: React.FC<OriginalityReportProps> = ({ projectData }) => {
  const [generating, setGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setGenerating(true)
    try {
      await generatePDFReport(projectData)
      alert('Report generated and downloaded successfully!')
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Error generating report. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const getProjectStats = () => {
    return {
      brainstormingSessions: projectData.brainstorming.length,
      totalDrafts: projectData.drafts.length,
      lastActivity: projectData.drafts.length > 0 
        ? projectData.drafts[projectData.drafts.length - 1].timestamp
        : new Date(),
      hasAnalysis: !!projectData.analysis
    }
  }

  const stats = getProjectStats()

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-purple-500" />
          Originality Report Generator
        </h2>
        <p className="text-gray-600 mb-6">
          Generate a comprehensive PDF report documenting your writing process, 
          including brainstorming sessions, draft history, and AI usage certification.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">What's included in your report:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Complete brainstorming session logs</li>
            <li>• Version history of all drafts</li>
            <li>• AI assistance summary and certification</li>
            <li>• Authenticity analysis results (if available)</li>
            <li>• Project timeline and metadata</li>
          </ul>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="btn-primary flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>{generating ? 'Generating...' : 'Generate & Download Report'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Brainstorming Sessions:</span>
              <span className="font-medium">{stats.brainstormingSessions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Drafts:</span>
              <span className="font-medium">{stats.totalDrafts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Activity:</span>
              <span className="font-medium text-sm">
                {stats.lastActivity.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Voice Analysis:</span>
              <span className="font-medium">
                {stats.hasAnalysis ? 'Completed' : 'Not performed'}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ethical AI Usage
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">No content generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Only brainstorming prompts</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Grammar/style assistance only</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">Full audit trail maintained</span>
            </div>
          </div>
        </div>
      </div>

      {projectData.brainstorming.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Brainstorming Sessions Summary
          </h3>
          <div className="space-y-3">
            {projectData.brainstorming.map((session, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Session {index + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {session.substring(0, 200)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projectData.drafts.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Draft History
          </h3>
          <div className="space-y-3">
            {projectData.drafts.map((draft, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Draft {index + 1}
                  </span>
                  <span className="text-xs text-gray-500">
                    {draft.timestamp.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {draft.content.length} characters
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OriginalityReport
