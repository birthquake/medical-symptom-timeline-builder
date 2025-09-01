import React, { useState, useEffect } from 'react';

// Inline SVG Icons
const BellIcon = ({ size = 24, color = "#3B82F6" }) => (
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

const CalendarIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const EmailIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2"/>
    <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="2"/>
  </svg>
);

const SmartphoneIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AlertCircleIcon = ({ size = 16, color = "#F59E0B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = ({ size = 16, color = "#64748B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotificationManager = () => {
  const [reminderSettings, setReminderSettings] = useState({
    inAppReminders: true,
    homeScreenBadges: true,
    smartSuggestions: true,
    defaultCheckInTime: '20:00'
  });
  const [medications, setMedications] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [lastActivity, setLastActivity] = useState({});
  const [browserSupport, setBrowserSupport] = useState({
    notifications: false,
    pwa: false,
    platform: 'unknown'
  });

  useEffect(() => {
    // Load settings and data
    const savedSettings = localStorage.getItem('reminderSettings');
    if (savedSettings) {
      setReminderSettings(JSON.parse(savedSettings));
    }

    const savedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
    setMedications(savedMedications);

    // Detect platform capabilities
    detectBrowserCapabilities();
    
    // Calculate overdue tasks
    calculateOverdueTasks();
    
    // Load last activity timestamps
    loadLastActivity();
  }, []);

  const detectBrowserCapabilities = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOSSafari = isIOS && isSafari;
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    setBrowserSupport({
      notifications: 'Notification' in window && Notification.permission !== 'denied' && !isIOSSafari,
      pwa: isPWA,
      platform: isIOSSafari ? 'ios-safari' : isIOS ? 'ios' : 'other'
    });
  };

  const loadLastActivity = () => {
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');
    
    const lastSymptom = symptoms.length > 0 ? new Date(symptoms[symptoms.length - 1].timestamp) : null;
    const lastMedication = medicationLogs.length > 0 ? new Date(medicationLogs[medicationLogs.length - 1].timestamp) : null;
    
    setLastActivity({
      lastSymptomLog: lastSymptom,
      lastMedicationLog: lastMedication,
      daysSinceSymptom: lastSymptom ? Math.floor((new Date() - lastSymptom) / (1000 * 60 * 60 * 24)) : null,
      daysSinceMedication: lastMedication ? Math.floor((new Date() - lastMedication) / (1000 * 60 * 60 * 24)) : null
    });
  };

  const calculateOverdueTasks = () => {
    const now = new Date();
    const today = now.toDateString();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString();
    
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
    const medicationLogs = JSON.parse(localStorage.getItem('medicationLogs') || '[]');
    
    // Check if user has logged anything today
    const todaySymptoms = symptoms.filter(s => new Date(s.timestamp).toDateString() === today);
    const todayMedications = medicationLogs.filter(m => new Date(m.timestamp).toDateString() === today);
    
    const overdue = [];
    
    // Check for missed check-ins (if no activity today after check-in time)
    const checkInTime = reminderSettings.defaultCheckInTime;
    const [checkHours, checkMinutes] = checkInTime.split(':').map(Number);
    const checkInDateTime = new Date();
    checkInDateTime.setHours(checkHours, checkMinutes, 0, 0);
    
    if (now > checkInDateTime && todaySymptoms.length === 0 && todayMedications.length === 0) {
      overdue.push({
        type: 'daily-checkin',
        title: 'Daily Health Check-in',
        description: 'Log how you\'re feeling today',
        priority: 'medium',
        action: 'symptoms'
      });
    }
    
    // Check for medication reminders based on frequency
    medications.forEach(medication => {
      const todayLogs = medicationLogs.filter(log => 
        log.medicationName === medication.name && 
        new Date(log.timestamp).toDateString() === today
      );
      
      const expectedDoses = getExpectedDoses(medication.frequency);
      if (todayLogs.length < expectedDoses && now.getHours() > 10) { // After 10 AM
        overdue.push({
          type: 'medication',
          title: `${medication.name}`,
          description: `${medication.dosage} - ${expectedDoses - todayLogs.length} dose(s) remaining today`,
          priority: 'high',
          action: 'medications',
          medicationId: medication.id
        });
      }
    });
    
    setOverdueTasks(overdue);
  };

  const getExpectedDoses = (frequency) => {
    const frequencyMap = {
      'daily': 1,
      'twice-daily': 2,
      'three-times': 3,
      'four-times': 4,
      'as-needed': 0
    };
    return frequencyMap[frequency] || 1;
  };

  const saveSettings = (newSettings) => {
    setReminderSettings(newSettings);
    localStorage.setItem('reminderSettings', JSON.stringify(newSettings));
  };

  const handleSettingChange = (key, value) => {
    saveSettings({ ...reminderSettings, [key]: value });
  };

  const generateCalendarEvent = (type, title, time = '20:00') => {
    const [hours, minutes] = time.split(':');
    const eventDate = new Date();
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // If time has passed today, set for tomorrow
    if (eventDate <= new Date()) {
      eventDate.setDate(eventDate.getDate() + 1);
    }
    
    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = new Date(eventDate.getTime() + 15 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TrackRX//Smart Reminders//EN
BEGIN:VEVENT
UID:trackrx-${type}-${Date.now()}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${title}
DESCRIPTION:TrackRX Health Reminder
RRULE:FREQ=DAILY;INTERVAL=1
END:VEVENT
END:VCALENDAR`;
    
    const link = document.createElement('a');
    link.href = calendarUrl;
    link.download = `trackrx-${type}-reminder.ics`;
    link.click();
  };

  const generateEmailReminder = () => {
    const subject = 'TrackRX Daily Health Reminder Setup';
    const body = `Hi there!

Set up these daily reminders to stay consistent with your health tracking:

DAILY REMINDERS:
• ${reminderSettings.defaultCheckInTime} - TrackRX Health Check-in
• Take medications as prescribed
• Log any symptoms you experience

WEEKLY REMINDER:
• Review your health patterns in Reports
• Prepare questions for doctor visits

You can set these up in your phone's reminders app, calendar, or email yourself.

Best,
Your TrackRX App`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const getReminderStatusMessage = () => {
    if (browserSupport.platform === 'ios-safari') {
      return 'iOS Safari limits web notifications. We\'ll help you set up alternative reminders.';
    } else if (!browserSupport.notifications) {
      return 'Browser notifications not available. We\'ll show smart in-app reminders instead.';
    } else {
      return 'Your browser supports notifications for better reminder delivery.';
    }
  };

  const getActivityInsight = () => {
    const { daysSinceSymptom, daysSinceMedication } = lastActivity;
    
    if (daysSinceSymptom === null && daysSinceMedication === null) {
      return 'Start tracking to build healthy habits and generate insights.';
    }
    
    if (daysSinceSymptom !== null && daysSinceSymptom > 3) {
      return `It's been ${daysSinceSymptom} days since your last symptom log. Consider a daily check-in.`;
    }
    
    if (daysSinceMedication !== null && daysSinceMedication > 1) {
      return `Last medication log was ${daysSinceMedication} day${daysSinceMedication > 1 ? 's' : ''} ago.`;
    }
    
    return 'Great job staying consistent with your health tracking!';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Streamlined Header */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-heading-1">Smart Reminders</h2>
              <p className="text-body">Stay consistent with intelligent tracking prompts</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <BellIcon size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Status */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircleIcon />
            <h3 className="text-heading-3">Platform Compatibility</h3>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
            <p className="text-body-small text-slate-700 leading-relaxed">
              {getReminderStatusMessage()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="text-lg font-bold text-primary-600 mb-1">
                {browserSupport.platform === 'ios-safari' ? 'Limited' : 'Available'}
              </div>
              <div className="text-xs text-primary-700 font-medium">Push Notifications</div>
            </div>
            <div className="text-center p-4 bg-success-50 border border-success-200 rounded-lg">
              <div className="text-lg font-bold text-success-600 mb-1">Active</div>
              <div className="text-xs text-success-700 font-medium">Smart Prompts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Activity Insights */}
      <div className="health-card">
        <div className="health-card-body">
          <div className="flex items-center gap-3 mb-4">
            <ClockIcon />
            <h3 className="text-heading-3">Activity Overview</h3>
          </div>

          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-4">
            <p className="text-body-small text-secondary-700 font-medium leading-relaxed">
              {getActivityInsight()}
            </p>
          </div>

          {overdueTasks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-heading-4 text-slate-700">Suggested Actions</h4>
              {overdueTasks.map((task, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  task.priority === 'high' 
                    ? 'bg-error-50 border-error-200' 
                    : 'bg-warning-50 border-warning-200'
                }`}>
                  <div>
                    <div className={`font-medium text-sm ${
                      task.priority === 'high' ? 'text-error-800' : 'text-warning-800'
                    }`}>
                      {task.title}
                    </div>
                    <div className={`text-xs ${
                      task.priority === 'high' ? 'text-error-600' : 'text-warning-600'
                    }`}>
                      {task.description}
                    </div>
                  </div>
                  <button 
                    className="btn btn-secondary text-xs"
                    onClick={() => window.postMessage({ type: 'navigate', view: task.action }, '*')}
                  >
                    Log Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Smart Reminder Settings */}
      <div className="health-card">
        <div className="health-card-body">
          <h3 className="text-heading-3 mb-4">Reminder Preferences</h3>

          <div className="space-y-4">
            {/* In-App Reminders */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-medium text-slate-900">In-App Smart Prompts</div>
                <div className="text-body-small text-slate-600">Show helpful reminders when you open the app</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminderSettings.inAppReminders}
                  onChange={(e) => handleSettingChange('inAppReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {/* Badge Reminders */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-medium text-slate-900">Visual Indicators</div>
                <div className="text-body-small text-slate-600">Show badges and counters for overdue tasks</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminderSettings.homeScreenBadges}
                  onChange={(e) => handleSettingChange('homeScreenBadges', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {/* Smart Suggestions */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-medium text-slate-900">Pattern-Based Suggestions</div>
                <div className="text-body-small text-slate-600">Get reminders based on your tracking history</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminderSettings.smartSuggestions}
                  onChange={(e) => handleSettingChange('smartSuggestions', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {/* Default Check-in Time */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-slate-900">Preferred Check-in Time</div>
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <input
                    type="time"
                    value={reminderSettings.defaultCheckInTime}
                    onChange={(e) => handleSettingChange('defaultCheckInTime', e.target.value)}
                    className="form-input px-3 py-1 text-sm"
                  />
                </div>
              </div>
              <div className="text-body-small text-slate-600">
                When you prefer to receive daily health check-in prompts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* External Reminder Options */}
      <div className="health-card">
        <div className="health-card-body">
          <h3 className="text-heading-3 mb-4">Setup External Reminders</h3>
          <p className="text-body text-slate-600 mb-6">
            Create reminders in your device's native apps for the most reliable notifications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => generateCalendarEvent('daily-checkin', 'TrackRX Health Check-in', reminderSettings.defaultCheckInTime)}
              className="btn btn-secondary flex items-center justify-center gap-3 p-4"
            >
              <CalendarIcon />
              <div className="text-left">
                <div className="font-medium">Calendar Event</div>
                <div className="text-xs text-slate-600">Download daily reminder</div>
              </div>
              <DownloadIcon />
            </button>

            <button
              onClick={generateEmailReminder}
              className="btn btn-secondary flex items-center justify-center gap-3 p-4"
            >
              <EmailIcon />
              <div className="text-left">
                <div className="font-medium">Email Template</div>
                <div className="text-xs text-slate-600">Self-reminder setup</div>
              </div>
            </button>
          </div>

          {browserSupport.platform === 'ios-safari' && (
            <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <h4 className="font-medium text-primary-800 mb-2">iOS Safari Users</h4>
              <p className="text-body-small text-primary-700 leading-relaxed">
                For best reminder experience: Add TrackRX to your Home Screen, then enable notifications in Settings > TrackRX.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Benefits Footer */}
      <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-6 border border-success-200">
        <h4 className="text-success-900 font-semibold mb-3 flex items-center gap-2">
          <div className="w-5 h-5 bg-success-600 rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <polyline points="20,6 9,17 4,12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Consistent Tracking Benefits
        </h4>
        <div className="text-success-800 text-sm leading-relaxed space-y-2">
          <div>• Better medication adherence and health outcomes</div>
          <div>• More accurate symptom patterns for your doctor</div>
          <div>• Improved health insights and trend analysis</div>
          <div>• Enhanced preparation for medical appointments</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManager;
