export const handleHiddenScrollBar = () => {
  document.documentElement.classList.add("overflow-hidden");
};
export const handleOpenScrollBar = () => {
  document.documentElement.classList.remove("overflow-hidden");
};
