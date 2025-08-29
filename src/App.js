import React, { useState, useEffect } from 'react';
import SymptomTracker from './components/SymptomTracker';
import MedicationTracker from './components/MedicationTracker';
import Timeline from './components/Timeline';
import Reports from './components/Reports';
import MedicalDisclaimer from './components/MedicalDisclaimer';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  // Check if user has accepted disclaimer on app load
  useEffect(() => {
    const accepted = localStorage.getItem('medicalDisclaimerAccepted');
    if (accepted === 'true') {
      setDisclaimerAccepted(true);
    } else {
      setShowDisclaimer(true);
    }
  }, []);

  const handleDisclaimerAccept = () => {
    setDisclaimerAccepted(true);
    setShowDisclaimer(false);
    localStorage.setItem('medicalDisclaimerAccepted', 'true');
  };

  const handleViewDisclaimer = () => {
    setShowDisclaimer(true);
  };

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
      case 'home':
      default:
        return <HomePage setCurrentView={setCurrentView} onViewDisclaimer={handleViewDisclaimer} />;
    }
  };

  // Show disclaimer modal if not accepted
  if (showDisclaimer && !disclaimerAccepted) {
    return <MedicalDisclaimer onAccept={handleDisclaimerAccept} />;
  }

  return (
    <div style={{ 
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Medical Disclaimer Banner */}
      <div style={{
        backgroundColor: '#fef2f2',
        borderBottom: '1px solid #fecaca',
        padding: '0.5rem 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ color: '#991b1b', fontSize: '0.9rem' }}>
            ⚕️ This app is for tracking purposes only and does not provide medical advice. 
          </span>
          <button
            onClick={handleViewDisclaimer}
            style={{
              background: 'none',
              border: 'none',
              color: '#dc2626',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            View full disclaimer
          </button>
        </div>
      </div>

      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '1.5rem 0',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          textAlign: 'center' 
        }}>
          <h1 style={{ 
            fontSize: '2rem',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            Medical Symptom Timeline Builder
          </h1>
          <p style={{ 
            fontSize: '1rem',
            opacity: 0.9,
            margin: 0
          }}>
            Track your symptoms and medications • Share with healthcare providers
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'home' ? '#2563eb' : 'white',
              color: currentView === 'home' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🏠 Home
          </button>
          <button
            onClick={() => setCurrentView('symptoms')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'symptoms' ? '#2563eb' : 'white',
              color: currentView === 'symptoms' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📊 Symptoms
          </button>
          <button
            onClick={() => setCurrentView('medications')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'medications' ? '#2563eb' : 'white',
              color: currentView === 'medications' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            💊 Medications
          </button>
          <button
            onClick={() => setCurrentView('timeline')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'timeline' ? '#2563eb' : 'white',
              color: currentView === 'timeline' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📈 Timeline
          </button>
          <button
            onClick={() => setCurrentView('reports')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'reports' ? '#2563eb' : 'white',
              color: currentView === 'reports' ? 'white' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📄 Reports
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {renderCurrentView()}
      </main>

      {/* Footer with Medical Notice */}
      <footer style={{
        marginTop: '3rem',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: 'white'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            © 2025 Medical Symptom Timeline Builder - Your data stays private and secure
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
            ⚕️ Not intended for medical diagnosis or treatment • Always consult healthcare professionals • 
            <button
              onClick={handleViewDisclaimer}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginLeft: '0.25rem',
                fontSize: '0.8rem'
              }}
            >
              Medical Disclaimer
            </button>
          </p>
        </div>
      </footer>

      {/* Show disclaimer modal if requested */}
      {showDisclaimer && disclaimerAccepted && (
        <MedicalDisclaimer onAccept={() => setShowDisclaimer(false)} />
      )}
    </div>
  );
}

// Enhanced Home Page Component with Medical Best Practices
const HomePage = ({ setCurrentView, onViewDisclaimer }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Medical Safety Notice */}
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>🚨</span>
          <h3 style={{ margin: 0, color: '#dc2626', fontSize: '1.2rem' }}>
            Important Medical Safety Information
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4 style={{ color: '#991b1b', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
              🚑 Medical Emergencies
            </h4>
            <p style={{ color: '#991b1b', margin: 0, fontSize: '0.9rem' }}>
              Call 911 immediately for emergencies. Do not use this app during medical emergencies.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#991b1b', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
              ⚕️ Healthcare Decisions
            </h4>
            <p style={{ color: '#991b1b', margin: 0, fontSize: '0.9rem' }}>
              Always consult healthcare professionals. This app tracks data but cannot diagnose or treat.
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={onViewDisclaimer}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Read Full Medical Disclaimer
          </button>
        </div>
      </div>

      {/* Main Welcome Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#16a34a', marginBottom: '1rem', fontSize: '1.8rem' }}>
          📊 Your Personal Health Tracking Assistant
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '1.1rem' }}>
          Organize your health information to share with healthcare providers and track patterns over time.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button
            onClick={() => setCurrentView('symptoms')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            📊 Track Symptoms
          </button>
          <button
            onClick={() => setCurrentView('medications')}
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            💊 Log Medications
          </button>
          <button
            onClick={() => setCurrentView('timeline')}
            style={{
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            📈 View Timeline
          </button>
          <button
            onClick={() => setCurrentView('reports')}
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            📄 Generate Reports
          </button>
        </div>
      </div>

      {/* Feature Status Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Symptom Tracking</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
            Log symptoms with severity and notes
          </p>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ READY
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💊</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Medication Tracking</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
            Log prescribed medications and doses
          </p>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ READY
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Timeline View</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
            Chronological view of health events
          </p>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ READY
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Healthcare Reports</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
            Professional summaries for doctors
          </p>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ READY
          </span>
        </div>
      </div>

      {/* Safe Usage Guide */}
      <div style={{
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        <h3 style={{ color: '#0369a1', marginBottom: '1.5rem', textAlign: 'center' }}>
          🎯 Best Practices for Health Tracking
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          textAlign: 'left' 
        }}>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>📝 Accurate Recording</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              Log symptoms and medications accurately as they occur. Include relevant details like timing, severity, and circumstances.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>⚕️ Share with Doctors</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              Use generated reports during medical appointments. This helps healthcare providers make informed decisions.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>🔒 Privacy Protection</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              Your data stays on your device. Regularly export backups to prevent data loss from device issues.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>🚨 Know Limitations</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              This app tracks data only. For medical emergencies, diagnosis, or treatment decisions, consult healthcare professionals immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
