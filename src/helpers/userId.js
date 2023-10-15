const generateUniqueId = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

export const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUniqueId();
        localStorage.setItem('userId', userId);
    }
    return +userId;
}