import React, { useState, useEffect } from 'react';

// Inline SVG Icons
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

const ClockIcon = ({ size = 16, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const TrendUpIcon = ({ size = 16, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17 6 23 6 23 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendDownIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="17 18 23 18 23 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </polyline>
);

const ClusterIcon = ({ size = 16, color = "#F59E0B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="6" cy="6" r="2" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="2"/>
    <circle cx="6" cy="18" r="2" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="2"/>
    <line x1="9" y1="9" x2="6" y2="6" stroke={color} strokeWidth="1"/>
    <line x1="15" y1="9" x2="18" y2="6" stroke={color} strokeWidth="1"/>
    <line x1="9" y1="15" x2="6" y2="18" stroke={color} strokeWidth="1"/>
    <line x1="15" y1="15" x2="18" y2="18" stroke={color} strokeWidth="1"/>
  </svg>
);

const InsightIcon = ({ size = 16, color = "#7C3AED" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendInsights = () => {
  const [insights, setInsights] = useState({
    dayPatterns: [],
    timePatterns: [],
    severityTrends: [],
    symptomClusters: [],
    medicationEffectiveness: [],
    keyFindings: [],
    dataQuality: { symptoms: 0, days: 0, medications: 0 }
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('month'); // week, month, quarter

  useEffect(() => {
    generateTrendAnalysis();
  }, [selectedTimeframe]);

  const generateTrendAnalysis = () => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');

    if (symptoms.length < 3) {
      setInsights(prev => ({
        ...prev,
        dataQuality: { symptoms: symptoms.length, days: 0, medications: medications.length },
        keyFindings: ['Track more symptoms to generate meaningful patterns and insights']
      }));
      return;
    }

    // Filter data by timeframe
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
    const filteredMedLogs = medicationLogs.filter(m => new Date(m.timestamp) >= cutoffDate);

    // Calculate data quality metrics
    const uniqueDates = new Set(filteredSymptoms.map(s => new Date(s.timestamp).toDateString()));
    const dataQuality = {
      symptoms: filteredSymptoms.length,
      days: uniqueDates.size,
      medications: medications.length
    };

    // Generate insights
    const dayPatterns = analyzeDayPatterns(filteredSymptoms);
    const timePatterns = analyzeTimePatterns(filteredSymptoms);
    const severityTrends = analyzeSeverityTrends(filteredSymptoms, selectedTimeframe);
    const symptomClusters = analyzeSymptomClusters(filteredSymptoms);
    const medicationEffectiveness = analyzeMedicationEffectiveness(filteredSymptoms, filteredMedLogs, medications);
    
    // Generate key findings
    const keyFindings = generateKeyFindings(
      dayPatterns, timePatterns, severityTrends, symptomClusters, medicationEffectiveness
    );

    setInsights({
      dayPatterns,
      timePatterns,
      severityTrends,
      symptomClusters,
      medicationEffectiveness,
      keyFindings,
      dataQuality
    });
  };

  const analyzeDayPatterns = (symptoms) => {
    if (symptoms.length < 5) return [];

    const dayMap = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Initialize all days
    dayNames.forEach(day => {
      dayMap[day] = { count: 0, totalSeverity: 0, symptoms: new Set() };
    });

    symptoms.forEach(symptom => {
      const day = dayNames[new Date(symptom.timestamp).getDay()];
      dayMap[day].count++;
      dayMap[day].totalSeverity += symptom.severity;
      dayMap[day].symptoms.add(symptom.name);
    });

    // Find significant patterns
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

    const hourMap = {};
    for (let i = 0; i < 24; i++) {
      hourMap[i] = { count: 0, totalSeverity: 0 };
    }

    symptoms.forEach(symptom => {
      const hour = new Date(symptom.timestamp).getHours();
      hourMap[hour].count++;
      hourMap[hour].totalSeverity += symptom.severity;
    });

    // Group into time periods
    const periods = {
      'Early Morning (5-8 AM)': [5, 6, 7, 8],
      'Morning (9 AM-12 PM)': [9, 10, 11, 12],
      'Afternoon (1-5 PM)': [13, 14, 15, 16, 17],
      'Evening (6-9 PM)': [18, 19, 20, 21],
      'Night (10 PM-4 AM)': [22, 23, 0, 1, 2, 3, 4]
    };

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

  const analyzeSeverityTrends = (symptoms, timeframe) => {
    if (symptoms.length < 7) return [];

    const sortedSymptoms = symptoms.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const trends = [];

    // Split data into two halves for comparison
    const midpoint = Math.floor(sortedSymptoms.length / 2);
    const firstHalf = sortedSymptoms.slice(0, midpoint);
    const secondHalf = sortedSymptoms.slice(midpoint);

    if (firstHalf.length > 0 && secondHalf.length > 0) {
      const firstAvg = firstHalf.reduce((sum, s) => sum + s.severity, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((sum, s) => sum + s.severity, 0) / secondHalf.length;
      const change = ((secondAvg - firstAvg) / firstAvg) * 100;

      if (Math.abs(change) > 15) {
        trends.push({
          type: change > 0 ? 'increasing' : 'decreasing',
          change: Math.abs(change).toFixed(1),
          firstPeriodAvg: firstAvg.toFixed(1),
          secondPeriodAvg: secondAvg.toFixed(1),
          insight: `Average severity ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}% over the ${timeframe}`
        });
      }
    }

    // Analyze by symptom type
    const symptomTrends = {};
    symptoms.forEach(symptom => {
      if (!symptomTrends[symptom.name]) {
        symptomTrends[symptom.name] = [];
      }
      symptomTrends[symptom.name].push(symptom);
    });

    Object.entries(symptomTrends).forEach(([name, symptomList]) => {
      if (symptomList.length >= 4) {
        const sorted = symptomList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        const firstTwo = sorted.slice(0, Math.floor(sorted.length / 2));
        const lastTwo = sorted.slice(Math.floor(sorted.length / 2));
        
        const firstAvg = firstTwo.reduce((sum, s) => sum + s.severity, 0) / firstTwo.length;
        const lastAvg = lastTwo.reduce((sum, s) => sum + s.severity, 0) / lastTwo.length;
        const change = ((lastAvg - firstAvg) / firstAvg) * 100;

        if (Math.abs(change) > 20) {
          trends.push({
            type: change > 0 ? 'symptom_worsening' : 'symptom_improving',
            symptom: name,
            change: Math.abs(change).toFixed(1),
            insight: `${name} severity ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}%`
          });
        }
      }
    });

    return trends;
  };

  const analyzeSymptomClusters = (symptoms) => {
    if (symptoms.length < 10) return [];

    // Group symptoms by day
    const dayGroups = {};
    symptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp).toDateString();
      if (!dayGroups[date]) dayGroups[date] = [];
      dayGroups[date].push(symptom);
    });

    // Find co-occurring symptoms
    const coOccurrences = {};
    Object.values(dayGroups).forEach(daySymptoms => {
      if (daySymptoms.length > 1) {
        const symptomNames = daySymptoms.map(s => s.name);
        const uniqueNames = [...new Set(symptomNames)];
        
        if (uniqueNames.length > 1) {
          for (let i = 0; i < uniqueNames.length; i++) {
            for (let j = i + 1; j < uniqueNames.length; j++) {
              const pair = [uniqueNames[i], uniqueNames[j]].sort().join(' + ');
              coOccurrences[pair] = (coOccurrences[pair] || 0) + 1;
            }
          }
        }
      }
    });

    const clusters = [];
    Object.entries(coOccurrences).forEach(([pair, count]) => {
      if (count >= 3) {
        const [symptom1, symptom2] = pair.split(' + ');
        const symptom1Total = symptoms.filter(s => s.name === symptom1).length;
        const symptom2Total = symptoms.filter(s => s.name === symptom2).length;
        const coOccurrenceRate = Math.round((count / Math.min(symptom1Total, symptom2Total)) * 100);
        
        if (coOccurrenceRate >= 40) {
          clusters.push({
            symptoms: [symptom1, symptom2],
            occurrences: count,
            rate: coOccurrenceRate,
            insight: `${symptom1} and ${symptom2} occur together ${coOccurrenceRate}% of the time`
          });
        }
      }
    });

    return clusters.sort((a, b) => b.rate - a.rate);
  };

  const analyzeMedicationEffectiveness = (symptoms, medicationLogs, medications) => {
    if (medicationLogs.length < 5 || symptoms.length < 5) return [];

    const effectiveness = [];
    
    medications.forEach(medication => {
      const medLogs = medicationLogs.filter(log => log.medicationName === medication.name);
      if (medLogs.length < 3) return;

      // Compare symptom severity before and after medication days
      const medDates = new Set(medLogs.map(log => new Date(log.timestamp).toDateString()));
      const beforeSymptoms = [];
      const afterSymptoms = [];

      symptoms.forEach(symptom => {
        const symptomDate = new Date(symptom.timestamp).toDateString();
        const symptomDateTime = new Date(symptom.timestamp);
        
        // Check if there was medication taken on the same day
        if (medDates.has(symptomDate)) {
          const dayMedLogs = medLogs.filter(log => 
            new Date(log.timestamp).toDateString() === symptomDate
          );
          
          const earliestMedTime = Math.min(...dayMedLogs.map(log => new Date(log.timestamp).getTime()));
          
          if (symptomDateTime.getTime() < earliestMedTime) {
            beforeSymptoms.push(symptom.severity);
          } else if (symptomDateTime.getTime() > earliestMedTime + 2 * 60 * 60 * 1000) { // 2+ hours after
            afterSymptoms.push(symptom.severity);
          }
        }
      });

      if (beforeSymptoms.length >= 2 && afterSymptoms.length >= 2) {
        const beforeAvg = beforeSymptoms.reduce((sum, s) => sum + s, 0) / beforeSymptoms.length;
        const afterAvg = afterSymptoms.reduce((sum, s) => sum + s, 0) / afterSymptoms.length;
        const improvement = ((beforeAvg - afterAvg) / beforeAvg) * 100;

        if (Math.abs(improvement) > 10) {
          effectiveness.push({
            medication: medication.name,
            improvement: improvement.toFixed(1),
            beforeAvg: beforeAvg.toFixed(1),
            afterAvg: afterAvg.toFixed(1),
            sampleSize: { before: beforeSymptoms.length, after: afterSymptoms.length },
            insight: improvement > 0 
              ? `${medication.name} associated with ${improvement.toFixed(1)}% symptom improvement`
              : `Symptoms average ${Math.abs(improvement).toFixed(1)}% higher after ${medication.name}`
          });
        }
      }
    });

    return effectiveness.sort((a, b) => Math.abs(b.improvement) - Math.abs(a.improvement));
  };

  const generateKeyFindings = (dayPatterns, timePatterns, severityTrends, symptomClusters, medicationEffectiveness) => {
    const findings = [];

    // Most significant day pattern
    if (dayPatterns.length > 0) {
      const topDay = dayPatterns[0];
      findings.push(`Symptoms occur most frequently on ${topDay.day}s (${topDay.count} occurrences)`);
    }

    // Most significant time pattern
    if (timePatterns.length > 0) {
      const topTime = timePatterns[0];
      findings.push(`${topTime.percentage}% of symptoms occur during ${topTime.period.toLowerCase()}`);
    }

    // Severity trends
    severityTrends.forEach(trend => {
      if (trend.type === 'increasing' || trend.type === 'decreasing') {
        findings.push(trend.insight);
      }
    });

    // Top symptom cluster
    if (symptomClusters.length > 0) {
      const topCluster = symptomClusters[0];
      findings.push(`${topCluster.symptoms.join(' and ')} frequently occur together (${topCluster.rate}% co-occurrence rate)`);
    }

    // Medication effectiveness
    medicationEffectiveness.forEach((med, index) => {
      if (index < 2 && Math.abs(parseFloat(med.improvement)) > 15) {
        findings.push(med.insight);
      }
    });

    if (findings.length === 0) {
      findings.push('Continue tracking to identify meaningful health patterns');
    }

    return findings.slice(0, 5); // Limit to top 5 findings
  };

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
            <TrendsIcon color="#FFFFFF" size={24} />
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0'
            }}>
              Trend Insights
            </h2>
            <p style={{ 
              color: '#64748B', 
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              Discover patterns in your health data to share with your doctor
            </p>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: '#F8FAFC',
          padding: '0.25rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0'
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
      </div>

      {/* Data Quality Overview */}
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
          Analysis Summary - {getTimeframeName()}
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
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
      </div>

      {/* Key Findings */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <InsightIcon />
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1E293B',
            margin: 0
          }}>
            Key Insights
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {insights.keyFindings.map((finding, index) => (
            <div key={index} style={{
              padding: '1rem',
              backgroundColor: '#FAF5FF',
              borderRadius: '8px',
              border: '1px solid #D8B4FE',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
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

      {/* Day-of-Week Patterns */}
      {insights.dayPatterns.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CalendarIcon />
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

      {/* Time-of-Day Patterns */}
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

      {/* Severity Trends */}
      {insights.severityTrends.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            {insights.severityTrends.some(t => t.type === 'increasing') ? 
              <TrendUpIcon /> : <TrendDownIcon />}
            <h3 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1E293B',
              margin: 0
            }}>
              Severity Trends
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {insights.severityTrends.map((trend, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: trend.type.includes('increasing') || trend.type.includes('worsening') 
                  ? '#FEF2F2' : '#F0FDF4',
                borderRadius: '8px',
                border: `1px solid ${trend.type.includes('increasing') || trend.type.includes('worsening') 
                  ? '#FECACA' : '#BBF7D0'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                {trend.type.includes('increasing') || trend.type.includes('worsening') ? 
                  <TrendUpIcon color="#DC2626" /> : <TrendDownIcon color="#059669" />}
                <span style={{
                  fontSize: '0.875rem',
                  color: trend.type.includes('increasing') || trend.type.includes('worsening') 
                    ? '#991B1B' : '#166534',
                  fontWeight: '500'
                }}>
                  {trend.insight}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symptom Clusters */}
      {insights.symptomClusters.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ClusterIcon />
            <h3 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1E293B',
              margin: 0
            }}>
              Symptom Relationships
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {insights.symptomClusters.map((cluster, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: '#FFFBEB',
                borderRadius: '8px',
                border: '1px solid #FED7AA',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#92400E',
                    fontWeight: '600',
                    marginBottom: '0.25rem'
                  }}>
                    {cluster.symptoms.join(' + ')}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#A16207'
                  }}>
                    Co-occurred {cluster.occurrences} times
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#F59E0B'
                  }}>
                    {cluster.rate}%
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#F59E0B'
                  }}>
                    together
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medication Effectiveness */}
      {insights.medicationEffectiveness.length > 0 && (
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
            Medication Patterns
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {insights.medicationEffectiveness.map((med, index) => (
              <div key={index} style={{
                padding: '1rem',
                backgroundColor: parseFloat(med.improvement) > 0 ? '#F0FDF4' : '#FEF2F2',
                borderRadius: '8px',
                border: `1px solid ${parseFloat(med.improvement) > 0 ? '#BBF7D0' : '#FECACA'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: parseFloat(med.improvement) > 0 ? '#166534' : '#991B1B',
                    fontWeight: '600',
                    marginBottom: '0.25rem'
                  }}>
                    {med.medication}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: parseFloat(med.improvement) > 0 ? '#15803D' : '#B91C1C'
                  }}>
                    Before: {med.beforeAvg} → After: {med.afterAvg}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: parseFloat(med.improvement) > 0 ? '#059669' : '#DC2626'
                  }}>
                    {parseFloat(med.improvement) > 0 ? '↓' : '↑'}{Math.abs(parseFloat(med.improvement))}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <p style={{
              fontSize: '0.75rem',
              color: '#64748B',
              margin: 0,
              fontStyle: 'italic'
            }}>
              Note: These are observational patterns, not medical conclusions. 
              Discuss medication effectiveness with your healthcare provider.
            </p>
          </div>
        </div>
      )}

      {/* Footer Note */}
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
          margin: '0 0 0.75rem 0'
        }}>
          Using These Insights
        </h4>
        <p style={{
          color: '#1E40AF',
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: '1.6'
        }}>
          Share these patterns with your healthcare provider to help identify triggers, optimize treatments, 
          and make informed decisions about your care. These insights are based on your data but should not 
          replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default TrendInsights;
