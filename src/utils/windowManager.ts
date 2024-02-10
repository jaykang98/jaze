// Example functions for managing popup windows in a web context

export const openPopupWindow = (url: string, windowName: string, windowFeatures?: string) => {
  const newWindow = window.open(url, windowName, windowFeatures);
  if (newWindow) {
    newWindow.focus();
  }
  return newWindow;
};

export const closePopupWindow = (windowRef: Window | null) => {
  if (windowRef) {
    windowRef.close();
  }
};
