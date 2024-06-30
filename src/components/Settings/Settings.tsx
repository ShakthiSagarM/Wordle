import React, { ChangeEvent } from 'react';
import styles from './Settings.module.scss';
import CloseIcon from '../../../public/close.svg';
import { useSettings } from '@/components/Settings/SettingsProvider';
import { difficultyLevels, Settings as SettingsStruct, themes } from '@/utils/types';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = (props) => {
  const { settings, updateSettings, closeSettings, isSettingsOpen, resetSettings } = useSettings();
  const [draftSettings, setDraftSettings] = React.useState<SettingsStruct>(settings);

  if (!isSettingsOpen) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, settingKey: keyof SettingsStruct) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setDraftSettings({ ...draftSettings, [settingKey]: value });
  };

  const handleSave = () => {
    updateSettings(draftSettings);
    closeSettings();
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles['settings-modal']}>
        <div className={styles['settings-modal-top-bar']}>
          <div className={styles['settings-modal-title']}>Settings</div>
          <button className={styles['settings-modal-close-button']} onClick={closeSettings}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles['settings-list']}>
          <div className={styles['setting']}>
            <div className={styles['setting-name']}>Change Theme</div>
            <select
              className={styles['setting-input-dropdown']}
              value={draftSettings.theme}
              onChange={(e) => handleChange(e, 'theme')}
            >
              {themes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles['setting']}>
            <div className={styles['setting-name']}>Change Difficulty</div>
            <select
              className={styles['setting-input-dropdown']}
              value={draftSettings.difficulty}
              onChange={(e) => handleChange(e, 'difficulty')}
            >
              {difficultyLevels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles['settings-modal-button-container']}>
          <button className={styles['settings-modal-button']} onClick={handleSave}>
            Save
          </button>
          <button className={styles['settings-modal-button']} onClick={resetSettings}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
