import React, { useState, useEffect } from 'react';

const MedicationTracker = () => {
  // Form state
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('once-daily');
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Medication log state
  const [medicationLogs, setMedicationLogs] = useState([]);
  const [selectedMedId, setSelectedMedId] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedMeds = localStorage.getItem('medications');
    const savedLogs = localStorage.getItem('medicationLogs');
    if (savedMeds) setMedications(JSON.parse(savedMeds));
    if (savedLogs) setMedicationLogs(JSON.parse(savedLogs));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('medicationLogs', JSON.stringify(medicationLogs));
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

  // Delete log entry
  const deleteLog = (id) => {
    if (window.confirm('Delete this medication log?')) {
      setMedicationLogs(prev => prev.filter(log => log.id !== id));
    }
  };

  // Get today's logs for a medication
  const getTodayLogs = (medicationId) => {
    const today = new Date().toISOString().split('T')[0];
    return medicationLogs.filter(log => 
      log.medicationId === medicationId && log.date === today
    );
  };

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
          💊 Medication Tracker
        </h2>
        <p style={{ color: '#64748b', margin: 0 }}>
          Manage your medications and track when you take them
        </p>
      </div>

      {/* Add New Medication Button */}
      {!showForm && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            + Add New Medication
          </button>
        </div>
      )}

      {/* Medication Entry Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Add New Medication</h3>
          
          <form onSubmit={handleAddMedication}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Medication Name *
              </label>
              <input
                type="text"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                placeholder="e.g., Ibuprofen, Metformin, etc."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Dosage *
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 200mg, 1 tablet, 5ml, etc."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem'
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
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Side effects, instructions, reminders..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Save Medication
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  backgroundColor: '#64748b',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  fontSize: '1rem',
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
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
          Current Medications {medications.length > 0 && `(${medications.length})`}
        </h3>
        
        {medications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💊</div>
            <p>No medications added yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {medications.map(med => {
              const todayLogs = getTodayLogs(med.id);
              return (
                <div
                  key={med.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '0.5rem'
                  }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem' }}>
                        {med.name}
                      </h4>
                      <p style={{ margin: '0.25rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                        {med.dosage} • {med.frequency.replace('-', ' ')}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMedication(med.id)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                      title="Delete medication"
                    >
                      🗑️
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                      onClick={() => logMedication(med.id)}
                      style={{
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✓ Took It
                    </button>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Today: {todayLogs.length} time{todayLogs.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {med.notes && (
                    <p style={{ 
                      margin: '0.5rem 0 0 0', 
                      color: '#4b5563',
                      fontSize: '0.8rem',
                      fontStyle: 'italic'
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
      <div>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
          Recent Logs {medicationLogs.length > 0 && `(${medicationLogs.slice(0, 10).length} shown)`}
        </h3>
        
        {medicationLogs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            color: '#64748b'
          }}>
            <p>No medication logs yet.</p>
            <p>Click "Took It" to start logging!</p>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            {medicationLogs.slice(0, 10).map((log, index) => (
              <div
                key={log.id}
                style={{
                  padding: '1rem',
                  borderBottom: index < 9 ? '1px solid #f1f5f9' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ color: '#1e293b' }}>{log.medicationName}</strong>
                  <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>
                    ({log.dosage})
                  </span>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                    {log.date} at {log.time}
                  </div>
                </div>
                <button
                  onClick={() => deleteLog(log.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#dc2626',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationTracker;
