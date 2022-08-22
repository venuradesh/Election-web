import React from "react";

import Button from '@mui/material/Button';
import ComboBox from 'react-responsive-combo-box'


import axios from "axios";
import 'react-responsive-combo-box/dist/index.css'
import "./dashboard.css"
import DataTable from "../../compononts/tabele";
import Header from "../../compononts/header";
import { withAuthenticator } from "@aws-amplify/ui-react";
//import '@aws-amplify/ui-react/node_modules'
import '@aws-amplify/ui-react/styles.css';
const { API_URL, SECRET_KEY } = require('../../config')


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
    };
  }
  componentDidMount() {
    this.getState();
  }




  render() {
    /* const options = {
      selectableRows: true,
      selectableRowsOnClick: true,
      onRowClick: (rowData, rowMeta) => {
        console.log(rowData, rowMeta);
      }
    };

    const handleRowClick = (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
    } */

    return (

      <div>  <Header isHome={false} /><div className="dashboard">

        <this.SearchAria />
        {this.state.poling == null ? <div></div> : <div className="container-table">
          <DataTable  sx={{ backgroundColor: 'red' }} rows={this.state.poling} state={this.state.selectedState}  lga={this.state.selectedLGA}  ward={this.state.selectedWard} />
        </div>}


      </div></div>


    );


  }
  SearchAria = () => {
    return <div className='container-dashboard-search-area'>


      <div className='combo'>
        <div className='combo-label'>
          State</div>
        <ComboBox inputClassName='combo-box' options={this.state.state} enableAutocomplete placeholder='Select State' onSelect={(option) => { this.getLGA(option) }} /></div>
      <div className='combo'><div className='combo-label'>
        LGA</div>
        <ComboBox inputClassName='combo-box' options={this.state.lga} enableAutocomplete placeholder='Select LGA' onSelect={(option) => { this.getWard(this.state.selectedState, option) }} /></div>
      <div className='combo'><div className='combo-label'>
        Ward</div>
        <ComboBox inputClassName='combo-box' options={this.state.ward} enableAutocomplete placeholder='Select Ward' onSelect={(option) => { this.setState({ selectedWard: option }) }} /></div>
      <Button sx={{ marginTop: "24px", height: "35px" }} className="search-button" variant="contained" onClick={() => this.getPolling()}>Search</Button>
    </div>
  }



  getState() {

    axios
      .get(API_URL + "getState?key=" + SECRET_KEY)
      .then((response) => {
        this.setState({ state: response.data });
      });
  }


  getLGA(state) {
    axios
      .get(API_URL + "getLGA?key=" + SECRET_KEY + "&name=" + state)
      .then((response) => {
        this.setState({ selectedState: state, lga: response.data });

      });
  }

  getWard(state, lga) {
    console.log(API_URL + "getWard?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga)
    axios
      .get(API_URL + "getWard?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga)
      .then((response) => {
        this.setState({ selectedState: state, selectedLGA: lga, ward: response.data[1], wardID: response.data[0] });

      });
  }

  getPolling() {
    const state = this.state.selectedState
    const lga = this.state.selectedLGA
    const ward = this.state.selectedWard
    for (let i = 0; i < this.state.ward.length; i++) {
      console.log(this.state.ward.length)
      if (this.state.ward[i] === ward) {
        var index = i;
        break;
      }
    }
    //console.log(index)
    //console.log(this.state.wardID[index])
    //console.log(API_URL + "getPol?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga + "&wardID=" + this.state.wardID[index])
    if (state != null && lga != null && ward != null) {
      axios
        .get(API_URL + "getPol?key=" + SECRET_KEY + "&state=" + state + "&lga=" + lga + "&wardID=" + this.state.wardID[index])
        .then((response) => {
          console.log(response.data)
          this.setState({ poling: response.data });

        });
    }
  }
}

export default withAuthenticator(Dashboard, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});