module.exports = {
    globDirectory: 'www/',
    globPatterns: ['**/*.{woff,woff2,js,css,png,jpg,svg,html}'],
    /* pass array of globs to exclude from caching */
    globIgnores: [],
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
    swDest: 'www/service-worker.js',
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                },
            },
        },
        {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'google-fonts-stylesheets',
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
            },
        },
    ],
};
