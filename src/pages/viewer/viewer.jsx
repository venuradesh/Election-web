import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Map from "./map";
import Header from "../../compononts/header";
import Viewer from "react-viewer";
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";

import "./viewer.css";
import { API_URL, FILE_PATH } from "../../config";
import colors from "../../Colors/Colors";
import Image from "../../assets/family.png";

//material ui
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function DataViewer() {
  const location = useLocation();
  const { data, i } = location.state;
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(i);
  const navigate = useNavigate();
  const [ml, setML] = React.useState(null);

  const nextPage = () => {
    let i = index + 1;
    if (i < data.length) {
      setIndex(i);
    }
  };

  const backPage = () => {
    let i = index - 1;
    if (i > -1) {
      setIndex(i);
    }
  };

  const getMLRemark = (url) => {
    // console.log(API_URL + "mlPredict?" + "url=" + url);
    axios.get(API_URL + "mlPredict?" + "url=" + url).then((response) => {
      var mlData = response.data;
      console.log("ml" + mlData);
      setML({ mlData });
    });
  };

  if (ml == null) {
    getMLRemark(FILE_PATH + data[index].file);
  }

  return (
    <Box className={`dataviewer ${classes.pageWrapper}`}>
      <Header />
      <div className="div-back">
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </div>

      {index > data.length - 2 ? (
        <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ boxShadow: 1 }} className={`${classes.btnNavigate} ${classes.next}`}>
          <IconButton onClick={() => nextPage()} aria-label="back">
            <NavigateNextIcon />
          </IconButton>
        </Box>
      ) : (
        <></>
      )}
      {index > 0 ? (
        <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ boxShadow: 1 }} className={`${classes.btnNavigate} ${classes.prev}`}>
          <IconButton onClick={() => backPage()} aria-label="back">
            {" "}
            <NavigateBeforeIcon />{" "}
          </IconButton>
        </Box>
      ) : (
        <></>
      )}
      <Box display="flex" flexDirection="row" justifyContent={"space-around"} columnGap={2} className={classes.container}>
        <Box className={`row-1 ${classes.row1}`}>
          <div className={`div-image ${classes.imageContainer}`}>
            <Box className={classes.imageTint}></Box>
            {data[index].file_type === 0 ? (
              !visible ? (
                <img
                  onClick={() => {
                    setVisible(true);
                  }}
                  src={FILE_PATH + data[index].file}
                  alt="uploaded"
                  className={classes.image}
                />
              ) : null
            ) : (
              <ReactPlayer width={"100%"} height={"100%"} className="video-player" controls={true} url={FILE_PATH + data[index].file} />
            )}
            <Viewer
              onClose={() => {
                setVisible(false);
              }}
              visible={visible}
              images={[{ src: FILE_PATH + data[index].file, alt: "" }]}
              className={classes.reactViewer}
            />
          </div>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={0} className={`row-2 ${classes.row2}`}>
          <Box className={`div-map ${classes.mapContainer}`}>
            <Map center={{ lat: data[index].lat, lng: data[index].long }} />
          </Box>
          <Box className={classes.itemsContainer}>
            <Box className={`div-remark ${classes.itemContainer}`}>
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                  Date & Time
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                  Lorem ipsum dolor sit amet.
                </Typography>
              </Box>
            </Box>
            <Box className={`div-remark ${classes.itemContainer}`}>
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                  Logitude & Latitude
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                  {data[index].lat} | {data[index].long}
                </Typography>
              </Box>
            </Box>

            <Box className={`div-remark ${classes.itemContainer}`}>
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                  Phone Number of Sender
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                  0771234567
                </Typography>
              </Box>
            </Box>
            <Box className={`div-remark ${classes.itemContainer}`}>
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                  Email of Sender
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                  sample@gmail.com
                </Typography>
              </Box>
            </Box>
            <Box className={`div-remark ${classes.itemContainer}`}>
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                  Addional Remark
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                  {data[index].remark}
                </Typography>
              </Box>
            </Box>
            <Box className={`div-remark ${classes.itemContainer}`}>
              {data[index].file_type === 0 ? (
                <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                  <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                    ML Remark
                  </Typography>
                  <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                    {ml != null ? Object.keys(ml["mlData"]) : "Loading..."}
                  </Typography>
                  <Typography variant={"body1"} className={`remark-text ${classes.typo2}`} sx={{ fontSize: 12 }}>
                    {ml != null ? ml["mlData"][Object.keys(ml["mlData"])] : null}
                  </Typography>
                </Box>
              ) : (
                <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`}>
                  <Typography variant={"h6"} mt={0.3} mb={0.3} sx={{ fontSize: 16 }} className={`head-text ${classes.typo1}`}>
                    ML Remark
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "red" }}>Ml Remark not provide for video !</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withAuthenticator(DataViewer);

const useStyles = makeStyles({
  pageWrapper: {
    // backgroundColor: colors.backgroundColor,
  },

  background: {
    width: 500,
    height: 500,
    backgroundColor: colors.themeColor,
    position: "absolute",
    bottom: -250,
    right: -250,
    transform: "rotateZ(45deg)",
    zIndex: 1,
  },

  familyImage: {
    width: 500,
    height: 500,
    backgroundImage: `url(${Image})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    bottom: -90,
    right: -120,
    zIndex: 2,
  },

  container: {
    width: "calc(100vw - 250px)",
    height: "calc(100vh - 160px)",
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 10,
    position: "relative",
  },

  row1: {
    width: "50%",
    height: "100%",
  },

  row2: {
    height: "100%",
    width: "50%",
    paddingBottom: 10,

    "&::-webkit-scrollbar": {
      width: 5,
    },

    "&::-webkit-scrollbar-thumb": {
      width: 5,
    },

    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: colors.borderColor,
    },
  },

  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    cursor: "pointer",
  },

  imageTint: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: colors.themeColor,
    opacity: 0.3,
  },

  mapContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    height: 320,
    marginBottom: 20,
  },

  itemsContainer: {
    display: "flex",
    flexWrap: "wrap",
  },

  itemContainer: {
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  },

  item: {
    border: "none",
    height: "max-content",
    height: 80,
    borderBottom: `1px solid ${colors.backgroundColor}`,
    borderRadius: 0,
  },

  typo1: {
    color: colors.fontHeadingColor,
  },

  typo2: {
    color: colors.fontColor,
  },

  reactViewer: {
    paddingTop: 100,
  },

  btnNavigate: {
    position: "absolute",
    top: "50%",
    backgroundColor: colors.boxColor,
    width: 40,
    height: 40,
    borderRadius: 40,
    cursor: "pointer",
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  next: {
    right: 20,
  },

  prev: {
    left: 20,
  },
});
