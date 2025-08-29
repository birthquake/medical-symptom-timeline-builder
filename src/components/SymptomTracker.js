import React, { useState, useEffect } from 'react';

// SVG Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polyline points="3,6 5,6 21,6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SymptomTracker = () => {
  // Form state
  const [symptomName, setSymptomName] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [todayCount, setTodayCount] = useState(0);

  // Common symptoms for quick selection
  const commonSymptoms = [
    'Headache', 'Fatigue', 'Nausea', 'Pain', 'Dizziness', 'Anxiety', 
    'Sleep Issues', 'Fever', 'Cough', 'Joint Pain', 'Muscle Aches', 'Stress'
  ];

  // Load symptoms from localStorage on component mount
  useEffect(() => {
    const savedSymptoms = localStorage.getItem('symptoms');
    if (savedSymptoms) {
      const parsed = JSON.parse(savedSymptoms);
      setSymptoms(parsed);
      
      // Count today's symptoms
      const today = new Date().toISOString().split('T')[0];
      const todaySymptoms = parsed.filter(s => s.date === today);
      setTodayCount(todaySymptoms.length);
    }
  }, []);

  // Save symptoms to localStorage whenever symptoms array changes
  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
    
    // Update today's count
    const today = new Date().toISOString().split('T')[0];
    const todaySymptoms = symptoms.filter(s => s.date === today);
    setTodayCount(todaySymptoms.length);
  }, [symptoms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!symptomName.trim()) {
      alert('Please enter a symptom name');
      return;
    }

    const newSymptom = {
      id: Date.now(),
      name: symptomName.trim(),
      severity: parseInt(severity),
      notes: notes.trim(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: new Date().toISOString()
    };

    setSymptoms(prev => [newSymptom, ...prev]);
    
    // Reset form
    setSymptomName('');
    setSeverity(5);
    setNotes('');
    setShowForm(false);
  };

  const deleteSymptom = (id) => {
    if (window.confirm('Delete this symptom entry?')) {
      setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
    }
  };

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

  const formatTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) {
      return `Today ${timeStr}`;
    } else if (dateStr === yesterday.toISOString().split('T')[0]) {
      return `Yesterday ${timeStr}`;
    } else {
      return `${date.toLocaleDateString()} ${timeStr}`;
    }
  };

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
          How are you feeling?
        </h2>
        <p style={{ 
          color: '#64748B', 
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          Track your symptoms to identify patterns and share with your healthcare provider.
        </p>

        {/* Today's Summary */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#64748B',
              fontWeight: '500'
            }}>
              Symptoms logged today
            </div>
            <div style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              color: todayCount > 0 ? '#F59E0B' : '#64748B'
            }}>
              {todayCount}
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 2px 4px rgba(59, 130, 246, 0.25)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <PlusIcon />
            Log Symptom
          </button>
        </div>
      </div>

      {/* Symptom Entry Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1E293B',
              margin: 0
            }}>
              Log New Symptom
            </h3>
            <button
              onClick={() => setShowForm(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CloseIcon />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Quick Select Symptoms */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Quick Select:
              </label>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '0.5rem'
              }}>
                {commonSymptoms.map(symptom => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => setSymptomName(symptom)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: symptomName === symptom ? '#3B82F6' : '#F8FAFC',
                      color: symptomName === symptom ? 'white' : '#64748B',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center'
                    }}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Symptom Name */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Symptom Name
              </label>
              <input
                type="text"
                value={symptomName}
                onChange={(e) => setSymptomName(e.target.value)}
                placeholder="Enter symptom or select above"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#FAFAFA',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3B82F6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
                required
              />
            </div>

            {/* Severity Scale */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                How severe is it?
              </label>
              
              {/* Severity Display */}
              <div style={{
                backgroundColor: getSeverityBgColor(severity),
                border: `1px solid ${getSeverityColor(severity)}`,
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: getSeverityColor(severity),
                  margin: '0 0 0.25rem 0'
                }}>
                  {severity}/10
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: getSeverityColor(severity)
                }}>
                  {getSeverityLabel(severity)}
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, #10B981 0%, #10B981 30%, #F59E0B 30%, #F59E0B 60%, #EF4444 60%, #EF4444 100%)`,
                  outline: 'none',
                  appearance: 'none'
                }}
              />
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748B',
                marginTop: '0.5rem',
                fontWeight: '500'
              }}>
                <span>1 - Mild</span>
                <span>5 - Moderate</span>
                <span>10 - Severe</span>
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What triggered it? How long did it last? Any other details..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#FAFAFA',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3B82F6';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
              />
            </div>

            {/* Form Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: '#10B981',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
              >
                <CheckIcon />
                Save Symptom
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  backgroundColor: '#F8FAFC',
                  color: '#64748B',
                  border: '1px solid #E2E8F0',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Symptoms List */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Recent Symptoms {symptoms.length > 0 && `(${symptoms.length})`}
        </h3>
        
        {symptoms.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
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
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              📝
            </div>
            <h4 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 0.5rem 0'
            }}>
              No symptoms logged yet
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Start tracking how you feel by logging your first symptom.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {symptoms.slice(0, 10).map(symptom => (
              <div
                key={symptom.id}
                style={{
                  backgroundColor: '#FAFAFA',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <h4 style={{ 
                      margin: 0, 
                      color: '#1E293B',
                      fontSize: '1.125rem',
                      fontWeight: '600'
                    }}>
                      {symptom.name}
                    </h4>
                    <p style={{
                      margin: '0.25rem 0 0 0',
                      fontSize: '0.875rem',
                      color: '#64748B'
                    }}>
                      {formatTime(symptom.date, symptom.time)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteSymptom(symptom.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Delete symptom"
                  >
                    <TrashIcon />
                  </button>
                </div>
                
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: getSeverityColor(symptom.severity),
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: symptom.notes ? '0.75rem' : 0
                }}>
                  {symptom.severity}/10 {getSeverityLabel(symptom.severity)}
                </div>
                
                {symptom.notes && (
                  <p style={{ 
                    margin: 0, 
                    color: '#4B5563',
                    fontSize: '0.875rem',
                    fontStyle: 'italic',
                    backgroundColor: 'white',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}>
                    "{symptom.notes}"
                  </p>
                )}
              </div>
            ))}
            
            {symptoms.length > 10 && (
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                color: '#64748B',
                fontSize: '0.875rem'
              }}>
                Showing latest 10 symptoms • {symptoms.length - 10} more in timeline
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helpful Tip */}
      {symptoms.length > 0 && (
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
            💡 Tracking Tip
          </h4>
          <p style={{
            color: '#1E40AF',
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            Great job tracking your symptoms! Look for patterns in your timeline and share these logs with your healthcare provider during your next visit.
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomTracker;
