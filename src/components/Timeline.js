import React, { useState, useEffect } from 'react';
import { 
  TimelineIcon,
  FilterIcon, 
  SymptomsIcon, 
  MedsIcon, 
  CalendarIcon,
  ClockIcon,
  ChevronDownIcon,
  getSeverityColor,
  getSeverityBgColor,
  getSeverityLabel
} from './Icons';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#3B82F6',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TimelineIcon color="#FFFFFF" size={24} />
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0'
            }}>
              Health Timeline
            </h2>
            <p style={{ 
              color: '#64748B', 
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              See your symptoms and medications in chronological order to identify patterns
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
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
              fontSize: '1.75rem',
              fontWeight: '700',
              color: stats.symptoms > 0 ? '#DC2626' : '#9CA3AF',
              margin: '0 0 0.25rem 0'
            }}>
              {stats.symptoms}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#991B1B',
              fontWeight: '600'
            }}>
              Symptoms
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
              fontSize: '1.75rem',
              fontWeight: '700',
              color: stats.medications > 0 ? '#059669' : '#9CA3AF',
              margin: '0 0 0.25rem 0'
            }}>
              {stats.medications}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#047857',
              fontWeight: '600'
            }}>
              Medications
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
              fontSize: '1.75rem',
              fontWeight: '700',
              color: stats.total > 0 ? '#1E40AF' : '#9CA3AF',
              margin: '0 0 0.25rem 0'
            }}>
              {stats.total}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#1E40AF',
              fontWeight: '600'
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
            color: '#374151',
            border: '1px solid #E2E8F0',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#F1F5F9'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#F8FAFC'}
        >
          <FilterIcon />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          <ChevronDownIcon 
            size={16} 
            style={{ 
              transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} 
          />
        </button>
      </div>

      {/* Filter Controls */}
      {showFilters && (
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
                Event Type:
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
                      padding: '0.5rem 0.75rem',
                      backgroundColor: filterType === option.value ? '#3B82F6' : '#F8FAFC',
                      color: filterType === option.value ? 'white' : '#374151',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (filterType !== option.value) {
                        e.target.style.backgroundColor = '#F1F5F9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filterType !== option.value) {
                        e.target.style.backgroundColor = '#F8FAFC';
                      }
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
                      padding: '0.5rem 0.75rem',
                      backgroundColor: dateRange === option.value ? '#3B82F6' : '#F8FAFC',
                      color: dateRange === option.value ? 'white' : '#374151',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (dateRange !== option.value) {
                        e.target.style.backgroundColor = '#F1F5F9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (dateRange !== option.value) {
                        e.target.style.backgroundColor = '#F8FAFC';
                      }
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
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#EFF6FF',
            borderRadius: '32px',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TimelineIcon color="#3B82F6" size={32} />
          </div>
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 0.5rem 0'
          }}>
            No events found
          </h3>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem',
            color: '#64748B',
            lineHeight: '1.5'
          }}>
            {filterType === 'all' 
              ? 'Start tracking symptoms or medications to see your timeline.'
              : `No ${filterType} events found in the selected time range.`
            }
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {groupedData.map((group, groupIndex) => (
            <div key={group.date} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              {/* Date Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E2E8F0'
              }}>
                <CalendarIcon size={20} color="#3B82F6" />
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1E293B',
                  margin: 0
                }}>
                  {formatDate(group.date)}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#64748B',
                  fontWeight: '500',
                  backgroundColor: '#F1F5F9',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px'
                }}>
                  {group.events.length} event{group.events.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Timeline Events */}
              <div style={{ position: 'relative' }}>
                {/* Timeline Line */}
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '0',
                  bottom: '0',
                  width: '2px',
                  backgroundColor: '#E2E8F0'
                }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {group.events.map((event, eventIndex) => (
                    <div key={event.id} style={{
                      display: 'flex',
                      gap: '1rem',
                      position: 'relative'
                    }}>
                      {/* Timeline Dot */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '20px',
                        backgroundColor: event.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '3px solid white',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        zIndex: 1
                      }}>
                        {event.type === 'symptom' ? (
                          <SymptomsIcon color="white" size={20} />
                        ) : (
                          <MedsIcon color="white" size={20} />
                        )}
                      </div>

                      {/* Event Card */}
                      <div style={{
                        flex: 1,
                        backgroundColor: event.bgColor,
                        border: `1px solid ${event.color}`,
                        borderRadius: '12px',
                        padding: '1rem'
                      }}>
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
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            color: '#64748B',
                            fontWeight: '500'
                          }}>
                            <ClockIcon size={12} />
                            {event.time}
                          </div>
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
                        
                        {event.type === 'medication' && event.dosage && (
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
                            borderRadius: '8px',
                            lineHeight: '1.4'
                          }}>
                            "{event.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pattern Recognition Tip */}
      {filteredData.length > 5 && (
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
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#3B82F6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem'
            }}>
              💡
            </div>
            Pattern Recognition
          </h4>
          <p style={{
            color: '#1E40AF',
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.6'
          }}>
            Building your health timeline helps identify patterns. Look for connections: Do symptoms occur at certain times? 
            Do you feel better after taking medications? Share these insights with your healthcare provider during appointments.
          </p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
