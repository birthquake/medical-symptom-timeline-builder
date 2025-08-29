import React, { useState, useEffect } from 'react';

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
    includeStatistics: true,
    includeTimeline: true
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

  const handleExportData = () => {
    const filtered = getFilteredData();
    const exportData = {
      reportGenerated: new Date().toISOString(),
      dateRange: {
        start: reportSettings.startDate,
        end: reportSettings.endDate
      },
      symptoms: filtered.symptoms,
      medicationLogs: filtered.medicationLogs,
      medications: reportData.medications,
      statistics: generateStatistics(filtered.symptoms, filtered.medicationLogs)
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-report-${reportSettings.startDate}-to-${reportSettings.endDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtered = getFilteredData();
  const statistics = generateStatistics(filtered.symptoms, filtered.medicationLogs);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ 
          color: '#1e293b', 
          marginBottom: '0.5rem',
          fontSize: '1.8rem'
        }}>
          📄 Health Reports
        </h2>
        <p style={{ color: '#64748b', margin: 0 }}>
          Generate professional reports for healthcare providers
        </p>
      </div>

      {/* Report Settings */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Report Settings</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Start Date:
            </label>
            <input
              type="date"
              value={reportSettings.startDate}
              onChange={(e) => setReportSettings(prev => ({ ...prev, startDate: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              End Date:
            </label>
            <input
              type="date"
              value={reportSettings.endDate}
              onChange={(e) => setReportSettings(prev => ({ ...prev, endDate: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={reportSettings.includeSymptoms}
              onChange={(e) => setReportSettings(prev => ({ ...prev, includeSymptoms: e.target.checked }))}
            />
            Include Symptoms
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={reportSettings.includeMedications}
              onChange={(e) => setReportSettings(prev => ({ ...prev, includeMedications: e.target.checked }))}
            />
            Include Medications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={reportSettings.includeStatistics}
              onChange={(e) => setReportSettings(prev => ({ ...prev, includeStatistics: e.target.checked }))}
            />
            Include Statistics
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handlePrint}
            disabled={isGenerating}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              opacity: isGenerating ? 0.6 : 1
            }}
          >
            {isGenerating ? 'Generating...' : '🖨️ Print/Save as PDF'}
          </button>
          <button
            onClick={handleExportData}
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            💾 Export Data
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div 
        id="report-content"
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Report Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #2563eb', paddingBottom: '1rem' }}>
          <h1 style={{ color: '#2563eb', marginBottom: '0.5rem', fontSize: '1.8rem' }}>
            Medical Symptom & Medication Report
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>
            {new Date(reportSettings.startDate).toLocaleDateString()} - {new Date(reportSettings.endDate).toLocaleDateString()}
          </p>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
            Generated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Statistics Section */}
        {reportSettings.includeStatistics && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              📊 Summary Statistics
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
                  {statistics.totalSymptoms}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Symptoms</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
                  {statistics.totalMedicationDoses}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Medication Doses</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                  {statistics.avgSeverity}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Avg Severity</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {statistics.dailyAverages.symptomsPerDay}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Symptoms/Day</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Severity Breakdown:</h4>
                <div style={{ fontSize: '0.9rem' }}>
                  <div>• Mild (1-3): <strong>{statistics.severityBreakdown.mild}</strong></div>
                  <div>• Moderate (4-6): <strong>{statistics.severityBreakdown.moderate}</strong></div>
                  <div>• Severe (7-10): <strong>{statistics.severityBreakdown.severe}</strong></div>
                </div>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>Most Frequent:</h4>
                <div style={{ fontSize: '0.9rem' }}>
                  <div>• Symptom: <strong>{statistics.mostCommonSymptom}</strong></div>
                  <div>• Medication: <strong>{statistics.mostTakenMedication}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Medications */}
        {reportSettings.includeMedications && reportData.medications.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              💊 Current Medications
            </h2>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {reportData.medications.map(med => (
                <div key={med.id} style={{ padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <strong>{med.name}</strong> - {med.dosage}
                  <span style={{ color: '#64748b', marginLeft: '1rem' }}>({med.frequency.replace('-', ' ')})</span>
                  {med.notes && <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.25rem' }}>Notes: {med.notes}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Symptoms Timeline */}
        {reportSettings.includeSymptoms && filtered.symptoms.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              📊 Symptom History
            </h2>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {filtered.symptoms.slice(0, 20).map(symptom => (
                <div key={symptom.id} style={{ 
                  padding: '0.75rem', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '6px', 
                  border: '1px solid #e5e7eb',
                  borderLeft: `4px solid ${symptom.severity <= 3 ? '#16a34a' : symptom.severity <= 6 ? '#d97706' : '#dc2626'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{symptom.name}</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ 
                        backgroundColor: symptom.severity <= 3 ? '#16a34a' : symptom.severity <= 6 ? '#d97706' : '#dc2626',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem'
                      }}>
                        {symptom.severity}/10
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {symptom.date} {symptom.time}
                      </span>
                    </div>
                  </div>
                  {symptom.notes && <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.5rem' }}>"{symptom.notes}"</div>}
                </div>
              ))}
              {filtered.symptoms.length > 20 && (
                <div style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic', padding: '1rem' }}>
                  ... and {filtered.symptoms.length - 20} more symptoms (showing latest 20)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medication Log */}
        {reportSettings.includeMedications && filtered.medicationLogs.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem', fontSize: '1.3rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              💊 Medication Log
            </h2>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {filtered.medicationLogs.slice(0, 30).map(log => (
                <div key={log.id} style={{ 
                  padding: '0.5rem 0.75rem', 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '6px', 
                  border: '1px solid #bbf7d0',
                  borderLeft: '4px solid #16a34a'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{log.medicationName}</strong>
                      <span style={{ color: '#15803d', marginLeft: '0.5rem' }}>({log.dosage})</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#166534' }}>
                      {log.date} {log.time}
                    </span>
                  </div>
                </div>
              ))}
              {filtered.medicationLogs.length > 30 && (
                <div style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic', padding: '1rem' }}>
                  ... and {filtered.medicationLogs.length - 30} more medication logs (showing latest 30)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ 
          marginTop: '3rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid #e2e8f0', 
          fontSize: '0.8rem', 
          color: '#64748b',
          textAlign: 'center'
        }}>
          <p>This report was generated by Medical Symptom Timeline Builder</p>
          <p>For questions about this report, please consult with your healthcare provider</p>
        </div>
      </div>

      {/* Empty State */}
      {filtered.symptoms.length === 0 && filtered.medicationLogs.length === 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>No Data for Selected Period</h3>
          <p>Try selecting a different date range or add some symptoms and medications first.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
