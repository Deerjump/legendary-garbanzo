import { FC } from "react";

export interface LoginProps {

}

const Login:FC<LoginProps> = () => {
  return (
    <>
      <div><p className="canvasLogin"> Logged into Canvas </p></div>
      <button className="canvasBtn">Canvas Login</button>
      <div><p className="googleLogin"> Logged into Google </p></div>
      <button className="googleBtn">Calendar Login</button>
    </>
  );
}

export default Login