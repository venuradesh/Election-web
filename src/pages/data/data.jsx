import { withAuthenticator } from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../compononts/header";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./data.css";
import { API_URL, SECRET_KEY, FILE_PATH } from "../../config";

//colors
import colors from "../../Colors/Colors";

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

function DataList() {
  const classes = useStyles();
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { sta, lga, ward, pu } = location.state;

  const getWard = () => {
    axios.get(API_URL + "getData?key=" + SECRET_KEY + "&state=" + sta + "&lga=" + lga + "&ward=" + ward + "&pu=" + pu).then((response) => {
      var dt = response.data;

      setData({ dt });
      console.log(data);
    });
  };

  if (data == null || data == "null") {
    getWard();
  } else {
    var viewData = data["dt"];
    console.log(viewData);
  }

  if (data == null) {
    return (
      <div className="data">
        <Header />
        <div>Loding...</div>
      </div>
    );
  } else if (data["dt"].length == 0) {
    return (
      <div className="data">
        <Header />
        <div>No data found !</div>
      </div>
    );
  }
  const dataCard = (data) => {
    return (
      <Box className={`div-card ${classes.item}`} display="flex" alignItems="center" justifyContent={"space-around"} onClick={() => loadViewer(data.file, data.file_type, data.remark, data.lat, data.long)}>
        <div className={`cell ${classes.itemContent} ${classes.image}`}>{data.file_type == 0 ? <img src={FILE_PATH + data.file} width="40px" height="40px" /> : <img src={require("../../assets/video.png")} width="40px" height="40px" />}</div>
        <div className={`cell ${classes.itemContent}`}>{data.lat + "  |  " + data.long}</div>
        <div className={`cell ${classes.itemContent}`}>{data.remark}</div>
      </Box>
    );
  };
  const loadViewer = (file, file_type, remark, lat, long) => {
    navigate("/viewer", { state: { sta: sta, lga: lga, ward: ward, pu: pu, file: file, file_type: file_type, remark: remark, lat: lat, long: long } });
  };

  return (
    <Box className={`data ${classes.pageWrapper}`}>
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
      <Box className={classes.itemsContainer}>{viewData.map((data) => dataCard(data))}</Box>
    </Box>
  );
}

export default withAuthenticator(DataList);

const useStyles = makeStyles({
  pageWrapper: {},

  itemsContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "calc(100vh - 220px)",
    overflowY: "auto",
    paddingRight: 10,

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
    },
  },

  itemContent: {
    fontSize: 14,
  },

  image: {},
});
