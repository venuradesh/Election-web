import React from "react";

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

import colors from "../../Colors/Colors";

//components
import Header from "../../compononts/header";

function About() {
  const classes = useStyles();

  return (
    <Box className={classes.pageWrapper}>
      <Header />
      <Box className={classes.circle}></Box>
      <Box className={classes.aboutusImage}>
        <img className={classes.image} src={require("../../assets/about-us.png")} alt="About" />
      </Box>
      <Box className={classes.contentWrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.title}>ABOUT US</Box>
          <Box className={classes.content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.</Box>
          <Box className={classes.content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ratione velit natus dicta earum, deserunt vitae, eaque incidunt, ad omnis tempora sit! Dolore quidem optio obcaecati! Ipsam cupiditate et dolore eligendi assumenda quos necessitatibus, earum illum amet distinctio nam deleniti?</Box>
        </Box>
        <Box className={classes.bottomLine}></Box>
      </Box>
    </Box>
  );
}

export default About;

const useStyles = makeStyles({
  pageWrapper: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: 70,
  },

  circle: {
    width: "calc(100vh - 70px)",
    height: "calc(100vh - 70px)",
    backgroundColor: colors.themeColor,
    position: "absolute",
    top: 70,
    left: -200,
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
    zIndex: -1,
  },

  aboutusImage: {
    position: "absolute",
    left: 100,
    bottom: 0,
  },

  image: {
    width: 900,
  },

  contentWrapper: {
    width: 900,
    height: "calc(100vh - 70px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 40,
  },

  bottomLine: {
    width: 200,
    height: 2,
    backgroundColor: colors.themeColor,
  },

  contentContainer: {
    width: 550,
    height: "max-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },

  title: {
    fontSize: 48,
    fontFamily: "roboto, sans-serif",
    fontWeight: 800,
    color: colors.themeColor,
  },

  content: {
    color: colors.fontColor,
    fontWeight: "100",
  },

  socialMediaContainer: {
    width: 200,
    height: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  socialMedia: {
    cursor: "pointer",
  },

  socialIcon: {
    width: 40,
    height: 40,
  },
});
