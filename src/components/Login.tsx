import { FC, useEffect, useState } from "react";
import { CanvasUser } from "../interfaces/interfaces";
import { getUser } from "../services/canvas";
import CanvasButton from "./CanvasButton";
import Export from "./Export";
import GoogleButton from "./GoogleButton";

export interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [canvasUser, setCanvasUser] = useState<CanvasUser>();
  const [googleLoggedIn, setGoogleLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    async function getCanvasUser() {
      try {
        const canvasUser = await getUser();
        if (canvasUser != null) {
          setCanvasUser(canvasUser);
        }
      } catch (err) {
        console.log("User is not logged in!");
        console.error(err);
      }
    }

    getCanvasUser();
  }, []);

  useEffect(() => {
    chrome.identity.getAuthToken({ interactive: false }, async (token) => {
      if (chrome.runtime.lastError) return;
      setGoogleLoggedIn(true);
    });
  }, []);

  const openGoogleLogin = () => {
    chrome.identity.getAuthToken({ interactive: true }, () => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
      }
    });
  };

  return (
    <>
      <h3>{canvasUser == null ? "Welcome!" : `Welcome, ${canvasUser.name}`}</h3>
      <p className="canvasLogin">{canvasUser == null ? "Login to Canvas" : "Logged into Canvas"}</p>
      {!canvasUser && <CanvasButton />}
      <p className="googleLogin">
        {googleLoggedIn ? "Logged into Google" : "Login to Google Calendar"}
      </p>
      {!googleLoggedIn && <GoogleButton login={openGoogleLogin} />}
      <Export disabled={!googleLoggedIn || !canvasUser} />
    </>
  );
};

export default Login;
