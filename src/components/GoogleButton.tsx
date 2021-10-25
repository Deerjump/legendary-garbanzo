import { FC } from "react";

export interface GoogleButtonProps {
  login: () => void;
}

const GoogleButton: FC<GoogleButtonProps> = ({ login }) => {
  return (
    <button className="googleBtn" onClick={login}>
      Google Calendar Login
    </button>
  );
};

export default GoogleButton;
