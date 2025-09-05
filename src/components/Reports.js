import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
// Enhanced Chart Components with Medical Styling
const CustomTooltip = ({ active, payload, label, type = 'default' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="text-sm font-medium text-slate-800 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
            {type === 'severity' && '/10'}
            {type === 'percentage' && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SeverityTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">📊</div>
          <p className="text-slate-600">No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="severityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-200)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <YAxis 
            domain={[0, 10]}
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <Tooltip content={<CustomTooltip type="severity" />} />
          <Area
            type="monotone"
            dataKey="avgSeverity"
            stroke="var(--primary-600)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#severityGradient)"
            name="Average Severity"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const MedicationAdherenceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">💊</div>
          <p className="text-slate-600">No medication data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-200)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <YAxis 
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="var(--success-500)"
            name="Medications Taken"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DayPatternsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">📅</div>
          <p className="text-slate-600">No pattern data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-200)" />
          <XAxis 
            dataKey="day" 
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <YAxis 
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="var(--secondary-500)"
            name="Symptom Count"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
const TimePatternsChart = ({ data }) => {
  const COLORS = ['var(--primary-500)', 'var(--secondary-500)', 'var(--success-500)', 'var(--warning-500)', 'var(--error-500)'];
  
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">🕐</div>
          <p className="text-slate-600">No time pattern data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="percentage"
            nameKey="period"
            label={({ period, percentage }) => `${period.split('(')[0].trim()}: ${percentage}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip type="percentage" />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const SeverityDistributionChart = ({ data }) => {
  const COLORS = ['var(--success-500)', 'var(--warning-500)', 'var(--error-500)'];
  
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">📊</div>
          <p className="text-slate-600">No severity data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip type="percentage" />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const SymptomFrequencyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">📈</div>
          <p className="text-slate-600">No symptom frequency data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-200)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--slate-500)" 
            fontSize={11}
            tick={{ fill: 'var(--slate-600)' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-800 mb-1">{data.fullName}</p>
                    <p className="text-sm text-primary-600">
                      Count: <span className="font-semibold">{data.count}</span>
                    </p>
                    <p className="text-sm text-slate-600">
                      Percentage: <span className="font-semibold">{data.percentage}%</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="count" 
            fill="var(--primary-500)"
            name="Symptom Count"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const MedicationTimingChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <div className="text-slate-400 mb-2">⏱️</div>
          <p className="text-slate-600">No timing pattern data available</p>
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    medication: item.medicationName.length > 15 ? item.medicationName.substring(0, 15) + '...' : item.medicationName,
    fullName: item.medicationName,
    improvementRate: item.improvementRate,
    avgChange: item.avgSeverityChange,
    confidence: item.confidence
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-200)" />
          <XAxis 
            dataKey="medication" 
            stroke="var(--slate-500)" 
            fontSize={11}
            tick={{ fill: 'var(--slate-600)' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[0, 100]}
            stroke="var(--slate-500)" 
            fontSize={12}
            tick={{ fill: 'var(--slate-600)' }}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                    <p className="text-sm font-medium text-slate-800 mb-1">{data.fullName}</p>
                    <p className="text-sm text-primary-600">
                      Improvement Rate: <span className="font-semibold">{data.improvementRate}%</span>
                    </p>
                    <p className="text-sm text-slate-600">
                      Avg Change: <span className="font-semibold">{data.avgChange}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Confidence: {data.confidence}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="improvementRate" 
            fill="var(--primary-500)"
            name="Improvement Rate"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
// Data Processing Functions for Visualizations
const processDataForCharts = (symptoms, medicationLogs, timeframe = 'month') => {
  const now = new Date();
  const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : timeframe === 'quarter' ? 90 : 365;
  
  // Generate date range
  const dateRange = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    dateRange.push(date.toISOString().split('T')[0]);
  }

  // Process severity trend data
  const severityTrendData = dateRange.map(date => {
    const daySymptoms = symptoms.filter(s => 
      new Date(s.timestamp).toISOString().split('T')[0] === date
    );
    
    const avgSeverity = daySymptoms.length > 0 
      ? daySymptoms.reduce((sum, s) => sum + s.severity, 0) / daySymptoms.length 
      : 0;
    
    return {
      date: formatDateForChart(date),
      avgSeverity: parseFloat(avgSeverity.toFixed(1)),
      count: daySymptoms.length
    };
  });

  // Process medication adherence data
  const medicationTrendData = dateRange.map(date => {
    const dayMeds = medicationLogs.filter(log => 
      new Date(log.timestamp).toISOString().split('T')[0] === date
    );
    
    return {
      date: formatDateForChart(date),
      count: dayMeds.length
    };
  });

  return { severityTrendData, medicationTrendData };
};

const formatDateForChart = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

const processDayPatternsForChart = (dayPatterns) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Create a complete dataset with all days of the week
  const chartData = daysOfWeek.map(day => {
    const pattern = dayPatterns.find(p => p.day === day);
    return {
      day: day.substring(0, 3), // Shorten for chart display
      count: pattern ? pattern.count : 0,
      avgSeverity: pattern ? parseFloat(pattern.avgSeverity) : 0
    };
  });

  return chartData;
};

const processTimePatternsForChart = (timePatterns) => {
  return timePatterns.map(pattern => ({
    period: pattern.period,
    percentage: pattern.percentage,
    count: pattern.count,
    avgSeverity: parseFloat(pattern.avgSeverity)
  }));
};

const processSymptomFrequencyData = (symptoms) => {
  const symptomCounts = {};
  symptoms.forEach(symptom => {
    symptomCounts[symptom.name] = (symptomCounts[symptom.name] || 0) + 1;
  });

  return Object.entries(symptomCounts)
    .map(([name, count]) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      fullName: name,
      count,
      percentage: Math.round((count / symptoms.length) * 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Show top 6 symptoms
};

const processSeverityDistribution = (symptoms) => {
  const distribution = { mild: 0, moderate: 0, severe: 0 };
  
  symptoms.forEach(symptom => {
    if (symptom.severity <= 3) distribution.mild++;
    else if (symptom.severity <= 6) distribution.moderate++;
    else distribution.severe++;
  });

  return [
    { name: 'Mild (1-3)', value: distribution.mild, percentage: Math.round((distribution.mild / symptoms.length) * 100) },
    { name: 'Moderate (4-6)', value: distribution.moderate, percentage: Math.round((distribution.moderate / symptoms.length) * 100) },
    { name: 'Severe (7-10)', value: distribution.severe, percentage: Math.round((distribution.severe / symptoms.length) * 100) }
  ].filter(item => item.value > 0);
};
// Main Reports Component with Enhanced Chart Data Processing
const Reports = ({ onExport }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [timeframe, setTimeframe] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState({});
  const [patterns, setPatterns] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [medicationLogs, setMedicationLogs] = useState([]);
  
  // New chart data state
  const [chartData, setChartData] = useState({
    severityTrend: [],
    medicationTrend: [],
    dayPatterns: [],
    timePatterns: [],
    symptomFrequency: [],
    severityDistribution: [],
    medicationTiming: []
  });

    // Add the data loading useEffect here (BEFORE the existing useEffect):
  useEffect(() => {
    // Load data from localStorage
    const savedSymptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const savedMedicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');
    
    setSymptoms(savedSymptoms);
    setMedicationLogs(savedMedicationLogs);
  }, []); // Run once when component mounts
  
  useEffect(() => {
    generateReports();
  }, [symptoms, medicationLogs, timeframe]);

  const generateReports = () => {
    setIsLoading(true);
    
    // Your existing statistics generation code here...
    const stats = generateStatistics();
    const dayPatterns = generateDayPatterns();
    const timePatterns = generateTimePatterns();
    const correlations = generateCorrelations();
    const medAnalytics = generateMedicationAnalytics();
    
    setStatistics(stats);
    setPatterns({ dayPatterns, timePatterns });
    setAnalytics({ correlations, medicationAnalytics: medAnalytics });
    
    // Process data for charts
    const { severityTrendData, medicationTrendData } = processDataForCharts(symptoms, medicationLogs, timeframe);
    const dayPatternsChartData = processDayPatternsForChart(dayPatterns);
    const timePatternsChartData = processTimePatternsForChart(timePatterns);
    const symptomFrequencyData = processSymptomFrequencyData(symptoms);
    const severityDistributionData = processSeverityDistribution(symptoms);
    
    setChartData({
      severityTrend: severityTrendData,
      medicationTrend: medicationTrendData,
      dayPatterns: dayPatternsChartData,
      timePatterns: timePatternsChartData,
      symptomFrequency: symptomFrequencyData,
      severityDistribution: severityDistributionData,
      medicationTiming: medAnalytics.slice(0, 5) // Top 5 for chart display
    });
    
    setIsLoading(false);
  };
  // Enhanced Summary Tab JSX (replace your existing Summary tab content)
  const renderSummaryTab = () => (
    <div className="space-y-6">
      {/* Timeframe Selection */}
      <div className="flex justify-center mb-6">
<div className="bg-slate-100 rounded-lg p-1 flex gap-1">
    {['week', 'month', 'quarter', 'year'].map((period) => (
  
      <button
    key={period}
    onClick={() => setTimeframe(period)}
    className={timeframe === period ? 'btn-primary' : 'btn-secondary'}
    style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', flex: 1 }}
  >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Symptoms</p>
              <p className="text-2xl font-bold text-slate-900">{statistics.totalSymptoms || 0}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <ChartIcon size={20} color="var(--primary-600)" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Average Severity</p>
              <p className="text-2xl font-bold text-slate-900">{statistics.avgSeverity || '0.0'}</p>
            </div>
            <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
              <WarningIcon size={20} color="var(--warning-600)" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Medications Taken</p>
              <p className="text-2xl font-bold text-slate-900">{statistics.totalMedications || 0}</p>
            </div>
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <PillIcon size={20} color="var(--success-600)" />
            </div>
          </div>
        </div>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <TrendsIcon size={20} color="var(--primary-600)" />
            <span className="ml-2">Symptom Severity Trends</span>
          </h3>
          <SeverityTrendChart data={chartData.severityTrend} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <PillIcon size={20} color="var(--success-600)" />
            <span className="ml-2">Medication Adherence</span>
          </h3>
          <MedicationAdherenceChart data={chartData.medicationTrend} />
        </div>
      </div>

      {/* Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Symptom Frequency</h3>
          <SymptomFrequencyChart data={chartData.symptomFrequency} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Severity Distribution</h3>
          <SeverityDistributionChart data={chartData.severityDistribution} />
        </div>
      </div>
    </div>
  );
// Enhanced Insights Tab JSX (replace your existing Insights tab content)
  const renderInsightsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <CalendarIcon size={20} color="var(--primary-600)" />
          <span className="ml-2">Day of Week Patterns</span>
        </h3>
        <DayPatternsChart data={chartData.dayPatterns} />
        
        {patterns.dayPatterns && patterns.dayPatterns.length > 0 && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Pattern Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {patterns.dayPatterns.slice(0, 4).map((pattern, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-600">{pattern.day}:</span>
                  <span className="font-medium text-slate-800">
                    {pattern.count} symptoms (avg: {pattern.avgSeverity})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <ClockIcon size={20} color="var(--secondary-600)" />
          <span className="ml-2">Time of Day Patterns</span>
        </h3>
        <TimePatternsChart data={chartData.timePatterns} />
        
        {patterns.timePatterns && patterns.timePatterns.length > 0 && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Time Distribution</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {patterns.timePatterns.map((pattern, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-600">{pattern.period.split('(')[0].trim()}:</span>
                  <span className="font-medium text-slate-800">
                    {pattern.percentage}% ({pattern.count} occurrences)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Insights Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Pattern Insights</h3>
        <div className="space-y-3">
          {patterns.dayPatterns && patterns.dayPatterns.length > 0 && (
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-slate-700">
                <strong>Most active day:</strong> {patterns.dayPatterns[0]?.day} with {patterns.dayPatterns[0]?.count} symptom reports
              </p>
            </div>
          )}
          
          {patterns.timePatterns && patterns.timePatterns.length > 0 && (
            <div className="flex items-start">
              <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-slate-700">
                <strong>Peak time period:</strong> {patterns.timePatterns[0]?.period.split('(')[0].trim()} ({patterns.timePatterns[0]?.percentage}% of symptoms)
              </p>
            </div>
          )}
          
          {chartData.severityDistribution && chartData.severityDistribution.length > 0 && (
            <div className="flex items-start">
              <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-slate-700">
                <strong>Severity trend:</strong> {chartData.severityDistribution[0]?.name} symptoms are most common ({chartData.severityDistribution[0]?.percentage}%)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
// Enhanced Analytics Tab JSX (replace your existing Analytics tab content)
  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Medication Effectiveness Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <PillIcon size={20} color="var(--success-600)" />
          <span className="ml-2">Medication Effectiveness Analysis</span>
        </h3>
        <MedicationTimingChart data={chartData.medicationTiming} />
        
        {analytics.medicationAnalytics && analytics.medicationAnalytics.length > 0 && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-3">Top Performing Medications</h4>
            <div className="space-y-2">
              {analytics.medicationAnalytics.slice(0, 3).map((med, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div>
                    <span className="font-medium text-slate-800">{med.medicationName}</span>
                    <span className="text-sm text-slate-500 ml-2">({med.confidence})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary-600">
                      {med.improvementRate}% improvement
                    </div>
                    <div className="text-xs text-slate-500">
                      Avg change: {med.avgSeverityChange}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Correlation Analysis */}
      {analytics.correlations && analytics.correlations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <AnalyticsIcon size={20} color="var(--secondary-600)" />
            <span className="ml-2">Symptom Correlations</span>
          </h3>
          
          <div className="space-y-3">
            {analytics.correlations.slice(0, 5).map((correlation, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-slate-800">
                    {correlation.symptom1} ↔ {correlation.symptom2}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Co-occurrence: {correlation.coOccurrenceCount} times
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    correlation.strength === 'Strong' ? 'text-error-600' : 
                    correlation.strength === 'Moderate' ? 'text-warning-600' : 'text-slate-600'
                  }`}>
                    {correlation.strength}
                  </div>
                  <div className="text-xs text-slate-500">
                    {correlation.percentage}% correlation
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Quality & Export Section */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Summary & Export</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{symptoms.length}</div>
            <div className="text-sm text-slate-600">Total Symptoms</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-success-600">{medicationLogs.length}</div>
            <div className="text-sm text-slate-600">Medication Logs</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-secondary-600">
              {Math.ceil((Date.now() - new Date(symptoms[0]?.timestamp || Date.now())) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-sm text-slate-600">Days Tracked</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
  onClick={() => handleShare('copy')}
  className="btn-secondary flex items-center justify-center"
  style={{ flex: 1 }}
>
            <CopyIcon size={16} />
            <span className="ml-2">Copy Report</span>
          </button>
          
          <button
  onClick={() => handleShare('email')}
  className="btn-secondary flex items-center justify-center"
  style={{ flex: 1 }}
>
            <EmailIcon size={16} />
            <span className="ml-2">Email Report</span>
          </button>
          
          {onExport && (
            <button
  onClick={onExport}
  className="btn-primary flex items-center justify-center"
  style={{ flex: 1 }}
>
              <ShareIcon size={16} />
              <span className="ml-2">Export Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Sharing functions (add these helper functions)
  const handleShare = (method) => {
    const reportText = generateReportText();
    
    if (method === 'copy') {
      navigator.clipboard.writeText(reportText).then(() => {
        // Add toast notification if you have one
        console.log('Report copied to clipboard');
      });
    } else if (method === 'email') {
      const subject = encodeURIComponent('TrackRX Health Report');
      const body = encodeURIComponent(reportText);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    }
  };

  const generateReportText = () => {
    return `TrackRX Health Report - ${new Date().toLocaleDateString()}

SUMMARY
=======
Total Symptoms: ${statistics.totalSymptoms || 0}
Average Severity: ${statistics.avgSeverity || '0.0'}
Total Medications: ${statistics.totalMedications || 0}
Timeframe: ${timeframe}

PATTERNS
========
${patterns.dayPatterns ? patterns.dayPatterns.map(p => 
  `${p.day}: ${p.count} symptoms (avg severity: ${p.avgSeverity})`
).join('\n') : 'No pattern data available'}

ANALYTICS
=========
${analytics.medicationAnalytics ? analytics.medicationAnalytics.slice(0, 3).map(med => 
  `${med.medicationName}: ${med.improvementRate}% improvement rate`
).join('\n') : 'No medication analytics available'}

Generated by TrackRX - Medical symptom and medication tracking app
This report is for personal use only and should not replace professional medical advice.`;
  };
// Add your existing helper functions here (generateStatistics, generateDayPatterns, etc.)
  // Keep all your current logic for these functions unchanged

// Helper Functions for Reports Component
  const generateStatistics = () => {
    if (!symptoms || symptoms.length === 0) {
      return {
        totalSymptoms: 0,
        avgSeverity: '0.0',
        totalMedications: 0,
        uniqueSymptoms: 0,
        trackingDays: 0
      };
    }

    // Filter symptoms by timeframe
    const now = new Date();
    const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : timeframe === 'quarter' ? 90 : 365;
    const cutoffDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const filteredSymptoms = symptoms.filter(symptom => 
      new Date(symptom.timestamp) >= cutoffDate
    );
    
    const filteredMedications = medicationLogs.filter(log => 
      new Date(log.timestamp) >= cutoffDate
    );

    const totalSeverity = filteredSymptoms.reduce((sum, symptom) => sum + symptom.severity, 0);
    const avgSeverity = filteredSymptoms.length > 0 
      ? (totalSeverity / filteredSymptoms.length).toFixed(1)
      : '0.0';

    const uniqueSymptoms = new Set(filteredSymptoms.map(s => s.name)).size;
    
    // Calculate tracking days
    const dates = filteredSymptoms.map(s => new Date(s.timestamp).toDateString());
    const uniqueDates = new Set(dates).size;

    return {
      totalSymptoms: filteredSymptoms.length,
      avgSeverity,
      totalMedications: filteredMedications.length,
      uniqueSymptoms,
      trackingDays: uniqueDates
    };
  };

  const generateDayPatterns = () => {
    if (!symptoms || symptoms.length === 0) return [];

    const dayMap = {};
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    symptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp);
      const dayName = daysOfWeek[date.getDay()];
      
      if (!dayMap[dayName]) {
        dayMap[dayName] = { symptoms: [], totalSeverity: 0 };
      }
      
      dayMap[dayName].symptoms.push(symptom);
      dayMap[dayName].totalSeverity += symptom.severity;
    });

    return Object.entries(dayMap).map(([day, data]) => ({
      day,
      count: data.symptoms.length,
      avgSeverity: (data.totalSeverity / data.symptoms.length).toFixed(1),
      percentage: Math.round((data.symptoms.length / symptoms.length) * 100)
    })).sort((a, b) => b.count - a.count);
  };

  const generateTimePatterns = () => {
    if (!symptoms || symptoms.length === 0) return [];

    const timeMap = {
      'Morning (6-12)': { symptoms: [], totalSeverity: 0 },
      'Afternoon (12-18)': { symptoms: [], totalSeverity: 0 },
      'Evening (18-24)': { symptoms: [], totalSeverity: 0 },
      'Night (0-6)': { symptoms: [], totalSeverity: 0 }
    };

    symptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp);
      const hour = date.getHours();
      
      let period;
      if (hour >= 6 && hour < 12) period = 'Morning (6-12)';
      else if (hour >= 12 && hour < 18) period = 'Afternoon (12-18)';
      else if (hour >= 18 && hour < 24) period = 'Evening (18-24)';
      else period = 'Night (0-6)';
      
      timeMap[period].symptoms.push(symptom);
      timeMap[period].totalSeverity += symptom.severity;
    });

    return Object.entries(timeMap)
      .map(([period, data]) => ({
        period,
        count: data.symptoms.length,
        avgSeverity: data.symptoms.length > 0 
          ? (data.totalSeverity / data.symptoms.length).toFixed(1) 
          : '0.0',
        percentage: Math.round((data.symptoms.length / symptoms.length) * 100)
      }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  };

  const generateCorrelations = () => {
    if (!symptoms || symptoms.length < 10) return []; // Need sufficient data

    const correlations = [];
    const symptomsByDay = {};

    // Group symptoms by day
    symptoms.forEach(symptom => {
      const date = new Date(symptom.timestamp).toISOString().split('T')[0];
      if (!symptomsByDay[date]) {
        symptomsByDay[date] = [];
      }
      symptomsByDay[date].push(symptom.name);
    });

    // Find unique symptom names
    const uniqueSymptoms = [...new Set(symptoms.map(s => s.name))];
    
    // Calculate correlations between symptom pairs
    for (let i = 0; i < uniqueSymptoms.length; i++) {
      for (let j = i + 1; j < uniqueSymptoms.length; j++) {
        const symptom1 = uniqueSymptoms[i];
        const symptom2 = uniqueSymptoms[j];
        
        let coOccurrenceCount = 0;
        let totalDays = Object.keys(symptomsByDay).length;
        
        Object.values(symptomsByDay).forEach(daySymptoms => {
          if (daySymptoms.includes(symptom1) && daySymptoms.includes(symptom2)) {
            coOccurrenceCount++;
          }
        });
        
        if (coOccurrenceCount >= 2) { // At least 2 co-occurrences
          const percentage = Math.round((coOccurrenceCount / totalDays) * 100);
          const strength = percentage >= 15 ? 'Strong' : percentage >= 8 ? 'Moderate' : 'Weak';
          
          correlations.push({
            symptom1,
            symptom2,
            coOccurrenceCount,
            percentage,
            strength
          });
        }
      }
    }

    return correlations
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10); // Top 10 correlations
  };

  const generateMedicationAnalytics = () => {
    if (!medicationLogs || medicationLogs.length === 0 || !symptoms || symptoms.length === 0) {
      return [];
    }

    const medicationMap = {};

    // Group medications by name
    medicationLogs.forEach(log => {
      if (!medicationMap[log.medicationName]) {
        medicationMap[log.medicationName] = {
          logs: [],
          beforeSymptoms: [],
          afterSymptoms: []
        };
      }
      medicationMap[log.medicationName].logs.push(log);
    });

    // Analyze each medication's effectiveness
    return Object.entries(medicationMap).map(([medicationName, data]) => {
      const logs = data.logs;
      let improvements = 0;
      let totalComparisons = 0;
      let totalSeverityChange = 0;

      logs.forEach(log => {
        const logTime = new Date(log.timestamp);
        
        // Find symptoms before medication (6 hours before to 1 hour before)
        const beforeSymptoms = symptoms.filter(symptom => {
          const symptomTime = new Date(symptom.timestamp);
          const timeDiff = logTime.getTime() - symptomTime.getTime();
          return timeDiff > 60 * 60 * 1000 && timeDiff <= 6 * 60 * 60 * 1000; // 1-6 hours before
        });

        // Find symptoms after medication (1 hour to 8 hours after)
        const afterSymptoms = symptoms.filter(symptom => {
          const symptomTime = new Date(symptom.timestamp);
          const timeDiff = symptomTime.getTime() - logTime.getTime();
          return timeDiff > 60 * 60 * 1000 && timeDiff <= 8 * 60 * 60 * 1000; // 1-8 hours after
        });

        if (beforeSymptoms.length > 0 && afterSymptoms.length > 0) {
          const beforeAvg = beforeSymptoms.reduce((sum, s) => sum + s.severity, 0) / beforeSymptoms.length;
          const afterAvg = afterSymptoms.reduce((sum, s) => sum + s.severity, 0) / afterSymptoms.length;
          const change = beforeAvg - afterAvg;
          
          totalSeverityChange += change;
          totalComparisons++;
          
          if (change > 0) { // Improvement (severity decreased)
            improvements++;
          }
        }
      });

      const improvementRate = totalComparisons > 0 
        ? Math.round((improvements / totalComparisons) * 100)
        : 0;
      
      const avgSeverityChange = totalComparisons > 0 
        ? (totalSeverityChange / totalComparisons).toFixed(1)
        : '0.0';

      const confidence = totalComparisons >= 5 ? 'High' : 
                        totalComparisons >= 3 ? 'Medium' : 'Low';

      return {
        medicationName,
        improvementRate,
        avgSeverityChange,
        totalComparisons,
        confidence,
        totalDoses: logs.length
      };
    })
    .filter(med => med.totalComparisons > 0) // Only include medications with data
    .sort((a, b) => b.improvementRate - a.improvementRate); // Sort by effectiveness
  };

  // Main render function
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-slate-600">Generating reports...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center mb-2">
          <ReportsIcon size={28} color="var(--primary-600)" />
          <span className="ml-3">Health Reports & Analytics</span>
        </h1>
        <p className="text-slate-600">
          Comprehensive insights from your health tracking data over the past {timeframe}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="border-b border-slate-200">
          <nav className="flex">
            {[
              { id: 'summary', label: 'Summary', icon: ChartIcon },
              { id: 'insights', label: 'Insights', icon: TrendsIcon },
              { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon }
            ].map((tab) => (
              <button
  key={tab.id}
  onClick={() => setActiveTab(tab.id)}
  className={activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}
  style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', flex: 1 }}
>
                <tab.icon 
                  size={16} 
                  color={activeTab === tab.id ? 'var(--primary-600)' : 'var(--slate-500)'} 
                />
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'summary' && renderSummaryTab()}
          {activeTab === 'insights' && renderInsightsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </div>
      </div>

      {/* Data Note */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <p className="text-sm text-slate-600 flex items-start">
          <div className="w-4 h-4 bg-slate-400 rounded-full mt-0.5 mr-2 flex-shrink-0"></div>
          Charts and analytics are based on your logged data from the past {timeframe}. 
          For more accurate insights, ensure consistent daily logging of symptoms and medications.
        </p>
      </div>
    </div>
  );
};

export default Reports;
