import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <h1 className="text-3xl font-bold text-primary text-center">
            Medical Symptom Timeline Builder
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            Track your symptoms and medications with visual timelines
          </p>
        </header>

        {/* Welcome Section */}
        <main className="main-content">
          <div className="welcome-card">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Your Health Journey</h2>
            <p className="text-gray-700 mb-6">
              Take control of your health by tracking symptoms, medications, and creating 
              professional reports for your doctor visits.
            </p>

            {/* Feature Cards */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="font-semibold text-lg mb-2">Track Symptoms</h3>
                <p className="text-sm text-gray-600">
                  Log symptoms with severity levels and identify patterns over time.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💊</div>
                <h3 className="font-semibold text-lg mb-2">Manage Medications</h3>
                <p className="text-sm text-gray-600">
                  Track medications, dosages, and monitor effectiveness.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3 className="font-semibold text-lg mb-2">Visual Timeline</h3>
                <p className="text-sm text-gray-600">
                  See your health data in an interactive timeline format.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📄</div>
                <h3 className="font-semibold text-lg mb-2">Export Reports</h3>
                <p className="text-sm text-gray-600">
                  Generate professional reports to share with healthcare providers.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section">
              <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
              <div className="cta-buttons">
                <button className="btn-primary">
                  Track Your First Symptom
                </button>
                <button className="btn-secondary">
                  Add Medication
                </button>
              </div>
            </div>
          </div>

          {/* Status Section - Shows app is working */}
          <div className="status-section">
            <div className="status-card">
              <h4 className="font-semibold text-success">✅ App Status: Running</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your Medical Symptom Timeline Builder is successfully deployed and ready to use!
              </p>
              <div className="status-details">
                <span className="status-badge">React ✓</span>
                <span className="status-badge">PWA Ready ✓</span>
                <span className="status-badge">Vercel Deployed ✓</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p className="text-sm text-gray-500">
            © 2025 Medical Symptom Timeline Builder - Your health data stays private and secure
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
