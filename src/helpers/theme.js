const darkTheme = {
    '--bg-color': '#333',
    '--bg-color-secondary': '#222',
    '--text-color': '#fff',
}

const lightTheme = {
    '--bg-color': '#007bff',
    '--bg-color-secondary': '#0371e5',
    '--text-color': '#fff',
}

const applyTheme = (themeConfig) => {
    const root = document.documentElement;
    Object.keys(themeConfig).forEach(key => {
        root.style.setProperty(key, themeConfig[key]);
    })
}

export const setTheme = (theme = 'light') => {
    applyTheme(theme === 'light'? lightTheme : darkTheme);
    localStorage.setItem('theme', theme);
}

export const getTheme = () => localStorage.getItem('theme') || 'light';

export const initTheme = () => {
    setTheme(getTheme());
}
