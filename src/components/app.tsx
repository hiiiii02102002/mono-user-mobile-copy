import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, Link, Toolbar, View, Views, f7, f7ready } from 'framework7-react';
import { getDevice } from 'framework7/lite-bundle';

import { NKRouter } from '@/constants';
import capacitorApp from '@/js/capacitor-app';
import routes from '@/js/routes';
import store from '@/js/store';
import { Providers } from '@/store/provider';

const MyApp = ({ f7router }: any) => {
    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
        name: 'Mono User', // App name
        theme: 'auto', // Automatic theme detection
        colors: {
            primary: '#22265A',
        },
        darkMode: false,
        store: store,
        routes: routes,
        serviceWorker:
            process.env.NODE_ENV === 'production'
                ? {
                      path: '/service-worker.js',
                  }
                : {},
        input: {
            scrollIntoViewOnFocus: device.capacitor,
            scrollIntoViewCentered: device.capacitor,
        },
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },
    };
    f7ready(() => {
        // Init capacitor APIs (see capacitor-app.js)
        if (f7.device.capacitor) {
            capacitorApp.init(f7);
        }
        // Call F7 APIs here
    });

    const [queryClient] = useState(() => new QueryClient());

    return (
        <Providers>
            <QueryClientProvider client={queryClient}>
                <App {...f7params}>
                    <Views tabs className="safe-areas">
                        <Toolbar tabbar icons bottom>
                            <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconMd="material:home" text="Home" />
                            <Link tabLink="#view-settings" iconIos="f7:gear" iconMd="material:settings" text="Settings" />
                        </Toolbar>
                        <View id="view-home" main tab tabActive url={NKRouter.home()} />
                        <View id="view-settings" name="settings" tab url={NKRouter.setting.index()} />
                    </Views>
                </App>
            </QueryClientProvider>
        </Providers>
    );
};
export default MyApp;
