import React, { useState } from 'react';
import SymptomTracker from './components/SymptomTracker';
import MedicationTracker from './components/MedicationTracker';
import Timeline from './components/Timeline';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch(currentView) {
      case 'symptoms':
        return <SymptomTracker />;
      case 'medications':
        return <MedicationTracker />;
      case 'timeline':
        return <Timeline />;
      case 'home':
      default:
        return <HomePage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
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
            Track your symptoms and medications with visual timelines
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
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#94a3b8',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'not-allowed',
              fontSize: '0.9rem'
            }}
            disabled
          >
            📄 Reports (Soon)
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

      {/* Footer */}
      <footer style={{
        marginTop: '3rem',
        padding: '2rem 1rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: 'white'
      }}>
        © 2025 Medical Symptom Timeline Builder - Your data stays private
      </footer>
    </div>
  );
}

// Home Page Component
const HomePage = ({ setCurrentView }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ color: '#16a34a', marginBottom: '1rem' }}>
          🎉 All Core Features Complete!
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
          Your medical tracking app now has symptoms, medications, and timeline views.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentView('symptoms')}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
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
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            💊 Manage Medications
          </button>
          <button
            onClick={() => setCurrentView('timeline')}
            style={{
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            📈 View Timeline
          </button>
        </div>
      </div>

      {/* Status Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Symptom Tracking</h3>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ COMPLETE
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💊</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Medication Tracking</h3>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ COMPLETE
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Timeline View</h3>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ COMPLETE
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Export Reports</h3>
          <span style={{
            backgroundColor: '#d97706',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            🚧 NEXT
          </span>
        </div>
      </div>

      {/* Usage Tips */}
      <div style={{
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#0369a1', marginBottom: '1rem' }}>🎯 How to Use Your Timeline</h3>
        <div style={{ textAlign: 'left', color: '#0c4a6e' }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            ✅ Add some symptoms and medications to see your timeline populate
          </p>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            ✅ Use filters to focus on specific timeframes or event types
          </p>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            ✅ Look for patterns - do symptoms occur after certain activities?
          </p>
          <p style={{ margin: '0' }}>
            ✅ Share your timeline view with healthcare providers
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
