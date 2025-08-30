import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const NotificationIcon = ({ color = "#059669", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = ({ size = 16, color = "#3B82F6" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="2"/>
  </svg>
);

const CheckIcon = ({ size = 16, color = "#059669" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="20,6 9,17 4,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotificationManager = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: false,
    medicationReminders: true,
    dailyCheckins: true,
    checkInTime: '20:00',
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00',
    snoozeMinutes: 15
  });
  const [medications, setMedications] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [activeReminders, setActiveReminders] = useState([]);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }

    // Load medications
    const savedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
    setMedications(savedMedications);

    // Check current permission status
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }

    // Load active reminders
    loadActiveReminders();
  }, []);

  const saveSettings = (newSettings) => {
    setNotificationSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const loadActiveReminders = () => {
    const reminders = JSON.parse(localStorage.getItem('scheduledReminders') || '[]');
    setActiveReminders(reminders);
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    
    if (permission === 'granted') {
      // Show welcome notification
      new Notification('TrackRX Reminders Enabled', {
        body: 'You\'ll receive helpful medication and check-in reminders',
        icon: '/favicon.ico',
        tag: 'welcome'
      });
      return true;
    }
    
    return false;
  };

  const enableNotifications = async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      const newSettings = { ...notificationSettings, enabled: true };
      saveSettings(newSettings);
      scheduleAllReminders();
    }
  };

  const disableNotifications = () => {
    const newSettings = { ...notificationSettings, enabled: false };
    saveSettings(newSettings);
    clearAllReminders();
  };

  const scheduleAllReminders = () => {
    clearAllReminders();
    
    if (!notificationSettings.enabled) return;

    const scheduledReminders = [];

    // Schedule medication reminders
    if (notificationSettings.medicationReminders) {
      medications.forEach(medication => {
        const reminders = scheduleMedicationReminders(medication);
        scheduledReminders.push(...reminders);
      });
    }

    // Schedule daily check-in
    if (notificationSettings.dailyCheckins) {
      const checkInReminder = scheduleDailyCheckin();
      if (checkInReminder) {
        scheduledReminders.push(checkInReminder);
      }
    }

    // Save scheduled reminders
    localStorage.setItem('scheduledReminders', JSON.stringify(scheduledReminders));
    setActiveReminders(scheduledReminders);
  };

  const scheduleMedicationReminders = (medication) => {
    const reminders = [];
    const now = new Date();
    const frequencyMap = {
      'daily': 1,
      'twice-daily': 2,
      'three-times': 3,
      'four-times': 4,
      'as-needed': 0
    };

    const dailyDoses = frequencyMap[medication.frequency] || 1;
    if (dailyDoses === 0) return reminders; // Skip as-needed medications

    // Calculate reminder times
    const reminderTimes = [];
    if (dailyDoses === 1) {
      reminderTimes.push('08:00');
    } else if (dailyDoses === 2) {
      reminderTimes.push('08:00', '20:00');
    } else if (dailyDoses === 3) {
      reminderTimes.push('08:00', '14:00', '20:00');
    } else if (dailyDoses === 4) {
      reminderTimes.push('08:00', '12:00', '16:00', '20:00');
    }

    reminderTimes.forEach((time, index) => {
      const [hours, minutes] = time.split(':');
      const reminderTime = new Date();
      reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // If time has passed today, schedule for tomorrow
      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      const reminderId = `med-${medication.id}-${index}-${Date.now()}`;
      const timeoutId = setTimeout(() => {
        showMedicationReminder(medication, time);
        // Reschedule for next day
        setTimeout(() => scheduleMedicationReminders(medication), 24 * 60 * 60 * 1000);
      }, reminderTime.getTime() - now.getTime());

      reminders.push({
        id: reminderId,
        type: 'medication',
        medicationName: medication.name,
        scheduledTime: time,
        nextReminder: reminderTime.toISOString(),
        timeoutId: timeoutId
      });
    });

    return reminders;
  };

  const scheduleDailyCheckin = () => {
    const now = new Date();
    const [hours, minutes] = notificationSettings.checkInTime.split(':');
    const checkInTime = new Date();
    checkInTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // If time has passed today, schedule for tomorrow
    if (checkInTime <= now) {
      checkInTime.setDate(checkInTime.getDate() + 1);
    }

    const reminderId = `checkin-${Date.now()}`;
    const timeoutId = setTimeout(() => {
      showDailyCheckin();
      // Reschedule for next day
      setTimeout(scheduleDailyCheckin, 24 * 60 * 60 * 1000);
    }, checkInTime.getTime() - now.getTime());

    return {
      id: reminderId,
      type: 'checkin',
      scheduledTime: notificationSettings.checkInTime,
      nextReminder: checkInTime.toISOString(),
      timeoutId: timeoutId
    };
  };

  const showMedicationReminder = (medication, time) => {
    if (isQuietHours()) return;

    const notification = new Notification(`Time for ${medication.name}`, {
      body: `${medication.dosage} - ${time}`,
      icon: '/favicon.ico',
      tag: `med-${medication.id}`,
      requireInteraction: true,
      actions: [
        { action: 'taken', title: 'Mark as Taken' },
        { action: 'snooze', title: 'Snooze 15 min' }
      ]
    });

    notification.onclick = () => {
      window.focus();
      // Navigate to medications tab
      window.postMessage({ type: 'navigate', view: 'medications' }, '*');
      notification.close();
    };

    // Auto-close after 30 seconds if not interacted with
    setTimeout(() => notification.close(), 30000);
  };

  const showDailyCheckin = () => {
    if (isQuietHours()) return;

    const notification = new Notification('Daily Check-in', {
      body: 'How are you feeling today? Quick symptom check-in.',
      icon: '/favicon.ico',
      tag: 'daily-checkin',
      requireInteraction: true
    });

    notification.onclick = () => {
      window.focus();
      // Navigate to symptoms tab
      window.postMessage({ type: 'navigate', view: 'symptoms' }, '*');
      notification.close();
    };

    setTimeout(() => notification.close(), 45000);
  };

  const isQuietHours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = notificationSettings.quietHoursStart.split(':').map(Number);
    const [endHour, endMinute] = notificationSettings.quietHoursEnd.split(':').map(Number);
    
    const quietStart = startHour * 60 + startMinute;
    const quietEnd = endHour * 60 + endMinute;

    // Handle overnight quiet hours (e.g., 22:00 to 07:00)
    if (quietStart > quietEnd) {
      return currentTime >= quietStart || currentTime <= quietEnd;
    }
    
    return currentTime >= quietStart && currentTime <= quietEnd;
  };

  const clearAllReminders = () => {
    const reminders = JSON.parse(localStorage.getItem('scheduledReminders') || '[]');
    reminders.forEach(reminder => {
      if (reminder.timeoutId) {
        clearTimeout(reminder.timeoutId);
      }
    });
    localStorage.removeItem('scheduledReminders');
    setActiveReminders([]);
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...notificationSettings, [key]: value };
    saveSettings(newSettings);
    
    // Reschedule reminders if relevant settings changed
    if (['medicationReminders', 'dailyCheckins', 'checkInTime'].includes(key)) {
      scheduleAllReminders();
    }
  };

  const getNextReminderTime = () => {
    if (activeReminders.length === 0) return 'No reminders scheduled';
    
    const nextReminder = activeReminders
      .sort((a, b) => new Date(a.nextReminder) - new Date(b.nextReminder))[0];
    
    const nextTime = new Date(nextReminder.nextReminder);
    const now = new Date();
    const diff = nextTime - now;
    
    if (diff < 60 * 60 * 1000) { // Less than 1 hour
      const minutes = Math.floor(diff / (60 * 1000));
      return `Next reminder in ${minutes} minutes`;
    } else if (diff < 24 * 60 * 60 * 1000) { // Less than 24 hours
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `Next reminder in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      return nextTime.toLocaleDateString() + ' at ' + nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#059669',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <NotificationIcon color="#FFFFFF" size={24} />
          </div>
          <div>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1E293B',
              margin: '0'
            }}>
              Smart Reminders
            </h2>
            <p style={{ 
              color: '#64748B', 
              margin: '0.25rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              Stay consistent with medication and symptom tracking
            </p>
          </div>
        </div>
      </div>

      {/* Permission Status */}
      {permissionStatus !== 'granted' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #FED7AA',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#92400E',
            margin: '0 0 0.75rem 0'
          }}>
            Enable Notifications
          </h3>
          <p style={{
            color: '#A16207',
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}>
            Get helpful reminders to take medications and log symptoms for better health tracking.
          </p>
          <button
            onClick={enableNotifications}
            style={{
              backgroundColor: '#F59E0B',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#D97706'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#F59E0B'}
          >
            <BellIcon color="white" />
            Enable Reminders
          </button>
        </div>
      )}

      {/* Main Settings */}
      {permissionStatus === 'granted' && (
        <>
          {/* Status Overview */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1E293B',
                margin: 0
              }}>
                Reminder Status
              </h3>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: notificationSettings.enabled ? '#DCFCE7' : '#FEE2E2',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: notificationSettings.enabled ? '#16A34A' : '#DC2626',
                  borderRadius: '50%'
                }} />
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: notificationSettings.enabled ? '#166534' : '#991B1B'
                }}>
                  {notificationSettings.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#F0FDF4',
                borderRadius: '8px',
                border: '1px solid #BBF7D0',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: '#059669',
                  margin: '0 0 0.25rem 0'
                }}>
                  {activeReminders.filter(r => r.type === 'medication').length}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#047857',
                  fontWeight: '600'
                }}>
                  Med Reminders
                </div>
              </div>

              <div style={{
                padding: '1rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '8px',
                border: '1px solid #BFDBFE',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: '#1E40AF',
                  margin: '0 0 0.25rem 0'
                }}>
                  {activeReminders.filter(r => r.type === 'checkin').length}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#1E40AF',
                  fontWeight: '600'
                }}>
                  Daily Check-ins
                </div>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748B',
                fontWeight: '500'
              }}>
                {getNextReminderTime()}
              </div>
            </div>

            {/* Master Toggle */}
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Enable All Reminders
              </span>
              <button
                onClick={() => notificationSettings.enabled ? disableNotifications() : enableNotifications()}
                style={{
                  width: '48px',
                  height: '28px',
                  backgroundColor: notificationSettings.enabled ? '#059669' : '#D1D5DB',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  position: 'absolute',
                  top: '4px',
                  left: notificationSettings.enabled ? '24px' : '4px',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }} />
              </button>
            </div>
          </div>

          {/* Reminder Types */}
          {notificationSettings.enabled && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1E293B',
                margin: '0 0 1rem 0'
              }}>
                Reminder Types
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Medication Reminders */}
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BellIcon />
                      <span style={{ fontWeight: '600', color: '#374151' }}>Medication Reminders</span>
                    </div>
                    <button
                      onClick={() => handleSettingChange('medicationReminders', !notificationSettings.medicationReminders)}
                      style={{
                        width: '44px',
                        height: '24px',
                        backgroundColor: notificationSettings.medicationReminders ? '#059669' : '#D1D5DB',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        position: 'absolute',
                        top: '4px',
                        left: notificationSettings.medicationReminders ? '24px' : '4px',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }} />
                    </button>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748B',
                    margin: '0 0 0.75rem 0'
                  }}>
                    Get notified when it's time to take your medications
                  </p>
                  {medications.length > 0 && (
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {medications.length} medication{medications.length > 1 ? 's' : ''} configured
                    </div>
                  )}
                </div>

                {/* Daily Check-ins */}
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckIcon />
                      <span style={{ fontWeight: '600', color: '#374151' }}>Daily Check-ins</span>
                    </div>
                    <button
                      onClick={() => handleSettingChange('dailyCheckins', !notificationSettings.dailyCheckins)}
                      style={{
                        width: '44px',
                        height: '24px',
                        backgroundColor: notificationSettings.dailyCheckins ? '#059669' : '#D1D5DB',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        position: 'absolute',
                        top: '4px',
                        left: notificationSettings.dailyCheckins ? '24px' : '4px',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }} />
                    </button>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748B',
                    margin: '0 0 0.75rem 0'
                  }}>
                    Gentle daily prompts to log how you're feeling
                  </p>
                  
                  {notificationSettings.dailyCheckins && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ClockIcon />
                      <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Reminder time:</span>
                      <input
                        type="time"
                        value={notificationSettings.checkInTime}
                        onChange={(e) => handleSettingChange('checkInTime', e.target.value)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          border: '1px solid #D1D5DB',
                          borderRadius: '4px',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          {notificationSettings.enabled && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <SettingsIcon />
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1E293B',
                  margin: 0
                }}>
                  Advanced Settings
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Quiet Hours */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Quiet Hours (no notifications)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="time"
                      value={notificationSettings.quietHoursStart}
                      onChange={(e) => handleSettingChange('quietHoursStart', e.target.value)}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        fontSize: '0.875rem'
                      }}
                    />
                    <span style={{ color: '#64748B', fontSize: '0.875rem' }}>to</span>
                    <input
                      type="time"
                      value={notificationSettings.quietHoursEnd}
                      onChange={(e) => handleSettingChange('quietHoursEnd', e.target.value)}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '6px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                {/* Snooze Duration */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Snooze Duration
                  </label>
                  <select
                    value={notificationSettings.snoozeMinutes}
                    onChange={(e) => handleSettingChange('snoozeMinutes', parseInt(e.target.value))}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value={5}>5 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Info Footer */}
      <div style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #BFDBFE'
      }}>
        <h4 style={{
          color: '#1E40AF',
          fontSize: '1rem',
          fontWeight: '600',
          margin: '0 0 0.75rem 0'
        }}>
          How Reminders Help
        </h4>
        <ul style={{
          color: '#1E40AF',
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: '1.6',
          paddingLeft: '1rem'
        }}>
          <li>Improve medication compliance and health outcomes</li>
          <li>Build consistent tracking habits for better insights</li>
          <li>Never forget to log important symptoms</li>
          <li>Generate higher quality data for your healthcare provider</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationManager;
