import React, { useState, useEffect } from 'react';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

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
      icon: '📊',
      color: getSeverityColor(symptom.severity)
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
      icon: '💊',
      color: '#16a34a'
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
    if (severity <= 3) return '#16a34a'; // Green - mild
    if (severity <= 6) return '#d97706'; // Orange - moderate  
    return '#dc2626'; // Red - severe
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
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const groupedData = groupEventsByDate(filteredData);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ 
          color: '#1e293b', 
          marginBottom: '0.5rem',
          fontSize: '1.8rem'
        }}>
          📈 Health Timeline
        </h2>
        <p style={{ color: '#64748b', margin: 0 }}>
          Your symptoms and medications in chronological order
        </p>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Show:
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Events</option>
              <option value="symptom">Symptoms Only</option>
              <option value="medication">Medications Only</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Time Range:
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            >
              <option value="1day">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '6px',
          fontSize: '0.9rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <strong style={{ color: '#2563eb' }}>
              {filteredData.filter(item => item.type === 'symptom').length}
            </strong>
            <span style={{ color: '#64748b', marginLeft: '0.25rem' }}>symptoms</span>
          </div>
          <div>
            <strong style={{ color: '#16a34a' }}>
              {filteredData.filter(item => item.type === 'medication').length}
            </strong>
            <span style={{ color: '#64748b', marginLeft: '0.25rem' }}>medications</span>
          </div>
          <div>
            <strong style={{ color: '#1e293b' }}>
              {filteredData.length}
            </strong>
            <span style={{ color: '#64748b', marginLeft: '0.25rem' }}>total events</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {filteredData.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
          <h3 style={{ marginBottom: '1rem' }}>No Events Found</h3>
          <p>
            {filterType === 'all' 
              ? 'Start by adding symptoms or medications to see your timeline.'
              : `No ${filterType} events found in the selected time range.`
            }
          </p>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: '2rem',
            top: '0',
            bottom: '0',
            width: '2px',
            backgroundColor: '#e2e8f0',
            zIndex: 0
          }}></div>

          {groupedData.map((group, groupIndex) => (
            <div key={group.date} style={{ marginBottom: '2rem' }}>
              {/* Date Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  zIndex: 1
                }}>
                  {formatDate(group.date)}
                </div>
              </div>

              {/* Events for this date */}
              <div style={{ marginLeft: '4rem' }}>
                {group.events.map((event, eventIndex) => (
                  <div
                    key={event.id}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1rem',
                      position: 'relative',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-3rem',
                      top: '1rem',
                      width: '12px',
                      height: '12px',
                      backgroundColor: event.color,
                      borderRadius: '50%',
                      border: '2px solid white',
                      zIndex: 2
                    }}></div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>{event.icon}</span>
                        <h4 style={{ 
                          margin: 0, 
                          color: '#1e293b',
                          fontSize: '1.1rem' 
                        }}>
                          {event.title}
                        </h4>
                      </div>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: '#64748b',
                        backgroundColor: '#f1f5f9',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px'
                      }}>
                        {event.time}
                      </span>
                    </div>

                    {/* Event-specific details */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      {event.type === 'symptom' && (
                        <>
                          <span style={{
                            backgroundColor: event.color,
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            {event.severity}/10 {getSeverityLabel(event.severity)}
                          </span>
                        </>
                      )}
                      
                      {event.type === 'medication' && (
                        <span style={{
                          backgroundColor: '#f0fdf4',
                          color: '#15803d',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: '1px solid #bbf7d0'
                        }}>
                          {event.dosage} taken
                        </span>
                      )}
                    </div>

                    {event.notes && (
                      <p style={{ 
                        margin: '0.5rem 0 0 0', 
                        color: '#4b5563',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        paddingLeft: '1.7rem'
                      }}>
                        "{event.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {filteredData.length > 0 && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <p style={{ 
            color: '#15803d', 
            margin: '0 0 1rem 0',
            fontWeight: '600'
          }}>
            💡 Tip: Look for patterns in your timeline to identify triggers or correlations
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', color: '#166534' }}>
              🔍 Notice when symptoms occur after certain activities or medications
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
