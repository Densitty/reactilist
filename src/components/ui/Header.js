import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3rem",
  },
  logo: {
    height: "6rem",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    height: "45px",
    lineHeight: "1.2",
  },
}));

const Header = (props) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    // find the appropraite url when the page is reloaded and set the value of the index to tally with window.location.pathname
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    }

    if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    }

    if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    }

    if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    }

    if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    }

    if (window.location.pathname === "/estimate" && value !== 5) {
      setValue(5);
    }
  }, [value]);

  const handleChange = (e, value) => setValue(value);

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => setValue(0)} /* make home link the active link */
            >
              <img className={classes.logo} src={logo} alt="company logo" />
            </Button>
            <Tabs
              value={value}
              className={classes.tabContainer}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={Link}
                to="/"
              />

              <Tab
                className={classes.tab}
                label="Services"
                component={Link}
                to="/services"
              />

              <Tab
                className={classes.tab}
                label="Revolution"
                component={Link}
                to="/revolution"
              />

              <Tab
                className={classes.tab}
                label="About Us"
                component={Link}
                to="/about"
              />

              <Tab
                className={classes.tab}
                label="Contact Us"
                component={Link}
                to="/contact"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
