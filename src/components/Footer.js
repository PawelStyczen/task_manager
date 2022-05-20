import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <p>Copyright Me 2022</p>
      <Link to="/about">About</Link>
    </footer>
  );
}

export default Footer;
