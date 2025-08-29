import React, { useState } from 'react';
import SymptomTracker from './components/SymptomTracker';
import MedicationTracker from './components/MedicationTracker';
import Timeline from './components/Timeline';
import Reports from './components/Reports';

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
      case 'reports':
        return <Reports />;
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
        © 2025 Medical Symptom Timeline Builder - Your data stays private and secure
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
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#16a34a', marginBottom: '1rem', fontSize: '1.8rem' }}>
          🎉 Your Complete Medical Tracking App is Ready!
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '1.1rem' }}>
          All core features are now live. Track symptoms, manage medications, view timelines, and generate professional reports.
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
            💊 Manage Medications
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
          border: '1px solid #e2e8f0',
          textAlign: 'center'
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
          border: '1px solid #e2e8f0',
          textAlign: 'center'
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
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Export Reports</h3>
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
      </div>

      {/* Usage Guide */}
      <div style={{
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        <h3 style={{ color: '#0369a1', marginBottom: '1.5rem', textAlign: 'center' }}>
          🎯 Your Complete Medical Tracking System
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          textAlign: 'left' 
        }}>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>📊 Track Daily Health</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              Log symptoms with severity levels, notes, and timestamps. Quick-select common symptoms for faster entry.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>💊 Medication Management</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              Track medications and dosages. Log when you take them to monitor compliance and effectiveness.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>📈 Visual Timeline</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              See all your health data in chronological order. Filter by date ranges and event types to spot patterns.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#0c4a6e', margin: '0 0 0.5rem 0' }}>📄 Professional Reports</h4>
            <p style={{ color: '#0c4a6e', fontSize: '0.9rem', margin: 0 }}>
              Generate comprehensive reports with statistics and summaries. Print or save as PDF for doctor visits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
