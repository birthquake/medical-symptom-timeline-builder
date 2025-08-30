import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const ReportsIcon = ({ color = "#8B5CF6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <polyline 
      points="14,2 14,8 20,8" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="16" y1="13" x2="8" y2="13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="16" y1="17" x2="8" y2="17" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const TrendsIcon = ({ color = "#8B5CF6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline 
      points="22,12 18,12 15,21 9,3 6,12 2,12" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = ({ color = "white", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopyIcon = ({ color = "#64748B", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EmailIcon = ({ color = "#64748B", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const ChartIcon = ({ size = 16, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ size = 16, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Reports = () => {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'insights'
  const [reportData, setReportData] = useState({
    symptoms: [],
    medications: [],
    medicationLogs: []
  });
  const [reportSettings, setReportSettings] = useState({
    startDate: '',
    endDate: '',
    includeSymptoms: true,
    includeMedications: true,
    includeStatistics: true
  });
  const [insights, setInsights] = useState({
    dayPatterns: [],
    timePatterns: [],
    severityTrends: [],
    symptomClusters: [],
    keyFindings: [],
    dataQuality: { symptoms: 0, days: 0, medications: 0 }
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [isSharing, setIsSharing] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');
    
    setReportData({ symptoms, medications, medicationLogs });

    // Set default date range (last 30 days inclusive)
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    
    setReportSettings(prev => ({
      ...prev,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate
    }));
  }, []);

  // Generate trend analysis when insights tab is active
  useEffect(() => {
    if (activeTab === 'insights') {
      generateTrendAnalysis();
    }
  }, [activeTab, selectedTimeframe, reportData]);

  // Filter data based on date range
  const getFilteredData = () => {
    const start = new Date(reportSettings.startDate);
    const end = new Date(reportSettings.endDate);
    end.setHours(23, 59, 59, 999);

    const filteredSymptoms = reportData.symptoms.filter(symptom => {
      const symptomDate = new Date(symptom.timestamp);
      return symptomDate >= start && symptomDate <= end;
    });

    const filteredMedicationLogs = reportData.medicationLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= start && logDate <= end;
    });

    return { symptoms: filteredSymptoms, medicationLogs: filteredMedicationLogs };
  };

  // Generate statistics for summary report
  const generateStatistics = (symptoms, medicationLogs) => {
    const uniqueDates = new Set();
    symptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp).toISOString().split('T')[0];
      uniqueDates.add(date);
    });
    medicationLogs.forEach(log => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      uniqueDates.add(date);
    });
    const actualDaysWithData = uniqueDates.size;

    const stats = {
      totalSymptoms: symptoms.length,
      totalMedicationDoses: medicationLogs.length,
      actualDaysTracked: actualDaysWithData,
      avgSeverity: symptoms.length > 0 
        ? (symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length).toFixed(1)
        : 0,
      mostCommonSymptom: '',
      mostTakenMedication: '',
      severityBreakdown: { mild: 0, moderate: 0, severe: 0 },
      dailyAverages: {
        symptomsPerDay: 0,
        medicationsPerDay: 0
      }
    };

    symptoms.forEach(symptom => {
      if (symptom.severity <= 3) stats.severityBreakdown.mild++;
      else if (symptom.severity <= 6) stats.severityBreakdown.moderate++;
      else stats.severityBreakdown.severe++;
    });

    const symptomCounts = {};
    symptoms.forEach(symptom => {
      symptomCounts[symptom.name] = (symptomCounts[symptom.name] || 0) + 1;
    });
    stats.mostCommonSymptom = Object.keys(symptomCounts).reduce((a, b) => 
      symptomCounts[a] > symptomCounts[b] ? a : b, '') || 'None';

    const medicationCounts = {};
    medicationLogs.forEach(log => {
      medicationCounts[log.medicationName] = (medicationCounts[log.medicationName] || 0) + 1;
    });
    stats.mostTakenMedication = Object.keys(medicationCounts).reduce((a, b) => 
      medicationCounts[a] > medicationCounts[b] ? a : b, '') || 'None';

    const daysForAverages = actualDaysWithData > 0 ? actualDaysWithData : 1;
    stats.dailyAverages.symptomsPerDay = (symptoms.length / daysForAverages).toFixed(1);
    stats.dailyAverages.medicationsPerDay = (medicationLogs.length / daysForAverages).toFixed(1);

    return stats;
  };

  // Generate trend analysis for insights tab
  const generateTrendAnalysis = () => {
    const symptoms = reportData.symptoms;
    if (symptoms.length < 3) {
      setInsights(prev => ({
        ...prev,
        dataQuality: { symptoms: symptoms.length, days: 0, medications: reportData.medications.length },
        keyFindings: ['Track more symptoms to generate meaningful patterns and insights']
      }));
      return;
    }

    // Filter by timeframe for insights
    const now = new Date();
    const cutoffDate = new Date();
    switch (selectedTimeframe) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case 'quarter':
        cutoffDate.setDate(now.getDate() - 90);
        break;
      default:
        cutoffDate.setDate(now.getDate() - 30);
    }

    const filteredSymptoms = symptoms.filter(s => new Date(s.timestamp) >= cutoffDate);
    const uniqueDates = new Set(filteredSymptoms.map(s => new Date(s.timestamp).toDateString()));

    // Analyze day patterns
    const dayPatterns = analyzeDayPatterns(filteredSymptoms);
    const timePatterns = analyzeTimePatterns(filteredSymptoms);
    const keyFindings = generateKeyFindings(dayPatterns, timePatterns);

    setInsights({
      dayPatterns,
      timePatterns,
      severityTrends: [],
      symptomClusters: [],
      keyFindings,
      dataQuality: {
        symptoms: filteredSymptoms.length,
        days: uniqueDates.size,
        medications: reportData.medications.length
      }
    });
  };

  const analyzeDayPatterns = (symptoms) => {
    if (symptoms.length < 5) return [];

    const dayMap = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    dayNames.forEach(day => {
      dayMap[day] = { count: 0, totalSeverity: 0 };
    });

    symptoms.forEach(symptom => {
      const day = dayNames[new Date(symptom.timestamp).getDay()];
      dayMap[day].count++;
      dayMap[day].totalSeverity += symptom.severity;
    });

    const patterns = [];
    const avgCount = symptoms.length / 7;
    
    Object.entries(dayMap).forEach(([day, data]) => {
      if (data.count > avgCount * 1.5 && data.count >= 3) {
        patterns.push({
          type: 'high_frequency',
          day,
          count: data.count,
          avgSeverity: (data.totalSeverity / data.count).toFixed(1),
          insight: `${day}s show ${Math.round((data.count / avgCount - 1) * 100)}% more symptoms than average`
        });
      }
    });

    return patterns.sort((a, b) => b.count - a.count);
  };

  const analyzeTimePatterns = (symptoms) => {
    if (symptoms.length < 5) return [];

    const periods = {
      'Early Morning (5-8 AM)': [5, 6, 7, 8],
      'Morning (9 AM-12 PM)': [9, 10, 11, 12],
      'Afternoon (1-5 PM)': [13, 14, 15, 16, 17],
      'Evening (6-9 PM)': [18, 19, 20, 21],
      'Night (10 PM-4 AM)': [22, 23, 0, 1, 2, 3, 4]
    };

    const hourMap = {};
    for (let i = 0; i < 24; i++) {
      hourMap[i] = { count: 0, totalSeverity: 0 };
    }

    symptoms.forEach(symptom => {
      const hour = new Date(symptom.timestamp).getHours();
      hourMap[hour].count++;
      hourMap[hour].totalSeverity += symptom.severity;
    });

    const patterns = [];
    Object.entries(periods).forEach(([period, hours]) => {
      const periodData = hours.reduce((sum, hour) => ({
        count: sum.count + hourMap[hour].count,
        totalSeverity: sum.totalSeverity + hourMap[hour].totalSeverity
      }), { count: 0, totalSeverity: 0 });

      if (periodData.count >= 3) {
        patterns.push({
          period,
          count: periodData.count,
          avgSeverity: (periodData.totalSeverity / periodData.count).toFixed(1),
          percentage: Math.round((periodData.count / symptoms.length) * 100)
        });
      }
    });

    return patterns.sort((a, b) => b.count - a.count);
  };

  const generateKeyFindings = (dayPatterns, timePatterns) => {
    const findings = [];

    if (dayPatterns.length > 0) {
      const topDay = dayPatterns[0];
      findings.push(`Symptoms occur most frequently on ${topDay.day}s (${topDay.count} occurrences)`);
    }

    if (timePatterns.length > 0) {
      const topTime = timePatterns[0];
      findings.push(`${topTime.percentage}% of symptoms occur during ${topTime.period.toLowerCase()}`);
    }

    if (findings.length === 0) {
      findings.push('Continue tracking to identify meaningful health patterns');
    }

    return findings.slice(0, 5);
  };

  // Mobile sharing functions
  const generateReportText = () => {
    const filtered = getFilteredData();
    const statistics = generateStatistics(filtered.symptoms, filtered.medicationLogs);
    
    let reportText = `TrackRX Health Summary\n`;
    reportText += `Period: ${reportSettings.startDate} to ${reportSettings.endDate}\n\n`;
    
    reportText += `SUMMARY:\n`;
    reportText += `• ${statistics.totalSymptoms} symptoms logged\n`;
    reportText += `• ${statistics.totalMedicationDoses} medication doses taken\n`;
    reportText += `• ${statistics.actualDaysTracked} days tracked\n`;
    reportText += `• Average severity: ${statistics.avgSeverity}/10\n\n`;
    
    if (statistics.mostCommonSymptom !== 'None') {
      reportText += `PATTERNS:\n`;
      reportText += `• Most common symptom: ${statistics.mostCommonSymptom}\n`;
      reportText += `• Most taken medication: ${statistics.mostTakenMedication}\n\n`;
    }
    
    if (activeTab === 'insights' && insights.keyFindings.length > 0) {
      reportText += `KEY INSIGHTS:\n`;
      insights.keyFindings.forEach((finding, index) => {
        reportText += `${index + 1}. ${finding}\n`;
      });
      reportText += `\n`;
    }
    
    reportText += `Generated by TrackRX - This is not medical advice. Discuss with your healthcare provider.`;
    
    return reportText;
  };

  const handleShare = async () => {
    setIsSharing(true);
    const reportText = generateReportText();
    
    if (navigator.share && navigator.canShare({ text: reportText })) {
      try {
        await navigator.share({
          title: 'TrackRX Health Report',
          text: reportText
        });
      } catch (err) {
        // Fallback to clipboard if share is cancelled
        if (err.name !== 'AbortError') {
          await navigator.clipboard.writeText(reportText);
          alert('Report copied to clipboard!');
        }
      }
    } else {
      // Fallback for browsers without Web Share API
      await navigator.clipboard.writeText(reportText);
      alert('Report copied to clipboard!');
    }
    
    setIsSharing(false);
  };

  const handleCopy = async () => {
    const reportText = generateReportText();
    await navigator.clipboard.writeText(reportText);
    alert('Report copied to clipboard!');
  };

  const handleEmailDraft = () => {
    const reportText = generateReportText();
    const subject = `TrackRX Health Report - ${reportSettings.startDate} to ${reportSettings.endDate}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(reportText)}`;
    window.location.href = mailtoLink;
  };

  const getSeverityColor = (severity) => {
    if (severity <= 3) return '#10B981';
    if (severity <= 6) return '#F59E0B'; 
    return '#EF4444';
  };

  const filtered = getFilteredData();
  const statistics = generateStatistics(filtered.symptoms, filtered.medicationLogs);

  const getTimeframeName = () => {
    switch (selectedTimeframe) {
      case 'week': return 'Past Week';
      case 'month': return 'Past Month';
      case 'quarter': return 'Past 3 Months';
      default: return 'Past Month';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#8B5CF6',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {activeTab === 'summary' ? <ReportsIcon color="#FFFFFF" size={24} /> : <TrendsIcon color="#FFFFFF" size={24} />}
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0'
            }}>
              Health Reports & Insights
            </h2>
            <p style={{ 
              color: '#64748B', 
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              Generate summaries and discover patterns for your healthcare provider
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          backgroundColor: '#F8FAFC',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
        }}>
          <button
            onClick={() => setActiveTab('summary')}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              backgroundColor: activeTab === 'summary' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'summary' ? 'white' : '#64748B',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <ReportsIcon color={activeTab === 'summary' ? 'white' : '#64748B'} size={16} />
            Summary Report
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              backgroundColor: activeTab === 'insights' ? '#8B5CF6' : 'transparent',
              color: activeTab === 'insights' ? 'white' : '#64748B',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <TrendsIcon color={activeTab === 'insights' ? 'white' : '#64748B'} size={16} />
            Pattern Insights
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'summary' ? (
        <>
          {/* Report Settings */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1E293B',
              margin: '0 0 1rem 0'
            }}>
              Report Settings
            </h3>
            
            {/* Date Range */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '0.875rem'
                }}>
                  Start Date:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    value={reportSettings.startDate}
                    onChange={(e) => setReportSettings(prev => ({ ...prev, startDate: e.target.value }))}
                    style={{
                      width: 'calc(100% - 1.5rem)',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      backgroundColor: '#FAFAFA',
                      boxSizing: 'border-box'
                    }}
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
                  End Date:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    value={reportSettings.endDate}
                    onChange={(e) => setReportSettings(prev => ({ ...prev, endDate: e.target.value }))}
                    style={{
                      width: 'calc(100% - 1.5rem)',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      backgroundColor: '#FAFAFA',
                      boxSizing: 'border-box'
                    }}
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

            {/* Include Options */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Include in Report:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { key: 'includeSymptoms', label: 'Symptoms & Severity Levels' },
                  { key: 'includeMedications', label: 'Current Medications' },
                  { key: 'includeStatistics', label: 'Summary Statistics' }
                ].map(option => (
                  <label key={option.key} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#F8FAFC'}
                  >
                    <input
                      type="checkbox"
                      checked={reportSettings[option.key]}
                      onChange={(e) => setReportSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                      style={{ 
                        transform: 'scale(1.2)',
                        accentColor: '#3B82F6'
                      }}
                    />
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151',
                      flex: 1
                    }}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Statistics */}
          {reportSettings.includeStatistics && (filtered.symptoms.length > 0 || filtered.medicationLogs.length > 0) && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ChartIcon />
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1E293B',
                  margin: 0
                }}>
                  Report Preview
                </h3>
              </div>

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '1.25rem 1rem',
                  background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                  borderRadius: '12px',
                  border: '1px solid #FECACA',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#DC2626',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {statistics.totalSymptoms}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#991B1B',
                    fontWeight: '600'
                  }}>
                    Total Symptoms
                  </div>
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '1.25rem 1rem',
                  background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                  borderRadius: '12px',
                  border: '1px solid #BBF7D0',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#059669',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {statistics.totalMedicationDoses}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#047857',
                    fontWeight: '600'
                  }}>
                    Med Doses Taken
                  </div>
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '1.25rem 1rem',
                  background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                  borderRadius: '12px',
                  border: '1px solid #FDE68A',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: getSeverityColor(parseFloat(statistics.avgSeverity)),
                    margin: '0 0 0.25rem 0'
                  }}>
                    {statistics.avgSeverity}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#92400E',
                    fontWeight: '600'
                  }}>
                    Avg Severity
                  </div>
                </div>

                <div style={{
                  textAlign: 'center',
                  padding: '1.25rem 1rem',
                  background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                  borderRadius: '12px',
                  border: '1px solid #BFDBFE',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#1E40AF',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {statistics.actualDaysTracked}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#1E40AF',
                    fontWeight: '600'
                  }}>
                    Days Tracked
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid #E2E8F0'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 0.75rem 0'
                }}>
                  Key Insights for Your Doctor:
                </h4>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: '#4B5563', 
                  lineHeight: '1.6',
                  display: 'grid',
                  gap: '0.5rem'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#DC2626',
                      borderRadius: '50%'
                    }} />
                    Most common symptom: <strong style={{ color: '#DC2626' }}>{statistics.mostCommonSymptom}</strong>
                  </div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#059669',
                      borderRadius: '50%'
                    }} />
                    Most taken medication: <strong style={{ color: '#059669' }}>{statistics.mostTakenMedication}</strong>
                  </div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#3B82F6',
                      borderRadius: '50%'
                    }} />
                    Daily averages: <strong>{statistics.dailyAverages.symptomsPerDay}</strong> symptoms, <strong>{statistics.dailyAverages.medicationsPerDay}</strong> medications per day
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Insights Content */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1E293B',
              margin: '0 0 1rem 0'
            }}>
              Analysis Period - {getTimeframeName()}
            </h3>

            {/* Timeframe Selector */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: '#F8FAFC',
              padding: '0.25rem',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              marginBottom: '1.5rem'
            }}>
              {['week', 'month', 'quarter'].map(timeframe => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    border: 'none',
                    backgroundColor: selectedTimeframe === timeframe ? '#8B5CF6' : 'transparent',
                    color: selectedTimeframe === timeframe ? 'white' : '#64748B',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {timeframe === 'week' ? '7 Days' : timeframe === 'month' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>

            {/* Data Quality Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#FEF2F2',
                borderRadius: '12px',
                border: '1px solid #FECACA'
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: '#DC2626',
                  margin: '0 0 0.25rem 0'
                }}>
                  {insights.dataQuality.symptoms}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#991B1B',
                  fontWeight: '600'
                }}>
                  Symptoms Tracked
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '12px',
                border: '1px solid #BFDBFE'
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: '#1E40AF',
                  margin: '0 0 0.25rem 0'
                }}>
                  {insights.dataQuality.days}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#1E40AF',
                  fontWeight: '600'
                }}>
                  Active Days
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: '#F0FDF4',
                borderRadius: '12px',
                border: '1px solid #BBF7D0'
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: '#059669',
                  margin: '0 0 0.25rem 0'
                }}>
                  {insights.dataQuality.medications}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#047857',
                  fontWeight: '600'
                }}>
                  Medications
                </div>
              </div>
            </div>

            {/* Key Findings */}
            <div style={{
              backgroundColor: '#FAF5FF',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid #D8B4FE'
            }}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#581C87',
                margin: '0 0 0.75rem 0'
              }}>
                Key Insights:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {insights.keyFindings.map((finding, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      backgroundColor: '#8B5CF6',
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
                      color: '#581C87',
                      lineHeight: '1.5',
                      fontWeight: '500'
                    }}>
                      {finding}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Day Patterns */}
          {insights.dayPatterns.length > 0 && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <CalendarIcon color="#059669" />
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1E293B',
                  margin: 0
                }}>
                  Day-of-Week Patterns
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {insights.dayPatterns.map((pattern, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    backgroundColor: '#F0FDF4',
                    borderRadius: '8px',
                    border: '1px solid #BBF7D0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#166534',
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {pattern.day}s
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#15803D'
                      }}>
                        {pattern.insight}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: '#059669'
                      }}>
                        {pattern.count}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#059669'
                      }}>
                        avg {pattern.avgSeverity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Patterns */}
          {insights.timePatterns.length > 0 && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <ClockIcon />
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1E293B',
                  margin: 0
                }}>
                  Time-of-Day Patterns
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {insights.timePatterns.map((pattern, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    backgroundColor: '#EFF6FF',
                    borderRadius: '8px',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#1E40AF',
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {pattern.period}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#2563EB'
                      }}>
                        Average severity: {pattern.avgSeverity}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: '#3B82F6'
                      }}>
                        {pattern.percentage}%
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#3B82F6'
                      }}>
                        of symptoms
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Mobile-First Sharing Actions */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Share with Your Doctor
        </h3>

        {/* Primary Share Button */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          style={{
            width: '100%',
            backgroundColor: isSharing ? '#9CA3AF' : '#3B82F6',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSharing ? 'not-allowed' : 'pointer',
            opacity: isSharing ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
            marginBottom: '1rem'
          }}
          onMouseEnter={(e) => {
            if (!isSharing) {
              e.target.style.backgroundColor = '#2563EB';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.35)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSharing) {
              e.target.style.backgroundColor = '#3B82F6';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.25)';
            }
          }}
        >
          <ShareIcon />
          {isSharing ? 'Preparing...' : 'Share Report'}
        </button>

        {/* Alternative Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '0.75rem',
              border: '1px solid #D1D5DB',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F9FAFB';
              e.target.style.borderColor = '#9CA3AF';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#D1D5DB';
            }}
          >
            <CopyIcon />
            Copy Text
          </button>

          <button
            onClick={handleEmailDraft}
            style={{
              padding: '0.75rem',
              border: '1px solid #D1D5DB',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F9FAFB';
              e.target.style.borderColor = '#9CA3AF';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#D1D5DB';
            }}
          >
            <EmailIcon />
            Email Draft
          </button>
        </div>

        <p style={{
          margin: '1rem 0 0 0',
          fontSize: '0.75rem',
          color: '#64748B',
          textAlign: 'center',
          lineHeight: '1.4'
        }}>
          Share generates a text summary perfect for messaging, email, or notes apps
        </p>
      </div>

      {/* Empty State */}
      {filtered.symptoms.length === 0 && filtered.medicationLogs.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem 1rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#F3F4F6',
            borderRadius: '32px',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ChartIcon size={32} color="#9CA3AF" />
          </div>
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 0.5rem 0'
          }}>
            No data for selected period
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem',
            color: '#64748B',
            lineHeight: '1.5'
          }}>
            Try selecting a different date range or add some symptoms and medications first.
          </p>
        </div>
      )}

      {/* Usage Tips */}
      {(filtered.symptoms.length > 0 || filtered.medicationLogs.length > 0) && (
        <div style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #BFDBFE'
        }}>
          <h4 style={{
            color: '#1E40AF',
            fontSize: '1rem',
            fontWeight: '600',
            margin: '0 0 0.75rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Sharing with Healthcare Providers
          </h4>
          <p style={{
            color: '#1E40AF',
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.6'
          }}>
            Use the share button to send your {activeTab === 'insights' ? 'insights and patterns' : 'health summary'} via 
            text, email, or any messaging app. These data-driven insights can help your healthcare provider 
            understand your health patterns and make more informed decisions about your care.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
