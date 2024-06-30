import React, { ReactNode } from 'react';
import { useSettings } from '@/components/Settings/SettingsProvider';

export const Theme: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { settings } = useSettings();

  return <div className={settings.theme === 'dark' ? 'dark-theme' : 'light-theme'}>{children}</div>;
};
