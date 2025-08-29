import React, { useState, useEffect } from 'react';

// SVG Icons
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SymptomIcon = ({ severity, size = 20 }) => {
  const getColor = () => {
    if (severity <= 3) return '#10B981';
    if (severity <= 6) return '#F59E0B'; 
    return '#EF4444';
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 11H15M9 15H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.8945 18.9999 9.14881 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" 
            stroke={getColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
};

const MedicationIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
          fill="#10B981" stroke="#10B981" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#64748B" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
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
      time: symptom.time,
      color: getSeverityColor(symptom.severity),
      bgColor: getSeverityBgColor(symptom.severity)
    }));

    // Transform medication logs to timeline format
    const medicationEvents = medicationLogs.map(log => ({
      id: `medication-${log.id}`,
      type: 'medication',
      title: log.medicationName,
      dosage: log.dosage,
      timestamp: log.timestamp,
      date: log.date,
      time: log.time,
      color: '#10B981',
      bgColor: '#ECFDF5'
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

  const getSeverityColor = (severity) => {
    if (severity <= 3) return '#10B981'; // Green - mild
    if (severity <= 6) return '#F59E0B'; // Yellow - moderate  
    return '#EF4444'; // Red - severe
  };

  const getSeverityBgColor = (severity) => {
    if (severity <= 3) return '#ECFDF5'; // Green bg
    if (severity <= 6) return '#FFFBEB'; // Yellow bg 
    return '#FEF2F2'; // Red bg
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1E293B',
          margin: '0 0 0.5rem 0'
        }}>
          Your Health Timeline
        </h2>
        <p style={{ 
          color: '#64748B', 
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          See your symptoms and medications in chronological order to identify patterns.
        </p>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '0.75rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: stats.symptoms > 0 ? '#F59E0B' : '#64748B',
              margin: '0 0 0.25rem 0'
            }}>
              {stats.symptoms}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#64748B',
              fontWeight: '500'
            }}>
              Symptoms
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '0.75rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: stats.medications > 0 ? '#10B981' : '#64748B',
              margin: '0 0 0.25rem 0'
            }}>
              {stats.medications}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#64748B',
              fontWeight: '500'
            }}>
              Medications
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '0.75rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: stats.total > 0 ? '#3B82F6' : '#64748B',
              margin: '0 0 0.25rem 0'
            }}>
              {stats.total}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#64748B',
              fontWeight: '500'
            }}>
              Total Events
            </div>
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            width: '100%',
            backgroundColor: '#F8FAFC',
            color: '#64748B',
            border: '1px solid #E2E8F0',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <FilterIcon />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1E293B',
            margin: '0 0 1rem 0'
          }}>
            Filter Your Timeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Show:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { value: 'all', label: 'All Events' },
                  { value: 'symptom', label: 'Symptoms Only' },
                  { value: 'medication', label: 'Medications Only' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilterType(option.value)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: filterType === option.value ? '#3B82F6' : '#F8FAFC',
                      color: filterType === option.value ? 'white' : '#64748B',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
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
                Time Range:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: dateRange === option.value ? '#3B82F6' : '#F8FAFC',
                      color: dateRange === option.value ? 'white' : '#64748B',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      {filteredData.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem 1rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
          color: '#64748B'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#F1F5F9',
            borderRadius: '32px',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CalendarIcon size={32} />
          </div>
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 0.5rem 0'
          }}>
            No events found
          </h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            {filterType === 'all' 
              ? 'Start tracking symptoms or medications to see your timeline.'
              : `No ${filterType} events found in the selected time range.`
            }
          </p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          {groupedData.map((group, groupIndex) => (
            <div key={group.date} style={{ marginBottom: groupIndex < groupedData.length - 1 ? '2rem' : 0 }}>
              {/* Date Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E2E8F0'
              }}>
                <CalendarIcon />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  margin: 0
                }}>
                  {formatDate(group.date)}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#64748B',
                  backgroundColor: '#F8FAFC',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  {group.events.length} event{group.events.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Events for this date */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {group.events.map((event, eventIndex) => (
                  <div
                    key={event.id}
                    style={{
                      backgroundColor: event.bgColor,
                      border: `1px solid ${event.color}`,
                      borderRadius: '12px',
                      padding: '1rem',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}>
                      {event.type === 'symptom' ? (
                        <SymptomIcon severity={event.severity} />
                      ) : (
                        <MedicationIcon />
                      )}
                      
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '0.5rem'
                        }}>
                          <h4 style={{ 
                            margin: 0, 
                            color: '#1E293B',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {event.title}
                          </h4>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: '#64748B',
                            fontWeight: '500'
                          }}>
                            {event.time}
                          </span>
                        </div>

                        {/* Event-specific details */}
                        {event.type === 'symptom' && (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: event.color,
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            marginBottom: event.notes ? '0.75rem' : 0
                          }}>
                            {event.severity}/10 {getSeverityLabel(event.severity)}
                          </div>
                        )}
                        
                        {event.type === 'medication' && (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            color: event.color,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            border: `1px solid ${event.color}`
                          }}>
                            {event.dosage} taken
                          </div>
                        )}

                        {event.notes && (
                          <p style={{ 
                            margin: '0.75rem 0 0 0', 
                            color: '#4B5563',
                            fontSize: '0.875rem',
                            fontStyle: 'italic',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            padding: '0.75rem',
                            borderRadius: '8px'
                          }}>
                            "{event.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pattern Recognition Tip */}
      {filteredData.length > 5 && (
        <div style={{
          backgroundColor: '#EFF6FF',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #BFDBFE'
        }}>
          <h4 style={{
            color: '#1E40AF',
            fontSize: '1rem',
            fontWeight: '600',
            margin: '0 0 0.5rem 0'
          }}>
            💡 Pattern Recognition
          </h4>
          <p style={{
            color: '#1E40AF',
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            Great job building your health timeline! Look for patterns: Do symptoms occur at certain times? 
            Do you feel better after taking medications? Share these insights with your healthcare provider.
          </p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
