import React, { useState, useEffect } from 'react';

// Professional Medical Icons
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 5V19M5 12H19" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PillIcon = ({ size = 20, className = "text-slate-400" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M10.5 20.5A10.5 10.5 0 1 1 21 10.5"/>
    <path d="M10.5 20.5A10.5 10.5 0 0 1 21 10.5"/>
    <path d="M21 10.5L10.5 21"/>
    <path d="M10.5 10.5L21 21"/>
  </svg>
);

const CheckCircleIcon = ({ size = 20, className = "text-success-600" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18211 2.99721 7.13214 4.39828 5.49883C5.79935 3.86553 7.69279 2.72636 9.79619 2.24899C11.8996 1.77161 14.1003 1.98166 16.07 2.85"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
);

const ClockIcon = ({ size = 16, className = "text-slate-500" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const TrashIcon = ({ className = "text-error-500 hover:text-error-600" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MedicationIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
    <rect x="2" y="8" width="20" height="12" rx="3"/>
    <path d="M6 4V8M10 4V8M14 4V8M18 4V8"/>
    <path d="M6 12H18M6 16H12"/>
  </svg>
);

const BulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.973 8.13616 14.441 10.8906 15.2604C11.0309 15.3023 11.1408 15.4122 11.1827 15.5525L11.8173 17.4475C11.8592 17.5878 11.9691 17.6977 12.1094 17.7396C14.8638 18.559 17 16.091 17 13.118V9C17 5.68629 14.3137 3 11 3H12Z"/>
    <circle cx="12" cy="9" r="1"/>
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
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <div className="health-card">
        <div className="health-card-body">
          <h2 className="text-heading-1 text-slate-900 mb-3">
            Your Medications
          </h2>
          <p className="text-body text-slate-600 mb-6 leading-relaxed">
            Track your prescribed medications and dosing schedule.
          </p>

          {/* Today's Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <div className="text-body-small text-slate-600 font-medium mb-1">
                Doses taken today
              </div>
              <div className={`text-medical-large font-bold text-metric ${
                todayCount > 0 ? 'text-success-600' : 'text-slate-400'
              }`}>
                {todayCount}
              </div>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-success btn-lg flex items-center gap-2"
            >
              <PlusIcon />
              Add Medication
            </button>
          </div>
        </div>
      </div>

      {/* Professional Medication Entry Form */}
      {showForm && (
        <div className="health-card">
          <div className="health-card-header flex justify-between items-center">
            <h3 className="text-heading-2 text-slate-900">Add New Medication</h3>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="health-card-body">
            <form onSubmit={handleAddMedication} className="space-y-6">
              {/* Medication Name */}
              <div>
                <label className="text-caption text-slate-700 mb-2 block">
                  Medication Name
                </label>
                <input
                  type="text"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  placeholder="e.g., Ibuprofen, Metformin, Vitamin D..."
                  className="form-input"
                  required
                />
              </div>

              {/* Dosage & Strength */}
              <div>
                <label className="text-caption text-slate-700 mb-2 block">
                  Dosage & Strength
                </label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g., 200mg, 1 tablet, 5ml..."
                  className="form-input"
                  required
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="text-caption text-slate-700 mb-2 block">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="form-input cursor-pointer"
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

              {/* Notes */}
              <div>
                <label className="text-caption text-slate-700 mb-2 block">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take with food, side effects, special instructions..."
                  rows={3}
                  className="form-input resize-vertical"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="btn btn-success flex-1"
                >
                  Save Medication
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

      {/* Current Medications */}
      <div className="health-card">
        <div className="health-card-header">
          <h3 className="text-heading-2 text-slate-900">
            Current Medications {medications.length > 0 && (
              <span className="text-body text-slate-500 font-normal">({medications.length})</span>
            )}
          </h3>
        </div>
        
        <div className="health-card-body">
          {medications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MedicationIcon />
              </div>
              <h4 className="text-heading-3 text-slate-800 mb-2">
                No medications added yet
              </h4>
              <p className="text-body-small text-slate-600">
                Add your first medication to start tracking.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {medications.map(med => {
                const todayLogs = getTodayLogs(med.id);
                return (
                  <MedicationCard
                    key={med.id}
                    medication={med}
                    todayLogs={todayLogs}
                    onDelete={() => deleteMedication(med.id)}
                    onLogMedication={() => logMedication(med.id)}
                    formatFrequency={formatFrequency}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Medication Logs */}
      {medicationLogs.length > 0 && (
        <div className="health-card">
          <div className="health-card-header">
            <h3 className="text-heading-2 text-slate-900">Recent Activity</h3>
          </div>
          
          <div className="health-card-body">
            <div className="space-y-2">
              {medicationLogs.slice(0, 5).map(log => (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <CheckCircleIcon size={20} />
                  <div className="flex-1">
                    <span className="text-body font-semibold text-slate-900">
                      {log.medicationName}
                    </span>
                    <span className="text-body-small text-slate-600 ml-2">
                      ({log.dosage})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <ClockIcon size={12} />
                    {formatTime(log.date, log.time)}
                  </div>
                </div>
              ))}
              
              {medicationLogs.length > 5 && (
                <div className="text-center py-3 text-body-small text-slate-500 bg-slate-50 rounded-lg">
                  {medicationLogs.length - 5} more entries in timeline
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Professional Tip Card */}
      {medications.length > 0 && (
        <div className="health-card bg-success-50 border-success-200">
          <div className="health-card-body">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0 text-success-600">
                <BulbIcon />
              </div>
              <div>
                <h4 className="text-body font-semibold text-success-800 mb-2">
                  Medication Tip
                </h4>
                <p className="text-body-small text-success-700 leading-relaxed">
                  Consistency is key! Try taking medications at the same time each day.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Professional Medication Card Component
const MedicationCard = ({ medication, todayLogs, onDelete, onLogMedication, formatFrequency }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <h4 className="text-body font-semibold text-slate-900 mb-2">
          {medication.name}
        </h4>
        <div className="flex items-center gap-3 text-body-small text-slate-600 mb-3">
          <span className="font-medium text-metric">{medication.dosage}</span>
          <span className="text-slate-400">•</span>
          <span>{formatFrequency(medication.frequency)}</span>
        </div>
        {todayLogs.length > 0 && (
          <div className="inline-flex items-center gap-2 bg-success-100 text-success-700 px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircleIcon size={14} />
            Taken today ({todayLogs.length}x)
          </div>
        )}
      </div>
      <button
        onClick={onDelete}
        className="p-2 hover:bg-error-50 rounded-lg transition-colors text-slate-400 hover:text-error-600"
        title="Delete medication"
      >
        <TrashIcon />
      </button>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onLogMedication}
        className="btn btn-success btn-sm flex items-center gap-2"
      >
        <CheckCircleIcon size={16} />
        I took this
      </button>
    </div>

    {medication.notes && (
      <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg">
        <p className="text-body-small text-slate-700">
          {medication.notes}
        </p>
      </div>
    )}
  </div>
);

export default MedicationTracker;
