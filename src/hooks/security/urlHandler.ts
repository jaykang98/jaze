export const reloadPage = () => {
    window.location.href = currentPage();
};

export const currentPage = () => {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
};
