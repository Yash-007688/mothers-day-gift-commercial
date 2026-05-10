import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2, Music, Heart, Palette, ListChecks, Layout, Play } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/settings';
import './AdminPanel.css';

export default function AdminPanel({ onClose }) {
  const [settings, setSettings] = useState(getSettings());
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    saveSettings(settings);
    window.location.reload();
  };

  const updateReason = (index, value) => {
    const newReasons = [...settings.reasons];
    newReasons[index] = value;
    setSettings({ ...settings, reasons: newReasons });
  };

  const addReason = () => {
    setSettings({ ...settings, reasons: [...settings.reasons, "New Reason..."] });
  };

  const removeReason = (index) => {
    const newReasons = settings.reasons.filter((_, i) => i !== index);
    setSettings({ ...settings, reasons: newReasons });
  };

  return (
    <motion.div 
      className="admin-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="admin-panel glass-panel"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="admin-header">
          <h2 className="premium-text">Admin Settings</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="admin-body">
          <div className="admin-sidebar">
            <button className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>
              <Heart size={18} /> <span>Greeting</span>
            </button>
            <button className={activeTab === 'sections' ? 'active' : ''} onClick={() => setActiveTab('sections')}>
              <Layout size={18} /> <span>Sections</span>
            </button>
            <button className={activeTab === 'reasons' ? 'active' : ''} onClick={() => setActiveTab('reasons')}>
              <ListChecks size={18} /> <span>Reasons</span>
            </button>
            <button className={activeTab === 'music' ? 'active' : ''} onClick={() => setActiveTab('music')}>
              <Music size={18} /> <span>Music</span>
            </button>
            <button className={activeTab === 'theme' ? 'active' : ''} onClick={() => setActiveTab('theme')}>
              <Palette size={18} /> <span>Theme</span>
            </button>
          </div>

          <div className="admin-content">
            {activeTab === 'general' && (
              <div className="admin-section">
                <div className="auto-play-toggle glass-panel" style={{ padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px', background: 'rgba(255, 107, 129, 0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Play size={20} color="var(--primary)" />
                    <div>
                      <strong style={{ display: 'block' }}>Auto-Play Mode</strong>
                      <small style={{ color: 'var(--text-muted)' }}>Experience it like a video</small>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="ios-toggle"
                    checked={settings.isAutoPlay} 
                    onChange={(e) => setSettings({ ...settings, isAutoPlay: e.target.checked })} 
                  />
                </div>

                <label>Greeting Title</label>
                <input 
                  type="text" 
                  value={settings.greetingTitle} 
                  onChange={(e) => setSettings({ ...settings, greetingTitle: e.target.value })} 
                />
                <label>Greeting Message</label>
                <textarea 
                  rows={4}
                  value={settings.greetingMessage} 
                  onChange={(e) => setSettings({ ...settings, greetingMessage: e.target.value })} 
                />
              </div>
            )}

            {activeTab === 'sections' && (
              <div className="admin-section">
                <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Envelope Card</h4>
                <label>Main Text</label>
                <input type="text" value={settings.envelopeText} onChange={(e) => setSettings({ ...settings, envelopeText: e.target.value })} />
                <label>Hint Text</label>
                <input type="text" value={settings.envelopeHint} onChange={(e) => setSettings({ ...settings, envelopeHint: e.target.value })} />
                
                <h4 style={{ color: 'var(--primary)', margin: '20px 0 10px' }}>Gallery Section</h4>
                <label>Section Title</label>
                <input type="text" value={settings.galleryTitle} onChange={(e) => setSettings({ ...settings, galleryTitle: e.target.value })} />
                
                <h4 style={{ color: 'var(--primary)', margin: '20px 0 10px' }}>Reasons Section</h4>
                <label>Section Title</label>
                <input type="text" value={settings.reasonsTitle} onChange={(e) => setSettings({ ...settings, reasonsTitle: e.target.value })} />
                
                <h4 style={{ color: 'var(--primary)', margin: '20px 0 10px' }}>Rating Section</h4>
                <label>Rating Title</label>
                <input type="text" value={settings.ratingTitle} onChange={(e) => setSettings({ ...settings, ratingTitle: e.target.value })} />
                <label>Rating Subtitle</label>
                <input type="text" value={settings.ratingSubtitle} onChange={(e) => setSettings({ ...settings, ratingSubtitle: e.target.value })} />
              </div>
            )}

            {activeTab === 'reasons' && (
              <div className="admin-section">
                <label>Reasons List</label>
                <div className="reasons-list">
                  {settings.reasons.map((reason, index) => (
                    <div key={index} className="reason-item">
                      <input 
                        type="text" 
                        value={reason} 
                        onChange={(e) => updateReason(index, e.target.value)} 
                      />
                      <button className="delete-btn" onClick={() => removeReason(index)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button className="add-btn" onClick={addReason}>
                    <Plus size={18} /> Add New Reason
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'music' && (
              <div className="admin-section">
                <label>Music URL (Direct MP3)</label>
                <input 
                  type="text" 
                  value={settings.songUrl} 
                  onChange={(e) => setSettings({ ...settings, songUrl: e.target.value })} 
                />
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="admin-section">
                <label>Primary Color</label>
                <div className="color-picker-group">
                  <input type="color" value={settings.colors.primary} onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value } })} />
                  <span>{settings.colors.primary}</span>
                </div>
                <label style={{ marginTop: '10px' }}>Secondary Color</label>
                <div className="color-picker-group">
                  <input type="color" value={settings.colors.secondary} onChange={(e) => setSettings({ ...settings, colors: { ...settings.colors, secondary: e.target.value } })} />
                  <span>{settings.colors.secondary}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="admin-footer">
          <button className="save-btn" onClick={handleSave}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
