import React from "react";
import logoicn from "../../assets/images/logo-img.svg";

const LogoIcon = (props) => {
  return <img alt="Logo" src={logoicn} style={{ maxWidth: '200px', height: 'auto', display: 'inline-block' }} {...props} />;
};

export default LogoIcon;
