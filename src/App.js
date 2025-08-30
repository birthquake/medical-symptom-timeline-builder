import React, { useState, useEffect } from 'react';
import SymptomTracker from './components/SymptomTracker';
import MedicationTracker from './components/MedicationTracker';
import Timeline from './components/Timeline';
import Reports from './components/Reports';
import DisclaimerTab from './components/DisclaimerTab';
import { 
  HomeIcon, 
  SymptomsIcon, 
  MedsIcon, 
  TimelineIcon, 
  ReportsIcon, 
  InfoIcon, 
  PlusIcon 
} from './components/Icons';

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

      {/* Bottom Navigation */}
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
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.5rem',
          padding: '0 1rem'
        }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <HomeIcon active={currentView === 'home'} />
            <span style={{ 
              fontSize: '0.75rem', 
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
              padding: '0.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <SymptomsIcon active={currentView === 'symptoms'} />
            <span style={{ 
              fontSize: '0.75rem', 
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
              padding: '0.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <MedsIcon active={currentView === 'medications'} />
            <span style={{ 
              fontSize: '0.75rem', 
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
              padding: '0.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <TimelineIcon active={currentView === 'timeline'} />
            <span style={{ 
              fontSize: '0.75rem', 
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
              padding: '0.5rem',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <ReportsIcon active={currentView === 'reports'} />
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: '500',
              color: currentView === 'reports' ? '#3B82F6' : '#64748B'
            }}>
              Reports
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
        </div>
      </div>

      {/* Medical Info Card - Bottom tab access only */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <InfoIcon />
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#DC2626',
            margin: 0
          }}>
            Medical Information
          </h3>
        </div>
        
        <p style={{
          color: '#991B1B',
          margin: '0 0 1rem 0',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          TrackRX is for tracking purposes only and does not provide medical advice. 
          Always consult healthcare professionals for medical decisions.
        </p>
        
        <button
          onClick={() => setCurrentView('disclaimer')}
          style={{
            backgroundColor: '#DC2626',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Read Full Medical Disclaimer
        </button>
      </div>
    </div>
  );
};

export default App;
