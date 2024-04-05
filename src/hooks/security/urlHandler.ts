export const reloadPage = () => {
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.location.href = newUrl;
}

export const currentPage = () => {
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
}