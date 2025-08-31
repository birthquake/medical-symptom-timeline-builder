import React, { useState, useEffect } from 'react';

// Professional SVG Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 5V19M5 12H19" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"/>
    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20,6 9,17 4,12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const BulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.973 8.13616 14.441 10.8906 15.2604C11.0309 15.3023 11.1408 15.4122 11.1827 15.5525L11.8173 17.4475C11.8592 17.5878 11.9691 17.6977 12.1094 17.7396C14.8638 18.559 17 16.091 17 13.118V9C17 5.68629 14.3137 3 11 3H12Z"/>
    <circle cx="12" cy="9" r="1"/>
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
    if (severity <= 3) return 'var(--success-600)';
    if (severity <= 6) return 'var(--warning-600)'; 
    return 'var(--error-600)';
  };

  const getSeverityBgColor = (severity) => {
    if (severity <= 3) return 'var(--success-50)';
    if (severity <= 6) return 'var(--warning-50)'; 
    return 'var(--error-50)';
  };

  const getSeverityBorderColor = (severity) => {
    if (severity <= 3) return 'var(--success-200)';
    if (severity <= 6) return 'var(--warning-200)'; 
    return 'var(--error-200)';
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
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <div className="health-card">
        <div className="health-card-body">
          <h2 className="text-heading-1 text-slate-900 mb-3">
            How are you feeling?
          </h2>
          <p className="text-body text-slate-600 mb-6 leading-relaxed">
            Track your symptoms to identify patterns and share with your healthcare provider.
          </p>

          {/* Today's Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="text-body-small text-slate-600 font-medium mb-1">
                Symptoms logged today
              </div>
              <div className={`text-medical-large font-bold text-metric ${
                todayCount > 0 ? 'text-warning-600' : 'text-slate-400'
              }`}>
                {todayCount}
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary btn-lg flex items-center gap-2"
            >
              <PlusIcon />
              Log Symptom
            </button>
          </div>
        </div>
      </div>

      {/* Professional Symptom Entry Form */}
      {showForm && (
        <div className="health-card">
          <div className="health-card-header flex justify-between items-center">
            <h3 className="text-heading-2 text-slate-900">Log New Symptom</h3>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="health-card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quick Select Symptoms */}
              <div>
                <label className="text-caption text-slate-700 mb-3 block">
                  Quick Select:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {commonSymptoms.map(symptom => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => setSymptomName(symptom)}
                      className={`p-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                        symptomName === symptom 
                          ? 'bg-primary-600 text-white shadow-md' 
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Symptom Name */}
              <div>
                <label className="text-caption text-slate-700 mb-2 block">
                  Symptom Name
                </label>
                <input
                  type="text"
                  value={symptomName}
                  onChange={(e) => setSymptomName(e.target.value)}
                  placeholder="Enter symptom or select above"
                  className="form-input"
                  required
                />
              </div>

              {/* Professional Severity Scale */}
              <div>
                <label className="text-caption text-slate-700 mb-3 block">
                  How severe is it?
                </label>
                
                {/* Severity Display Card */}
                <div 
                  className="rounded-xl p-6 mb-4 text-center border-2 transition-all duration-300"
                  style={{
                    backgroundColor: getSeverityBgColor(severity),
                    borderColor: getSeverityBorderColor(severity)
                  }}
                >
                  <div 
                    className="text-4xl font-bold text-metric mb-2"
                    style={{ color: getSeverityColor(severity) }}
                  >
                    {severity}/10
                  </div>
                  <div 
                    className="text-heading-3 font-semibold"
                    style={{ color: getSeverityColor(severity) }}
                  >
                    {getSeverityLabel(severity)}
                  </div>
                </div>

                {/* Custom Severity Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, 
                        var(--success-500) 0%, var(--success-500) 30%, 
                        var(--warning-500) 30%, var(--warning-500) 60%, 
                        var(--error-500) 60%, var(--error-500) 100%)`,
                      outline: 'none'
                    }}
                  />
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-medium text-success-600">1 - Mild</span>
                    <span className="text-xs font-medium text-warning-600">5 - Moderate</span>
                    <span className="text-xs font-medium text-error-600">10 - Severe</span>
                  </div>
                </div>
              </div>

              {/* Professional Notes Field */}
              <div>
                <label className="text-caption text-slate-700 mb-2 block">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What triggered it? How long did it last? Any other details..."
                  rows={3}
                  className="form-input resize-vertical"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="btn btn-success flex-1 flex items-center justify-center gap-2"
                >
                  <CheckIcon />
                  Save Symptom
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Professional Symptoms List */}
      <div className="health-card">
        <div className="health-card-header">
          <h3 className="text-heading-2 text-slate-900">
            Recent Symptoms {symptoms.length > 0 && (
              <span className="text-body text-slate-500 font-normal">({symptoms.length})</span>
            )}
          </h3>
        </div>
        
        <div className="health-card-body">
          {symptoms.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <DocumentIcon />
              </div>
              <h4 className="text-heading-3 text-slate-800 mb-2">
                No symptoms logged yet
              </h4>
              <p className="text-body-small text-slate-600">
                Start tracking how you feel by logging your first symptom.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {symptoms.slice(0, 10).map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  onDelete={() => deleteSymptom(symptom.id)}
                  getSeverityColor={getSeverityColor}
                  getSeverityLabel={getSeverityLabel}
                  formatTime={formatTime}
                />
              ))}
              
              {symptoms.length > 10 && (
                <div className="text-center py-4 text-body-small text-slate-500 bg-slate-50 rounded-lg">
                  Showing latest 10 symptoms • {symptoms.length - 10} more in timeline
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Professional Tip Card */}
      {symptoms.length > 0 && (
        <div className="health-card bg-primary-50 border-primary-200">
          <div className="health-card-body">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-primary-600">
                <BulbIcon />
              </div>
              <div>
                <h4 className="text-body font-semibold text-primary-800 mb-2">
                  Tracking Tip
                </h4>
                <p className="text-body-small text-primary-700 leading-relaxed">
                  Great job tracking your symptoms! Look for patterns in your timeline and share these logs with your healthcare provider during your next visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Professional Symptom Card Component
const SymptomCard = ({ symptom, onDelete, getSeverityColor, getSeverityLabel, formatTime }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h4 className="text-body font-semibold text-slate-900">
          {symptom.name}
        </h4>
        <p className="text-body-small text-slate-600 mt-1">
          {formatTime(symptom.date, symptom.time)}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="p-2 hover:bg-error-50 rounded-lg transition-colors text-slate-400 hover:text-error-600"
        title="Delete symptom"
      >
        <TrashIcon />
      </button>
    </div>
    
    <div className="flex items-center gap-3">
      <div 
        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
        style={{ backgroundColor: getSeverityColor(symptom.severity) }}
      >
        <span className="text-metric">{symptom.severity}/10</span>
        <span className="ml-1">{getSeverityLabel(symptom.severity)}</span>
      </div>
    </div>
    
    {symptom.notes && (
      <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg">
        <p className="text-body-small text-slate-700 italic">
          "{symptom.notes}"
        </p>
      </div>
    )}
  </div>
);

export default SymptomTracker;
