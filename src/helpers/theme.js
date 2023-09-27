export const colorSchemes = {
    dark: {
        '--bg-color': '#333',
        '--bg-color-secondary': '#222',
        '--text-color': '#fff',
        '--bg-image': `url('/img/sunsetbg.jpg')`,
    },
    yellow: {
        '--bg-color': '#c9c479',
        '--bg-color-secondary': '#c9c479',
        '--text-color': '#fff',
        '--bg-image': './img/sunsetbg.jpg',
    },
    apricot: {
        '--bg-color': '#ffa882',
        '--bg-color-secondary': '#ffa882',
        '--text-color': '#fff',
        '--bg-image': './img/sunsetbg.jpg',
    },
    blue: {
        '--bg-color': '#54c6f7',
        '--bg-color-secondary': '#54c6f7',
        '--text-color': '#fff',
        '--bg-image': './img/sunsetbg.jpg',
    },
    pink: {
        '--bg-color': '#f03c96',
        '--bg-color-secondary': '#f03c96',
        '--text-color': '#fff',
        '--bg-image': `url('${process.env.PUBLIC_URL}/static/media/img/barbie.jpg')`,
    },
}

const lightTheme = {
    '--bg-color': '#f53',
    '--bg-color-secondary': '#d53',
    '--text-color': '#fff',
}

const applyStyleConfig = (cfg) => {
    const root = document.documentElement;
    Object.keys(cfg).forEach(key => {
        root.style.setProperty(key, cfg[key]);
    })
}

export const setTheme = (theme = 'light') => {
    applyStyleConfig(theme === 'light'? lightTheme : colorSchemes.dark);
    localStorage.setItem('theme', theme);
}
export const setColorScheme = (colorScheme = 'dark') => {
    applyStyleConfig(colorSchemes[colorScheme]);
    localStorage.setItem('colorScheme', colorScheme);
}

export const getTheme = () => localStorage.getItem('theme') || 'light';
export const getColorScheme = () => localStorage.getItem('colorScheme') || 'dark';


export const initTheme = () => {
    setTheme(getTheme());
}
export const initColorScheme = () => {
    setColorScheme(getColorScheme());
}
