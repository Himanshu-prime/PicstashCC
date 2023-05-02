import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { GiExitDoor } from "react-icons/gi";
import { BsPerson } from "react-icons/bs";
import StreamRoundedIcon from "@mui/icons-material/StreamRounded";
import "../styles/Navbar.css";
import { setLogout } from "../redux/features/authSlice";

import { useDispatch } from "react-redux";
import { GiHamburgerMenu, GiTireIronCross } from "react-icons/gi";

const Navbar = () => {
  const [value, setValue] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const id = user?._id || user?.id;
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const BrandNamePop = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "#ffffff",
          paddingX: "1.6rem",
          paddingY: "0.1rem",
          fontFamily: "Roboto",
        }}
      >
        <Toolbar style={{ position: "relative" }}>
          <StreamRoundedIcon sx={{ transform: "scale(2)", color: "black" }} />
          {!BrandNamePop && (
            <Typography
              sx={{
                fontSize: "1.4rem",
                marginLeft: "2%",
                color: "black",
                fontFamily: "Roboto",
                letterSpacing: "1.2px",
              }}
            >
              PicStash
            </Typography>
          )}

          {isMatch ? ( //mobile view
            <>
              {
                <>
                  {!showMenu ? (
                    <GiHamburgerMenu
                      className="burger"
                      style={{ color: "red", fontSize: "2rem" }}
                      onClick={() => setShowMenu(!showMenu)}
                    />
                  ) : (
                    <GiTireIronCross
                      className="burger"
                      style={{ color: "red", fontSize: "2rem" }}
                      onClick={() => setShowMenu(!showMenu)}
                    />
                  )}
                  <div className={showMenu ? "Resp_nav show" : "Resp_nav"}>
                    <ul className="Res_links">
                      {(user?.id || user?._id) && user?.role === "admin" ? (
                        <>
                          <li
                            className="Res_link"
                            style={{ fontFamily: "Roboto" }}
                          >
                            <a href="/tours">Dashboard</a>
                          </li>
                          <li
                            className="Res_link"
                            style={{ fontFamily: "Roboto" }}
                          >
                            <a href="/about">Add Tour</a>
                          </li>
                          <li
                            className="Res_link"
                            style={{ fontFamily: "Roboto" }}
                          >
                            <a href="/blogs">Queries</a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            className="Res_link"
                            style={{ fontFamily: "Roboto" }}
                          >
                            <a href="/">Home</a>
                          </li>
                          <li
                            className="Res_link"
                            style={{ fontFamily: "Roboto" }}
                          >
                            <a href="/dashboard">Dashboard</a>
                          </li>
                          <li
                            className="Res_link"
                            style={{ fontFamily: "Roboto" }}
                          >
                            <a href="/editImage">Add Image</a>
                          </li>
                          
                        </>
                      )}
                      {id ? (
                        <Button
                          sx={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "medium",
                            letterSpacing: "1.2px",
                            fontFamily: "Roboto",
                          }}
                          variant="text"
                          size="small"
                          onClick={handleLogout}
                        >
                          log Out
                        </Button>
                      ) : (
                        <>
                          <Button
                            sx={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: "medium",
                              letterSpacing: "1.2px",
                              fontFamily: "Roboto",
                            }}
                            variant="text"
                            size="small"
                          >
                            Login
                          </Button>
                          <Button
                            sx={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: "medium",
                              letterSpacing: "1.2px",
                              borderRadius: "12px",
                              padding: "4px 16px",
                              fontFamily: "Roboto",
                            }}
                            style={{ backgroundColor: "yellow" }}
                            variant="text"
                            size="small"
                          >
                            SignUp
                          </Button>
                        </>
                      )}
                    </ul>
                  </div>
                </>
              }
            </>
          ) : (
            <>
              <Tabs
                sx={{
                  marginLeft: "auto",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "larger",
                  letterSpacing: "1.2px",
                  fontFamily: "Roboto",
                }}
                indicatorColor="primary"
                textColor="black"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  sx={{
                    color: "black",
                    fontWeight: "medium",
                    fontSize: "medium ",
                    letterSpacing: "1.2px",
                    fontFamily: "Roboto",
                  }}
                  component={Link}
                  to="/"
                  label="Home"
                />
                {id && (
                  <>
                    <Tab
                      sx={{
                        color: "black",
                        fontWeight: "medium",
                        fontSize: "medium ",
                        letterSpacing: "1.2px",
                        fontFamily: "Roboto",
                      }}
                      component={Link}
                      to="/dashboard"
                      label="Dashboard"
                    />
                    <Tab
                      sx={{
                        color: "black",
                        fontWeight: "medium",
                        fontSize: "medium ",
                        letterSpacing: "1.2px",
                        fontFamily: "Roboto",
                      }}
                      component={Link}
                      to="/editImage"
                      label="Add Image"
                    />
                  </>
                )}
              </Tabs>
              {id ? (
                <Button style={{ border: "none" }}>
                  <Dropdown
                    onMouseLeave={() => setShowDropdown(false)}
                    onMouseOver={() => setShowDropdown(true)}
                  >
                    <Dropdown.Toggle
                      variant=""
                      id="dropdown-basic"
                      style={{
                        padding: "3px 6px",
                        borderRadius: "10px",
                        backgroundColor: "transparent",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        <BsPerson />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      show={showDropdown}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        overflow: "hidden",
                      }}
                    >
                      <Dropdown.Item
                        href="#"
                        style={{ color: "black" }}
                        className="DropdownItem"
                      >
                        {" "}
                        <Link to="/me">
                          <span
                            style={{
                              fontSize: "22px",
                              fontWeight: "600",
                              marginRight: "4px",
                              color: "black",
                            }}
                          >
                            <BsPerson />
                          </span>
                        </Link>
                        {user?.name}{" "}
                      </Dropdown.Item>
                      {/* <Dropdown.Divider /> */}
                      <Dropdown.Item
                        eventKey="4"
                        href="#"
                        onClick={handleLogout}
                        className="DropdownItem"
                      >
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "500",
                            marginRight: "4px",
                            color: "black",
                          }}
                        >
                          <GiExitDoor />
                        </span>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Button>
              ) : (
                <>
                  <Button
                    sx={{
                      marginLeft: "auto",
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "medium",
                      letterSpacing: "1.2px",
                      fontFamily: "Roboto",
                    }}
                    variant="text"
                    size="small"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{
                      marginLeft: "10px",
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "medium",
                      letterSpacing: "1.2px",
                      borderRadius: "12px",
                      padding: "4px 16px",
                      fontFamily: "Roboto",
                    }}
                    style={{ backgroundColor: "yellow" }}
                    variant="text"
                    size="small"
                    component={Link}
                    to="/register"
                  >
                    SignUp
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
