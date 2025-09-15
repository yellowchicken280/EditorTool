import jsPDF from 'jspdf'

interface ProjectData {
  title: string
  brainstorming: string[]
  drafts: { content: string; timestamp: Date }[]
  analysis: any
}

export const generatePDFReport = async (projectData: ProjectData): Promise<void> => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  let yPosition = margin

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize)
    if (isBold) {
      doc.setFont(undefined, 'bold')
    } else {
      doc.setFont(undefined, 'normal')
    }
    
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin)
    doc.text(lines, margin, yPosition)
    yPosition += lines.length * (fontSize * 0.4) + 5
  }

  // Helper function to check if we need a new page
  const checkNewPage = () => {
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage()
      yPosition = margin
    }
  }

  // Title
  addText('AdmitEthos Originality Report', 20, true)
  addText(`Project: ${projectData.title}`, 14, true)
  addText(`Generated: ${new Date().toLocaleString()}`, 12)
  addText('', 12)
  
  // Ethical AI Usage Certification
  addText('ETHICAL AI USAGE CERTIFICATION', 16, true)
  addText('This report certifies that the writing process documented below used AI assistance only for:', 12)
  addText('• Generating brainstorming questions and prompts', 12)
  addText('• Analyzing text for authenticity and personal voice', 12)
  addText('• Providing grammar and style suggestions', 12)
  addText('• Creating this audit trail report', 12)
  addText('', 12)
  addText('NO AI was used to generate substantive content, ideas, or replace the author\'s personal voice.', 12, true)
  addText('', 12)

  checkNewPage()

  // Project Statistics
  addText('PROJECT STATISTICS', 16, true)
  addText(`Total Brainstorming Sessions: ${projectData.brainstorming.length}`, 12)
  addText(`Total Drafts Created: ${projectData.drafts.length}`, 12)
  addText(`Voice Analysis Performed: ${projectData.analysis ? 'Yes' : 'No'}`, 12)
  if (projectData.analysis) {
    addText(`Authenticity Score: ${projectData.analysis.authenticityScore}%`, 12)
  }
  addText('', 12)

  checkNewPage()

  // Brainstorming Sessions
  if (projectData.brainstorming.length > 0) {
    addText('BRAINSTORMING SESSIONS', 16, true)
    projectData.brainstorming.forEach((session, index) => {
      addText(`Session ${index + 1}:`, 14, true)
      addText(session, 12)
      addText('', 12)
      checkNewPage()
    })
  }

  // Draft History
  if (projectData.drafts.length > 0) {
    addText('DRAFT HISTORY', 16, true)
    projectData.drafts.forEach((draft, index) => {
      addText(`Draft ${index + 1} - ${draft.timestamp.toLocaleString()}:`, 14, true)
      addText(`Length: ${draft.content.length} characters`, 12)
      addText('Content Preview:', 12, true)
      addText(draft.content.substring(0, 500) + (draft.content.length > 500 ? '...' : ''), 12)
      addText('', 12)
      checkNewPage()
    })
  }

  // Voice Analysis Results
  if (projectData.analysis) {
    addText('VOICE ANALYSIS RESULTS', 16, true)
    addText(`Authenticity Score: ${projectData.analysis.authenticityScore}%`, 12, true)
    addText('', 12)
    
    if (projectData.analysis.issues && projectData.analysis.issues.length > 0) {
      addText('Issues Identified:', 14, true)
      projectData.analysis.issues.forEach((issue: any, index: number) => {
        addText(`${index + 1}. ${issue.type} (${issue.severity}): ${issue.description}`, 12)
        if (issue.example) {
          addText(`   Example: "${issue.example}"`, 12)
        }
        addText('', 12)
      })
    }

    if (projectData.analysis.suggestions && projectData.analysis.suggestions.length > 0) {
      addText('Suggestions for Improvement:', 14, true)
      projectData.analysis.suggestions.forEach((suggestion: string, index: number) => {
        addText(`${index + 1}. ${suggestion}`, 12)
      })
      addText('', 12)
    }
  }

  // Footer
  checkNewPage()
  addText('', 12)
  addText('--- END OF REPORT ---', 12, true)
  addText('', 12)
  addText('This report serves as documentation of the authentic writing process used to create the personal statement.', 12)
  addText('All AI assistance was used ethically and in accordance with academic integrity guidelines.', 12)

  // Save the PDF
  doc.save(`admitethos-report-${projectData.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`)
}
