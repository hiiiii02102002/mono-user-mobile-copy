/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    preflight: false,
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#22265A',
                    50: '#6C73C8',
                    100: '#5D64C2',
                    200: '#444CB3',
                    300: '#383F95',
                    400: '#2D3378',
                    500: '#22265A',
                    600: '#131531',
                    700: '#030409',
                    800: '#000000',
                    900: '#000000',
                    950: '#000000',
                },
            },
        },
    },
    plugins: [],
};
