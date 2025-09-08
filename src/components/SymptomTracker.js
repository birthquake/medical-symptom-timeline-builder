// SECTION 1: Imports and SVG Icons (Lines 1-80)
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warning-600">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const EmptyDocumentIcon = () => (
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

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

// END OF SECTION 1
// SECTION 2: Smart Defaults Helper Functions (Lines 81-180)

// Smart defaults logic - analyzes user patterns
const getSmartDefaults = (symptoms) => {
  if (symptoms.length === 0) return null;

  // Get symptoms from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentSymptoms = symptoms.filter(s => 
    new Date(s.date) >= thirtyDaysAgo
  );

  if (recentSymptoms.length === 0) return null;

  // Count frequency and track severities
  const symptomData = {};
  
  recentSymptoms.forEach(symptom => {
    const name = symptom.name.toLowerCase().trim();
    if (!symptomData[name]) {
      symptomData[name] = {
        count: 0,
        severities: [],
        displayName: symptom.name,
        lastLogged: symptom.date
      };
    }
    symptomData[name].count++;
    symptomData[name].severities.push(parseInt(symptom.severity));
    
    // Keep the most recent display name (for capitalization)
    if (symptom.date >= symptomData[name].lastLogged) {
      symptomData[name].displayName = symptom.name;
    }
  });

  // Get top frequent symptoms
  const topSymptoms = Object.values(symptomData)
    .filter(data => data.count >= 2) // Must be logged at least twice
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map(data => ({
      name: data.displayName,
      count: data.count,
      avgSeverity: Math.round(
        data.severities.reduce((a, b) => a + b, 0) / data.severities.length
      ),
      isFrequent: data.count >= 3
    }));

  return {
    hasData: topSymptoms.length > 0,
    topSymptoms,
    mostCommon: topSymptoms[0] || null,
    suggestedSeverity: topSymptoms[0]?.avgSeverity || 5
  };
};

// Time-based pattern analysis
const getTimeBasedSuggestions = (symptoms) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay();
  
  // Get symptoms from same time periods
  const timeMatches = symptoms.filter(symptom => {
    const symptomDate = new Date(symptom.date);
    const symptomHour = parseInt(symptom.time.split(':')[0]);
    const symptomDay = symptomDate.getDay();
    
    // Same day of week OR similar time of day (±2 hours)
    return symptomDay === currentDay || 
           Math.abs(symptomHour - currentHour) <= 2;
  });

  if (timeMatches.length === 0) return null;

  // Find most common symptom during these times
  const timeSymptomFreq = {};
  timeMatches.forEach(symptom => {
    const name = symptom.name.toLowerCase();
    timeSymptomFreq[name] = (timeSymptomFreq[name] || 0) + 1;
  });

  const topTimeSymptom = Object.entries(timeSymptomFreq)
    .sort(([,a], [,b]) => b - a)[0];

  if (!topTimeSymptom || topTimeSymptom[1] < 2) return null;

  return {
    symptom: topTimeSymptom[0].charAt(0).toUpperCase() + topTimeSymptom[0].slice(1),
    frequency: topTimeSymptom[1],
    timeContext: currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening'
  };
};

// Generate smart suggestion message
const getSmartSuggestion = (smartDefaults, timeSuggestion) => {
  if (timeSuggestion && timeSuggestion.frequency >= 3) {
    return `You often log "${timeSuggestion.symptom}" in the ${timeSuggestion.timeContext}`;
  }
  
  if (smartDefaults?.mostCommon) {
    return `Your most tracked symptom: "${smartDefaults.mostCommon.name}"`;
  }
  
  return null;
};

// END OF SECTION 2
// SECTION 3: Success Message Component and Component State (Lines 181-280)

// Success Message Component - NEW
const SuccessMessage = ({ symptom, onClose }) => (
  <div className="fixed top-4 right-4 bg-success-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
        <CheckIcon />
      </div>
      <div>
        <div className="font-semibold text-sm">Symptom Logged Successfully</div>
        <div className="text-success-100 text-xs">{symptom.name} • Severity {symptom.severity}/10</div>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 text-success-200 hover:text-white transition-colors"
      >
        <CloseIcon />
      </button>
    </div>
  </div>
);

const SymptomTracker = () => {
  // Form state
  const [symptomName, setSymptomName] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  
  // Smart defaults state
  const [smartDefaults, setSmartDefaults] = useState(null);
  const [timeSuggestion, setTimeSuggestion] = useState(null);
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(true);
  
  // NEW: Visual feedback state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [lastSubmittedSymptom, setLastSubmittedSymptom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Base common symptoms (fallback when no user data)
  const commonSymptoms = [
    'Headache', 'Fatigue', 'Nausea', 'Pain', 'Dizziness', 'Anxiety', 
    'Sleep Issues', 'Fever', 'Cough', 'Joint Pain', 'Muscle Aches', 'Stress'
  ];

  // Load symptoms and calculate smart defaults
  useEffect(() => {
    const savedSymptoms = localStorage.getItem('symptoms');
    if (savedSymptoms) {
      const parsed = JSON.parse(savedSymptoms);
      setSymptoms(parsed);
      
      // Count today's symptoms
      const today = new Date().toISOString().split('T')[0];
      const todaySymptoms = parsed.filter(s => s.date === today);
      setTodayCount(todaySymptoms.length);

      // Calculate smart defaults
      const defaults = getSmartDefaults(parsed);
      setSmartDefaults(defaults);
      
      // Get time-based suggestions
      const timeData = getTimeBasedSuggestions(parsed);
      setTimeSuggestion(timeData);

      // Pre-fill severity if user has patterns
      if (defaults?.suggestedSeverity && severity === 5) {
        setSeverity(defaults.suggestedSeverity);
      }
    }
  }, []);

  // Save symptoms and update counts
  useEffect(() => {
    if (symptoms.length > 0) {
      localStorage.setItem('symptoms', JSON.stringify(symptoms));
      
      // Update today's count
      const today = new Date().toISOString().split('T')[0];
      const todaySymptoms = symptoms.filter(s => s.date === today);
      setTodayCount(todaySymptoms.length);
    }
  }, [symptoms]);

// END OF SECTION 3
  // SECTION 4: Enhanced Event Handlers (Lines 281-380)

  // Handle smart symptom selection
  const handleSmartSelect = (symptomName, suggestedSeverity = null) => {
    setSymptomName(symptomName);
    if (suggestedSeverity) {
      setSeverity(suggestedSeverity);
    }
    // Scroll to form if it's visible
    if (showForm) {
      setTimeout(() => {
        document.querySelector('[data-section="symptom-name"]')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  };

  // ENHANCED form submission with visual feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!symptomName.trim()) {
      alert('Please enter a symptom name');
      return;
    }

    // Show loading state
    setIsSubmitting(true);

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

    // Simulate slight delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 300));

    setSymptoms(prev => [newSymptom, ...prev]);
    setLastSubmittedSymptom(newSymptom);
    
    // Reset form with smart defaults for next entry
    setSymptomName('');
    setNotes('');
    // Keep the severity that worked well for user patterns
    if (!smartDefaults?.suggestedSeverity) {
      setSeverity(5);
    }
    setShowForm(false);
    setIsSubmitting(false);

    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 4000);
  };

  // Delete symptom with confirmation
  const deleteSymptom = (id) => {
    if (window.confirm('Delete this symptom entry?')) {
      setSymptoms(prev => prev.filter(symptom => symptom.id !== id));
    }
  };

  // Enhanced severity styling functions
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

// END OF SECTION 4
  // SECTION 5: Utility Functions (Lines 381-480)

  // Enhanced time formatting
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

  // Generate dynamic quick-select symptoms (smart + common)
  const getQuickSelectSymptoms = () => {
    let quickSymptoms = [];
    
    // Add user's frequent symptoms first
    if (smartDefaults?.topSymptoms) {
      quickSymptoms = smartDefaults.topSymptoms
        .slice(0, 6)
        .map(s => s.name);
    }
    
    // Fill remaining slots with common symptoms not already included
    const remaining = 12 - quickSymptoms.length;
    const unusedCommon = commonSymptoms.filter(symptom => 
      !quickSymptoms.some(smart => 
        smart.toLowerCase() === symptom.toLowerCase()
      )
    );
    
    quickSymptoms = [...quickSymptoms, ...unusedCommon.slice(0, remaining)];
    
    return quickSymptoms.slice(0, 12); // Max 12 buttons
  };

  // Check if a symptom is from user's frequent list
  const isFrequentSymptom = (symptomName) => {
    return smartDefaults?.topSymptoms?.some(s => 
      s.name.toLowerCase() === symptomName.toLowerCase()
    ) || false;
  };

  // Get suggested severity for a symptom
  const getSuggestedSeverity = (symptomName) => {
    const match = smartDefaults?.topSymptoms?.find(s => 
      s.name.toLowerCase() === symptomName.toLowerCase()
    );
    return match?.avgSeverity || null;
  };

// END OF SECTION 5
  // SECTION 6: Component Render - Header and Smart Suggestions (Lines 481-580)

  return (
    <div className="flex flex-col gap-6">
      {/* Enhanced Header Card with Smart Suggestions */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-heading-1 text-slate-900 mb-2">
                How are you feeling?
              </h2>
              <p className="text-body text-slate-600">
                Track your symptoms to identify patterns and share with your healthcare provider.
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary flex items-center gap-2 flex-shrink-0"
            >
              <PlusIcon />
              Log Symptom
            </button>
          </div>

          {/* Smart Suggestion Banner */}
          {showSmartSuggestions && (smartDefaults?.hasData || timeSuggestion) && (
            <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <StarIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-body-small font-semibold text-primary-800">
                      Smart Suggestion
                    </h4>
                    <button
                      onClick={() => setShowSmartSuggestions(false)}
                      className="text-primary-600 hover:text-primary-800 text-xs"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-body-small text-primary-700 mb-3">
                    {getSmartSuggestion(smartDefaults, timeSuggestion)}
                  </p>
                  
                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {smartDefaults?.mostCommon && (
                      <button
                        onClick={() => {
                          setShowForm(true);
                          setTimeout(() => {
                            handleSmartSelect(
                              smartDefaults.mostCommon.name, 
                              smartDefaults.mostCommon.avgSeverity
                            );
                          }, 100);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full hover:bg-primary-700 transition-colors"
                      >
                        <PlusIcon />
                        Log {smartDefaults.mostCommon.name}
                      </button>
                    )}
                    
                    {timeSuggestion && timeSuggestion.symptom !== smartDefaults?.mostCommon?.name && (
                      <button
                        onClick={() => {
                          setShowForm(true);
                          setTimeout(() => {
                            handleSmartSelect(timeSuggestion.symptom);
                          }, 100);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full hover:bg-primary-200 transition-colors"
                      >
                        <PlusIcon />
                        Log {timeSuggestion.symptom}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Today's Summary */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <DocumentIcon />
              </div>
              <div>
                <div className="text-body-small text-slate-600 font-medium">
                  Symptoms logged today
                </div>
                <div className={`text-lg font-bold text-metric ${
                  todayCount > 0 ? 'text-warning-600' : 'text-slate-400'
                }`}>
                  {todayCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

// END OF SECTION 6

// SECTION 7A: Form Header (Lines 581-610)

      {/* Enhanced Professional Symptom Entry Form */}
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

// END OF SECTION 7A
                
                // SECTION 7B: Quick Select Buttons (Lines 611-660)

              {/* Enhanced Quick Select with Smart Defaults */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-caption text-slate-700">
                    Quick Select:
                  </label>
                  {smartDefaults?.hasData && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      <StarIcon />
                      Personalized
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {getQuickSelectSymptoms().map(symptom => {
                    const isFrequent = isFrequentSymptom(symptom);
                    const suggestedSeverity = getSuggestedSeverity(symptom);
                    
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => handleSmartSelect(symptom, suggestedSeverity)}
                        className={`relative p-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                          symptomName === symptom 
                            ? 'bg-primary-600 text-white shadow-md' 
                            : isFrequent
                            ? 'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100'
                            : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {symptom}
                        {isFrequent && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
                            <StarIcon />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {smartDefaults?.hasData && (
                  <p className="text-xs text-slate-500 mt-2">
                    ⭐ = Your frequently logged symptoms
                  </p>
                )}
              </div>

// END OF SECTION 7B
// SECTION 7C: Form Input Fields (Lines 661-730)

              {/* Enhanced Custom Symptom Name */}
              <div data-section="symptom-name">
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

              {/* Enhanced Professional Severity Scale */}
              <div>
                <label className="text-caption text-slate-700 mb-3 block">
                  How severe is it?
                  {smartDefaults && getSuggestedSeverity(symptomName) && (
                    <span className="ml-2 text-xs text-primary-600 font-medium">
                      (Usually {getSuggestedSeverity(symptomName)}/10 for you)
                    </span>
                  )}
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

// END OF SECTION 7C
// SECTION 7D: Notes Field and Enhanced Form Actions (Lines 731-780)

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

              {/* Enhanced Form Actions with Loading States */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn flex-1 flex items-center justify-center gap-2 transition-all duration-200 ${
                    isSubmitting 
                      ? 'btn-secondary cursor-not-allowed opacity-75' 
                      : 'btn-success hover:shadow-md'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckIcon />
                      Save Symptom
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                  className="btn btn-secondary px-6 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

// END OF SECTION 7D

// SECTION 8: Symptoms List (Lines 781-850)

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
                <EmptyDocumentIcon />
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

// END OF SECTION 8
// SECTION 9: Enhanced Tip Card, Success Message, and Components (Lines 851-920)

      {/* Enhanced Professional Tip Card */}
      {symptoms.length > 0 && (
        <div className="health-card bg-primary-50 border-primary-200">
          <div className="health-card-body">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 text-primary-600">
                <BulbIcon />
              </div>
              <div>
                <h4 className="text-body font-semibold text-primary-800 mb-2">
                  {smartDefaults?.hasData ? 'Personalized Tip' : 'Tracking Tip'}
                </h4>
                <p className="text-body-small text-primary-700 leading-relaxed">
                  {smartDefaults?.hasData ? (
                    <>Great job tracking consistently! Your most common symptom is "{smartDefaults.mostCommon?.name}" with an average severity of {smartDefaults.mostCommon?.avgSeverity}/10. Share these patterns with your healthcare provider.</>
                  ) : (
                    <>Keep logging regularly to identify patterns and share these logs with your healthcare provider during your next visit.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Toast */}
      {showSuccessMessage && lastSubmittedSymptom && (
        <SuccessMessage 
          symptom={lastSubmittedSymptom}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </div>
  );
};

// Professional Symptom Card Component - Enhanced with better spacing and interactions
const SymptomCard = ({ symptom, onDelete, getSeverityColor, getSeverityLabel, formatTime }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200 hover:border-slate-300">
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
        className="p-2 hover:bg-error-50 rounded-lg transition-colors text-slate-400 hover:text-error-600 flex-shrink-0"
        title="Delete symptom"
      >
        <TrashIcon />
      </button>
    </div>
    
    <div className="flex items-center gap-3 mb-3">
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

// END OF SECTION 9 - Complete Enhanced File
