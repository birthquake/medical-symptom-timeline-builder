import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const DoctorIcon = ({ color = "#059669", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 7h.01M12 10v3" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ChecklistIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M9 11l3 3 8-8M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.91.37 4.15 1.02" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = ({ size = 16, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="12" y1="9" x2="12" y2="13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="12" y1="17" x2="12.01" y2="17" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const QuestionIcon = ({ size = 16, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle 
      cx="12" cy="12" r="10" 
      stroke={color} 
      strokeWidth="2"
    />
    <path 
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PrintIcon = ({ color = "white", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="6,9 6,2 18,2 18,9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="6" y="14" width="12" height="8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShareIcon = ({ color = "white", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const EmailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const DoctorVisitPrep = () => {
  const [visitData, setVisitData] = useState({
    lastVisitDate: '',
    nextVisitDate: '',
    concerns: [],
    questions: [],
    keyInsights: [],
    checkedItems: new Set()
  });
const [isGenerating, setIsGenerating] = useState(false);
const [isSharing, setIsSharing] = useState(false);
  
  useEffect(() => {
    // Load saved visit data
    const savedVisitData = localStorage.getItem('doctorVisitPrep');
    if (savedVisitData) {
      const parsed = JSON.parse(savedVisitData);
      setVisitData(prev => ({
        ...prev,
        ...parsed,
        checkedItems: new Set(parsed.checkedItems || [])
      }));
    }

    // Auto-generate insights from health data
    generateInsights();
  }, []);

  const generateInsights = () => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');

    const insights = [];
    const questions = [];
    const concerns = [];

    // Analyze symptoms for patterns
    if (symptoms.length > 0) {
      // Severity trends
      const recentSymptoms = symptoms.filter(s => {
        const symptomDate = new Date(s.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return symptomDate >= weekAgo;
      });

      const severeSymptoms = symptoms.filter(s => s.severity >= 7);
      if (severeSymptoms.length > 0) {
        concerns.push({
          type: 'severe',
          text: `${severeSymptoms.length} severe symptoms (7+ severity) recorded`,
          priority: 'high'
        });
        questions.push("Should I be concerned about the severe pain levels I've been experiencing?");
      }

      // Frequency patterns
      const symptomCounts = {};
      symptoms.forEach(symptom => {
        symptomCounts[symptom.name] = (symptomCounts[symptom.name] || 0) + 1;
      });

      const mostCommon = Object.entries(symptomCounts)
        .sort(([,a], [,b]) => b - a)[0];

      if (mostCommon && mostCommon[1] > 3) {
        insights.push({
          type: 'pattern',
          text: `${mostCommon[0]} occurs most frequently (${mostCommon[1]} times recorded)`
        });
        questions.push(`What could be causing my recurring ${mostCommon[0].toLowerCase()}?`);
      }

      // Recent changes
      if (recentSymptoms.length > 0) {
        const avgRecentSeverity = recentSymptoms.reduce((sum, s) => sum + s.severity, 0) / recentSymptoms.length;
        const allAvgSeverity = symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length;
        
        if (avgRecentSeverity > allAvgSeverity + 1) {
          concerns.push({
            type: 'worsening',
            text: 'Symptoms have been more severe than usual this past week',
            priority: 'medium'
          });
          questions.push("My symptoms seem to be getting worse lately - what should we investigate?");
        }
      }
    }

    // Analyze medication compliance
    if (medications.length > 0 && medicationLogs.length > 0) {
      const totalExpectedDoses = medications.reduce((sum, med) => {
        const daysSinceStarted = Math.ceil((new Date() - new Date(med.startDate)) / (1000 * 60 * 60 * 24));
        return sum + (daysSinceStarted * (med.frequency === 'daily' ? 1 : 
                     med.frequency === 'twice-daily' ? 2 : 
                     med.frequency === 'three-times' ? 3 : 1));
      }, 0);

      const complianceRate = medicationLogs.length / totalExpectedDoses;
      if (complianceRate < 0.8) {
        concerns.push({
          type: 'compliance',
          text: `Medication compliance may be below optimal (${Math.round(complianceRate * 100)}%)`,
          priority: 'medium'
        });
        questions.push("I've been having trouble taking my medications consistently - can we discuss strategies?");
      }

      insights.push({
        type: 'compliance',
        text: `Medication compliance rate: ${Math.round(complianceRate * 100)}%`
      });
    }

    // General questions based on data
    if (symptoms.length > 10) {
      questions.push("Based on my symptom patterns, are there any tests we should consider?");
    }

    if (symptoms.length === 0 && medications.length === 0) {
      insights.push({
        type: 'empty',
        text: 'Start tracking symptoms and medications to generate personalized visit preparation insights'
      });
    }

    setVisitData(prev => ({
      ...prev,
      concerns,
      questions: questions.slice(0, 6), // Limit to 6 questions
      keyInsights: insights
    }));
  };

  const saveVisitData = (newData) => {
    const dataToSave = {
      ...newData,
      checkedItems: Array.from(newData.checkedItems)
    };
    localStorage.setItem('doctorVisitPrep', JSON.stringify(dataToSave));
  };

  const handleDateChange = (field, value) => {
    const newData = { ...visitData, [field]: value };
    setVisitData(newData);
    saveVisitData(newData);
  };

  const toggleChecklistItem = (itemId) => {
    const newCheckedItems = new Set(visitData.checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    const newData = { ...visitData, checkedItems: newCheckedItems };
    setVisitData(newData);
    saveVisitData(newData);
  };

  const handlePrintPrep = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 500);
  };

  const getTimeFrameData = () => {
    if (!visitData.lastVisitDate) return null;
    
    const lastVisit = new Date(visitData.lastVisitDate);
    const today = new Date();
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');

    const sinceLastVisit = {
      symptoms: symptoms.filter(s => new Date(s.timestamp) > lastVisit),
      medicationLogs: medicationLogs.filter(m => new Date(m.timestamp) > lastVisit),
      daysSince: Math.ceil((today - lastVisit) / (1000 * 60 * 60 * 24))
    };

    return sinceLastVisit;
  };

  // Mobile sharing functions
const generateVisitPrepText = () => {
  const sinceLastVisit = getTimeFrameData();
  
  let prepText = `TrackRX Doctor Visit Preparation\n`;
  if (visitData.nextVisitDate) {
    prepText += `Appointment: ${visitData.nextVisitDate}\n`;
  }
  prepText += `Generated: ${new Date().toLocaleDateString()}\n\n`;
  
  // Since Last Visit Summary
  if (sinceLastVisit) {
    prepText += `SINCE LAST VISIT (${sinceLastVisit.daysSince} days ago):\n`;
    prepText += `• ${sinceLastVisit.symptoms.length} new symptoms logged\n`;
    prepText += `• ${sinceLastVisit.medicationLogs.length} medication doses taken\n`;
    if (sinceLastVisit.symptoms.length > 0) {
      const avgSeverity = (sinceLastVisit.symptoms.reduce((sum, s) => sum + s.severity, 0) / sinceLastVisit.symptoms.length).toFixed(1);
      prepText += `• Average symptom severity: ${avgSeverity}/10\n`;
    }
    prepText += `\n`;
  }
  
  if (visitData.concerns.length > 0) {
    prepText += `PRIORITY CONCERNS:\n`;
    visitData.concerns.forEach((concern, index) => {
      const priority = concern.priority === 'high' ? '🔴' : '🟡';
      prepText += `${priority} ${concern.text}\n`;
    });
    prepText += `\n`;
  }
  
  if (visitData.questions.length > 0) {
    prepText += `QUESTIONS TO DISCUSS:\n`;
    visitData.questions.forEach((question, index) => {
      prepText += `${index + 1}. ${question}\n`;
    });
    prepText += `\n`;
  }
  
  if (visitData.keyInsights.length > 0) {
    prepText += `KEY INSIGHTS FROM MY DATA:\n`;
    visitData.keyInsights.forEach((insight, index) => {
      prepText += `• ${insight.text}\n`;
    });
    prepText += `\n`;
  }
  
  const completedItems = Array.from(visitData.checkedItems).length;
  prepText += `PRE-VISIT CHECKLIST: ${completedItems}/7 items completed\n\n`;
  prepText += `Generated by TrackRX`;
  
  return prepText;
};

const handleShare = async () => {
  setIsSharing(true);
  const prepText = generateVisitPrepText();
  
  if (navigator.share && navigator.canShare({ text: prepText })) {
    try {
      await navigator.share({
        title: 'TrackRX Doctor Visit Preparation',
        text: prepText
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        await navigator.clipboard.writeText(prepText);
        alert('Visit preparation copied to clipboard!');
      }
    }
  } else {
    await navigator.clipboard.writeText(prepText);
    alert('Visit preparation copied to clipboard!');
  }
  
  setIsSharing(false);
};

const handleCopy = async () => {
  const prepText = generateVisitPrepText();
  await navigator.clipboard.writeText(prepText);
  alert('Visit preparation copied to clipboard!');
};

const handleEmailDraft = () => {
  const prepText = generateVisitPrepText();
  const subject = `Doctor Visit Preparation - ${visitData.nextVisitDate || 'Upcoming Appointment'}`;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(prepText)}`;
  window.location.href = mailtoLink;
};

  const sinceLastVisit = getTimeFrameData();

return (
  <div className="flex flex-col gap-6">      {/* Header */}
      {/* Streamlined Header */}
<div className="health-card">
  <div className="health-card-body">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-heading-1">Doctor Visit Prep</h2>
        <p className="text-body">Prepare for appointments with data-driven insights</p>
      </div>
      <button 
        className="btn btn-primary"
        onClick={handleShare}
        disabled={isSharing}
      >
        <ShareIcon />
        {isSharing ? 'Sharing...' : 'Share'}
      </button>
    </div>
    
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
          <DoctorIcon color="var(--success-600)" size={20} />
        </div>
        <div>
          <div className="text-body-small">Visit Preparation</div>
          <div className="text-lg font-bold text-metric">
            {visitData.nextVisitDate ? new Date(visitData.nextVisitDate).toLocaleDateString() : 'Not scheduled'}
          </div>
        </div>
      </div>
      <div className="h-8 w-px bg-slate-300"></div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-sm font-bold text-error-600">{visitData.concerns.length}</div>
          <div className="text-xs text-slate-600">Concerns</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-primary-600">{visitData.questions.length}</div>
          <div className="text-xs text-slate-600">Questions</div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Visit Dates Setup */}
     <div className="health-card">
  <div className="health-card-body">
       
        <h3 style={{ 
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Visit Information
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.875rem'
            }}>
              Last Visit Date:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={visitData.lastVisitDate}
                onChange={(e) => handleDateChange('lastVisitDate', e.target.value)}
                className="form-input pl-10"
              />
              <div style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <CalendarIcon />
              </div>
            </div>
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.875rem'
            }}>
              Next Visit Date:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={visitData.nextVisitDate}
                onChange={(e) => handleDateChange('nextVisitDate', e.target.value)}
                className="form-input pl-10"
                  
              />
              <div style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <CalendarIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Since Last Visit Summary
      {sinceLastVisit && (
        <div className="health-card">
  <div className="health-card-body">
        
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1E293B',
            margin: '0 0 1rem 0'
          }}>
            Since Your Last Visit ({sinceLastVisit.daysSince} days ago)
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
              borderRadius: '12px',
              border: '1px solid #FECACA'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: '#DC2626',
                margin: '0 0 0.25rem 0'
              }}>
                {sinceLastVisit.symptoms.length}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#991B1B',
                fontWeight: '600'
              }}>
                New Symptoms
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              borderRadius: '12px',
              border: '1px solid #BBF7D0'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: '#059669',
                margin: '0 0 0.25rem 0'
              }}>
                {sinceLastVisit.medicationLogs.length}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#047857',
                fontWeight: '600'
              }}>
                Medication Doses
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              borderRadius: '12px',
              border: '1px solid #FDE68A'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: '#D97706',
                margin: '0 0 0.25rem 0'
              }}>
                {sinceLastVisit.symptoms.length > 0 
                  ? (sinceLastVisit.symptoms.reduce((sum, s) => sum + s.severity, 0) / sinceLastVisit.symptoms.length).toFixed(1)
                  : '0'
                }
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#92400E',
                fontWeight: '600'
              }}>
                Avg Severity
              </div>
            </div>
          </div>
        </div>
      )}
*/
      {/* Concerns to Discuss */}
      {visitData.concerns.length > 0 && (
    <div className="health-card">
  <div className="health-card-body">
        
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertIcon />
            <h3 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#DC2626',
              margin: 0
            }}>
              Priority Concerns
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visitData.concerns.map((concern, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: concern.priority === 'high' ? '#FEF2F2' : '#FFFBEB',
                borderRadius: '8px',
                border: `1px solid ${concern.priority === 'high' ? '#FECACA' : '#FED7AA'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: concern.priority === 'high' ? '#DC2626' : '#F59E0B',
                  borderRadius: '50%',
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  color: concern.priority === 'high' ? '#991B1B' : '#92400E',
                  fontWeight: '500'
                }}>
                  {concern.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Questions to Ask */}
     <div className="health-card">
  <div className="health-card-body">
       
       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <QuestionIcon />
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1E293B',
            margin: 0
          }}>
            Questions to Ask Your Doctor
          </h3>
        </div>

        {visitData.questions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visitData.questions.map((question, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '8px',
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    {index + 1}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#1E40AF',
                  lineHeight: '1.5'
                }}>
                  {question}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#64748B',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Track symptoms and medications to generate personalized questions for your doctor
            </p>
          </div>
        )}
      </div>

      {/* Pre-Visit Checklist */}
   <div className="health-card">
  <div className="health-card-body">
     
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <ChecklistIcon />
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1E293B',
            margin: 0
          }}>
            Pre-Visit Checklist
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'Print or prepare your symptom timeline',
            'Bring current medication list',
            'Prepare your questions (see above)',
            'Bring insurance cards and ID',
            'List any changes since last visit',
            'Note any side effects from medications',
            'Prepare to discuss treatment goals'
          ].map((item, index) => {
            const itemId = `checklist-${index}`;
            const isChecked = visitData.checkedItems.has(itemId);
            
            return (
              <label key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: isChecked ? '#F0FDF4' : '#F8FAFC',
                borderRadius: '8px',
                border: `1px solid ${isChecked ? '#BBF7D0' : '#E2E8F0'}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isChecked) e.target.style.backgroundColor = '#F1F5F9';
              }}
              onMouseLeave={(e) => {
                if (!isChecked) e.target.style.backgroundColor = '#F8FAFC';
              }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleChecklistItem(itemId)}
                  style={{ 
                    transform: 'scale(1.2)',
                    accentColor: '#059669'
                  }}
                />
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: isChecked ? '#166534' : '#374151',
                  flex: 1,
                  textDecoration: isChecked ? 'line-through' : 'none'
                }}>
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      {visitData.keyInsights.length > 0 && (
        <div className="health-card">
  <div className="health-card-body">
        
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1E293B',
            margin: '0 0 1rem 0'
          }}>
            Key Insights from Your Data
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {visitData.keyInsights.map((insight, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '50%',
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  lineHeight: '1.5'
                }}>
                  {insight.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Print Button */}
     <div className="health-card">
  <div className="health-card-body">
       
        <button
          onClick={handlePrintPrep}
          disabled={isGenerating}
          style={{
            width: '100%',
            backgroundColor: isGenerating ? '#9CA3AF' : '#059669',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            opacity: isGenerating ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
          }}
          onMouseEnter={(e) => {
            if (!isGenerating) {
              e.target.style.backgroundColor = '#047857';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.35)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isGenerating) {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.25)';
            }
          }}
        >
          <PrintIcon />
          {isGenerating ? 'Generating Visit Prep...' : 'Print Visit Preparation Sheet'}
        </button>

        <p style={{
          margin: '1rem 0 0 0',
          fontSize: '0.75rem',
          color: '#64748B',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          This generates a doctor-friendly summary of your concerns, questions, and health patterns
        </p>
      </div>
    </div>
  </div>
  );
};

export default DoctorVisitPrep;
