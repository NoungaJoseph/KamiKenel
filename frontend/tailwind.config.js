/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}", "./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#2c3e50',
                secondary: '#e67e22',
                accent: '#3498db',
            }
        },
    },
    plugins: [],
}
