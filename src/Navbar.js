import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

  const displaySubmenu = (e) => {
    // get the target button
    const targetBtn = e.target.getBoundingClientRect();
    // get the center and the bottom of the target button
    const center = (targetBtn.left + targetBtn.right) / 2;
    // get the center of the targetBtn and raise it 3px up by subtracting 3px from it
    const bottom = targetBtn.bottom - 3;
    // get the title of the button hovered on
    const pageToDisplay = e.target.textContent;

    openSubmenu(pageToDisplay, { center, bottom });
  };

  const handleSubmenu = (e) => {
    // when mouse hovers over any area not any of the buttons, close the submenu
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };

  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <img className="nav-logo" src={logo} alt="logo" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              products
            </button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              developers
            </button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              company
            </button>
          </li>
        </ul>
        <button className="btn signin-btn">sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;
