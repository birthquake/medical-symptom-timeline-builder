import React, { useState } from 'react';

// SVG Icons
const AlertTriangleIcon = ({ size = 24, color = "#DC2626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M10.29 3.86L1.82 18C1.64466 18.3024 1.55611 18.6453 1.56331 18.9945C1.57051 19.3437 1.67328 19.6831 1.8602 19.9768C2.04711 20.2705 2.31235 20.5068 2.62701 20.6599C2.94167 20.813 3.29322 20.8774 3.64 20.845H20.36C20.7068 20.8774 21.0583 20.813 21.373 20.6599C21.6876 20.5068 21.9529 20.2705 22.1398 19.9768C22.3267 19.6831 22.4295 19.3437 22.4367 18.9945C22.4439 18.6453 22.3553 18.3024 22.18 18L13.71 3.86C13.5217 3.56611 13.2592 3.32312 12.9476 3.15447C12.6359 2.98582 12.2849 2.89746 11.9286 2.89746C11.5723 2.89746 11.2213 2.98582 10.9096 3.15447C10.598 3.32312 10.3355 3.56611 10.1472 3.86H10.29Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="1" fill={color}/>
  </svg>
);

const ShieldIcon = ({ size = 24, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BookOpenIcon = ({ size = 24, color = "#10B981" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScaleIcon = ({ size = 24, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M16 11C18.2091 11 20 9.20914 20 7C20 4.79086 18.2091 3 16 3C13.7909 3 12 4.79086 12 7C12 9.20914 13.7909 11 16 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 21C10.2091 21 12 19.2091 12 17C12 14.7909 10.2091 13 8 13C5.79086 13 4 14.7909 4 17C4 19.2091 5.79086 21 8 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 3L16 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = ({ size = 20, color = "#EF4444" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06719 2.16708 8.43828 2.48353C8.80936 2.79999 9.05307 3.23945 9.10999 3.72C9.21656 4.68007 9.42138 5.62273 9.71999 6.53C9.86681 6.88792 9.90788 7.27691 9.83889 7.65088C9.7699 8.02485 9.59408 8.36811 9.32999 8.64L8.08999 9.88C9.513 12.4135 11.5865 14.487 14.12 15.91L15.36 14.67C15.6319 14.4059 15.9751 14.2301 16.3491 14.1611C16.7231 14.0921 17.1121 14.1332 17.47 14.28C18.3773 14.5786 19.3199 14.7834 20.28 14.89C20.7658 14.9485 21.2094 15.1962 21.5265 15.5739C21.8437 15.9516 22.0122 16.4297 21.9999 16.92H22Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DisclaimerTab = () => {
  const [currentSection, setCurrentSection] = useState('overview');

  const disclaimerSections = {
    overview: {
      title: "Overview",
      fullTitle: "Important Medical Information",
      icon: <AlertTriangleIcon />,
      content: (
        <div>
          {/* Critical Emergency Warning */}
          <div style={{ 
            backgroundColor: '#DC2626', 
            color: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <PhoneIcon size={32} color="white" />
            </div>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: '700' }}>
              🚨 MEDICAL EMERGENCIES
            </h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
              Call 911 (US) or your local emergency number immediately
            </p>
            <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>
              Do NOT use this app during emergency situations
            </p>
          </div>

          {/* Main Disclaimer */}
          <div style={{ 
            backgroundColor: '#FEF2F2', 
            border: '2px solid #FECACA', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#DC2626', margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
              This App is NOT Medical Advice
            </h3>
            <p style={{ color: '#991B1B', margin: 0, fontSize: '1.125rem', lineHeight: '1.6' }}>
              <strong>TrackRX is for tracking purposes ONLY</strong> and does not provide medical advice, 
              diagnosis, or treatment recommendations.
            </p>
          </div>

          {/* What This App Does */}
          <div style={{ 
            backgroundColor: '#F0F9FF', 
            border: '1px solid #BAE6FD', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#0369A1', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
              ✅ What TrackRX Does:
            </h3>
            <div style={{ color: '#0C4A6E', fontSize: '1rem', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Tracks</strong> your symptoms and patterns over time</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Logs</strong> medications as prescribed by your healthcare provider</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Organizes</strong> health information for doctor visits</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Generates</strong> reports to share with healthcare professionals</div>
              <div>• <strong>Stores</strong> data locally on your device (private and secure)</div>
            </div>
          </div>

          {/* What This App Does NOT Do */}
          <div style={{ 
            backgroundColor: '#FEF2F2', 
            border: '1px solid #FECACA', 
            padding: '1.5rem', 
            borderRadius: '12px'
          }}>
            <h3 style={{ color: '#DC2626', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
              ❌ What TrackRX Does NOT Do:
            </h3>
            <div style={{ color: '#991B1B', fontSize: '1rem', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Diagnose</strong> medical conditions or illnesses</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Recommend</strong> treatments or medications</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Replace</strong> professional medical consultations</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Provide</strong> medical advice or interpretation</div>
              <div>• <strong>Monitor</strong> your health in real-time</div>
            </div>
          </div>
        </div>
      )
    },
    usage: {
      title: "Usage",
      fullTitle: "Safe Usage Guidelines", 
      icon: <BookOpenIcon />,
      content: (
        <div>
          {/* Recommended Uses */}
          <div style={{ 
            backgroundColor: '#ECFDF5', 
            border: '2px solid #10B981', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#059669', margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
              ✅ RECOMMENDED Uses
            </h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { icon: '📊', title: 'Symptom Tracking', desc: 'Log symptoms with dates, times, severity levels, and notes to track patterns over time.' },
                { icon: '💊', title: 'Medication Logging', desc: 'Record medications prescribed by your doctor and track when you take them.' },
                { icon: '📄', title: 'Healthcare Communication', desc: 'Generate organized reports to share with doctors and healthcare providers.' },
                { icon: '📈', title: 'Pattern Recognition', desc: 'Monitor your health journey with factual data to identify trends.' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#059669', fontSize: '1rem', fontWeight: '600' }}>
                      {item.title}
                    </h4>
                    <p style={{ margin: 0, color: '#047857', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibited Uses */}
          <div style={{ 
            backgroundColor: '#FEF2F2', 
            border: '2px solid #DC2626', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#DC2626', margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
              ❌ PROHIBITED Uses
            </h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { icon: '🚫', title: 'Self-Diagnosis', desc: 'Never use this app to diagnose yourself or determine what medical condition you might have.' },
                { icon: '🚫', title: 'Treatment Decisions', desc: 'Do not make medication or treatment decisions based on app data without consulting healthcare professionals.' },
                { icon: '🚫', title: 'Emergency Situations', desc: 'Never rely on this app during medical emergencies. Call 911 or go to the emergency room immediately.' },
                { icon: '🚫', title: 'Medical Advice', desc: 'Do not interpret data as medical recommendations or use it to avoid professional medical care.' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#DC2626', fontSize: '1rem', fontWeight: '600' }}>
                      {item.title}
                    </h4>
                    <p style={{ margin: 0, color: '#991B1B', fontSize: '0.875rem', lineHeight: '1.5' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <div style={{ 
            backgroundColor: '#EFF6FF', 
            border: '1px solid #BFDBFE', 
            padding: '1.5rem', 
            borderRadius: '12px'
          }}>
            <h4 style={{ color: '#1E40AF', margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              💡 Best Practices for Healthcare Collaboration
            </h4>
            <div style={{ color: '#1E40AF', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '0.5rem' }}>• Share your reports with healthcare providers during appointments</div>
              <div style={{ marginBottom: '0.5rem' }}>• Use the timeline view to show symptom patterns over time</div>
              <div style={{ marginBottom: '0.5rem' }}>• Be honest and accurate when logging symptoms and medications</div>
              <div style={{ marginBottom: '0.5rem' }}>• Ask your doctor how this tracking data can best support your care</div>
              <div>• Continue following all medical advice from your healthcare team</div>
            </div>
          </div>
        </div>
      )
    },
    privacy: {
      title: "Privacy",
      fullTitle: "Privacy & Data Security",
      icon: <ShieldIcon />,
      content: (
        <div>
          {/* Data Privacy Promise */}
          <div style={{ 
            backgroundColor: '#EFF6FF', 
            border: '2px solid #3B82F6', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <ShieldIcon size={48} />
            </div>
            <h3 style={{ color: '#1D4ED8', margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
              🛡️ Your Data Stays 100% Private
            </h3>
            <p style={{ color: '#1E40AF', fontSize: '1.125rem', lineHeight: '1.6', margin: 0 }}>
              All your health information is stored <strong>locally on your device only</strong>. 
              We do not collect, transmit, or store any of your personal health information on external servers.
            </p>
          </div>

          {/* What We Don't Collect */}
          <div style={{ 
            backgroundColor: '#F8FAFC', 
            border: '1px solid #E2E8F0', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: '#374151', margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              🔒 What We DON'T Collect:
            </h4>
            <div style={{ color: '#4B5563', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '0.5rem' }}>• Personal health information or medical data</div>
              <div style={{ marginBottom: '0.5rem' }}>• Symptom data, severity levels, or medical histories</div>
              <div style={{ marginBottom: '0.5rem' }}>• Medication information or dosage details</div>
              <div style={{ marginBottom: '0.5rem' }}>• Usage analytics, tracking data, or behavioral patterns</div>
              <div style={{ marginBottom: '0.5rem' }}>• Device information, location data, or personal identifiers</div>
              <div>• Any personally identifiable information</div>
            </div>
          </div>

          {/* Benefits of Local Storage */}
          <div style={{ 
            backgroundColor: '#ECFDF5', 
            border: '1px solid #BBF7D0', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: '#059669', margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              ✅ Local Storage Benefits:
            </h4>
            <div style={{ color: '#047857', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Complete privacy</strong> - no one else can access your data</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>No internet required</strong> for basic app functionality</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>No data breaches possible</strong> - your data never leaves your device</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Full control</strong> - you can delete your data anytime</div>
              <div>• <strong>Offline access</strong> - works without internet connection</div>
            </div>
          </div>

          {/* Data Backup Warning */}
          <div style={{ 
            backgroundColor: '#FFFBEB', 
            border: '2px solid #FCD34D', 
            padding: '1.5rem', 
            borderRadius: '12px'
          }}>
            <h4 style={{ color: '#D97706', margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              ⚠️ Important: You Are Responsible for Data Backup
            </h4>
            <p style={{ color: '#92400E', fontSize: '0.875rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
              Since data is stored locally, clearing browser data, uninstalling the app, or device issues 
              may result in data loss.
            </p>
            <div style={{ color: '#92400E', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Export your data regularly</strong> using the Reports section</div>
              <div style={{ marginBottom: '0.5rem' }}>• <strong>Save reports as backups</strong> before major device changes</div>
              <div>• <strong>Share important data</strong> with healthcare providers as additional backup</div>
            </div>
          </div>
        </div>
      )
    },
    legal: {
      title: "Legal",
      fullTitle: "Legal Information",
      icon: <ScaleIcon />,
      content: (
        <div>
          {/* Legal Disclaimer */}
          <div style={{ 
            backgroundColor: '#F9FAFB', 
            border: '2px solid #6B7280', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#374151', margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: '700' }}>
              ⚖️ Legal Disclaimer & Liability
            </h3>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              border: '1px solid #D1D5DB' 
            }}>
              <p style={{ color: '#4B5563', margin: '0 0 1rem 0', fontSize: '1rem', lineHeight: '1.7' }}>
                <strong>This application is provided "as is" without warranty of any kind, express or implied.</strong> 
                The developers, contributors, and distributors of TrackRX are not licensed healthcare providers 
                and do not assume any responsibility for medical decisions made based on the use of this application.
              </p>
              <p style={{ color: '#4B5563', margin: 0, fontSize: '1rem', lineHeight: '1.7' }}>
                <strong>No Medical Professional Relationship:</strong> Use of this app does not create a 
                doctor-patient relationship or any other healthcare professional relationship.
              </p>
            </div>
          </div>

          {/* Terms of Use */}
          <div style={{ 
            backgroundColor: '#F8FAFC', 
            border: '1px solid #E2E8F0', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: '#374151', margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              📋 By using TrackRX, you acknowledge and agree:
            </h4>
            <div style={{ color: '#4B5563', fontSize: '0.875rem', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '0.75rem' }}>✓ You understand this is a tracking tool, not a medical device or service</div>
              <div style={{ marginBottom: '0.75rem' }}>✓ You will consult qualified healthcare professionals for all medical decisions</div>
              <div style={{ marginBottom: '0.75rem' }}>✓ You will not rely solely on this app for health management or medical care</div>
              <div style={{ marginBottom: '0.75rem' }}>✓ You understand the developers are not responsible for any medical outcomes</div>
              <div style={{ marginBottom: '0.75rem' }}>✓ You will seek immediate professional medical attention for health emergencies</div>
              <div>✓ You accept full responsibility for how you use the information in this app</div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div style={{ 
            backgroundColor: '#FEF2F2', 
            border: '1px solid #FECACA', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: '#DC2626', margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>
              ⚠️ Limitation of Liability:
            </h4>
            <p style={{ color: '#991B1B', margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}>
              <strong>To the maximum extent permitted by law, the developers of TrackRX shall not be 
              liable for any direct, indirect, incidental, special, consequential, or punitive damages arising 
              from your use of this application, including but not limited to any medical decisions, treatments, 
              or health outcomes.</strong>
            </p>
          </div>

          {/* Professional Medical Advice */}
          <div style={{ 
            backgroundColor: '#EFF6FF', 
            border: '1px solid #BFDBFE', 
            padding: '2rem', 
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#1E40AF', margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
              🏥 Professional Medical Advice
            </h4>
            <p style={{ 
              color: '#1E40AF', 
              margin: 0, 
              fontSize: '1.125rem', 
              lineHeight: '1.6', 
              fontWeight: '600',
              fontStyle: 'italic'
            }}>
              "Always consult with qualified healthcare professionals before making any decisions 
              related to your health, medical treatment, or medications."
            </p>
          </div>

          {/* Last Updated */}
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: '#F3F4F6', 
            border: '1px solid #D1D5DB', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '0.875rem' }}>
              Last updated: {new Date().toLocaleDateString()} | 
              This disclaimer may be updated periodically to reflect changes in the application or applicable laws.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <AlertTriangleIcon size={32} />
        </div>
        <h1 style={{ 
          color: '#DC2626', 
          marginBottom: '0.5rem',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          Medical Information & Disclaimers
        </h1>
        <p style={{ color: '#64748B', margin: 0, fontSize: '1rem' }}>
          Important medical and legal information about using TrackRX safely and effectively.
        </p>
      </div>

      {/* Section Navigation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.5rem',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        {Object.keys(disclaimerSections).map(section => (
          <button
            key={section}
            onClick={() => setCurrentSection(section)}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              backgroundColor: currentSection === section ? '#3B82F6' : '#F8FAFC',
              color: currentView === section ? 'white' : '#64748B',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: currentSection === section ? '600' : '500',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '60px'
            }}
          >
            <div style={{ opacity: currentSection === section ? 1 : 0.7 }}>
              {React.cloneElement(disclaimerSections[section].icon, {
                size: 20,
                color: currentSection === section ? 'white' : '#64748B'
              })}
            </div>
            <span>{disclaimerSections[section].title}</span>
          </button>
        ))}
      </div>

      {/* Content Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {disclaimerSections[currentSection].icon}
          <h2 style={{ 
            margin: 0, 
            color: '#1E293B',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            {disclaimerSections[currentSection].fullTitle}
          </h2>
        </div>
        {disclaimerSections[currentSection].content}
      </div>

      {/* Bottom Warning */}
      <div style={{
        backgroundColor: '#DC2626',
        color: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '700' }}>
          🚨 Remember: TrackRX Does Not Replace Professional Medical Care
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
