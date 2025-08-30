import React, { useState } from 'react';

// Inline SVG Icons (following App.js pattern)
const AlertTriangleIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="12" y1="9" x2="12" y2="13" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="12" y1="17" x2="12.01" y2="17" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const BookOpenIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ScaleIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M16 11c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 2v7m0 6v7m-7-7 7-7 7 7" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle 
      cx="12" cy="12" r="10" 
      stroke={color} 
      strokeWidth="2"
    />
    <path 
      d="M12 16V12M12 8H12.01" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const DisclaimerTab = () => {
  const [currentSection, setCurrentSection] = useState('overview');

  const sections = [
    { 
      id: 'overview', 
      title: '⚕️ Overview',
      icon: InfoIcon,
      color: '#DC2626'
    },
    { 
      id: 'usage', 
      title: '📋 Usage',
      icon: BookOpenIcon,
      color: '#059669'
    },
    { 
      id: 'privacy', 
      title: '🔒 Privacy',
      icon: ShieldIcon,
      color: '#3B82F6'
    },
    { 
      id: 'legal', 
      title: '⚖️ Legal',
      icon: ScaleIcon,
      color: '#7C3AED'
    }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <div style={{ lineHeight: '1.6' }}>
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem' 
              }}>
                <AlertTriangleIcon size={24} color="#DC2626" />
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#DC2626',
                  margin: 0
                }}>
                  Emergency Warning
                </h3>
              </div>
              <div style={{ 
                backgroundColor: '#FEE2E2',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #FCA5A5',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <PhoneIcon size={20} />
                  <strong style={{ color: '#991B1B' }}>
                    Call 911 immediately if you experience:
                  </strong>
                </div>
                <ul style={{ 
                  margin: '0.5rem 0 0 1.5rem',
                  color: '#7F1D1D',
                  fontSize: '0.875rem'
                }}>
                  <li>Severe chest pain or difficulty breathing</li>
                  <li>Signs of stroke (weakness, confusion, speech problems)</li>
                  <li>Severe allergic reactions</li>
                  <li>Thoughts of self-harm or suicide</li>
                  <li>Any life-threatening emergency</li>
                </ul>
              </div>
              <p style={{ 
                color: '#991B1B',
                fontWeight: '600',
                fontSize: '0.875rem',
                margin: 0
              }}>
                TrackRX is NOT a substitute for professional medical care or emergency services.
              </p>
            </div>

            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0 0 1rem 0'
            }}>
              What TrackRX Is
            </h3>
            <div style={{
              backgroundColor: '#EFF6FF',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              marginBottom: '1.5rem'
            }}>
              <ul style={{ 
                margin: 0,
                color: '#1E40AF',
                fontSize: '0.875rem'
              }}>
                <li>A personal health tracking tool</li>
                <li>A way to organize your symptoms and medications</li>
                <li>A timeline to share with healthcare providers</li>
                <li>A tool to help you prepare for doctor visits</li>
              </ul>
            </div>

            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0 0 1rem 0'
            }}>
              What TrackRX Is NOT
            </h3>
            <div style={{
              backgroundColor: '#FEF2F2',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #FECACA'
            }}>
              <ul style={{ 
                margin: 0,
                color: '#991B1B',
                fontSize: '0.875rem'
              }}>
                <li>Medical advice or diagnosis</li>
                <li>A replacement for professional healthcare</li>
                <li>Emergency medical services</li>
                <li>Treatment recommendations</li>
                <li>A regulated medical device</li>
              </ul>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div style={{ lineHeight: '1.6' }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#059669',
              margin: '0 0 1rem 0'
            }}>
              Safe Usage Guidelines
            </h3>
            
            <div style={{
              backgroundColor: '#ECFDF5',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #BBF7D0',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#047857',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                ✅ DO Use TrackRX To:
              </h4>
              <ul style={{ 
                margin: 0,
                color: '#065F46',
                fontSize: '0.875rem'
              }}>
                <li>Track your symptoms with dates and severity</li>
                <li>Log when you take medications</li>
                <li>Create reports for doctor appointments</li>
                <li>Monitor patterns in your health over time</li>
                <li>Prepare questions for your healthcare provider</li>
                <li>Keep organized health records</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: '#FEF2F2',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #FECACA',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#DC2626',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                ❌ DON'T Use TrackRX To:
              </h4>
              <ul style={{ 
                margin: 0,
                color: '#991B1B',
                fontSize: '0.875rem'
              }}>
                <li>Self-diagnose medical conditions</li>
                <li>Replace visits to your doctor</li>
                <li>Make treatment decisions</li>
                <li>Handle medical emergencies</li>
                <li>Adjust medications without doctor approval</li>
                <li>Ignore serious or worsening symptoms</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: '#FFFBEB',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #FED7AA'
            }}>
              <h4 style={{ 
                color: '#92400E',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                ⚠️ Important Reminders:
              </h4>
              <ul style={{ 
                margin: 0,
                color: '#78350F',
                fontSize: '0.875rem'
              }}>
                <li>Always consult healthcare professionals for medical advice</li>
                <li>Report new or worsening symptoms to your doctor</li>
                <li>Don't delay seeking care because of app data</li>
                <li>Keep your healthcare providers informed about your symptoms</li>
                <li>Use this data to enhance, not replace, medical communication</li>
              </ul>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div style={{ lineHeight: '1.6' }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#3B82F6',
              margin: '0 0 1rem 0'
            }}>
              Privacy & Data Security
            </h3>

            <div style={{
              backgroundColor: '#EFF6FF',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#1E40AF',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                🔒 Your Data Protection
              </h4>
              <ul style={{ 
                margin: 0,
                color: '#1E40AF',
                fontSize: '0.875rem'
              }}>
                <li>All data is stored locally on your device only</li>
                <li>No data is transmitted to external servers</li>
                <li>No account registration or personal information required</li>
                <li>You have complete control over your health data</li>
                <li>Data remains private and confidential</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: '#FFFBEB',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #FED7AA',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#92400E',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                ⚠️ Data Backup Responsibility
              </h4>
              <p style={{ 
                margin: 0,
                color: '#78350F',
                fontSize: '0.875rem'
              }}>
                Since data is stored locally, YOU are responsible for backing up your health information. 
                If you clear your browser data, uninstall the app, or lose your device, your tracked data 
                will be permanently lost. Consider regularly printing reports or manually backing up 
                important health information.
              </p>
            </div>

            <div style={{
              backgroundColor: '#F0FDF4',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #BBF7D0'
            }}>
              <h4 style={{ 
                color: '#166534',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                📋 Sharing Your Data
              </h4>
              <ul style={{ 
                margin: 0,
                color: '#166534',
                fontSize: '0.875rem'
              }}>
                <li>Only you decide what to share and with whom</li>
                <li>Use the print function to create reports for doctors</li>
                <li>No automatic sharing or data transmission occurs</li>
                <li>Your privacy is completely under your control</li>
              </ul>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div style={{ lineHeight: '1.6' }}>
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#7C3AED',
              margin: '0 0 1rem 0'
            }}>
              Legal Information
            </h3>

            <div style={{
              backgroundColor: '#FAF5FF',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #D8B4FE',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#6B21A8',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                📋 Terms of Use
              </h4>
              <div style={{ 
                color: '#581C87',
                fontSize: '0.875rem'
              }}>
                <p style={{ margin: '0 0 0.75rem 0' }}>
                  By using TrackRX, you acknowledge that:
                </p>
                <ul style={{ margin: 0 }}>
                  <li>This app is for informational and organizational purposes only</li>
                  <li>It does not provide medical advice, diagnosis, or treatment</li>
                  <li>You will consult healthcare professionals for medical decisions</li>
                  <li>You understand the limitations and proper use of this tool</li>
                </ul>
              </div>
            </div>

            <div style={{
              backgroundColor: '#FEF2F2',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #FECACA',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#DC2626',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                ⚖️ Liability Limitations
              </h4>
              <p style={{ 
                margin: 0,
                color: '#991B1B',
                fontSize: '0.875rem'
              }}>
                TrackRX is provided "as is" without warranties of any kind. The developers are not 
                liable for any health outcomes, decisions, or consequences resulting from the use of 
                this application. Users assume all risks associated with using this tracking tool.
              </p>
            </div>

            <div style={{
              backgroundColor: '#F0F9FF',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #BAE6FD',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{ 
                color: '#0369A1',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
                🏥 Professional Medical Advice
              </h4>
              <p style={{ 
                margin: 0,
                color: '#0C4A6E',
                fontSize: '0.875rem'
              }}>
                Always seek the advice of qualified healthcare providers regarding medical conditions, 
                symptoms, treatments, or medications. Never disregard professional medical advice or 
                delay seeking care because of information from this app.
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFBEB',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #FED7AA'
            }}>
              <h4 style={{ 
                color: '#92400E',
                fontWeight: '600',
                margin: '0 0 0.75rem 0'
              }}>
              </h4>
              <p style={{ 
                margin: 0,
                color: '#78350F',
                fontSize: '0.75rem',
                fontStyle: 'italic'
              }}>
                This disclaimer was last updated on the date of app deployment. By continuing to use 
                TrackRX, you agree to these terms and acknowledge your understanding of the app's 
                purpose, limitations, and proper usage guidelines.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#DC2626',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangleIcon color="#FFFFFF" size={24} />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0'
            }}>
              Medical Information & Disclaimers
            </h1>
            <p style={{ 
              color: '#64748B', 
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              Important safety information and usage guidelines
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem',
          padding: '0.5rem',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          {sections.map(section => {
            const IconComponent = section.icon;
            const isActive = currentSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 0.5rem',
                  backgroundColor: isActive ? section.color : 'transparent',
                  color: isActive ? 'white' : '#64748B',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  minHeight: '44px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = '#F1F5F9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <IconComponent 
                  size={16} 
                  color={isActive ? 'white' : section.color}
                />
                <span style={{ fontSize: '0.75rem' }}>
                  {section.title.split(' ')[1]} {/* Remove emoji, keep text */}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        minHeight: '400px'
      }}>
        {renderContent()}
      </div>

      {/* Footer */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: '#F0FDF4',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #BBF7D0'
        }}>
          <p style={{
            color: '#166534',
            fontSize: '0.875rem',
            fontWeight: '500',
            margin: '0 0 0.5rem 0'
          }}>
            Remember: TrackRX is a health tracking tool, not medical advice.
          </p>
          <p style={{
            color: '#16A34A',
            fontSize: '0.75rem',
            margin: 0
          }}>
            Always consult with qualified healthcare professionals for medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerTab;
