import React, { useState, useEffect } from 'react';
import SymptomTracker from './components/SymptomTracker';
import MedicationTracker from './components/MedicationTracker';
import Timeline from './components/Timeline';
import Reports from './components/Reports';
import DoctorVisitPrep from './components/DoctorVisitPrep';
import DisclaimerTab from './components/DisclaimerTab';
import NotificationManager from './components/NotificationManager';

// Professional Medical App Icons
const HomeIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
    <path d="M9 22V12H15V22"/>
  </svg>
);

const SymptomsIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"/>
    <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8"/>
  </svg>
);

const MedsIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="2" y="8" width="20" height="12" rx="3"/>
    <path d="M6 4V8M10 4V8M14 4V8M18 4V8M6 12H18M6 16H12"/>
  </svg>
);

const TimelineIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2V22M17 5H9.5C8.11929 5 7 6.11929 7 7.5V7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5V12.5C17 13.8807 15.8807 15 14.5 15H9"/>
    <circle cx="12" cy="7" r="2"/>
    <circle cx="12" cy="17" r="2"/>
  </svg>
);

const ReportsIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M3 3V21L21 12L3 3Z"/>
    <path d="M21 21H10L21 12V21Z"/>
  </svg>
);

const DoctorPrepIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M22 12H18L15 21L9 3L6 12H2"/>
    <circle cx="12" cy="6" r="2"/>
  </svg>
);

const InfoIcon = ({ active = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16V12M12 8H12.01"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <path d="M12 5V19M5 12H19"/>
  </svg>
);

const NotificationBellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8"/>
    <path d="M13.73 21A2 2 0 0 1 10.27 21"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 3L13.09 8.26L18 9L13.09 9.74L12 15L10.91 9.74L6 9L10.91 8.26L12 3Z"/>
    <path d="M19 3V7M21 5H17"/>
  </svg>
);

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [streak, setStreak] = useState(0);

  // Load streak data
  useEffect(() => {
    const savedStreak = localStorage.getItem('trackRxStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  const renderCurrentView = () => {
    switch(currentView) {
      case 'symptoms':
        return <SymptomTracker />;
      case 'medications':
        return <MedicationTracker />;
      case 'timeline':
        return <Timeline />;
      case 'reports':
        return <Reports />;
      case 'doctor-prep':
        return <DoctorVisitPrep />;
      case 'reminders':
        return <NotificationManager />;
      case 'disclaimer':
        return <DisclaimerTab />;
      case 'home':
      default:
        return <HomePage setCurrentView={setCurrentView} streak={streak} />;
    }
  };

  const handleQuickAdd = (type) => {
    setShowQuickAdd(false);
    setCurrentView(type);
  };

  return (
    <div className="bg-slate-50 min-h-screen mobile-safe">
      {/* Professional Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50" 
              style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="container max-w-md mx-auto">
          <div className="flex items-center justify-center py-4">
            <h1 className="text-display-2 text-slate-900" style={{ letterSpacing: '-0.02em' }}>
              Track<span className="text-primary-600">RX</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-md mx-auto px-4 py-6">
        {renderCurrentView()}
      </main>

      {/* Professional Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50"
           style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="container max-w-md mx-auto">
          <div className="grid grid-cols-7 gap-1 p-2">
            <NavButton 
              icon={HomeIcon} 
              label="Home" 
              active={currentView === 'home'}
              onClick={() => setCurrentView('home')}
            />
            <NavButton 
              icon={SymptomsIcon} 
              label="Symptoms" 
              active={currentView === 'symptoms'}
              onClick={() => setCurrentView('symptoms')}
            />
            <NavButton 
              icon={MedsIcon} 
              label="Meds" 
              active={currentView === 'medications'}
              onClick={() => setCurrentView('medications')}
            />
            <NavButton 
              icon={TimelineIcon} 
              label="Timeline" 
              active={currentView === 'timeline'}
              onClick={() => setCurrentView('timeline')}
            />
            <NavButton 
              icon={ReportsIcon} 
              label="Reports" 
              active={currentView === 'reports'}
              onClick={() => setCurrentView('reports')}
            />
            <NavButton 
              icon={DoctorPrepIcon} 
              label="Dr Prep" 
              active={currentView === 'doctor-prep'}
              onClick={() => setCurrentView('doctor-prep')}
              className="text-medical-teal"
            />
            <NavButton 
              icon={InfoIcon} 
              label="Medical" 
              active={currentView === 'disclaimer'}
              onClick={() => setCurrentView('disclaimer')}
              className="text-error-600"
            />
          </div>
        </div>
      </nav>

      {/* Premium Floating Action Button */}
      {(currentView === 'home' || currentView === 'symptoms' || currentView === 'medications') && (
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="fixed bottom-20 right-4 w-14 h-14 bg-primary-600 text-white rounded-full shadow-xl z-40 transition"
          style={{
            boxShadow: '0 8px 25px -8px rgba(37, 99, 235, 0.4)',
            transform: showQuickAdd ? 'rotate(45deg) scale(1.05)' : 'rotate(0deg) scale(1)'
          }}
          onMouseEnter={(e) => {
            if (!showQuickAdd) e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            if (!showQuickAdd) e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div className="flex items-center justify-center">
            <PlusIcon />
          </div>
        </button>
      )}

      {/* Premium Quick Add Menu */}
      {showQuickAdd && (
        <div className="fixed bottom-36 right-4 bg-white rounded-xl shadow-2xl border border-slate-200 z-40 min-w-48"
             style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <div className="p-2">
            <QuickAddButton
              icon={SymptomsIcon}
              title="Log Symptom"
              description="How are you feeling?"
              onClick={() => handleQuickAdd('symptoms')}
            />
            <QuickAddButton
              icon={MedsIcon}
              title="Add Medication"
              description="Track your meds"
              onClick={() => handleQuickAdd('medications')}
            />
          </div>
        </div>
      )}

      {/* Overlay */}
      {showQuickAdd && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowQuickAdd(false)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Navigation Button Component
const NavButton = ({ icon: Icon, label, active, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
      active 
        ? 'text-primary-600 bg-primary-50' 
        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
    } ${className}`}
  >
    <div className="mb-1">
      <Icon active={active} />
    </div>
    <span className="text-xs font-medium leading-tight">
      {label}
    </span>
  </button>
);

// Quick Add Button Component
const QuickAddButton = ({ icon: Icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-3 rounded-lg text-left hover:bg-slate-50 transition-colors flex items-center gap-3"
  >
    <div className="text-slate-600">
      <Icon />
    </div>
    <div>
      <div className="text-body font-medium text-slate-900">{title}</div>
      <div className="text-body-small text-slate-600">{description}</div>
    </div>
  </button>
);

// Premium Home Page Component
const HomePage = ({ setCurrentView, streak }) => {
  const [todayData, setTodayData] = useState({ symptoms: 0, medications: 0 });

  useEffect(() => {
    // Get today's data for quick stats
    const today = new Date().toISOString().split('T')[0];
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');
    
    const todaySymptoms = symptoms.filter(s => s.date === today).length;
    const todayMeds = medicationLogs.filter(m => m.date === today).length;
    
    setTodayData({ symptoms: todaySymptoms, medications: todayMeds });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Card */}
      <div className="health-card">
        <div className="health-card-body">
          <h2 className="text-heading-1 text-slate-900 mb-3">
            How are you today?
          </h2>
          <p className="text-body text-slate-600 leading-relaxed">
            Track your symptoms and medications to better understand your health patterns and prepare for medical appointments.
          </p>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="health-card">
        <div className="health-card-header">
          <h3 className="text-heading-3 text-slate-900">Today's Summary</h3>
        </div>
        <div className="health-card-body">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className={`text-metric text-medical-large mb-1 ${
                todayData.symptoms > 0 ? 'text-warning-600' : 'text-slate-400'
              }`}>
                {todayData.symptoms}
              </div>
              <div className="text-body-small text-slate-600 font-medium">
                Symptoms logged
              </div>
            </div>
            
            <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className={`text-metric text-medical-large mb-1 ${
                todayData.medications > 0 ? 'text-success-600' : 'text-slate-400'
              }`}>
                {todayData.medications}
              </div>
              <div className="text-body-small text-slate-600 font-medium">
                Medications taken
              </div>
            </div>
          </div>

          {(todayData.symptoms === 0 && todayData.medications === 0) && (
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <SparkleIcon />
                <span className="text-body font-medium text-primary-700">
                  Start your day by logging how you're feeling
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smart Reminders Feature */}
      <div className="health-card">
        <div className="health-card-header">
          <h3 className="text-heading-3 text-slate-900">Stay on Track</h3>
        </div>
        <div className="health-card-body">
          <button
            onClick={() => setCurrentView('reminders')}
            className="w-full p-4 bg-success-50 border-2 border-success-200 rounded-lg hover:bg-success-100 hover:border-success-300 transition-all duration-200 text-left relative overflow-hidden"
            style={{ transform: 'translateY(0)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                <NotificationBellIcon />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-heading-3 text-success-800">Smart Reminders</span>
                  <span className="px-2 py-1 bg-error-600 text-white text-xs font-bold rounded uppercase">
                    New
                  </span>
                </div>
                <p className="text-body-small text-success-700 leading-relaxed">
                  Never miss medications or daily check-ins. Build healthy tracking habits.
                </p>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-warning-200 to-warning-300 rounded-full opacity-60" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="health-card">
        <div className="health-card-header">
          <h3 className="text-heading-3 text-slate-900">Quick Actions</h3>
        </div>
        <div className="health-card-body">
          <div className="flex flex-col gap-3">
            <ActionButton
              icon={SymptomsIcon}
              title="Log a Symptom"
              description="How are you feeling right now?"
              onClick={() => setCurrentView('symptoms')}
            />
            
            <ActionButton
              icon={MedsIcon}
              title="Track Medication"
              description="Add or log your medications"
              onClick={() => setCurrentView('medications')}
            />
            
            <ActionButton
              icon={TimelineIcon}
              title="View Your Timeline"
              description="See your health patterns over time"
              onClick={() => setCurrentView('timeline')}
            />
            
            <ActionButton
              icon={DoctorPrepIcon}
              title="Prepare for Doctor Visit"
              description="Get ready with insights and questions"
              onClick={() => setCurrentView('doctor-prep')}
              highlight
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Action Button Component
const ActionButton = ({ icon: Icon, title, description, onClick, highlight = false }) => (
  <button
    onClick={onClick}
    className={`p-4 border rounded-lg hover:shadow-sm transition-all duration-200 text-left flex items-center gap-3 ${
      highlight 
        ? 'bg-success-50 border-success-200 hover:bg-success-100 hover:border-success-300' 
        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
    }`}
  >
    <div className={highlight ? 'text-success-600' : 'text-slate-600'}>
      <Icon />
    </div>
    <div className="flex-1">
      <div className="text-body font-medium text-slate-900 mb-1">
        {title}
      </div>
      <div className="text-body-small text-slate-600">
        {description}
      </div>
    </div>
  </button>
);

export default App;
