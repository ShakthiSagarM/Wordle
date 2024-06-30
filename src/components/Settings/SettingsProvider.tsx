import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getDefaultSettings } from "@/utils/utils";
import {Settings} from "@/utils/types";

interface SettingsContextProps {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
    isSettingsOpen: boolean;
    closeSettings: () => void;
    openSettings: () => void;
    resetSettings: () => void;
}


const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(getDefaultSettings() as Settings);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const closeSettings = () => setIsSettingsOpen(false);
    const openSettings = () => setIsSettingsOpen(true);

    const resetSettings = () => setSettings(getDefaultSettings() as Settings);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isSettingsOpen, closeSettings, openSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
