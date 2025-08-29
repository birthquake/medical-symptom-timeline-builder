import React, { useState } from 'react';

const DisclaimerTab = () => {
  const [currentSection, setCurrentSection] = useState('overview');

  const disclaimerSections = {
    overview: {
      title: "⚕️ Important Medical Information",
      content: (
        <div>
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h3 style={{ color: '#dc2626', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
              🚨 Critical Safety Information
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#991b1b', color: 'white', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>🚑 MEDICAL EMERGENCIES</h4>
                <p style={{ margin: 0, fontSize: '1rem' }}>
                  Call 911 (US) or your local emergency number immediately for medical emergencies. 
                  Do NOT use this app during emergency situations.
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'white', border: '2px solid #dc2626', borderRadius: '8px' }}>
                <h4 style={{ color: '#dc2626', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                  ⚕️ THIS APP IS NOT MEDICAL ADVICE
                </h4>
                <p style={{ color: '#991b1b', margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                  This application is for tracking purposes ONLY and does not provide medical advice, 
                  diagnosis, or treatment recommendations.
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>What This App Does:</h3>
            <ul style={{ color: '#374151', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <li><strong>Tracks</strong> your symptoms and their patterns over time</li>
              <li><strong>Logs</strong> medications as prescribed by your healthcare provider</li>
              <li><strong>Organizes</strong> health information for doctor visits</li>
              <li><strong>Generates</strong> summary reports to share with healthcare professionals</li>
              <li><strong>Stores</strong> data locally on your device (private and secure)</li>
            </ul>
            
            <h3 style={{ color: '#1e293b', marginTop: '2rem', marginBottom: '1rem' }}>What This App Does NOT Do:</h3>
            <ul style={{ color: '#374151', lineHeight: '1.8', fontSize: '1.05rem' }}>
              <li><strong>Diagnose</strong> medical conditions or illnesses</li>
              <li><strong>Recommend</strong> treatments or medications</li>
              <li><strong>Replace</strong> professional medical consultations</li>
              <li><strong>Provide</strong> medical advice or interpretation</li>
              <li><strong>Monitor</strong> your health in real-time</li>
            </ul>
          </div>
        </div>
      )
    },
    usage: {
      title: "📋 Safe Usage Guidelines",
      content: (
        <div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ padding: '2rem', backgroundColor: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '12px' }}>
              <h3 style={{ color: '#15803d', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                ✅ RECOMMENDED Uses
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>📊</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803d' }}>Symptom Tracking</h4>
                    <p style={{ margin: 0, color: '#166534' }}>
                      Log symptoms with dates, times, severity levels, and notes. Track patterns over weeks or months.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>💊</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803d' }}>Medication Logging</h4>
                    <p style={{ margin: 0, color: '#166534' }}>
                      Record medications prescribed by your doctor. Track when you take them and any effects.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>📄</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803d' }}>Healthcare Communication</h4>
                    <p style={{ margin: 0, color: '#166534' }}>
                      Generate organized reports to share with doctors, nurses, and other healthcare providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '2rem', backgroundColor: '#fef2f2', border: '2px solid #dc2626', borderRadius: '12px' }}>
              <h3 style={{ color: '#dc2626', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                ❌ PROHIBITED Uses
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🚫</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>Self-Diagnosis</h4>
                    <p style={{ margin: 0, color: '#991b1b' }}>
                      Never use this app to diagnose yourself or determine what medical condition you might have.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🚫</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>Treatment Decisions</h4>
                    <p style={{ margin: 0, color: '#991b1b' }}>
                      Do not make medication or treatment decisions based on app data without consulting healthcare professionals.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🚫</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>Emergency Situations</h4>
                    <p style={{ margin: 0, color: '#991b1b' }}>
                      Never rely on this app during medical emergencies. Call 911 or go to the emergency room immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px' }}>
            <h4 style={{ color: '#0369a1', margin: '0 0 1rem 0' }}>💡 Best Practices for Healthcare Collaboration</h4>
            <ul style={{ color: '#0c4a6e', lineHeight: '1.6' }}>
              <li>Share your reports with healthcare providers during appointments</li>
              <li>Use the timeline view to show symptom patterns over time</li>
              <li>Be honest and accurate when logging symptoms and medications</li>
              <li>Ask your doctor how this tracking data can best support your care</li>
              <li>Continue following all medical advice from your healthcare team</li>
            </ul>
          </div>
        </div>
      )
    },
    privacy: {
      title: "🔒 Privacy & Data Security",
      content: (
        <div>
          <div style={{ backgroundColor: '#f0f9ff', border: '2px solid #2563eb', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h3 style={{ color: '#1d4ed8', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
              🛡️ Your Data Stays Private
            </h3>
            <p style={{ color: '#1e40af', fontSize: '1.1rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
              All your health information is stored locally on your device. We do not collect, transmit, 
              or store any of your personal health information on external servers.
            </p>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #93c5fd' }}>
              <h4 style={{ color: '#1d4ed8', margin: '0 0 0.5rem 0' }}>Local Storage Benefits:</h4>
              <ul style={{ color: '#1e40af', margin: 0, lineHeight: '1.5' }}>
                <li>Complete privacy - no one else can access your data</li>
                <li>No internet required for basic app functionality</li>
                <li>No data breaches possible - your data never leaves your device</li>
                <li>Full control - you can delete your data anytime</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <h4 style={{ color: '#374151', margin: '0 0 1rem 0' }}>🔒 What We DON'T Collect:</h4>
              <ul style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                <li>Personal health information</li>
                <li>Symptom data or medical histories</li>
                <li>Medication information</li>
                <li>Usage analytics or tracking data</li>
                <li>Device information or location data</li>
                <li>Any personally identifiable information</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <h4 style={{ color: '#374151', margin: '0 0 1rem 0' }}>💾 Data Backup Responsibility:</h4>
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', padding: '1rem', borderRadius: '6px' }}>
                <p style={{ color: '#92400e', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                  ⚠️ Important: You are responsible for backing up your data
                </p>
                <p style={{ color: '#92400e', margin: 0 }}>
                  Since data is stored locally, clearing browser data, uninstalling the app, or device issues 
                  may result in data loss. Use the "Export Data" feature regularly to create backups.
                </p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <h4 style={{ color: '#374151', margin: '0 0 1rem 0' }}>🔄 Data Export & Sharing:</h4>
              <ul style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                <li>Export your data anytime via the Reports section</li>
                <li>Share reports with healthcare providers as PDF or printed documents</li>
                <li>Data exports contain only the information you've entered</li>
                <li>You control what data to include in reports and who to share with</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    legal: {
      title: "⚖️ Legal Information",
      content: (
        <div>
          <div style={{ backgroundColor: '#f9fafb', border: '2px solid #6b7280', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h3 style={{ color: '#374151', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
              ⚖️ Legal Disclaimer & Liability
            </h3>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}>
              <p style={{ color: '#4b5563', margin: '0 0 1rem 0', fontSize: '1rem', lineHeight: '1.7' }}>
                <strong>This application is provided "as is" without warranty of any kind, express or implied.</strong> 
                The developers, contributors, and distributors of this software are not licensed healthcare providers 
                and do not assume any responsibility for medical decisions made based on the use of this application.
              </p>
              <p style={{ color: '#4b5563', margin: 0, fontSize: '1rem', lineHeight: '1.7' }}>
                <strong>No Medical Professional Relationship:</strong> Use of this app does not create a 
                doctor-patient relationship or any other healthcare professional relationship between you and the app developers.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <h4 style={{ color: '#374151', margin: '0 0 1rem 0' }}>📋 Terms of Use:</h4>
              <p style={{ color: '#4b5563', margin: '0 0 1rem 0' }}>By using this application, you acknowledge and agree that:</p>
              <ul style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                <li>You understand this is a tracking tool, not a medical device or service</li>
                <li>You will consult qualified healthcare professionals for all medical decisions</li>
                <li>You will not rely solely on this app for health management or medical care</li>
                <li>You understand the developers are not responsible for any medical outcomes</li>
                <li>You will seek immediate professional medical attention for health emergencies</li>
                <li>You accept full responsibility for how you use the information in this app</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <h4 style={{ color: '#374151', margin: '0 0 1rem 0' }}>⚠️ Limitation of Liability:</h4>
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '6px' }}>
                <p style={{ color: '#991b1b', margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                  <strong>To the maximum extent permitted by law, the developers of this application shall not be 
                  liable for any direct, indirect, incidental, special, consequential, or punitive damages arising 
                  from your use of this application, including but not limited to any medical decisions, treatments, 
                  or health outcomes.</strong>
                </p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              <h4 style={{ color: '#374151', margin: '0 0 1rem 0' }}>🏥 Professional Medical Advice:</h4>
              <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '1.5rem', borderRadius: '8px' }}>
                <p style={{ color: '#0c4a6e', margin: 0, fontSize: '1.1rem', lineHeight: '1.6', fontWeight: '600', textAlign: 'center' }}>
                  "Always consult with qualified healthcare professionals before making any decisions 
                  related to your health, medical treatment, or medications."
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px' }}>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem', textAlign: 'center' }}>
              Last updated: {new Date().toLocaleDateString()} | 
              This disclaimer may be updated periodically to reflect changes in the application or applicable laws.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          color: '#dc2626', 
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          ⚕️ Medical Information & Disclaimers
        </h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '1.1rem' }}>
          Please read this important medical and legal information about using this health tracking application.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '8px 8px 0 0',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        marginBottom: 0
      }}>
        {Object.keys(disclaimerSections).map(section => (
          <button
            key={section}
            onClick={() => setCurrentSection(section)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: currentSection === section ? '#2563eb' : 'white',
              color: currentSection === section ? 'white' : '#64748b',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: currentSection === section ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            {disclaimerSections[section].title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0 0 8px 8px',
        border: '1px solid #e2e8f0',
        borderTop: 'none',
        minHeight: '500px'
      }}>
        {disclaimerSections[currentSection].content}
      </div>

      {/* Important Notice Footer */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#dc2626',
        color: 'white',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
          🚨 Remember: This App Does Not Replace Professional Medical Care
        </h3>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.95 }}>
          If you have medical questions or concerns, contact your healthcare provider immediately. 
          For emergencies, call 911 or your local emergency number.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerTab;
