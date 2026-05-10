const DEFAULT_SETTINGS = {
  isAutoPlay: true,
  songUrl: "/maa_song.mp3", // Use locally hosted song
  envelopeText: "For Mom",
  envelopeHint: "Tap to open",
  greetingTitle: "Happy Mother's Day!",
  greetingMessage: "Thank you for your endless love, patience, and support. You are the heart of our family and my biggest inspiration. Today is all about celebrating you!",
  galleryTitle: "Our Beautiful Memories",
  reasonsTitle: "Reasons I Love You",
  reasons: [
    "You always believe in me, even when I don't.",
    "Your smile can brighten up my darkest days.",
    "You cook the best food in the entire world!",
    "You are my strongest supporter and best friend.",
    "You taught me how to be kind and compassionate.",
    "Your hugs have magical healing powers."
  ],
  ratingTitle: "Rate the Love",
  ratingSubtitle: "How much do you love Mom?",
  colors: {
    primary: "#ff6b81",
    secondary: "#ffa07a"
  }
};

export const getSettings = () => {
  const saved = localStorage.getItem('mothers_day_settings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Force update if it's the old pixabay link
      if (parsed.songUrl && parsed.songUrl.includes("pixabay.com")) {
        parsed.songUrl = DEFAULT_SETTINGS.songUrl;
      }
      return { 
        ...DEFAULT_SETTINGS, 
        ...parsed, 
        colors: { ...DEFAULT_SETTINGS.colors, ...(parsed.colors || {}) } 
      };
    } catch (e) {
      console.error("Failed to parse settings:", e);
      return DEFAULT_SETTINGS;
    }
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings) => {
  localStorage.setItem('mothers_day_settings', JSON.stringify(settings));
  if (settings.colors) {
    document.documentElement.style.setProperty('--primary', settings.colors.primary);
    document.documentElement.style.setProperty('--secondary', settings.colors.secondary);
  }
};

export const applyTheme = () => {
  const settings = getSettings();
  if (settings.colors) {
    document.documentElement.style.setProperty('--primary', settings.colors.primary);
    document.documentElement.style.setProperty('--secondary', settings.colors.secondary);
  }
};
