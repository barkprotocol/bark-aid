interface Settings {
    appName: string;
    environment: string;
    version: string;
  }
  
  let settings: Settings = {
    appName: 'BARK - Blinks',
    environment: 'development',
    version: '1.0.0',
  };
  
  export function getSettings(): Settings {
    return settings;
  }
  
  export function updateSettings(newSettings: Partial<Settings>): Settings {
    settings = { ...settings, ...newSettings };
    return settings;
  }
  