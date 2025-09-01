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
        if (err.name !== 'AbortError') {
          await navigator.clipboard.writeText(reportText);
          alert('Report copied to clipboard!');
        }
      }
    } else {
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
    if (severity <= 3) return 'var(--success-600)';
    if (severity <= 6) return 'var(--warning-600)'; 
    return 'var(--error-600)';
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
    <div className="flex flex-col gap-6">
      {/* Streamlined Header */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-heading-1">Health Reports</h2>
              <p className="text-body">Generate summaries and discover patterns</p>
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
          
          {/* Compact Summary */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                {activeTab === 'summary' ? <ReportsIcon color="var(--secondary-600)" size={20} /> : <TrendsIcon color="var(--secondary-600)" size={20} />}
              </div>
              <div>
                <div className="text-body-small">{activeTab === 'summary' ? 'Report Period' : 'Analysis Period'}</div>
                <div className="text-lg font-bold text-metric">
                  {activeTab === 'summary' ? `${statistics.actualDaysTracked} days` : getTimeframeName()}
                </div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-bold text-error-600">{activeTab === 'summary' ? statistics.totalSymptoms : insights.dataQuality.symptoms}</div>
                <div className="text-xs text-slate-600">Symptoms</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-success-600">{activeTab === 'summary' ? statistics.totalMedicationDoses : insights.dataQuality.medications}</div>
                <div className="text-xs text-slate-600">Medications</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === 'summary' ? 'bg-secondary-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ReportsIcon color={activeTab === 'summary' ? 'white' : '#64748B'} size={16} />
              Summary Report
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === 'insights' ? 'bg-secondary-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendsIcon color={activeTab === 'insights' ? 'white' : '#64748B'} size={16} />
              Pattern Insights
            </button>
          </div>
        </div>
      </div>
{/* Content based on active tab */}
      {activeTab === 'summary' ? (
        <>
          {/* Report Settings */}
          <div className="health-card">
            <div className="health-card-body">
              <h3 className="text-heading-3 mb-4">Report Settings</h3>
              
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date:</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={reportSettings.startDate}
                      onChange={(e) => setReportSettings(prev => ({ ...prev, startDate: e.target.value }))}
                      className="form-input pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date:</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={reportSettings.endDate}
                      onChange={(e) => setReportSettings(prev => ({ ...prev, endDate: e.target.value }))}
                      className="form-input pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Include Options */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Include in Report:</label>
                <div className="space-y-2">
                  {[
                    { key: 'includeSymptoms', label: 'Symptoms & Severity Levels' },
                    { key: 'includeMedications', label: 'Current Medications' },
                    { key: 'includeStatistics', label: 'Summary Statistics' }
                  ].map(option => (
                    <label key={option.key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={reportSettings[option.key]}
                        onChange={(e) => setReportSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                        className="w-4 h-4 text-primary-600 bg-white border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-slate-700 flex-1">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
{/* Statistics Preview */}
          {reportSettings.includeStatistics && (filtered.symptoms.length > 0 || filtered.medicationLogs.length > 0) && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <ChartIcon />
                  <h3 className="text-heading-3">Report Preview</h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-error-50 to-error-100 rounded-lg border border-error-200 transform transition-transform hover:-translate-y-0.5">
                    <div className="text-2xl font-bold text-error-600 mb-1">{statistics.totalSymptoms}</div>
                    <div className="text-xs text-error-700 font-medium">Symptoms</div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg border border-success-200 transform transition-transform hover:-translate-y-0.5">
                    <div className="text-2xl font-bold text-success-600 mb-1">{statistics.totalMedicationDoses}</div>
                    <div className="text-xs text-success-700 font-medium">Medications</div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg border border-warning-200 transform transition-transform hover:-translate-y-0.5">
                    <div className="text-2xl font-bold" style={{ color: getSeverityColor(parseFloat(statistics.avgSeverity)) }}>
                      {statistics.avgSeverity}
                    </div>
                    <div className="text-xs text-warning-700 font-medium">Avg Severity</div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200 transform transition-transform hover:-translate-y-0.5">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{statistics.actualDaysTracked}</div>
                    <div className="text-xs text-primary-700 font-medium">Days Tracked</div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <h4 className="text-heading-4 mb-3">Key Insights:</h4>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-error-500 rounded-full"></div>
                      Most common symptom: <strong className="text-error-600">{statistics.mostCommonSymptom}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                      Most taken medication: <strong className="text-success-600">{statistics.mostTakenMedication}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      Daily averages: <strong>{statistics.dailyAverages.symptomsPerDay}</strong> symptoms, <strong>{statistics.dailyAverages.medicationsPerDay}</strong> medications
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Insights Content */}
          <div className="health-card">
            <div className="health-card-body">
              <h3 className="text-heading-3 mb-4">Analysis Period - {getTimeframeName()}</h3>

              {/* Timeframe Selector */}
              <div className="flex gap-2 bg-slate-50 p-1 rounded-lg mb-6">
                {['week', 'month', 'quarter'].map(timeframe => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTimeframe === timeframe 
                        ? 'bg-secondary-600 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {timeframe === 'week' ? '7 Days' : timeframe === 'month' ? '30 Days' : '90 Days'}
                  </button>
                ))}
              </div>

              {/* Data Quality Overview */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-error-50 border border-error-200 rounded-lg">
                  <div className="text-2xl font-bold text-error-600 mb-1">{insights.dataQuality.symptoms}</div>
                  <div className="text-xs text-error-700 font-medium">Symptoms Tracked</div>
                </div>

                <div className="text-center p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{insights.dataQuality.days}</div>
                  <div className="text-xs text-primary-700 font-medium">Active Days</div>
                </div>

                <div className="text-center p-4 bg-success-50 border border-success-200 rounded-lg">
                  <div className="text-2xl font-bold text-success-600 mb-1">{insights.dataQuality.medications}</div>
                  <div className="text-xs text-success-700 font-medium">Medications</div>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                <h4 className="text-heading-4 mb-3 text-secondary-900">Key Insights:</h4>
                <div className="space-y-2">
                  {insights.keyFindings.map((finding, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-sm text-secondary-800 font-medium leading-relaxed">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
{/* Day Patterns */}
          {insights.dayPatterns.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon color="#059669" />
                  <h3 className="text-heading-3">Day-of-Week Patterns</h3>
                </div>

                <div className="space-y-3">
                  {insights.dayPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-success-50 border border-success-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-success-900 mb-1">{pattern.day}s</div>
                        <div className="text-sm text-success-700">{pattern.insight}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success-600">{pattern.count}</div>
                        <div className="text-xs text-success-600">avg {pattern.avgSeverity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Time Patterns */}
          {insights.timePatterns.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <ClockIcon />
                  <h3 className="text-heading-3">Time-of-Day Patterns</h3>
                </div>

                <div className="space-y-3">
                  {insights.timePatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg">
                      <div>
                        <div className="font-semibold text-primary-900 mb-1">{pattern.period}</div>
                        <div className="text-sm text-primary-700">Average severity: {pattern.avgSeverity}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">{pattern.percentage}%</div>
                        <div className="text-xs text-primary-600">of symptoms</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Mobile-First Sharing Actions */}
      <div className="health-card">
        <div className="health-card-body">
          <h3 className="text-heading-3 mb-4">Share with Your Doctor</h3>

          {/* Primary Share Button */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="btn btn-primary w-full mb-4 flex items-center justify-center gap-3 py-4 text-base shadow-lg"
            style={{
              background: isSharing ? '#9CA3AF' : 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
              opacity: isSharing ? 0.6 : 1,
              cursor: isSharing ? 'not-allowed' : 'pointer'
            }}
          >
            <ShareIcon />
            {isSharing ? 'Preparing...' : 'Share Report'}
          </button>

          {/* Alternative Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleCopy} className="btn btn-secondary">
              <CopyIcon />
              Copy Text
            </button>
            <button onClick={handleEmailDraft} className="btn btn-secondary">
              <EmailIcon />
              Email Draft
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-600 text-center leading-relaxed">
            Share generates a text summary perfect for messaging, email, or notes apps
          </p>
        </div>
      </div>
{/* Empty State */}
      {filtered.symptoms.length === 0 && filtered.medicationLogs.length === 0 && (
        <div className="health-card text-center py-12">
          <div className="health-card-body">
            <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <ChartIcon size={24} />
            </div>
            <h3 className="text-heading-3 mb-2">No data for selected period</h3>
            <p className="text-body text-slate-600">
              Try selecting a different date range or add some symptoms and medications first.
            </p>
          </div>
        </div>
      )}

      {/* Usage Tips */}
      {(filtered.symptoms.length > 0 || filtered.medicationLogs.length > 0) && (
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
          <h4 className="text-primary-900 font-semibold mb-2 flex items-center gap-2">
            <div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
              </svg>
            </div>
            Sharing with Healthcare Providers
          </h4>
          <p className="text-primary-800 text-sm leading-relaxed">
            Use the share button to send your {activeTab === 'insights' ? 'insights and patterns' : 'health summary'} via 
            text, email, or any messaging app. These data-driven insights help your healthcare provider 
            understand your health patterns and make more informed decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
