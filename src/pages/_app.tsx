import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import {ToastProvider} from "@/components/ui-components/Toast/ToastProvider";
import Toast from "@/components/ui-components/Toast/Toast";
import {SettingsProvider} from "@/components/Settings/SettingsProvider";
import Settings from "@/components/Settings/Settings";
import {Theme} from "@/components/Theme/Theme";
import {GameProvider} from "@/components/Game/GameProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ToastProvider>
          <SettingsProvider>
              <GameProvider>
                  <Theme>
                      <Component {...pageProps} />
                      <Toast />
                      <Settings/>
                  </Theme>
              </GameProvider>
          </SettingsProvider>
      </ToastProvider>


  );
}
