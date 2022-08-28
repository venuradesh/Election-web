import { withAuthenticator } from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../compononts/header";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "../../assets/buildings.png";

import "./data.css";
import { API_URL, SECRET_KEY, FILE_PATH } from "../../config";

//colors
import colors from "../../Colors/Colors";

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import LoadingScreen from "../LoadingScreen";
import DataNotFound from "../../DataNotFound";

function DataList() {
  const classes = useStyles();
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { sta, lga, ward, pu } = location.state;

   const getData = () => {
    axios.get(API_URL + "getData?key=" + SECRET_KEY + "&state=" + sta + "&lga=" + lga + "&ward=" + ward + "&pu=" + pu).then((response) => {
      var dt = response.data;

      setData(dt );
    });
  };

 

  if (data == null) {
    getData();
    return (
      <div className="data">
        <Header />
        <LoadingScreen />
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div className="data">
        <Header />
        <DataNotFound />
      </div>
    );
  }
  const dataCard = (data, index) => {
    return (
      <Box className={`div-card ${classes.item}`} display="flex" alignItems="center" justifyContent={"space-around"} onClick={() => loadViewer(index)}>
        <div className={`cell ${classes.itemContent} ${classes.image}`}>{data.file_type === 0 ? <img src={FILE_PATH + data.file} width="40px" height="40px" alt="cover" /> : <img src={require("../../assets/video.png")} width="40px" height="40px" alt="videoCover" />}</div>
        <div className={`cell ${classes.itemContent}`}>{data.lat + "  |  " + data.long}</div>
        <div className={`cell ${classes.itemContent}`}>{data.remark}</div>
      </Box>
    );
  };
  const loadViewer = (index) => {
    navigate("/viewer", { state: { data: data , i: index} });
  };

  return (
    <Box className={`data ${classes.pageWrapper}`}>
      <Box sx={{ zIndex: 1, position: "absolute", bottom: 0, left: 0, width: "100%", height: 300, backgroundImage: `url(${Image})`, backgroundSize: "contain", backgroundPosition: "center", opacity: 0.3 }}></Box>

      <Header />

      <Box className="div-topic" display="flex" alignItems="center" justifyContent={"flex-start"} columnGap={5}>
        <IconButton sx={{ marginRight: "8px" }} onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        {sta} {" > "} {lga} {" > "} {ward} {" > "} {pu}
      </Box>
      <Box className={`div-label ${classes.topicsContainer}`} mb={2} display="flex" justifyContent={"space-around"}>
        <Box className={`cell-label ${classes.topics}`}>File</Box>
        <Box className={`cell-label ${classes.topics}`}>Location</Box>
        <Box className={`cell-label ${classes.topics}`}>Remark</Box>
      </Box>
      <Box className={classes.itemsContainer}>{data.map((data, index) => dataCard(data, index))}</Box>
    </Box>
  );
}

export default withAuthenticator(DataList);

const useStyles = makeStyles({
  pageWrapper: {
    zIndex: 1,
  },

  itemsContainer: {
    width: "81%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "calc(100vh - 220px)",
    overflowY: "auto",
    paddingRight: 10,
    zIndex: 10,
    position: "relative",

    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      width: 5,
      backgroundColor: colors.borderColor,
    },
  },

  topicsContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 10,
  },

  topics: {},

  item: {
    borderRadius: 0,
    borderBottom: `1px solid ${colors.borderColor}`,
    cursor: "pointer",
    transition: "all 0.3s ease",
    height: 60,

    "&:hover": {
      backgroundColor: colors.backgroundColor,
      opacity: 0.8,
    },
  },

  itemContent: {
    fontSize: 14,
  },

  image: {},
});
