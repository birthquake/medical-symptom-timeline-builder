import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const AnalyticsIcon = ({ size = 24, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const HealthAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    symptoms: [],
    medications: [],
    medicationLogs: [],
    processed: false
  });

  const [insights, setInsights] = useState({
    medicationEffectiveness: [],
    symptomClusters: [],
    temporalPatterns: [],
    correlations: [],
    trends: []
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Load and process data on component mount
  useEffect(() => {
    loadHealthData();
  }, []);

  // Reprocess analysis when timeframe changes
  useEffect(() => {
    if (analyticsData.processed) {
      processAdvancedAnalytics();
    }
  }, [selectedTimeframe, analyticsData]);

  const loadHealthData = () => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');

    setAnalyticsData({
      symptoms,
      medications,
      medicationLogs,
      processed: true
    });
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
  const processAdvancedAnalytics = async () => {
    if (analyticsData.symptoms.length < 5) {
      setInsights({
        medicationEffectiveness: [],
        symptomClusters: [],
        temporalPatterns: [],
        correlations: [],
        trends: []
      });
      return;
    }

    setLoadingAnalysis(true);

    // Filter data by selected timeframe
    const filteredData = filterDataByTimeframe(analyticsData, selectedTimeframe);
    
    // Process different types of analysis
    const medicationEffectiveness = await analyzeMedicationEffectiveness(filteredData);
    const symptomClusters = await analyzeSymptomClusters(filteredData);
    const temporalPatterns = await analyzeTemporalPatterns(filteredData);
    const correlations = await analyzeCorrelations(filteredData);
    const trends = await analyzeTrends(filteredData);

    setInsights({
      medicationEffectiveness,
      symptomClusters,
      temporalPatterns,
      correlations,
      trends
    });

    setLoadingAnalysis(false);
  };

  const analyzeMedicationEffectiveness = async (data) => {
    const effectiveness = [];

    data.medications.forEach(medication => {
      const medLogs = data.medicationLogs.filter(log => log.medicationName === medication.name);
      if (medLogs.length < 3) return;

      // Analyze symptoms before and after medication doses
      const effectivenessData = medLogs.map(log => {
        const logTime = new Date(log.timestamp);
        
        // Look for symptoms 6 hours before and 24 hours after medication
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
          improvement: avgSeverityBefore - avgSeverityAfter,
          hasData: symptomsBefore.length > 0 && symptomsAfter.length > 0
        };
      }).filter(data => data.hasData);

      if (effectivenessData.length > 0) {
        const avgImprovement = effectivenessData.reduce((sum, d) => sum + d.improvement, 0) / effectivenessData.length;
        const effectiveCount = effectivenessData.filter(d => d.improvement > 0).length;
        const effectivenessRate = (effectiveCount / effectivenessData.length) * 100;

        effectiveness.push({
          medicationName: medication.name,
          avgImprovement: parseFloat(avgImprovement.toFixed(1)),
          effectivenessRate: Math.round(effectivenessRate),
          dataPoints: effectivenessData.length,
          trend: avgImprovement > 0 ? 'improving' : avgImprovement < 0 ? 'worsening' : 'stable'
        });
      }
    });

    return effectiveness.sort((a, b) => b.avgImprovement - a.avgImprovement);
  };

  const analyzeSymptomClusters = async (data) => {
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

    // Find days with multiple symptoms (clusters)
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
        if (combo.count >= 2) { // Only include combinations that happened more than once
          clusters.push({
            symptoms: combo.combination,
            frequency: combo.count,
            avgSeverity: parseFloat(combo.avgSeverity.toFixed(1)),
            recentDate: combo.dates[combo.dates.length - 1]
          });
        }
      });
    }

    return clusters.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
  };

  const analyzeTemporalPatterns = async (data) => {
    const patterns = [];

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
    const peakHour = Object.entries(hourlySymptoms)
      .filter(([hour, data]) => data.count > 0)
      .sort(([,a], [,b]) => b.count - a.count)[0];

    if (peakHour && peakHour[1].count >= 3) {
      const hour = parseInt(peakHour[0]);
      const timeOfDay = hour < 6 ? 'Early Morning' : 
                      hour < 12 ? 'Morning' :
                      hour < 17 ? 'Afternoon' :
                      hour < 21 ? 'Evening' : 'Night';
      
      patterns.push({
        type: 'time_of_day',
        pattern: `${timeOfDay} Peak`,
        description: `Most symptoms occur around ${hour}:00`,
        frequency: peakHour[1].count,
        avgSeverity: parseFloat((peakHour[1].totalSeverity / peakHour[1].count).toFixed(1))
      });
    }

    // Day of week patterns
    const dailySymptoms = {};
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    dayNames.forEach(day => {
      dailySymptoms[day] = { count: 0, totalSeverity: 0 };
    });

    data.symptoms.forEach(symptom => {
      const day = dayNames[new Date(symptom.timestamp).getDay()];
      dailySymptoms[day].count++;
      dailySymptoms[day].totalSeverity += symptom.severity;
    });

    const avgDailyCount = data.symptoms.length / 7;
    const significantDays = Object.entries(dailySymptoms)
      .filter(([day, data]) => data.count > avgDailyCount * 1.5 && data.count >= 3)
      .sort(([,a], [,b]) => b.count - a.count);

    if (significantDays.length > 0) {
      const [dayName, dayData] = significantDays[0];
      patterns.push({
        type: 'day_of_week',
        pattern: `${dayName} Pattern`,
        description: `${Math.round(((dayData.count / avgDailyCount) - 1) * 100)}% more symptoms on ${dayName}s`,
        frequency: dayData.count,
        avgSeverity: parseFloat((dayData.totalSeverity / dayData.count).toFixed(1))
      });
    }

    return patterns;
  };

  const analyzeCorrelations = async (data) => {
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

    // Find symptoms that often occur on the same day
    const symptomTypes = Object.keys(symptomGroups).filter(type => symptomGroups[type].length >= 3);
    
    for (let i = 0; i < symptomTypes.length; i++) {
      for (let j = i + 1; j < symptomTypes.length; j++) {
        const symptomA = symptomTypes[i];
        const symptomB = symptomTypes[j];
        
        const datesA = new Set(symptomGroups[symptomA].map(s => new Date(s.timestamp).toDateString()));
        const datesB = new Set(symptomGroups[symptomB].map(s => new Date(s.timestamp).toDateString()));
        
        // Find intersection (days when both symptoms occurred)
        const intersection = [...datesA].filter(date => datesB.has(date));
        
        if (intersection.length >= 2) {
          const correlationStrength = intersection.length / Math.min(datesA.size, datesB.size);
          
          correlations.push({
            symptomA,
            symptomB,
            coOccurrences: intersection.length,
            strength: Math.round(correlationStrength * 100),
            pattern: `${symptomA} & ${symptomB}`,
            description: `Occur together ${Math.round(correlationStrength * 100)}% of the time`
          });
        }
      }
    }

    return correlations
      .filter(c => c.strength >= 30) // Only show correlations above 30%
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 5);
  };

  const analyzeTrends = async (data) => {
    const trends = [];
    
    if (data.symptoms.length < 7) return trends;

    // Split data into two halves to compare trends
    const sortedSymptoms = data.symptoms.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const midPoint = Math.floor(sortedSymptoms.length / 2);
    const firstHalf = sortedSymptoms.slice(0, midPoint);
    const secondHalf = sortedSymptoms.slice(midPoint);

    // Overall severity trend
    const firstHalfAvg = firstHalf.reduce((sum, s) => sum + s.severity, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, s) => sum + s.severity, 0) / secondHalf.length;
    const severityChange = secondHalfAvg - firstHalfAvg;
    const severityChangePercent = Math.round((severityChange / firstHalfAvg) * 100);

    if (Math.abs(severityChangePercent) >= 10) {
      trends.push({
        type: 'overall_severity',
        trend: severityChange > 0 ? 'increasing' : 'decreasing',
        change: Math.abs(severityChangePercent),
        description: `Average severity ${severityChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(severityChangePercent)}%`,
        current: parseFloat(secondHalfAvg.toFixed(1)),
        previous: parseFloat(firstHalfAvg.toFixed(1))
      });
    }

    // Frequency trend
    const firstHalfDays = (new Date(firstHalf[firstHalf.length - 1].timestamp) - new Date(firstHalf[0].timestamp)) / (1000 * 60 * 60 * 24) + 1;
    const secondHalfDays = (new Date(secondHalf[secondHalf.length - 1].timestamp) - new Date(secondHalf[0].timestamp)) / (1000 * 60 * 60 * 24) + 1;
    
    const firstHalfFreq = firstHalf.length / firstHalfDays;
    const secondHalfFreq = secondHalf.length / secondHalfDays;
    const freqChange = ((secondHalfFreq - firstHalfFreq) / firstHalfFreq) * 100;

    if (Math.abs(freqChange) >= 20) {
      trends.push({
        type: 'frequency',
        trend: freqChange > 0 ? 'increasing' : 'decreasing',
        change: Math.abs(Math.round(freqChange)),
        description: `Symptom frequency ${freqChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(Math.round(freqChange))}%`,
        current: parseFloat(secondHalfFreq.toFixed(1)),
        previous: parseFloat(firstHalfFreq.toFixed(1))
      });
    }

    return trends;
  };

  const getTimeframeName = () => {
    switch (selectedTimeframe) {
      case 'week': return 'Past Week';
      case 'month': return 'Past Month';  
      case 'quarter': return 'Past 3 Months';
      case 'year': return 'Past Year';
      default: return 'Past Month';
    }
  };
  const hasInsufficientData = analyticsData.symptoms.length < 5;

  return (
    <div className="flex flex-col gap-6">
      {/* Streamlined Header */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-heading-1">Health Analytics</h2>
              <p className="text-body">Advanced insights and pattern recognition</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <AnalyticsIcon size={20} />
            </div>
          </div>
          
          {/* Compact Summary */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <AnalyticsIcon size={20} />
              </div>
              <div>
                <div className="text-body-small">Analysis Period</div>
                <div className="text-lg font-bold text-metric">{getTimeframeName()}</div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-bold text-primary-600">{analyticsData.symptoms.length}</div>
                <div className="text-xs text-slate-600">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-success-600">
                  {insights.medicationEffectiveness.length + insights.symptomClusters.length + insights.temporalPatterns.length}
                </div>
                <div className="text-xs text-slate-600">Insights</div>
              </div>
            </div>
          </div>
        </div>
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

      {/* Main Analytics Content */}
      {hasInsufficientData ? (
        <div className="health-card text-center py-12">
          <div className="health-card-body">
            <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AnalyticsIcon size={32} color="#64748B" />
            </div>
            <h3 className="text-heading-3 mb-2">Need More Data</h3>
            <p className="text-body text-slate-600 mb-4">
              Advanced analytics require at least 5 symptom entries to generate meaningful insights.
            </p>
            <p className="text-body-small text-slate-500">
              Continue tracking symptoms and medications to unlock personalized health insights.
            </p>
          </div>
        </div>
      ) : loadingAnalysis ? (
        <div className="health-card text-center py-12">
          <div className="health-card-body">
            <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <AnalyticsIcon size={32} />
            </div>
            <h3 className="text-heading-3 mb-2">Processing Analytics</h3>
            <p className="text-body text-slate-600">
              Analyzing your health data for patterns and insights...
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Medication Effectiveness */}
          {insights.medicationEffectiveness.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <PillIcon />
                  <h3 className="text-heading-3">Medication Effectiveness</h3>
                </div>
                
                <div className="space-y-3">
                  {insights.medicationEffectiveness.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 mb-1">{med.medicationName}</div>
                        <div className="text-body-small text-slate-600">
                          {med.effectivenessRate}% effective • {med.dataPoints} doses analyzed
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            med.avgImprovement > 0 ? 'text-success-600' : 
                            med.avgImprovement < 0 ? 'text-error-600' : 'text-slate-600'
                          }`}>
                            {med.avgImprovement > 0 ? '+' : ''}{med.avgImprovement}
                          </div>
                          <div className="text-xs text-slate-600">avg improvement</div>
                        </div>
                        {med.trend === 'improving' ? (
                          <TrendUpIcon />
                        ) : med.trend === 'worsening' ? (
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

          {/* Symptom Clusters */}
          {insights.symptomClusters.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="#F59E0B" strokeWidth="2"/>
                    <circle cx="12" cy="5" r="2" stroke="#F59E0B" strokeWidth="2"/>
                    <circle cx="12" cy="19" r="2" stroke="#F59E0B" strokeWidth="2"/>
                    <circle cx="5" cy="12" r="2" stroke="#F59E0B" strokeWidth="2"/>
                    <circle cx="19" cy="12" r="2" stroke="#F59E0B" strokeWidth="2"/>
                  </svg>
                  <h3 className="text-heading-3">Symptom Clusters</h3>
                </div>
                
                <div className="space-y-3">
                  {insights.symptomClusters.map((cluster, index) => (
                    <div key={index} className="p-4 bg-warning-50 rounded-lg border border-warning-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-warning-900">{cluster.symptoms}</div>
                        <div className="text-sm font-bold text-warning-700">{cluster.frequency}x</div>
                      </div>
                      <div className="text-body-small text-warning-700">
                        Average severity: {cluster.avgSeverity} • Most recent: {new Date(cluster.recentDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Temporal Patterns */}
          {insights.temporalPatterns.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <ClockIcon />
                  <h3 className="text-heading-3">Timing Patterns</h3>
                </div>
                
                <div className="space-y-3">
                  {insights.temporalPatterns.map((pattern, index) => (
                    <div key={index} className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-primary-900">{pattern.pattern}</div>
                        <div className="text-sm font-bold text-primary-700">{pattern.frequency} events</div>
                      </div>
                      <div className="text-body-small text-primary-700 mb-2">
                        {pattern.description}
                      </div>
                      <div className="text-xs text-primary-600">
                        Average severity: {pattern.avgSeverity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Correlations */}
          {insights.correlations.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#7C3AED" strokeWidth="2" fill="none"/>
                  </svg>
                  <h3 className="text-heading-3">Symptom Correlations</h3>
                </div>
                
                <div className="space-y-3">
                  {insights.correlations.map((correlation, index) => (
                    <div key={index} className="p-4 bg-secondary-50 rounded-lg border border-secondary-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-secondary-900">{correlation.pattern}</div>
                        <div className="text-sm font-bold text-secondary-700">{correlation.strength}%</div>
                      </div>
                      <div className="text-body-small text-secondary-700">
                        {correlation.description} • {correlation.coOccurrences} co-occurrences
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Trends */}
          {insights.trends.length > 0 && (
            <div className="health-card">
              <div className="health-card-body">
                <div className="flex items-center gap-2 mb-4">
                  <AnalyticsIcon size={16} />
                  <h3 className="text-heading-3">Health Trends</h3>
                </div>
                
                <div className="space-y-3">
                  {insights.trends.map((trend, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      trend.trend === 'increasing' ? 'bg-error-50 border-error-200' : 'bg-success-50 border-success-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`font-semibold ${
                          trend.trend === 'increasing' ? 'text-error-900' : 'text-success-900'
                        }`}>
                          {trend.type === 'overall_severity' ? 'Severity Trend' : 'Frequency Trend'}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-bold ${
                            trend.trend === 'increasing' ? 'text-error-700' : 'text-success-700'
                          }`}>
                            {trend.change}% {trend.trend}
                          </div>
                          {trend.trend === 'increasing' ? <TrendUpIcon color="#DC2626" /> : <TrendDownIcon color="#059669" />}
                        </div>
                      </div>
                      <div className={`text-body-small ${
                        trend.trend === 'increasing' ? 'text-error-700' : 'text-success-700'
                      }`}>
                        {trend.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No Insights Found */}
          {insights.medicationEffectiveness.length === 0 && 
           insights.symptomClusters.length === 0 && 
           insights.temporalPatterns.length === 0 && 
           insights.correlations.length === 0 && 
           insights.trends.length === 0 && (
            <div className="health-card text-center py-12">
              <div className="health-card-body">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <AnalyticsIcon size={32} color="#64748B" />
                </div>
                <h3 className="text-heading-3 mb-2">No Clear Patterns Yet</h3>
                <p className="text-body text-slate-600 mb-4">
                  Your data doesn't show strong patterns in the selected timeframe.
                </p>
                <p className="text-body-small text-slate-500">
                  Try selecting a longer timeframe or continue tracking to build more comprehensive insights.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer Information */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
        <h4 className="text-primary-900 font-semibold mb-3 flex items-center gap-2">
          <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
            </svg>
          </div>
          Understanding Your Analytics
        </h4>
        <div className="text-primary-800 text-sm leading-relaxed space-y-2">
          <div>• <strong>Medication Effectiveness:</strong> Compares symptoms 6 hours before vs 24 hours after doses</div>
          <div>• <strong>Symptom Clusters:</strong> Identifies symptoms that frequently occur together</div>
          <div>• <strong>Timing Patterns:</strong> Reveals when symptoms are most likely to occur</div>
          <div>• <strong>Correlations:</strong> Shows relationships between different symptoms</div>
          <div>• <strong>Trends:</strong> Tracks changes in symptom severity and frequency over time</div>
        </div>
        <p className="text-primary-700 text-xs mt-4 italic">
          These insights are based on your personal tracking data and should be discussed with your healthcare provider.
        </p>
      </div>
    </div>
  );
};

export default HealthAnalytics;
