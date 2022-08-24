import React from "react";
import Lottie from "react-lottie";
import Header from "../../compononts/header";
import animationData from "../../assets/election";
import { useNavigate } from "react-router-dom";
import "./home.css";
import colors from "../../Colors/Colors";
import Image from "../../assets/election.jpg";

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box className="home">
      <Box className={classes.background} bgcolor={"primary.main"}></Box>
      <Box className={classes.backgroundImage}></Box>
      <Header isHome={true} />
      <Box className="gird" display="flex" alignItems="center" justifyContent={"space-between"} sx={{ pl: 1 }}>
        <Box class="cellContainer" display={"flex"} flexDirection="column" sx={{ width: 300, position: "relative", top: 30 }}>
          <Typography variant="h5" sx={{ fontSize: 80, fontFamily: "roboto", color: "secondary.main" }}>
            ELECTION
          </Typography>
          <Typography variant={"body1"} sx={{ width: 500, textAlign: "left", color: colors.fontColor, fontWeight: 100 }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptas nesciunt consectetur exercitationem laborum libero perferendis voluptates id officiis possimus!{" "}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="secondary" className="btn" onClick={() => navigate("/login")} sx={{ width: 200, height: 50 }}>
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
});
