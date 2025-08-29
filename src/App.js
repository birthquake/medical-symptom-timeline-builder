import React, { useState } from 'react';
import SymptomTracker from './components/SymptomTracker';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch(currentView) {
      case 'symptoms':
        return <SymptomTracker />;
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
            📊 Track Symptoms
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
            💊 Medications (Coming Soon)
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
            📈 Timeline (Coming Soon)
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
        © 2025 Medical Symptom Timeline Builder - Your health data stays private and secure
      </footer>
    </div>
  );
}

// Home Page Component
const HomePage = ({ setCurrentView }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Welcome Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ 
          color: '#16a34a', 
          marginBottom: '1rem',
          fontSize: '1.5rem'
        }}>
          ✅ Your App is Running Successfully!
        </h2>
        <p style={{ 
          marginBottom: '1.5rem', 
          color: '#64748b',
          fontSize: '1.1rem'
        }}>
          Welcome to your Medical Symptom Timeline Builder. Start tracking your health journey today.
        </p>
        
        <button
          onClick={() => setCurrentView('symptoms')}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          📊 Start Tracking Symptoms
        </button>
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
          <h3 style={{ 
            marginBottom: '0.5rem', 
            color: '#1e293b',
            fontSize: '1.2rem'
          }}>
            Track Symptoms
          </h3>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#64748b',
            marginBottom: '1rem'
          }}>
            Log symptoms with severity levels, notes, and timestamps. Quick selection from common symptoms.
          </p>
          <span style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            ✅ Available Now
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💊</div>
          <h3 style={{ 
            marginBottom: '0.5rem', 
            color: '#1e293b',
            fontSize: '1.2rem'
          }}>
            Medication Tracking
          </h3>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#64748b',
            marginBottom: '1rem'
          }}>
            Track medications, dosages, and monitor effectiveness over time.
          </p>
          <span style={{
            backgroundColor: '#d97706',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            🚧 Coming Next
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
          <h3 style={{ 
            marginBottom: '0.5rem', 
            color: '#1e293b',
            fontSize: '1.2rem'
          }}>
            Visual Timeline
          </h3>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#64748b',
            marginBottom: '1rem'
          }}>
            Interactive timeline showing symptom patterns and correlations over time.
          </p>
          <span style={{
            backgroundColor: '#64748b',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            📋 Planned
          </span>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
          <h3 style={{ 
            marginBottom: '0.5rem', 
            color: '#1e293b',
            fontSize: '1.2rem'
          }}>
            Export Reports
          </h3>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#64748b',
            marginBottom: '1rem'
          }}>
            Generate professional reports to share with healthcare providers.
          </p>
          <span style={{
            backgroundColor: '#64748b',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            📋 Planned
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          color: '#15803d', 
          marginBottom: '0.5rem',
          fontSize: '1.1rem'
        }}>
          🎯 Ready to Use Features
        </h3>
        <p style={{ color: '#166534', margin: 0 }}>
          ✅ Symptom tracking with severity scales<br/>
          ✅ Local data storage (your data never leaves your device)<br/>
          ✅ Responsive design (works on all devices)<br/>
          ✅ PWA ready (can be installed as an app)
        </p>
      </div>
    </div>
  );
};

export default App;
