import React, { useState, useEffect } from 'react';
import SymptomTracker from './components/SymptomTracker';
import MedicationTracker from './components/MedicationTracker';
import Timeline from './components/Timeline';
import Reports from './components/Reports';
import DoctorVisitPrep from './components/DoctorVisitPrep';
import DisclaimerTab from './components/DisclaimerTab';
import NotificationManager from './components/NotificationManager';

// Inline SVG Icons (working version)
const HomeIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "#EFF6FF" : "none"}
    />
    <path 
      d="M9 22V12H15V22" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const SymptomsIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M9 11H15M9 15H15M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H12.586C12.8512 3.00006 13.1055 3.10545 13.293 3.293L18.707 8.707C18.8946 8.8945 18.9999 9.14881 19 9.414V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "#EFF6FF" : "none"}
    />
  </svg>
);

const MedsIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect 
      x="3" y="8" width="18" height="13" rx="2" ry="2"
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2"
      fill={active ? "#EFF6FF" : "none"}
    />
    <path 
      d="M7 3V8M17 3V8M7 12H17M7 16H12" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

const TimelineIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M3 3V21L21 12L3 3Z" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "#EFF6FF" : "none"}
    />
  </svg>
);

const ReportsIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "#EFF6FF" : "none"}
    />
    <polyline 
      points="14,2 14,8 20,8" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="16" y1="13" x2="8" y2="13" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="16" y1="17" x2="8" y2="17" 
      stroke={active ? "#3B82F6" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const DoctorPrepIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M22 12h-4l-3 9L9 3l-3 9H2" 
      stroke={active ? "#059669" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "#F0FDF4" : "none"}
    />
    <circle 
      cx="12" cy="6" r="2" 
      stroke={active ? "#059669" : "#64748B"} 
      strokeWidth="2"
      fill={active ? "#059669" : "none"}
    />
  </svg>
);

const InfoIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle 
      cx="12" cy="12" r="10" 
      stroke={active ? "#DC2626" : "#64748B"} 
      strokeWidth="2"
      fill={active ? "#FEF2F2" : "none"}
    />
    <path 
      d="M12 16V12M12 8H12.01" 
      stroke={active ? "#DC2626" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M12 5V19M5 12H19" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const NotificationBellIcon = ({ active = false }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" 
      stroke={active ? "#059669" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill={active ? "#F0FDF4" : "none"}
    />
    <path 
      d="M13.73 21a2 2 0 0 1-3.46 0" 
      stroke={active ? "#059669" : "#64748B"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
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
    <div style={{ 
      backgroundColor: '#F8FAFC',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '80px' // Space for bottom nav
    }}>
      {/* Clean Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '1rem 0 0.5rem 0',
        borderBottom: '1px solid #E2E8F0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div style={{ 
          maxWidth: '420px', 
          margin: '0 auto', 
          padding: '0 1rem',
          textAlign: 'center' 
        }}>
          <h1 style={{ 
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1E293B',
            margin: 0,
            letterSpacing: '-0.025em'
          }}>
            TrackRX
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '420px',
        margin: '0 auto',
        padding: '1rem',
        minHeight: 'calc(100vh - 160px)'
      }}>
        {renderCurrentView()}
      </main>

      {/* Bottom Navigation - Updated to 7 tabs */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #E2E8F0',
        padding: '0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '420px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.125rem',
          padding: '0 0.25rem'
        }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <HomeIcon active={currentView === 'home'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'home' ? '#3B82F6' : '#64748B'
            }}>
              Home
            </span>
          </button>

          <button
            onClick={() => setCurrentView('symptoms')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <SymptomsIcon active={currentView === 'symptoms'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'symptoms' ? '#3B82F6' : '#64748B'
            }}>
              Symptoms
            </span>
          </button>

          <button
            onClick={() => setCurrentView('medications')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <MedsIcon active={currentView === 'medications'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'medications' ? '#3B82F6' : '#64748B'
            }}>
              Meds
            </span>
          </button>

          <button
            onClick={() => setCurrentView('timeline')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <TimelineIcon active={currentView === 'timeline'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'timeline' ? '#3B82F6' : '#64748B'
            }}>
              Timeline
            </span>
          </button>

          <button
            onClick={() => setCurrentView('reports')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <ReportsIcon active={currentView === 'reports'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'reports' ? '#3B82F6' : '#64748B'
            }}>
              Reports
            </span>
          </button>

          <button
            onClick={() => setCurrentView('doctor-prep')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <DoctorPrepIcon active={currentView === 'doctor-prep'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'doctor-prep' ? '#059669' : '#64748B'
            }}>
              Dr Prep
            </span>
          </button>

          <button
            onClick={() => setCurrentView('disclaimer')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.125rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <InfoIcon active={currentView === 'disclaimer'} />
            <span style={{ 
              fontSize: '0.5rem', 
              fontWeight: '500',
              color: currentView === 'disclaimer' ? '#DC2626' : '#64748B'
            }}>
              Medical
            </span>
          </button>
        </div>
      </nav>

      {/* Floating Action Button */}
      {(currentView === 'home' || currentView === 'symptoms' || currentView === 'medications') && (
        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '1rem',
            width: '56px',
            height: '56px',
            backgroundColor: '#3B82F6',
            border: 'none',
            borderRadius: '28px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px -8px rgba(59, 130, 246, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            transition: 'all 0.2s',
            transform: showQuickAdd ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
          onMouseEnter={(e) => e.target.style.transform = showQuickAdd ? 'rotate(45deg) scale(1.1)' : 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = showQuickAdd ? 'rotate(45deg)' : 'scale(1)'}
        >
          <PlusIcon />
        </button>
      )}

      {/* Quick Add Menu */}
      {showQuickAdd && (
        <div style={{
          position: 'fixed',
          bottom: '180px',
          right: '1rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '0.5rem',
          boxShadow: '0 10px 40px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          zIndex: 998,
          minWidth: '160px'
        }}>
          <button
            onClick={() => handleQuickAdd('symptoms')}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              textAlign: 'left',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <SymptomsIcon />
            Log Symptom
          </button>
          <button
            onClick={() => handleQuickAdd('medications')}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              textAlign: 'left',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <MedsIcon />
            Add Medication
          </button>
        </div>
      )}

      {/* Overlay to close quick add */}
      {showQuickAdd && (
        <div
          onClick={() => setShowQuickAdd(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 997
          }}
        />
      )}
    </div>
  );
}

// Clean, Noom-Inspired Home Page
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Greeting Card */}
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
          How are you today?
        </h2>
        <p style={{ 
          color: '#64748B', 
          margin: 0,
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          Track your symptoms and medications to better understand your health patterns.
        </p>
      </div>

      {/* Today's Summary */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Today's Summary
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem' 
        }}>
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: todayData.symptoms > 0 ? '#F59E0B' : '#64748B',
              margin: '0 0 0.25rem 0'
            }}>
              {todayData.symptoms}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748B',
              fontWeight: '500'
            }}>
              Symptoms logged
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: todayData.medications > 0 ? '#10B981' : '#64748B',
              margin: '0 0 0.25rem 0'
            }}>
              {todayData.medications}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748B',
              fontWeight: '500'
            }}>
              Medications taken
            </div>
          </div>
        </div>

        {(todayData.symptoms === 0 && todayData.medications === 0) && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#EFF6FF',
            borderRadius: '12px',
            border: '1px solid #BFDBFE',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#1E40AF',
              margin: 0,
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Start your day by logging how you're feeling
            </p>
          </div>
        )}
      </div>

      {/* Smart Reminders - Special Feature Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Stay on Track
        </h3>
        
        <button
          onClick={() => setCurrentView('reminders')}
          style={{
            width: '100%',
            padding: '1.25rem',
            border: '2px solid #BBF7D0',
            backgroundColor: '#F0FDF4',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            transition: 'all 0.2s',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ECFDF5';
            e.target.style.borderColor = '#86EFAC';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#F0FDF4';
            e.target.style.borderColor = '#BBF7D0';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#059669',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <NotificationBellIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '700', 
              color: '#065F46',
              margin: '0 0 0.25rem 0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Smart Reminders
              <div style={{
                backgroundColor: '#DC2626',
                color: 'white',
                fontSize: '0.625rem',
                fontWeight: '700',
                padding: '0.125rem 0.375rem',
                borderRadius: '8px',
                textTransform: 'uppercase'
              }}>
                New
              </div>
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#047857',
              lineHeight: '1.4'
            }}>
              Never miss medications or daily check-ins. Build healthy tracking habits.
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #FEF3C7, #FDE68A)',
            borderRadius: '20px',
            opacity: 0.6
          }} />
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Quick Actions
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => setCurrentView('symptoms')}
            style={{
              padding: '1rem',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FAFAFA',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F3F4F6';
              e.target.style.borderColor = '#D1D5DB';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.borderColor = '#E2E8F0';
            }}
          >
            <SymptomsIcon />
            <div>
              <div style={{ 
                fontSize: '1rem', 
                fontWeight: '500', 
                color: '#1E293B',
                margin: '0 0 0.25rem 0'
              }}>
                Log a Symptom
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#64748B'
              }}>
                How are you feeling right now?
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('medications')}
            style={{
              padding: '1rem',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FAFAFA',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F3F4F6';
              e.target.style.borderColor = '#D1D5DB';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.borderColor = '#E2E8F0';
            }}
          >
            <MedsIcon />
            <div>
              <div style={{ 
                fontSize: '1rem', 
                fontWeight: '500', 
                color: '#1E293B',
                margin: '0 0 0.25rem 0'
              }}>
                Track Medication
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#64748B'
              }}>
                Add or log your medications
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('timeline')}
            style={{
              padding: '1rem',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FAFAFA',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F3F4F6';
              e.target.style.borderColor = '#D1D5DB';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.borderColor = '#E2E8F0';
            }}
          >
            <TimelineIcon />
            <div>
              <div style={{ 
                fontSize: '1rem', 
                fontWeight: '500', 
                color: '#1E293B',
                margin: '0 0 0.25rem 0'
              }}>
                View Your Timeline
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#64748B'
              }}>
                See your health patterns over time
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('doctor-prep')}
            style={{
              padding: '1rem',
              border: '1px solid #BBF7D0',
              backgroundColor: '#F0FDF4',
              borderRadius: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ECFDF5';
              e.target.style.borderColor = '#86EFAC';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#F0FDF4';
              e.target.style.borderColor = '#BBF7D0';
            }}
          >
            <DoctorPrepIcon active={false} />
            <div>
              <div style={{ 
                fontSize: '1rem', 
                fontWeight: '500', 
                color: '#1E293B',
                margin: '0 0 0.25rem 0'
              }}>
                Prepare for Doctor Visit
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#64748B'
              }}>
                Get ready with insights and questions
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
