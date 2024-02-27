import React from "react";
import logoicn from "../../assets/images/admin-logo.svg";

const LogoIcon = (props) => {
  return <img alt="Logo" src={logoicn} style={{ maxWidth: '200px', height: 'auto', display: 'block' }} {...props} />;
};

export default LogoIcon;
