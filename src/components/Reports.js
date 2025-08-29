import React, { useState, useEffect } from 'react';

// SVG Icons
const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <polyline points="6,9 6,2 18,2 18,9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="6" y="14" width="12" height="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#64748B" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChartIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Reports = () => {
  const [reportData, setReportData] = useState({
    symptoms: [],
    medications: [],
    medicationLogs: []
  });
  const [reportSettings, setReportSettings] = useState({
    startDate: '',
    endDate: '',
    includeSymptoms: true,
    includeMedications: true,
    includeStatistics: true
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medications = JSON.parse(localStorage.getItem('medications') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');
    
    setReportData({ symptoms, medications, medicationLogs });

    // Set default date range (last 30 days)
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    setReportSettings(prev => ({
      ...prev,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate
    }));
  }, []);

  // Filter data based on date range
  const getFilteredData = () => {
    const start = new Date(reportSettings.startDate);
    const end = new Date(reportSettings.endDate);
    end.setHours(23, 59, 59, 999); // Include end of day

    const filteredSymptoms = reportData.symptoms.filter(symptom => {
      const symptomDate = new Date(symptom.timestamp);
      return symptomDate >= start && symptomDate <= end;
    });

    const filteredMedicationLogs = reportData.medicationLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= start && logDate <= end;
    });

    return { symptoms: filteredSymptoms, medicationLogs: filteredMedicationLogs };
  };

  // Generate statistics
  const generateStatistics = (symptoms, medicationLogs) => {
    const stats = {
      totalSymptoms: symptoms.length,
      totalMedicationDoses: medicationLogs.length,
      avgSeverity: symptoms.length > 0 
        ? (symptoms.reduce((sum, s) => sum + s.severity, 0) / symptoms.length).toFixed(1)
        : 0,
      mostCommonSymptom: '',
      mostTakenMedication: '',
      severityBreakdown: { mild: 0, moderate: 0, severe: 0 },
      dailyAverages: {
        symptomsPerDay: 0,
        medicationsPerDay: 0
      }
    };

    // Severity breakdown
    symptoms.forEach(symptom => {
      if (symptom.severity <= 3) stats.severityBreakdown.mild++;
      else if (symptom.severity <= 6) stats.severityBreakdown.moderate++;
      else stats.severityBreakdown.severe++;
    });

    // Most common symptom
    const symptomCounts = {};
    symptoms.forEach(symptom => {
      symptomCounts[symptom.name] = (symptomCounts[symptom.name] || 0) + 1;
    });
    stats.mostCommonSymptom = Object.keys(symptomCounts).reduce((a, b) => 
      symptomCounts[a] > symptomCounts[b] ? a : b, '') || 'None';

    // Most taken medication
    const medicationCounts = {};
    medicationLogs.forEach(log => {
      medicationCounts[log.medicationName] = (medicationCounts[log.medicationName] || 0) + 1;
    });
    stats.mostTakenMedication = Object.keys(medicationCounts).reduce((a, b) => 
      medicationCounts[a] > medicationCounts[b] ? a : b, '') || 'None';

    // Daily averages
    const daysDiff = Math.ceil((new Date(reportSettings.endDate) - new Date(reportSettings.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    stats.dailyAverages.symptomsPerDay = (symptoms.length / daysDiff).toFixed(1);
    stats.dailyAverages.medicationsPerDay = (medicationLogs.length / daysDiff).toFixed(1);

    return stats;
  };

  const handlePrint = () => {
    setIsGenerating(true);
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 500);
  };

  const getSeverityColor = (severity) => {
    if (severity <= 3) return '#10B981';
    if (severity <= 6) return '#F59E0B'; 
    return '#EF4444';
  };

  const getSeverityLabel = (severity) => {
    if (severity <= 3) return 'Mild';
    if (severity <= 6) return 'Moderate';
    return 'Severe';
  };

  const filtered = getFilteredData();
  const statistics = generateStatistics(filtered.symptoms, filtered.medicationLogs);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1E293B',
          margin: '0 0 0.5rem 0'
        }}>
          Health Reports
        </h2>
        <p style={{ 
          color: '#64748B', 
          margin: 0,
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>
          Generate professional reports to share with your healthcare provider.
        </p>
      </div>

      {/* Report Settings */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1E293B',
          margin: '0 0 1rem 0'
        }}>
          Report Settings
        </h3>
        
        {/* Date Range */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.875rem'
            }}>
              Start Date:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={reportSettings.startDate}
                onChange={(e) => setReportSettings(prev => ({ ...prev, startDate: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: '#FAFAFA'
                }}
              />
              <CalendarIcon />
              <div style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <CalendarIcon />
              </div>
            </div>
          </div>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.875rem'
            }}>
              End Date:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={reportSettings.endDate}
                onChange={(e) => setReportSettings(prev => ({ ...prev, endDate: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: '#FAFAFA'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <CalendarIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Include Options */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.75rem', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '0.875rem'
          }}>
            Include in Report:
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { key: 'includeSymptoms', label: 'Symptoms & Severity Levels' },
              { key: 'includeMedications', label: 'Current Medications' },
              { key: 'includeStatistics', label: 'Summary Statistics' }
            ].map(option => (
              <label key={option.key} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                padding: '0.5rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={reportSettings[option.key]}
                  onChange={(e) => setReportSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePrint}
          disabled={isGenerating}
          style={{
            width: '100%',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isGenerating ? 'not-allowed' : 'pointer',
            opacity: isGenerating ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
          }}
          onMouseEnter={(e) => !isGenerating && (e.target.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => !isGenerating && (e.target.style.backgroundColor = '#3B82F6')}
        >
          <PrintIcon />
          {isGenerating ? 'Generating Report...' : 'Print Report for Doctor'}
        </button>
      </div>

      {/* Preview Statistics */}
      {reportSettings.includeStatistics && (filtered.symptoms.length > 0 || filtered.medicationLogs.length > 0) && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <ChartIcon />
            <h3 style={{ 
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1E293B',
              margin: 0
            }}>
              Report Preview
            </h3>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#FEF2F2',
              borderRadius: '8px',
              border: '1px solid #FECACA'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#EF4444',
                margin: '0 0 0.25rem 0'
              }}>
                {statistics.totalSymptoms}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#991B1B',
                fontWeight: '500'
              }}>
                Symptoms
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#ECFDF5',
              borderRadius: '8px',
              border: '1px solid #BBF7D0'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#10B981',
                margin: '0 0 0.25rem 0'
              }}>
                {statistics.totalMedicationDoses}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#059669',
                fontWeight: '500'
              }}>
                Med Doses
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#FFFBEB',
              borderRadius: '8px',
              border: '1px solid #FED7AA'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#F59E0B',
                margin: '0 0 0.25rem 0'
              }}>
                {statistics.avgSeverity}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#92400E',
                fontWeight: '500'
              }}>
                Avg Severity
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#EFF6FF',
              borderRadius: '8px',
              border: '1px solid #BFDBFE'
            }}>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#3B82F6',
                margin: '0 0 0.25rem 0'
              }}>
                {Math.ceil((new Date(reportSettings.endDate) - new Date(reportSettings.startDate)) / (1000 * 60 * 60 * 24)) + 1}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#1E40AF',
                fontWeight: '500'
              }}>
                Days
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            padding: '1rem',
            border: '1px solid #E2E8F0'
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 0.5rem 0'
            }}>
              Key Insights:
            </h4>
            <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.5' }}>
              <div>• Most common symptom: <strong>{statistics.mostCommonSymptom}</strong></div>
              <div>• Most taken medication: <strong>{statistics.mostTakenMedication}</strong></div>
              <div>• Daily averages: {statistics.dailyAverages.symptomsPerDay} symptoms, {statistics.dailyAverages.medicationsPerDay} medications</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.symptoms.length === 0 && filtered.medicationLogs.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem 1rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
          color: '#64748B'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#F1F5F9',
            borderRadius: '32px',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            📊
          </div>
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 0.5rem 0'
          }}>
            No data for selected period
          </h3>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Try selecting a different date range or add some symptoms and medications first.
          </p>
        </div>
      )}

      {/* Usage Tips */}
      {(filtered.symptoms.length > 0 || filtered.medicationLogs.length > 0) && (
        <div style={{
          backgroundColor: '#EFF6FF',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #BFDBFE'
        }}>
          <h4 style={{
            color: '#1E40AF',
            fontSize: '1rem',
            fontWeight: '600',
            margin: '0 0 0.5rem 0'
          }}>
            💡 Sharing with Healthcare Providers
          </h4>
          <p style={{
            color: '#1E40AF',
            margin: 0,
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            Print your report to share with your doctor. These insights can help your healthcare provider 
            understand your health patterns and make more informed decisions about your care.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
