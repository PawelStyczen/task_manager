import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, color, onClick }) => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  color: "grey",
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
