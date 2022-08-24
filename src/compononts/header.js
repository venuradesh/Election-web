import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

// const settings = ['Account', 'Logout'];

const Header = (props) => {
  const pages = [
    ["Home", "/"],
    ["Results", "/results"],
    ["Visualization", "/visualization"],
    ["About Us", "/aboutus"],
    ["Contact Us", "/contactus"],
  ];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = async () => {
    await Auth.signOut();
    navigate("/");

    window.location.reload();
  };

  return (
    <AppBar position="fixed" style={{ background: "white", color: "black" }} sx={{ boxShadow: 1, px: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontSize: 24,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "#00163C",
              textDecoration: "none",
            }}
          >
            ELECTION
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "black",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" to={page[1]}>
                    {page[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ELECTION
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", columnGap: 5 }}>
            {pages.map((page) => (
              <Button key={page[0]} to={page[1]} component={Link} sx={{ my: 2, color: "primary.main", fontWeight: "500", display: "block" }}>
                {page[0]}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Account">
              {props.isHome ? (
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Avatar alt="User" src={require("../assets/avatar.png")} />
                </Link>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src={require("../assets/avatar.png")} />
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Button>Profile</Button>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
