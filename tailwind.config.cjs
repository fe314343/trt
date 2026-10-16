module.exports = {
            theme: {
                extend: {
                    colors: {
                        'ink': '#0C1F1E',
                        'ink-2': '#0A1918',
                        'ink-text': '#10201F',
                        'clarity': '#1B8C7A',
                        'clarity-light': '#4FC3AC',
                        'sediment': '#B07A3E',
                        'sediment-light': '#D3A46E',
                        'mist': '#F2F6F5',
                        'steel': '#6B7876',
                    },
                    fontFamily: {
                        sans: ["'Noto Sans TC'", 'system-ui', 'sans-serif'],
                        serif: ["'Noto Serif TC'", 'serif'],
                        mono: ["'IBM Plex Mono'", 'ui-monospace', 'monospace'],
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(15px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                }
            }
        };
module.exports.content=["./index.html","./src/app.jsx"];