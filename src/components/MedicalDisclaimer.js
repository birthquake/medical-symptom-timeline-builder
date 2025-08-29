import React, { useState } from 'react';

const MedicalDisclaimer = ({ onAccept, showInline = false }) => {
  const [hasRead, setHasRead] = useState(false);
  const [currentSection, setCurrentSection] = useState('overview');

  const disclaimerSections = {
    overview: {
      title: "⚕️ Important Medical Information",
      content: (
        <div>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600', color: '#dc2626' }}>
            This app is for tracking purposes only and is not intended to provide medical advice, diagnosis, or treatment.
          </p>
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h4 style={{ color: '#991b1b', margin: '0 0 0.5rem 0' }}>🚨 Emergency Warning</h4>
            <p style={{ color: '#991b1b', margin: 0 }}>
              If you are experiencing a medical emergency, call 911 (US) or your local emergency number immediately. 
              Do not rely on this app for emergency medical situations.
            </p>
          </div>
          <ul style={{ color: '#374151', lineHeight: '1.6' }}>
            <li>This app is a personal tracking tool only</li>
            <li>Always consult healthcare professionals for medical decisions</li>
            <li>Do not use this app to diagnose or treat medical conditions</li>
            <li>Your data is stored locally on your device only</li>
            <li>We are not healthcare providers and cannot provide medical advice</li>
          </ul>
        </div>
      )
    },
    usage: {
      title: "📋 Proper Usage Guidelines",
      content: (
        <div>
          <h4 style={{ color: '#1e293b', marginBottom: '1rem' }}>How to Use This App Safely:</h4>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px' }}>
              <h5 style={{ color: '#15803d', margin: '0 0 0.5rem 0' }}>✅ DO Use This App To:</h5>
              <ul style={{ color: '#166534', margin: 0 }}>
                <li>Track symptoms and their patterns over time</li>
                <li>Log medications as prescribed by your doctor</li>
                <li>Prepare organized information for doctor visits</li>
                <li>Monitor your health journey with factual data</li>
                <li>Share tracking data with your healthcare provider</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
              <h5 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>❌ DO NOT Use This App To:</h5>
              <ul style={{ color: '#991b1b', margin: 0 }}>
                <li>Self-diagnose medical conditions</li>
                <li>Replace professional medical consultations</li>
                <li>Make medication decisions without doctor approval</li>
                <li>Determine if symptoms are serious or concerning</li>
                <li>Delay seeking medical care when needed</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    privacy: {
      title: "🔒 Privacy & Data Security",
      content: (
        <div>
          <h4 style={{ color: '#1e293b', marginBottom: '1rem' }}>Your Health Data Privacy:</h4>
          <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h5 style={{ color: '#0369a1', margin: '0 0 0.5rem 0' }}>🛡️ Local Storage Only</h5>
            <p style={{ color: '#0c4a6e', margin: 0 }}>
              All your health data is stored locally on your device. We do not collect, transmit, or store any 
              of your personal health information on external servers.
            </p>
          </div>
          <ul style={{ color: '#374151', lineHeight: '1.6' }}>
            <li><strong>Local Storage:</strong> Data stays on your device only</li>
            <li><strong>No Cloud Sync:</strong> We don't store your data externally</li>
            <li><strong>No Analytics:</strong> We don't track your usage or health data</li>
            <li><strong>Your Control:</strong> You can delete all data anytime</li>
            <li><strong>Backup Responsibility:</strong> You're responsible for backing up your data</li>
          </ul>
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fcd34d', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <h5 style={{ color: '#d97706', margin: '0 0 0.5rem 0' }}>⚠️ Data Loss Warning</h5>
            <p style={{ color: '#92400e', margin: 0 }}>
              Clearing browser data, uninstalling the app, or device issues may result in data loss. 
              Regularly export your data as backup.
            </p>
          </div>
        </div>
      )
    },
    legal: {
      title: "⚖️ Legal Disclaimer",
      content: (
        <div>
          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h4 style={{ color: '#374151', margin: '0 0 0.5rem 0' }}>Legal Notice</h4>
            <p style={{ color: '#4b5563', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
              This application is provided "as is" without warranty of any kind. The developers are not licensed 
              healthcare providers and do not assume any responsibility for medical decisions made based on the use 
              of this application.
            </p>
          </div>
          <h5 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>By using this app, you acknowledge that:</h5>
          <ul style={{ color: '#374151', lineHeight: '1.6' }}>
            <li>You understand this is a tracking tool, not medical advice</li>
            <li>You will consult healthcare professionals for all medical decisions</li>
            <li>You will not rely solely on this app for health management</li>
            <li>You understand the developers are not responsible for medical outcomes</li>
            <li>You will seek immediate medical attention for emergencies</li>
          </ul>
          <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#0c4a6e', margin: 0, fontSize: '0.9rem', fontStyle: 'italic' }}>
              "Always consult with a qualified healthcare professional before making any decisions related to your health or treatment."
            </p>
          </div>
        </div>
      )
    }
  };

  if (showInline) {
    return (
      <div style={{
        backgroundColor: '#fffbeb',
        border: '1px solid #fcd34d',
        padding: '1rem',
        borderRadius: '8px',
        margin: '1rem 0',
        fontSize: '0.9rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>⚕️</span>
          <strong style={{ color: '#d97706' }}>Medical Disclaimer</strong>
        </div>
        <p style={{ color: '#92400e', margin: 0 }}>
          This app is for tracking purposes only and does not provide medical advice. 
          Always consult healthcare professionals for medical decisions.{' '}
          <button
            onClick={() => onAccept && onAccept()}
            style={{
              background: 'none',
              border: 'none',
              color: '#d97706',
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: 0,
              font: 'inherit'
            }}
          >
            Read full disclaimer
          </button>
        </p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, color: '#1e293b', fontSize: '1.5rem' }}>
            Medical Symptom Timeline Builder
          </h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>
            Please read and acknowledge the following important information
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          {Object.keys(disclaimerSections).map(section => (
            <button
              key={section}
              onClick={() => setCurrentSection(section)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                backgroundColor: currentSection === section ? 'white' : 'transparent',
                color: currentSection === section ? '#2563eb' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: currentSection === section ? '600' : '400',
                borderBottom: currentSection === section ? '2px solid #2563eb' : 'none'
              }}
            >
              {disclaimerSections[section].title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          padding: '1.5rem',
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>
            {disclaimerSections[currentSection].title}
          </h3>
          {disclaimerSections[currentSection].content}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem',
              cursor: 'pointer',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}>
              <input
                type="checkbox"
                checked={hasRead}
                onChange={(e) => setHasRead(e.target.checked)}
                style={{ 
                  transform: 'scale(1.3)',
                  marginTop: '0.25rem'
                }}
              />
              <span style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.4' }}>
                <strong>I acknowledge that I have read and understand all sections of this medical disclaimer.</strong>
                <br />
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  By checking this box, I confirm that I understand this app is for tracking purposes only and does not provide medical advice.
                </span>
              </span>
            </label>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={onAccept}
              disabled={!hasRead}
              style={{
                padding: '1rem 2rem',
                border: 'none',
                backgroundColor: hasRead ? '#16a34a' : '#94a3b8',
                color: 'white',
                borderRadius: '8px',
                cursor: hasRead ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                fontSize: '1.1rem',
                minWidth: '200px',
                opacity: hasRead ? 1 : 0.6
              }}
            >
              {hasRead ? '✅ I Understand & Continue' : '⏳ Please read disclaimer first'}
            </button>
          </div>
          
          {!hasRead && (
            <div style={{
              marginTop: '1rem',
              textAlign: 'center',
              color: '#dc2626',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              ↑ Please check the box above to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalDisclaimer;
