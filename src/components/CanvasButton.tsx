import { FC } from "react";

export interface CanvasButtonProps {}

const CanvasButton: FC<CanvasButtonProps> = () => {
  const openCanvas = () => {
    window.chrome.tabs.create({ url: "https://byui.instructure.com/", active: true });
  };

  return (
    <button className="canvasBtn" onClick={openCanvas}>
      Canvas Login
    </button>
  );
};

export default CanvasButton;
