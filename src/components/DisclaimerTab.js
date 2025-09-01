import React, { useState } from 'react';

// Inline SVG Icons
const AlertTriangleIcon = ({ size = 24, color = "#DC2626" }) => (
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

const BookOpenIcon = ({ size = 24, color = "#059669" }) => (
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

const ShieldIcon = ({ size = 24, color = "#3B82F6" }) => (
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

const ScaleIcon = ({ size = 24, color = "#7C3AED" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M12 1v6m0 6v6m6-9l-6-3-6 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = ({ size = 16, color = "#DC2626" }) => (
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

const InfoIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M12 16V12M12 8H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DisclaimerTab = () => {
  const [currentSection, setCurrentSection] = useState('overview');

  const sections = [
    { 
      id: 'overview', 
      title: 'Overview',
      icon: InfoIcon,
      color: 'var(--error-600)'
    },
    { 
      id: 'usage', 
      title: 'Usage',
      icon: BookOpenIcon,
      color: 'var(--success-600)'
    },
    { 
      id: 'privacy', 
      title: 'Privacy',
      icon: ShieldIcon,
      color: 'var(--primary-600)'
    },
    { 
      id: 'legal', 
      title: 'Legal',
      icon: ScaleIcon,
      color: 'var(--secondary-600)'
    }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Emergency Warning */}
            <div className="bg-error-50 border border-error-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangleIcon size={24} />
                <h3 className="text-heading-3 text-error-700">Emergency Warning</h3>
              </div>
              
              <div className="bg-error-100 border border-error-300 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <PhoneIcon />
                  <strong className="text-error-800 text-sm">Call 911 immediately if you experience:</strong>
                </div>
                <ul className="text-body-small text-error-700 space-y-1 ml-6">
                  <li>Severe chest pain or difficulty breathing</li>
                  <li>Signs of stroke (weakness, confusion, speech problems)</li>
                  <li>Severe allergic reactions</li>
                  <li>Thoughts of self-harm or suicide</li>
                  <li>Any life-threatening emergency</li>
                </ul>
              </div>
              
              <p className="text-body-small text-error-800 font-semibold">
                TrackRX is NOT a substitute for professional medical care or emergency services.
              </p>
            </div>

            {/* What TrackRX Is */}
            <div>
              <h3 className="text-heading-3 mb-3">What TrackRX Is</h3>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <ul className="text-body-small text-primary-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                    A personal health tracking tool
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                    A way to organize your symptoms and medications
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                    A timeline to share with healthcare providers
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                    A tool to help you prepare for doctor visits
                  </li>
                </ul>
              </div>
            </div>

            {/* What TrackRX Is NOT */}
            <div>
              <h3 className="text-heading-3 mb-3">What TrackRX Is NOT</h3>
              <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                <ul className="text-body-small text-error-800 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                    Medical advice or diagnosis
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                    A replacement for professional healthcare
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                    Emergency medical services
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                    Treatment recommendations
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                    A regulated medical device
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <h3 className="text-heading-3 text-success-700">Safe Usage Guidelines</h3>
            
            {/* DO Use */}
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-success-800 mb-3">✅ DO Use TrackRX To:</h4>
              <ul className="text-body-small text-success-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Track your symptoms with dates and severity
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Log when you take medications
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Create reports for doctor appointments
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Monitor patterns in your health over time
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Prepare questions for your healthcare provider
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Keep organized health records
                </li>
              </ul>
            </div>

            {/* DON'T Use */}
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-error-800 mb-3">❌ DON'T Use TrackRX To:</h4>
              <ul className="text-body-small text-error-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                  Self-diagnose medical conditions
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                  Replace visits to your doctor
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                  Make treatment decisions
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                  Handle medical emergencies
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                  Adjust medications without doctor approval
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2"></div>
                  Ignore serious or worsening symptoms
                </li>
              </ul>
            </div>

            {/* Important Reminders */}
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-warning-800 mb-3">⚠️ Important Reminders:</h4>
              <ul className="text-body-small text-warning-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-warning-600 rounded-full mt-2"></div>
                  Always consult healthcare professionals for medical advice
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-warning-600 rounded-full mt-2"></div>
                  Report new or worsening symptoms to your doctor
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-warning-600 rounded-full mt-2"></div>
                  Don't delay seeking care because of app data
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-warning-600 rounded-full mt-2"></div>
                  Keep your healthcare providers informed about your symptoms
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-warning-600 rounded-full mt-2"></div>
                  Use this data to enhance, not replace, medical communication
                </li>
              </ul>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-heading-3 text-primary-700">Privacy & Data Security</h3>

            {/* Data Protection */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-primary-800 mb-3">🔒 Your Data Protection</h4>
              <ul className="text-body-small text-primary-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                  All data is stored locally on your device only
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                  No data is transmitted to external servers
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                  No account registration or personal information required
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                  You have complete control over your health data
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div>
                  Data remains private and confidential
                </li>
              </ul>
            </div>

            {/* Backup Responsibility */}
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-warning-800 mb-3">⚠️ Data Backup Responsibility</h4>
              <p className="text-body-small text-warning-700 leading-relaxed">
                Since data is stored locally, YOU are responsible for backing up your health information. 
                If you clear your browser data, uninstall the app, or lose your device, your tracked data 
                will be permanently lost. Consider regularly printing reports or manually backing up 
                important health information.
              </p>
            </div>

            {/* Sharing Data */}
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-success-800 mb-3">📋 Sharing Your Data</h4>
              <ul className="text-body-small text-success-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Only you decide what to share and with whom
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Use the share function to create reports for doctors
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  No automatic sharing or data transmission occurs
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2"></div>
                  Your privacy is completely under your control
                </li>
              </ul>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-6">
            <h3 className="text-heading-3 text-secondary-700">Legal Information</h3>

            {/* Terms of Use */}
            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-secondary-800 mb-3">📋 Terms of Use</h4>
              <p className="text-body-small text-secondary-700 mb-3">By using TrackRX, you acknowledge that:</p>
              <ul className="text-body-small text-secondary-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2"></div>
                  This app is for informational and organizational purposes only
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2"></div>
                  It does not provide medical advice, diagnosis, or treatment
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2"></div>
                  You will consult healthcare professionals for medical decisions
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2"></div>
                  You understand the limitations and proper use of this tool
                </li>
              </ul>
            </div>

            {/* Liability */}
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-error-800 mb-3">⚖️ Liability Limitations</h4>
              <p className="text-body-small text-error-700 leading-relaxed">
                TrackRX is provided "as is" without warranties of any kind. The developers are not 
                liable for any health outcomes, decisions, or consequences resulting from the use of 
                this application. Users assume all risks associated with using this tracking tool.
              </p>
            </div>

            {/* Professional Advice */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="text-heading-4 text-primary-800 mb-3">🏥 Professional Medical Advice</h4>
              <p className="text-body-small text-primary-700 leading-relaxed">
                Always seek the advice of qualified healthcare providers regarding medical conditions, 
                symptoms, treatments, or medications. Never disregard professional medical advice or 
                delay seeking care because of information from this app.
              </p>
            </div>

            {/* Last Updated */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <p className="text-xs text-slate-600 italic leading-relaxed">
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
    <div className="flex flex-col gap-6">
      {/* Streamlined Header */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-heading-1">Medical Disclaimers</h2>
              <p className="text-body">Important safety information and usage guidelines</p>
            </div>
            <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
              <AlertTriangleIcon size={20} />
            </div>
          </div>
          
          {/* Compact Summary */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <AlertTriangleIcon size={20} />
              </div>
              <div>
                <div className="text-body-small">Current Section</div>
                <div className="text-lg font-bold text-metric">
                  {sections.find(s => s.id === currentSection)?.title || 'Overview'}
                </div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Review all sections for complete understanding
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-50 p-1 rounded-lg">
            {sections.map(section => {
              const IconComponent = section.icon;
              const isActive = currentSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-md font-medium text-xs transition-all min-h-[60px] ${
                    isActive 
                      ? 'bg-secondary-600 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <IconComponent 
                    size={20} 
                    color={isActive ? 'white' : section.color}
                  />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="health-card">
        <div className="health-card-body">
          {renderContent()}
        </div>
      </div>

      {/* Footer Reminder */}
      <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-6 border border-success-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-success-600 rounded-full flex items-center justify-center">
            <InfoIcon color="white" />
          </div>
          <h4 className="text-success-900 font-semibold">Remember</h4>
        </div>
        <p className="text-success-800 text-sm leading-relaxed">
          TrackRX is a health tracking tool, not medical advice. Always consult with qualified 
          healthcare professionals for medical decisions and never delay seeking care.
        </p>
      </div>
    </div>
  );
};

export default DisclaimerTab;
