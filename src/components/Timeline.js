import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const TimelineIcon = ({ color = "#3B82F6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const FilterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SymptomsIcon = ({ severity, size = 20, color }) => {
  const getColor = () => {
    if (color) return color;
    if (severity) {
      if (severity <= 3) return '#059669';
      if (severity <= 6) return '#D97706'; 
      return '#DC2626';
    }
    return '#64748B';
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 11H15M9 15H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.8945 18.9999 9.14881 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" 
            stroke={getColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
};

const MedsIcon = ({ size = 20, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4.5 12.75L6 11.25L10.5 15.75L18 8.25L19.5 9.75L10.5 18.75L4.5 12.75Z" 
          fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [showFilters, setShowFilters] = useState(false);

  // Load and combine data from localStorage
  useEffect(() => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');

    // Transform symptoms to timeline format
    const symptomEvents = symptoms.map(symptom => ({
      id: `symptom-${symptom.id}`,
      type: 'symptom',
      title: symptom.name,
      severity: symptom.severity,
      notes: symptom.notes,
      timestamp: symptom.timestamp,
      date: symptom.date,
      time: symptom.time
    }));

    // Transform medication logs to timeline format
    const medicationEvents = medicationLogs.map(log => ({
      id: `medication-${log.id}`,
      type: 'medication',
      title: log.medicationName,
      dosage: log.dosage,
      timestamp: log.timestamp,
      date: log.date,
      time: log.time
    }));

    // Combine and sort by timestamp (newest first)
    const combined = [...symptomEvents, ...medicationEvents]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setTimelineData(combined);
  }, []);

  // Apply filters whenever data or filters change
  useEffect(() => {
    let filtered = timelineData;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    // Filter by date range
    const now = new Date();
    let startDate = new Date();
    
    switch(dateRange) {
      case '1day':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate = new Date(0); // All time
    }

    if (dateRange !== 'all') {
      filtered = filtered.filter(item => 
        new Date(item.timestamp) >= startDate
      );
    }

    setFilteredData(filtered);
  }, [timelineData, filterType, dateRange]);

  const getSeverityLabel = (severity) => {
    if (severity <= 3) return 'Mild';
    if (severity <= 6) return 'Moderate';
    return 'Severe';
  };

  // Group events by date
  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const date = event.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });

    // Sort dates (newest first)
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));
    
    return sortedDates.map(date => ({
      date,
      events: grouped[date].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const groupedData = groupEventsByDate(filteredData);

  const getStats = () => {
    const symptoms = filteredData.filter(item => item.type === 'symptom').length;
    const medications = filteredData.filter(item => item.type === 'medication').length;
    const total = filteredData.length;
    return { symptoms, medications, total };
  };

  const stats = getStats();

  return (
    <div className="flex flex-col gap-6">
      {/* Streamlined Header */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-heading-1">Health Timeline</h2>
              <p className="text-body">Track patterns in your health journey</p>
            </div>
            <button 
              className={`btn ${showFilters ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon />
              Filter
            </button>
          </div>
          
          {/* Compact Daily Summary */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <TimelineIcon color="var(--primary-600)" size={20} />
              </div>
              <div>
                <div className="text-body-small">Total Events</div>
                <div className="text-lg font-bold text-metric">{stats.total}</div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-bold text-error-600">{stats.symptoms}</div>
                <div className="text-xs text-slate-600">Symptoms</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-success-600">{stats.medications}</div>
                <div className="text-xs text-slate-600">Medications</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <div className="health-card">
          <div className="health-card-body">
            <h3 className="text-heading-3 mb-4">Filter Timeline</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Show:</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: 'all', label: 'All Events' },
                    { value: 'symptom', label: 'Symptoms' },
                    { value: 'medication', label: 'Medications' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilterType(option.value)}
                      className={`btn btn-sm ${filterType === option.value ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time Range:</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: '1day', label: 'Today' },
                    { value: '7days', label: '7 Days' },
                    { value: '30days', label: '30 Days' },
                    { value: '90days', label: '3 Months' },
                    { value: 'all', label: 'All Time' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setDateRange(option.value)}
                      className={`btn btn-sm ${dateRange === option.value ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Content */}
      {filteredData.length === 0 ? (
        <div className="health-card text-center py-12">
          <div className="health-card-body">
            <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <TimelineIcon color="var(--primary-600)" size={24} />
            </div>
            <h3 className="text-heading-3 mb-2">No events found</h3>
            <p className="text-body text-slate-600">
              {filterType === 'all' 
                ? 'Start tracking symptoms or medications to see your timeline.'
                : `No ${filterType} events found in the selected time range.`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedData.map((group) => (
            <div key={group.date} className="health-card">
              <div className="health-card-body">
                {/* Date Header */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
                  <CalendarIcon size={18} />
                  <h3 className="text-heading-3">{formatDate(group.date)}</h3>
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                    {group.events.length} event{group.events.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Timeline Events */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />

                  <div className="space-y-6">
                    {group.events.map((event) => (
                      <div key={event.id} className="flex gap-4 relative">
                        {/* Timeline Dot */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm z-10 ${
                          event.type === 'symptom' 
                            ? event.severity <= 3 ? 'bg-success-500' : event.severity <= 6 ? 'bg-warning-500' : 'bg-error-500'
                            : 'bg-success-500'
                        }`}>
                          {event.type === 'symptom' ? (
                            <SymptomsIcon color="white" size={16} />
                          ) : (
                            <MedsIcon color="white" size={16} />
                          )}
                        </div>

                        {/* Event Card */}
                        <div className={`flex-1 p-4 rounded-lg border ${
                          event.type === 'symptom' 
                            ? event.severity <= 3 ? 'bg-success-50 border-success-200' : event.severity <= 6 ? 'bg-warning-50 border-warning-200' : 'bg-error-50 border-error-200'
                            : 'bg-success-50 border-success-200'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-heading-4 text-slate-900">{event.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <ClockIcon size={12} />
                              {event.time}
                            </div>
                          </div>

                          {/* Event-specific details */}
                          <div className="flex items-center gap-2 mb-2">
                            {event.type === 'symptom' && (
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
                                event.severity <= 3 ? 'bg-success-600' : event.severity <= 6 ? 'bg-warning-600' : 'bg-error-600'
                              }`}>
                                {event.severity}/10 {getSeverityLabel(event.severity)}
                              </span>
                            )}
                            
                            {event.type === 'medication' && event.dosage && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-success-700 border border-success-200">
                                {event.dosage} taken
                              </span>
                            )}
                          </div>

                          {event.notes && (
                            <div className="bg-white/70 rounded p-3 text-sm text-slate-700 italic">
                              "{event.notes}"
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pattern Recognition Tip */}
      {filteredData.length > 5 && (
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
          <h4 className="text-primary-900 font-semibold mb-2 flex items-center gap-2">
            <div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M9.663 17H4a2 2 0 01-2-2V9a2 2 0 012-2h5.663M12 2l3.326 9H22l-7 5 2.674 8L12 19l-5.674 5L9 16l-7-5h6.674L12 2z" 
                      fill="white"/>
              </svg>
            </div>
            Pattern Recognition
          </h4>
          <p className="text-primary-800 text-sm leading-relaxed">
            Your timeline helps identify health patterns. Look for connections between symptoms, timing, and treatments to discuss with your healthcare provider.
          </p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
