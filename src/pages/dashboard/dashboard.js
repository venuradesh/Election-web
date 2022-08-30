import React from "react";

import Button from "@mui/material/Button";
import ComboBox from "react-responsive-combo-box";

import axios from "axios";
import "react-responsive-combo-box/dist/index.css";
import "./dashboard.css";
import DataTable from "../../compononts/tabele";
import Header from "../../compononts/header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

//background image
import Image from "../../assets/buildings.png";

//material ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
const { API_URL, SECRET_KEY } = require("../../config");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: null,
      selectedLGA: null,
      selectedWard: null,
      ward: [],
      lga: [],
      state: [],
      poling: null,
      clicked: false,
    };
  }
  componentDidMount() {
    this.getState();
  }

  render() {
    return (
      <div>
        {" "}
        <Header isHome={false} />
        {/* <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 300, backgroundImage: `url(${Image})`, backgroundSize: "contain", backgroundPosition: "center", opacity: 0.3 }}></Box> */}
        <Box className="dashboard" display="flex" flexDirection={"column"} alignItems="center" justifyContent={"center"} sx={{ width: "100%" }}>
          <Typography variant="h4" sx={!this.state.clicked ? { fontWeight: "800", mb: 2, textTransform: "uppercase" } : { display: "none" }}>
            Select The State, LGA and Ward
          </Typography>
          <this.SearchAria />
          {this.state.poling == null ? (
            <div></div>
          ) : (
            <Box className="container-table" sx={{ width: "80%", zIndex: 10 }}>
              <DataTable rows={this.state.poling} state={this.state.selectedState} lga={this.state.selectedLGA} ward={this.state.selectedWard} />
            </Box>
          )}
        </Box>
      </div>
    );
  }
  SearchAria = () => {
    return (
      <>
        <Box className="container-dashboard-search-area" sx={!this.state.clicked ? { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } : { display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box className="combo" sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ color: "primary.main" }} className="combo-label">
                State
              </Box>
              <ComboBox
                inputClassName="combo-box"
                options={this.state.state}
                enableAutocomplete
                placeholder="Select State"
                onSelect={(option) => {
                  this.getLGA(option);
                }}
              />
            </Box>
            <div className="combo">
              <Box sx={{ color: "primary.main" }} className="combo-label">
                LGA
              </Box>
              <ComboBox
                inputClassName="combo-box"
                options={this.state.lga}
                enableAutocomplete
                placeholder="Select LGA"
                onSelect={(option) => {
                  this.getWard(this.state.selectedState, option);
                }}
              />
            </div>
            <div className="combo">
              <Box sx={{ color: "primary.main" }} className="combo-label">
                Ward
              </Box>
              <ComboBox
                inputClassName="combo-box"
                options={this.state.ward}
                enableAutocomplete
                placeholder="Select Ward"
                onSelect={(option) => {
                  this.setState({ selectedWard: option });
                }}
              />
            </div>
          </Box>
          <Button
            sx={{ width: 200, height: 50, mt: 5, position: "relative", bottom: 4 }}
            className="search-button"
            variant="contained"
            onClick={() => {
              this.getPolling();
              this.setState({ clicked: true });
            }}
          >
            Search
          </Button>
        </Box>
      </>
    );
  };

  getState() {
    axios.get(API_URL + "getState?key=" + SECRET_KEY).then((response) => {
      this.setState({ state: response.data });
    });
  }

  getLGA(state) {
    axios.get(API_URL + "getLGA?key=" + SECRET_KEY + "&name=" + state).then((response) => {
      this.setState({ selectedState: state, lga: response.data });
    });
  }

  getWard(state, lga) {
    console.log(API_URL + "getWard?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga);
    axios.get(API_URL + "getWard?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga).then((response) => {
      this.setState({ selectedState: state, selectedLGA: lga, ward: response.data[1], wardID: response.data[0] });
    });
  }

  getPolling() {
    const state = this.state.selectedState;
    const lga = this.state.selectedLGA;
    const ward = this.state.selectedWard;
    for (let i = 0; i < this.state.ward.length; i++) {
      console.log(this.state.ward.length);
      if (this.state.ward[i] === ward) {
        var index = i;
        break;
      }
    }
    //console.log(index)
    //console.log(this.state.wardID[index])
    //console.log(API_URL + "getPol?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga + "&wardID=" + this.state.wardID[index])
    if (state != null && lga != null && ward != null) {
      axios.get(API_URL + "getPol?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga + "&wardID=" + this.state.wardID[index]).then((response) => {
        console.log(response.data);
        this.setState({ poling: response.data });
      });
    }
  }
}

export default withAuthenticator(Dashboard, {
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});
