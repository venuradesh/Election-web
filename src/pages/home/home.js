import React, { useState } from "react";
import Lottie from "react-lottie";
import Header from "../../compononts/header";
import animationData from "../../assets/election";
import "./home.css";
import colors from "../../Colors/Colors";
import Image from "../../assets/election.jpg";
import Dots from "../../assets/white-dots.png";
import LoginImage from "../../assets/login.jpg";
import { Auth } from 'aws-amplify';

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";


function Home() {
  const classes = useStyles();
  const [signInClick, setSignInClick] = useState(false);
  const [tabClick, setTabClick] = useState("login");
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box className="home" sx={{ position: "relative" }}>
      <Box className={classes.background} bgcolor={"primary.main"}></Box>
      <Box className={classes.backgroundImage}></Box>
      <Box className={classes.whiteDots}></Box>
      <Header isHome={true} />
      <Box className="gird" display="flex" alignItems="center" justifyContent={"space-between"} sx={{ pl: 1 }}>
        <Box class="cellContainer" display={"flex"} flexDirection="column" sx={{ width: 300, position: "relative", top: 30 }}>
          <Typography variant="h5" sx={{ fontSize: 80, fontWeight: "800", fontFamily: "roboto", color: "secondary.main" }}>
            ELECTION
          </Typography>
          <Typography variant={"body1"} sx={{ width: 500, textAlign: "left", color: colors.fontColor, fontWeight: 100 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptas nesciunt consectetur exercitationem laborum libero perferendis voluptates id officiis possimus!{" "}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="secondary" className="btn" onClick={() => setSignInClick(true)} sx={{ width: 150, height: 40 }}>
              Sign In
            </Button>
          </Box>
        </Box>
        <div class="cellContainer">
          <div>
            <Lottie options={defaultOptions} height={400} width={500} />
          </div>
        </div>
      </Box>
      {signInClick ? (
        <Box className={classes.loginContainer}>
          <Box className={classes.backgroundLogin}></Box>
          <Box className={classes.loginWrapper} sx={{ boxShadow: 2 }}>
            <Box className={classes.closeIcon} sx={{ boxShadow: 1 }} onClick={() => setSignInClick(false)}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box className={classes.coverWrapper}></Box>
            <Box className={classes.itemWrapper}>
              {tabClick === "login" ? (
                <Box>
                  <Box className={classes.loginTitle}>Login</Box>
                  <Box className={classes.itemContainer}>
                    <TextField value={user}
                      onChange={(event) => { setUser(event.target.value) }} variant="standard" id="userName" label="User Name" className={classes.inputField} sx={{ mb: 1 }} />
                    <TextField value={password}
                      onChange={(event) => { setPassword(event.target.value) }} variant="standard" id="password" label="Password" type="password" className={classes.inputField} sx={{ mb: 1 }} />
                    <Button variant={"contained"} color="primary" className={classes.btn} sx={{ mt: 2, mb: 2 }}
                      onClick={() => {
                        console.log(password);
                        Auth.signIn(user, password).then((result) => {
                          window.location.reload();
                          //Success 
                        }).catch((err) => {
                          // Something is Wrong
                        })
                      }}>
                      Sign in
                    </Button>
                    <Box className={classes.link}>Forgot Password?</Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box className={classes.loginTitle}>SignUp</Box>
                  <Box className={classes.itemContainer}>
                    <TextField variant="standard" id="userName" label="User Name" className={classes.inputField} sx={{ mb: 1 }} />
                    <TextField variant="standard" id="password" label="Password" type="password" className={classes.inputField} sx={{ mb: 1 }} />
                    <TextField variant="standard" id="confirmPassword" label="Confirm Password" type="password" className={classes.inputField} sx={{ mb: 1 }} />
                    <TextField variant="standard" id="email" label="Email" type="email" className={classes.inputField} sx={{ mb: 1 }} />
                    <Button variant={"contained"} color="primary" className={classes.btn} sx={{ mt: 2, mb: 2 }}
                    >
                      Create Account
                    </Button>
                  </Box>
                </Box>
              )}
              <Box className={classes.btnContainer}>
                <TabButton variant="contained" color={tabClick === "login" ? "secondary" : "primary"} className={classes.loginBtn} onClick={() => setTabClick("login")}>
                  Login
                </TabButton>
                <TabButton variant="contained" color={tabClick === "signup" ? "secondary" : "primary"} className={classes.signupBtn} onClick={() => setTabClick("signup")}>
                  Signup
                </TabButton>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Home;

const useStyles = makeStyles({
  background: {
    width: "75%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.95,
  },

  whiteDots: {
    width: 200,
    height: 200,
    position: "absolute",
    bottom: -100,
    left: "30%",
    opacity: 0.2,
    backgroundImage: `url(${Dots})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    transform: "rotateZ(45deg)",
  },

  backgroundImage: {
    width: "75%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay",
  },

  //loginSection
  loginContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 68,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundLogin: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: colors.themeColor,
    opacity: 0.8,
    zIndex: -1,
  },

  loginWrapper: {
    width: 800,
    height: 500,
    backgroundColor: "white",
    zIndex: 10,
    borderRadius: 12,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 10,
    position: "relative",
    overflow: "hidden",
  },

  coverWrapper: {
    width: "55%",
    height: "100%",
    backgroundImage: `url(${LoginImage})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
  },

  splitter: {
    height: "90%",
    width: 1,
    backgroundColor: colors.fontColor,
  },

  closeIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#f3f3f3",
    zIndex: 100,
    cursor: "pointer",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  itemWrapper: {
    width: "calc(45% - 20px)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  loginTitle: {
    fontSize: 32,
    textTransform: "uppercase",
    fontWeight: "800",
  },

  itemContainer: {
    height: "60%",
  },

  inputField: {
    width: "100%",
    height: 50,
    boxShadow: "none",

    "&:hover": {
      outline: "none",
      boxShadow: "none",
      border: "none",
    },

    "&:focus": {
      boxShadow: "none",
    },
  },

  btn: {
    width: "100%",
    height: 50,
  },

  link: {
    fontSize: 14,
    color: colors.themeColor,
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",

    "&:hover": {
      textDecoration: "underline",
    },
  },

  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    columnGap: 0,

    columnGap: 1,
  },

  signupBtn: {
    flex: 1,
  },

  loginBtn: {
    flex: 1,
  },
});

const TabButton = styled(Button)({
  borderRadius: 0,
  height: 50,
});
