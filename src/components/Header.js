import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import Button from "./Button";

const Header = ({ title, toggleShowAddTask, showAddTask }) => {
  const location = useLocation();

  const onClick = () => {
    toggleShowAddTask();
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          onClick={onClick}
          color={!showAddTask ? "green" : "grey"}
          label={!showAddTask ? "Add" : "Close"}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
