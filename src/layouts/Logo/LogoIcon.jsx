import React from "react";
import logoicn from "../../assets/images/admin-logo.svg";

const LogoIcon = (props) => {
  return <img alt="Logo" src={logoicn} style={{ maxWidth: '180px', height: 'auto',  }} {...props} />;
};

export default LogoIcon;
