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

const AnalyticsIcon = ({ color = "#3B82F6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const PillIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M10.5 20.5a6.5 6.5 0 1 0-7-7l7 7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 10.5a6.5 6.5 0 1 0 7 7l-7-7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="12" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const WarningIcon = ({ size = 16, color = "#F59E0B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendUpIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17,6 23,6 23,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendDownIcon = ({ size = 16, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17,18 23,18 23,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Reports = () => {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'insights', or 'analytics'
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

  // Advanced Analytics State
  const [analyticsInsights, setAnalyticsInsights] = useState({
    medicationTimingPatterns: [],
    symptomClusters: [],
    temporalPatterns: [],
    dataCorrelations: [],
    trackingTrends: []
  });
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
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

  // Process advanced analytics when analytics tab is active
  useEffect(() => {
    if (activeTab === 'analytics') {
      processAdvancedAnalytics();
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

  const filterDataByTimeframe = (data, timeframe) => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeframe) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case 'quarter':
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case 'year':
        cutoffDate.setDate(now.getDate() - 365);
        break;
      default:
        cutoffDate.setDate(now.getDate() - 30);
    }

    return {
      symptoms: data.symptoms.filter(s => new Date(s.timestamp) >= cutoffDate),
      medications: data.medications,
      medicationLogs: data.medicationLogs.filter(l => new Date(l.timestamp) >= cutoffDate)
    };
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
  // Advanced Analytics Functions
  const processAdvancedAnalytics = async () => {
    if (reportData.symptoms.length < 5) {
      setAnalyticsInsights({
        medicationTimingPatterns: [],
        symptomClusters: [],
        temporalPatterns: [],
        dataCorrelations: [],
        trackingTrends: []
      });
      return;
    }

    setLoadingAnalytics(true);

    // Filter data by selected timeframe
    const filteredData = filterDataByTimeframe(reportData, selectedTimeframe);
    
    // Process different types of pattern analysis
    const medicationTimingPatterns = await analyzeMedicationTimingPatterns(filteredData);
    const symptomClusters = await analyzeAdvancedSymptomClusters(filteredData);
    const temporalPatterns = await analyzeAdvancedTemporalPatterns(filteredData);
    const dataCorrelations = await analyzeDataCorrelations(filteredData);
    const trackingTrends = await analyzeTrackingTrends(filteredData);

    setAnalyticsInsights({
      medicationTimingPatterns,
      symptomClusters,
      temporalPatterns,
      dataCorrelations,
      trackingTrends
    });

    setLoadingAnalytics(false);
  };

  const analyzeMedicationTimingPatterns = async (data) => {
    const timingPatterns = [];

    data.medications.forEach(medication => {
      const medLogs = data.medicationLogs.filter(log => log.medicationName === medication.name);
      if (medLogs.length < 3) return;

      // Analyze symptom timing patterns around medication logs
      const timingData = medLogs.map(log => {
        const logTime = new Date(log.timestamp);
        
        // Look for symptoms 6 hours before and 24 hours after medication log
        const sixHoursBefore = new Date(logTime.getTime() - 6 * 60 * 60 * 1000);
        const twentyFourHoursAfter = new Date(logTime.getTime() + 24 * 60 * 60 * 1000);
        
        const symptomsBefore = data.symptoms.filter(s => {
          const sTime = new Date(s.timestamp);
          return sTime >= sixHoursBefore && sTime <= logTime;
        });
        
        const symptomsAfter = data.symptoms.filter(s => {
          const sTime = new Date(s.timestamp);
          return sTime > logTime && sTime <= twentyFourHoursAfter;
        });

        const avgSeverityBefore = symptomsBefore.length > 0 
          ? symptomsBefore.reduce((sum, s) => sum + s.severity, 0) / symptomsBefore.length 
          : 0;
        
        const avgSeverityAfter = symptomsAfter.length > 0
          ? symptomsAfter.reduce((sum, s) => sum + s.severity, 0) / symptomsAfter.length
          : 0;

        return {
          beforeSeverity: avgSeverityBefore,
          afterSeverity: avgSeverityAfter,
          severityDifference: avgSeverityBefore - avgSeverityAfter,
          hasData: symptomsBefore.length > 0 && symptomsAfter.length > 0
        };
      }).filter(data => data.hasData);

      if (timingData.length >= 3) {
        const avgDifference = timingData.reduce((sum, d) => sum + d.severityDifference, 0) / timingData.length;
        const improvementInstances = timingData.filter(d => d.severityDifference > 0).length;
        const improvementRate = (improvementInstances / timingData.length) * 100;

        timingPatterns.push({
          medicationName: medication.name,
          avgSeverityChange: parseFloat(avgDifference.toFixed(1)),
          improvementRate: Math.round(improvementRate),
          dataPoints: timingData.length,
          pattern: avgDifference > 0.5 ? 'symptoms-often-lower' : avgDifference < -0.5 ? 'symptoms-often-higher' : 'no-clear-pattern',
          confidence: timingData.length >= 7 ? 'moderate' : 'low'
        });
      }
    });

    return timingPatterns.sort((a, b) => b.avgSeverityChange - a.avgSeverityChange);
  };

  const analyzeAdvancedSymptomClusters = async (data) => {
    const clusters = [];
    const symptomsByDay = {};

    // Group symptoms by day
    data.symptoms.forEach(symptom => {
      const dayKey = new Date(symptom.timestamp).toDateString();
      if (!symptomsByDay[dayKey]) {
        symptomsByDay[dayKey] = [];
      }
      symptomsByDay[dayKey].push(symptom);
    });

    // Find days with multiple symptoms
    const clusterDays = Object.entries(symptomsByDay)
      .filter(([day, symptoms]) => symptoms.length > 1)
      .map(([day, symptoms]) => ({
        date: day,
        symptoms: symptoms,
        count: symptoms.length,
        avgSeverity: symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length,
        symptomTypes: [...new Set(symptoms.map(s => s.name))]
      }));

    if (clusterDays.length > 0) {
      // Find most common symptom combinations
      const combinations = {};
      clusterDays.forEach(cluster => {
        const sorted = cluster.symptomTypes.sort().join(' + ');
        if (!combinations[sorted]) {
          combinations[sorted] = {
            combination: sorted,
            count: 0,
            avgSeverity: 0,
            dates: []
          };
        }
        combinations[sorted].count++;
        combinations[sorted].avgSeverity += cluster.avgSeverity;
        combinations[sorted].dates.push(cluster.date);
      });

      // Process combinations
      Object.values(combinations).forEach(combo => {
        combo.avgSeverity = combo.avgSeverity / combo.count;
        if (combo.count >= 2) {
          clusters.push({
            symptoms: combo.combination,
            frequency: combo.count,
            avgSeverity: parseFloat(combo.avgSeverity.toFixed(1)),
            recentDate: combo.dates[combo.dates.length - 1],
            confidence: combo.count >= 4 ? 'moderate' : 'low'
          });
        }
      });
    }

    return clusters.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
  };

  const analyzeAdvancedTemporalPatterns = async (data) => {
    const patterns = [];

    if (data.symptoms.length < 5) return patterns;

    // Time of day patterns
    const hourlySymptoms = {};
    for (let i = 0; i < 24; i++) {
      hourlySymptoms[i] = { count: 0, totalSeverity: 0 };
    }

    data.symptoms.forEach(symptom => {
      const hour = new Date(symptom.timestamp).getHours();
      hourlySymptoms[hour].count++;
      hourlySymptoms[hour].totalSeverity += symptom.severity;
    });

    // Find peak hours
    const totalSymptoms = data.symptoms.length;
    const avgHourlyCount = totalSymptoms / 24;
    const peakHour = Object.entries(hourlySymptoms)
      .filter(([hour, data]) => data.count >= 3 && data.count > avgHourlyCount * 1.5)
      .sort(([,a], [,b]) => b.count - a.count)[0];

    if (peakHour) {
      const hour = parseInt(peakHour[0]);
      const timeOfDay = hour < 6 ? 'Early Morning' : 
                      hour < 12 ? 'Morning' :
                      hour < 17 ? 'Afternoon' :
                      hour < 21 ? 'Evening' : 'Night';
      
      patterns.push({
        type: 'time_of_day',
        pattern: `${timeOfDay} Pattern`,
        description: `${Math.round((peakHour[1].count / avgHourlyCount - 1) * 100)}% more symptoms around ${hour}:00`,
        frequency: peakHour[1].count,
        avgSeverity: parseFloat((peakHour[1].totalSeverity / peakHour[1].count).toFixed(1)),
        confidence: peakHour[1].count >= 5 ? 'moderate' : 'low'
      });
    }

    return patterns;
  };

  const analyzeDataCorrelations = async (data) => {
    const correlations = [];
    
    if (data.symptoms.length < 10) return correlations;

    // Group symptoms by type
    const symptomGroups = {};
    data.symptoms.forEach(symptom => {
      if (!symptomGroups[symptom.name]) {
        symptomGroups[symptom.name] = [];
      }
      symptomGroups[symptom.name].push(symptom);
    });

    // Find symptoms that may occur on the same day
    const symptomTypes = Object.keys(symptomGroups).filter(type => symptomGroups[type].length >= 3);
    
    for (let i = 0; i < symptomTypes.length; i++) {
      for (let j = i + 1; j < symptomTypes.length; j++) {
        const symptomA = symptomTypes[i];
        const symptomB = symptomTypes[j];
        
        const datesA = new Set(symptomGroups[symptomA].map(s => new Date(s.timestamp).toDateString()));
        const datesB = new Set(symptomGroups[symptomB].map(s => new Date(s.timestamp).toDateString()));
        
        // Find intersection (days when both symptoms were logged)
        const intersection = [...datesA].filter(date => datesB.has(date));
        
        if (intersection.length >= 2) {
          const correlationStrength = intersection.length / Math.min(datesA.size, datesB.size);
          
          if (correlationStrength >= 0.3) {
            correlations.push({
              symptomA,
              symptomB,
              coOccurrences: intersection.length,
              strength: Math.round(correlationStrength * 100),
              pattern: `${symptomA} & ${symptomB}`,
              description: `Logged together on ${intersection.length} days`,
              confidence: intersection.length >= 4 ? 'moderate' : 'low'
            });
          }
        }
      }
    }

    return correlations.sort((a, b) => b.strength - a.strength).slice(0, 5);
  };

  const analyzeTrackingTrends = async (data) => {
    const trends = [];
    
    if (data.symptoms.length < 7) return trends;

    // Split data into two halves to compare trends
    const sortedSymptoms = data.symptoms.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const midPoint = Math.floor(sortedSymptoms.length / 2);
    const firstHalf = sortedSymptoms.slice(0, midPoint);
    const secondHalf = sortedSymptoms.slice(midPoint);

    // Overall severity trend in tracking data
    const firstHalfAvg = firstHalf.reduce((sum, s) => sum + s.severity, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, s) => sum + s.severity, 0) / secondHalf.length;
    const severityChange = secondHalfAvg - firstHalfAvg;
    const severityChangePercent = Math.round((severityChange / firstHalfAvg) * 100);

    if (Math.abs(severityChangePercent) >= 15) {
      trends.push({
        type: 'severity_tracking',
        trend: severityChange > 0 ? 'increasing' : 'decreasing',
        change: Math.abs(severityChangePercent),
        description: `Tracked severity levels have ${severityChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(severityChangePercent)}%`,
        current: parseFloat(secondHalfAvg.toFixed(1)),
        previous: parseFloat(firstHalfAvg.toFixed(1)),
        confidence: sortedSymptoms.length >= 14 ? 'moderate' : 'low'
      });
    }

    // Frequency trend in tracking data
    const firstHalfDays = (new Date(firstHalf[firstHalf.length - 1].timestamp) - new Date(firstHalf[0].timestamp)) / (1000 * 60 * 60 * 24) + 1;
    const secondHalfDays = (new Date(secondHalf[secondHalf.length - 1].timestamp) - new Date(secondHalf[0].timestamp)) / (1000 * 60 * 60 * 24) + 1;
    
    const firstHalfFreq = firstHalf.length / firstHalfDays;
    const secondHalfFreq = secondHalf.length / secondHalfDays;
    const freqChange = ((secondHalfFreq - firstHalfFreq) / firstHalfFreq) * 100;

    if (Math.abs(freqChange) >= 25) {
      trends.push({
        type: 'tracking_frequency',
        trend: freqChange > 0 ? 'increasing' : 'decreasing',
        change: Math.abs(Math.round(freqChange)),
        description: `Symptom tracking frequency has ${freqChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(Math.round(freqChange))}%`,
        current: parseFloat(secondHalfFreq.toFixed(1)),
        previous: parseFloat(firstHalfFreq.toFixed(1)),
        confidence: sortedSymptoms.length >= 14 ? 'moderate' : 'low'
      });
    }

    return trends;
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

    if (activeTab === 'analytics' && analyticsInsights.medicationTimingPatterns.length > 0) {
      reportText += `DATA PATTERNS:\n`;
      analyticsInsights.medicationTimingPatterns.forEach((pattern, index) => {
        reportText += `${index + 1}. ${pattern.medicationName}: ${pattern.improvementRate}% improvement rate\n`;
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
      case 'year': return 'Past Year';
      default: return 'Past Month';
    }
  };

  const getActiveTabName = () => {
    switch (activeTab) {
      case 'summary': return 'Summary Report';
      case 'insights': return 'Pattern Insights';
      case 'analytics': return 'Data Patterns';
      default: return 'Summary Report';
    }
  };

  const getActiveTabData = () => {
    switch (activeTab) {
      case 'summary':
        return {
          mainMetric: `${statistics.actualDaysTracked} days`,
          symptoms: statistics.totalSymptoms,
          medications: statistics.totalMedicationDoses
        };
      case 'insights':
        return {
          mainMetric: getTimeframeName(),
          symptoms: insights.dataQuality.symptoms,
          medications: insights.dataQuality.medications
        };
      case 'analytics':
        return {
          mainMetric: getTimeframeName(),
          symptoms: reportData.symptoms.length,
          medications: analyticsInsights.medicationTimingPatterns.length + analyticsInsights.symptomClusters.length + analyticsInsights.temporalPatterns.length
        };
      default:
        return {
          mainMetric: `${statistics.actualDaysTracked} days`,
          symptoms: statistics.totalSymptoms,
          medications: statistics.totalMedicationDoses
        };
    }
  };

  const hasInsufficientAnalyticsData = reportData.symptoms.length < 5;
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
                {activeTab === 'summary' ? <ReportsIcon color="var(--secondary-600)" size={20} /> : 
                 activeTab === 'insights' ? <TrendsIcon color="var(--secondary-600)" size={20} /> :
                 <AnalyticsIcon color="var(--secondary-600)" size={20} />}
              </div>
              <div>
                <div className="text-body-small">{activeTab === 'summary' ? 'Report Period' : 'Analysis Period'}</div>
                <div className="text-lg font-bold text-metric">
                  {getActiveTabData().mainMetric}
                </div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-bold text-error-600">{getActiveTabData().symptoms}</div>
                <div className="text-xs text-slate-600">
                  {activeTab === 'analytics' ? 'Entries' : 'Symptoms'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-success-600">{getActiveTabData().medications}</div>
                <div className="text-xs text-slate-600">
                  {activeTab === 'analytics' ? 'Patterns' : 'Medications'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('summary')}
              className={`btn ${activeTab === 'summary' ? 'btn-primary' : 'btn-secondary'} flex-1 flex items-center justify-center gap-2`}
            >
              <ReportsIcon color={activeTab === 'summary' ? 'white' : '#64748B'} size={16} />
              Summary
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`btn ${activeTab === 'insights' ? 'btn-primary' : 'btn-secondary'} flex-1 flex items-center justify-center gap-2`}
            >
              <TrendsIcon color={activeTab === 'insights' ? 'white' : '#64748B'} size={16} />
              Insights
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'} flex-1 flex items-center justify-center gap-2`}
            >
              <AnalyticsIcon color={activeTab === 'analytics' ? 'white' : '#64748B'} size={16} />
              Patterns
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
      ) : activeTab === 'insights' ? (
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
      ) : (
        <>
          {/* Advanced Analytics Content */}
          {/* Medical Disclaimer */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <WarningIcon />
              <h4 className="font-semibold text-warning-800">Important Notice</h4>
            </div>
            <p className="text-warning-700 text-sm leading-relaxed">
              These are data patterns from your tracking logs, not medical analysis. 
              All insights should be discussed with your healthcare provider. 
              This information does not constitute medical advice, diagnosis, or treatment recommendations.
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="health-card">
            <div className="health-card-body">
              <div className="flex gap-2 bg-slate-50 p-1 rounded-lg">
                {['week', 'month', 'quarter', 'year'].map(timeframe => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      selectedTimeframe === timeframe 
                        ? 'bg-primary-600 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    {timeframe === 'week' ? '7 Days' : 
                     timeframe === 'month' ? '30 Days' : 
                     timeframe === 'quarter' ? '90 Days' : '1 Year'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Analytics Results */}
          {hasInsufficientAnalyticsData ? (
            <div className="health-card text-center py-12">
              <div className="health-card-body">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <AnalyticsIcon size={32} color="#64748B" />
                </div>
                <h3 className="text-heading-3 mb-2">Need More Tracking Data</h3>
                <p className="text-body text-slate-600 mb-4">
                  Pattern analysis requires at least 5 symptom entries to generate meaningful insights.
                </p>
                <p className="text-body-small text-slate-500">
                  Continue tracking symptoms and medications to unlock personalized data patterns.
                </p>
              </div>
            </div>
          ) : loadingAnalytics ? (
            <div className="health-card text-center py-12">
              <div className="health-card-body">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <AnalyticsIcon size={32} />
                </div>
                <h3 className="text-heading-3 mb-2">Analyzing Patterns</h3>
                <p className="text-body text-slate-600">
                  Processing your tracking data for patterns...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Medication Timing Patterns */}
              {analyticsInsights.medicationTimingPatterns.length > 0 && (
                <div className="health-card">
                  <div className="health-card-body">
                    <div className="flex items-center gap-2 mb-4">
                      <PillIcon />
                      <h3 className="text-heading-3">Medication Timing Patterns</h3>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                      <p className="text-slate-700 text-xs leading-relaxed">
                        <strong>Note:</strong> These patterns compare symptom severity before vs. after medication logging times. 
                        This is tracking data analysis, not medical effectiveness evaluation.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {analyticsInsights.medicationTimingPatterns.map((med, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 mb-1">{med.medicationName}</div>
                            <div className="text-body-small text-slate-600">
                              {med.improvementRate}% of instances showed lower symptoms after • {med.dataPoints} log comparisons
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              Data confidence: {med.confidence}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${
                                med.avgSeverityChange > 0 ? 'text-success-600' : 
                                med.avgSeverityChange < 0 ? 'text-error-600' : 'text-slate-600'
                              }`}>
                                {med.avgSeverityChange > 0 ? '+' : ''}{med.avgSeverityChange}
                              </div>
                              <div className="text-xs text-slate-600">avg change</div>
                            </div>
                            {med.pattern === 'symptoms-often-lower' ? (
                              <TrendUpIcon />
                            ) : med.pattern === 'symptoms-often-higher' ? (
                              <TrendDownIcon />
                            ) : (
                              <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Other analytics results would continue here... */}
              {/* No Patterns Found */}
              {analyticsInsights.medicationTimingPatterns.length === 0 && 
               analyticsInsights.symptomClusters.length === 0 && 
               analyticsInsights.temporalPatterns.length === 0 && 
               analyticsInsights.dataCorrelations.length === 0 && 
               analyticsInsights.trackingTrends.length === 0 && (
                <div className="health-card text-center py-12">
                  <div className="health-card-body">
                    <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <AnalyticsIcon size={32} color="#64748B" />
                    </div>
                    <h3 className="text-heading-3 mb-2">No Clear Patterns Detected</h3>
                    <p className="text-body text-slate-600 mb-4">
                      Your tracking data doesn't show strong patterns in the selected timeframe.
                    </p>
                    <p className="text-body-small text-slate-500">
                      Try selecting a longer timeframe or continue tracking to build more comprehensive data patterns.
                    </p>
                  </div>
                </div>
              )}
            </>
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
      {filtered.symptoms.length === 0 && filtered.medicationLogs.length === 0 && activeTab === 'summary' && (
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
            Use the share button to send your {getActiveTabName().toLowerCase()} via 
            text, email, or any messaging app. These data-driven insights help your healthcare provider 
            understand your health patterns and make more informed decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
