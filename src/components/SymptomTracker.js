import React, { useState, useEffect } from 'react';

const SymptomTracker = () => {
  // Form state
  const [symptomName, setSymptomName] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Common symptoms for quick selection
  const commonSymptoms = [
    'Headache', 'Fatigue', 'Nausea', 'Pain', 'Dizziness', 'Anxiety', 
    'Insomnia', 'Fever', 'Cough', 'Joint Pain', 'Muscle Aches', 'Other'
  ];

  // Load symptoms from localStorage on component mount
  useEffect(() => {
    const savedSymptoms = localStorage.getItem('symptoms');
    if (savedSymptoms) {
      setSymptoms(JSON.parse(savedSymptoms));
    }
  }, []);

  // Save symptoms to localStorage whenever symptoms array changes
  useEffect(() => {
    localStorage.setItem('symptoms', JSON.stringify(symptoms));
  }, [symptoms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!symptomName.trim()) {
      alert('Please enter a symptom name');
      return;
    }

    const newSymptom = {
      id: Date.now(), // Simple ID using timestamp
      name: symptomName.trim(),
      severity: parseInt(severity),
      notes: notes.trim(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: new Date().toISOString()
    };

    setSymptoms(prev => [newSymptom, ...prev]); // Add to beginning of array
    
    // Reset form
    setSymptomName('');
    setSeverity(5);
    setNotes('');
    setShowForm(false);
  };

  const deleteSymptom = (id) => {
    if (window.confirm('Are you sure you want to delete this symptom entry?')) {
      setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
    }
  };

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
          📊 Symptom Tracker
        </h2>
        <p style={{ color: '#64748b', margin: 0 }}>
          Log your symptoms with severity levels and notes
        </p>
      </div>

      {/* Add New Symptom Button */}
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
            + Add New Symptom
          </button>
        </div>
      )}

      {/* Symptom Entry Form */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Log New Symptom</h3>
          
          <form onSubmit={handleSubmit}>
            {/* Quick Select Symptoms */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Quick Select:
              </label>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.5rem' 
              }}>
                {commonSymptoms.map(symptom => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => setSymptomName(symptom)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: symptomName === symptom ? '#2563eb' : '#f1f5f9',
                      color: symptomName === symptom ? 'white' : '#64748b',
                      border: '1px solid #e2e8f0',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptom Name Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Symptom Name *
              </label>
              <input
                type="text"
                value={symptomName}
                onChange={(e) => setSymptomName(e.target.value)}
                placeholder="Enter symptom name or select from above"
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

            {/* Severity Scale */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Severity Level: {severity}/10 ({getSeverityLabel(severity)})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{
                  width: '100%',
                  marginBottom: '0.5rem'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748b'
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
                color: '#374151'
              }}>
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional details, triggers, or context..."
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

            {/* Form Buttons */}
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
                Save Symptom
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

      {/* Symptoms List */}
      <div>
        <h3 style={{ 
          marginBottom: '1rem', 
          color: '#1e293b',
          fontSize: '1.3rem'
        }}>
          Recent Symptoms {symptoms.length > 0 && `(${symptoms.length})`}
        </h3>
        
        {symptoms.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p>No symptoms logged yet.</p>
            <p>Click "Add New Symptom" to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {symptoms.map(symptom => (
              <div
                key={symptom.id}
                style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h4 style={{ 
                    margin: 0, 
                    color: '#1e293b',
                    fontSize: '1.1rem'
                  }}>
                    {symptom.name}
                  </h4>
                  <button
                    onClick={() => deleteSymptom(symptom.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      fontSize: '1rem'
                    }}
                    title="Delete symptom"
                  >
                    🗑️
                  </button>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    backgroundColor: getSeverityColor(symptom.severity),
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {symptom.severity}/10 {getSeverityLabel(symptom.severity)}
                  </span>
                  <span style={{ 
                    color: '#64748b', 
                    fontSize: '0.875rem' 
                  }}>
                    {symptom.date} at {symptom.time}
                  </span>
                </div>
                
                {symptom.notes && (
                  <p style={{ 
                    margin: 0, 
                    color: '#4b5563',
                    fontSize: '0.9rem',
                    fontStyle: 'italic'
                  }}>
                    "{symptom.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomTracker;
