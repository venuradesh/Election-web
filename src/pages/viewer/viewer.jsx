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

//material ui
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const useStyles = makeStyles({
  pageWrapper: {
    backgroundColor: colors.backgroundColor,
  },

  container: {
    width: "calc(100vw - 250px)",
    height: "calc(100vh - 160px)",
    marginLeft: "auto",
    marginRight: "auto",
  },

  row1: {
    width: 500,
    height: "100%",
  },

  row2: {
    height: "100%",
    overflowY: "auto",
    paddingBottom: 10,

    "&::-webkit-scrollbar": {
      width: 0,
    },
  },

  imageContainer: {
    width: "100%",
    height: "100%",
  },

  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    cursor: "pointer",
  },

  itemContainer: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },

  item: {
    backgroundColor: colors.boxColor,
    border: "none",
    height: "max-content",
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

function DataViewer() {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate();
  const [ml, setML] = React.useState(null);
  const [imgClicked, setImgClicked] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState("");

  const location = useLocation();
  const { sta, lga, ward, pu, file, file_type, lat, long, remark } = location.state;

  const getMLRemark = (url) => {
    axios.get(API_URL + "mlPredict?" + "url=" + url).then((response) => {
      var mlData = response.data;

      setML({ mlData });
    });
  };

  if (ml == null) {
    getMLRemark(FILE_PATH + file);
  }

  return (
    <Box className={`dataviewer ${classes.pageWrapper}`}>
      <Header />
      <div className="div-back">
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ boxShadow: 1 }} className={`${classes.btnNavigate} ${classes.next}`}>
        <NavigateNextIcon />
      </Box>
      <Box display="flex" alignItems="center" justifyContent={"center"} sx={{ boxShadow: 1 }} className={`${classes.btnNavigate} ${classes.prev}`}>
        <NavigateBeforeIcon />
      </Box>
      <Box display="flex" flexDirection="row" justifyContent={"space-around"} columnGap={2} className={classes.container}>
        <Box className={`row-1 ${classes.row1}`}>
          <div className={`div-image ${classes.imageContainer}`}>
            {file_type === 0 ? (
              !visible ? (
                <img
                  onClick={() => {
                    setVisible(true);
                  }}
                  src={FILE_PATH + file}
                  alt="uploaded"
                  className={classes.image}
                />
              ) : null
            ) : (
              <ReactPlayer width={"100%"} height={"100%"} className="video-player" controls={true} url={FILE_PATH + file} />
            )}
            <Viewer
              onClose={() => {
                setVisible(false);
              }}
              visible={visible}
              images={[{ src: FILE_PATH + file, alt: "" }]}
              className={classes.reactViewer}
            />
          </div>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={2} className={`row-2 ${classes.row2}`}>
          <Box className="div-map">
            <Map center={{ lat: lat, lng: long }} />
          </Box>
          <Box className={`div-remark ${classes.itemContainer}`}>
            <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
              <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                Addional Remark
              </Typography>
              <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                {remark}
              </Typography>
            </Box>
          </Box>
          <Box className={`div-remark ${classes.itemContainer}`}>
            {file_type === 0 ? (
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
                <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                  ML Remark
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                  {ml != null ? Object.keys(ml["mlData"]) : "Loading..."}
                </Typography>
                <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                  {ml != null ? ml["mlData"][Object.keys(ml["mlData"])] : null}
                </Typography>
              </Box>
            ) : (
              <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
                <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                  ML Remark
                </Typography>
                <Typography style={{ color: "red" }}>Ml Remark not provide for video !</Typography>
              </Box>
            )}
          </Box>
          <Box className={`div-remark ${classes.itemContainer}`}>
            <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
              <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                Logitude & Latitude
              </Typography>
              <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, perferendis.
              </Typography>
            </Box>
          </Box>
          <Box className={`div-remark ${classes.itemContainer}`}>
            <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
              <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                Date & Time
              </Typography>
              <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                Lorem ipsum dolor sit amet.
              </Typography>
            </Box>
          </Box>
          <Box className={`div-remark ${classes.itemContainer}`}>
            <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
              <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                Phone number of Sender
              </Typography>
              <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                0771234567
              </Typography>
            </Box>
          </Box>
          <Box className={`div-remark ${classes.itemContainer}`}>
            <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" className={`div-text ${classes.item}`} sx={{ boxShadow: 2 }}>
              <Typography variant={"h6"} mt={1} mb={1} className={`head-text ${classes.typo1}`}>
                AI predictions
              </Typography>
              <Typography variant={"body1"} className={`remark-text ${classes.typo2}`}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, ullam!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withAuthenticator(DataViewer);
