import React, { useState, useEffect } from 'react';

// SVG Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PillIcon = ({ size = 20, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
          fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18211 2.99721 7.13214 4.39828 5.49883C5.79935 3.86553 7.69279 2.72636 9.79619 2.24899C11.8996 1.77161 14.1003 1.98166 16.07 2.85" 
          stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,4 12,14.01 9,11.01" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polyline points="3,6 5,6 21,6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MedicationTracker = () => {
  // Form state
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('once-daily');
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState([]);
  const [medicationLogs, setMedicationLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [todayCount, setTodayCount] = useState(0);

  // Load data from localStorage
  useEffect(() => {
    const savedMeds = localStorage.getItem('medications');
    const savedLogs = localStorage.getItem('medicationLogs');
    
    if (savedMeds) setMedications(JSON.parse(savedMeds));
    if (savedLogs) {
      const parsed = JSON.parse(savedLogs);
      setMedicationLogs(parsed);
      
      // Count today's doses
      const today = new Date().toISOString().split('T')[0];
      const todayDoses = parsed.filter(log => log.date === today);
      setTodayCount(todayDoses.length);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('medicationLogs', JSON.stringify(medicationLogs));
    
    // Update today's count
    const today = new Date().toISOString().split('T')[0];
    const todayDoses = medicationLogs.filter(log => log.date === today);
    setTodayCount(todayDoses.length);
  }, [medicationLogs]);

  // Add new medication
  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!medicationName.trim() || !dosage.trim()) {
      alert('Please enter medication name and dosage');
      return;
    }

    const newMedication = {
      id: Date.now(),
      name: medicationName.trim(),
      dosage: dosage.trim(),
      frequency,
      notes: notes.trim(),
      dateAdded: new Date().toISOString().split('T')[0],
      active: true
    };

    setMedications(prev => [newMedication, ...prev]);
    
    // Reset form
    setMedicationName('');
    setDosage('');
    setFrequency('once-daily');
    setNotes('');
    setShowForm(false);
  };

  // Log medication taken
  const logMedication = (medicationId) => {
    const medication = medications.find(med => med.id === medicationId);
    if (!medication) return;

    const newLog = {
      id: Date.now(),
      medicationId,
      medicationName: medication.name,
      dosage: medication.dosage,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMedicationLogs(prev => [newLog, ...prev]);
  };

  // Delete medication
  const deleteMedication = (id) => {
    if (window.confirm('Delete this medication? All logs will remain.')) {
      setMedications(prev => prev.filter(med => med.id !== id));
    }
  };

  // Get today's logs for a medication
  const getTodayLogs = (medicationId) => {
    const today = new Date().toISOString().split('T')[0];
    return medicationLogs.filter(log => 
      log.medicationId === medicationId && log.date === today
    );
  };

  const formatFrequency = (freq) => {
    const frequencies = {
      'as-needed': 'As needed',
      'once-daily': 'Once daily',
      'twice-daily': 'Twice daily',
      'three-times': '3x daily',
      'four-times': '4x daily',
      'weekly': 'Weekly',
      'other': 'Other'
    };
    return frequencies[freq] || freq;
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
          Your Medications
        </h2>
        <p style={{ 
          color: '#64748B', 
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          Keep track of your prescribed medications and when you take them.
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
              Doses taken today
            </div>
            <div style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              color: todayCount > 0 ? '#10B981' : '#64748B'
            }}>
              {todayCount}
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: '#10B981',
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
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <PlusIcon />
            Add Medication
          </button>
        </div>
      </div>

      {/* Medication Entry Form */}
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
              Add New Medication
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
          
          <form onSubmit={handleAddMedication}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Medication Name
              </label>
              <input
                type="text"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                placeholder="e.g., Ibuprofen, Metformin, Vitamin D..."
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
                  e.target.style.borderColor = '#10B981';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Dosage & Strength
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 200mg, 1 tablet, 5ml..."
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
                  e.target.style.borderColor = '#10B981';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                How often?
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer'
                }}
              >
                <option value="as-needed">As needed</option>
                <option value="once-daily">Once daily</option>
                <option value="twice-daily">Twice daily</option>
                <option value="three-times">Three times daily</option>
                <option value="four-times">Four times daily</option>
                <option value="weekly">Weekly</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take with food, side effects, special instructions..."
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
                  e.target.style.borderColor = '#10B981';
                  e.target.style.backgroundColor = 'white';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.backgroundColor = '#FAFAFA';
                }}
              />
            </div>

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
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
              >
                Save Medication
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

      {/* Current Medications */}
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
          Current Medications {medications.length > 0 && `(${medications.length})`}
        </h3>
        
        {medications.length === 0 ? (
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
              justifyContent: 'center'
            }}>
              <PillIcon size={32} color="#64748B" />
            </div>
            <h4 style={{ 
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 0.5rem 0'
            }}>
              No medications added yet
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Add your first medication to start tracking.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {medications.map(med => {
              const todayLogs = getTodayLogs(med.id);
              return (
                <div
                  key={med.id}
                  style={{
                    backgroundColor: '#FAFAFA',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 0.25rem 0', 
                        color: '#1E293B', 
                        fontSize: '1.125rem',
                        fontWeight: '600'
                      }}>
                        {med.name}
                      </h4>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: '#64748B',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontWeight: '500' }}>{med.dosage}</span>
                        <span>•</span>
                        <span>{formatFrequency(med.frequency)}</span>
                      </div>
                      {todayLogs.length > 0 && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          backgroundColor: '#ECFDF5',
                          color: '#059669',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          <CheckCircleIcon size={14} />
                          Taken today ({todayLogs.length}x)
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => deleteMedication(med.id)}
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
                      title="Delete medication"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      onClick={() => logMedication(med.id)}
                      style={{
                        backgroundColor: '#10B981',
                        color: 'white',
                        border: 'none',
                        padding: '0.625rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#10B981'}
                    >
                      <CheckCircleIcon size={16} />
                      I took this
                    </button>
                  </div>

                  {med.notes && (
                    <p style={{ 
                      margin: '0.75rem 0 0 0', 
                      color: '#4B5563',
                      fontSize: '0.875rem',
                      fontStyle: 'italic',
                      backgroundColor: 'white',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB'
                    }}>
                      {med.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Medication Logs */}
      {medicationLogs.length > 0 && (
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
            Recent Activity
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {medicationLogs.slice(0, 5).map((log, index) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <CheckCircleIcon size={20} />
                <div style={{ flex: 1 }}>
                  <span style={{ 
                    fontWeight: '600', 
                    color: '#1E293B',
                    fontSize: '0.875rem'
                  }}>
                    {log.medicationName}
                  </span>
                  <span style={{ 
                    color: '#64748B', 
                    marginLeft: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    ({log.dosage})
                  </span>
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <ClockIcon size={12} />
                  {formatTime(log.date, log.time)}
                </div>
              </div>
            ))}
            
            {medicationLogs.length > 5 && (
              <div style={{
                textAlign: 'center',
                padding: '0.75rem',
                color: '#64748B',
                fontSize: '0.875rem'
              }}>
                {medicationLogs.length - 5} more entries in timeline
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helpful Tip */}
      {medications.length > 0 && (
        <div style={{
          backgroundColor: '#ECFDF5',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #BBF7D0'
        }}>
          <h4 style={{
            color: '#059669',
            fontSize: '1rem',
            fontWeight: '600',
            margin: '0 0 0.5rem 0'
          }}>
            💡 Medication Tip
          </h4>
          <p style={{
            color: '#059669',
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            Consistency is key! Try to take your medications at the same time each day, and always follow your healthcare provider's instructions.
          </p>
        </div>
      )}
    </div>
  );
};

export default MedicationTracker;
