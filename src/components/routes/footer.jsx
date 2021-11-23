import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "blue",

        bottom: 0,
        width: "100%",
        textAlign: "center",
        color: "white",
        fontFamily: "sans-serif",
        padding: "10px",
      }}
    >
      <i className="fa fa-copyright" aria-hidden="true">
        <span className="mr-3"> unknown developer</span>
      </i>
    </footer>
  );
};

export default Footer;
