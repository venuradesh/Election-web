import { withAuthenticator } from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../compononts/header";
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import "./data.css"
import { API_URL, SECRET_KEY, FILE_PATH } from "../../config";

function DataList() {

    const [data, setData] = React.useState(null);
    const navigate = useNavigate();
    const location = useLocation()
    const { sta, lga, ward, pu } = location.state;

    const getWard = () => {
        axios
            .get(API_URL + "getData?key=" + SECRET_KEY + "&state=" + sta + "&lga=" + lga + "&ward=" + ward + "&pu=" + pu)
            .then((response) => {
                var dt = response.data

                setData({ dt });
                console.log(data)
            });
    }

    if (data == null || data == 'null') { getWard(); }
    else {

        var viewData = data['dt'];
        console.log(viewData)
    }



    if (data == null) {
        return <div className="data"><Header /><div>Loding...</div></div>
    } else if (data['dt'].length == 0) {
        return <div className="data"><Header /><div>No data found !</div></div>
    }
    const dataCard = (data) => {
        return <button className="div-card" onClick={() => loadViewer(data.file, data.file_type, data.remark, data.lat, data.long)}>
            <div>
                <div className="cell">
                    {data.file_type == 0 ? <img src={FILE_PATH + data.file} width='60px' height='60px' /> : <img src={require("../../assets/video.png")} width='60px' height='60px' />}
                </div>
                <div className="cell">{data.lat + '  |  ' + data.long}</div>
                <div className="cell">{data.remark}</div>
            </div>
        </button>
    }
    const loadViewer = (file, file_type, remark, lat, long) => {

        navigate('/viewer', { state: { sta: sta, lga: lga, ward: ward, pu: pu, file: file, file_type: file_type, remark: remark, lat: lat, long: long } });

    }

    return (

        <div className="data">
            <Header />

            <div className="div-topic"><IconButton sx={{marginRight:"8px"}} onClick={() => navigate(-1)} aria-label="back">
                <ArrowBackIcon /></IconButton>{sta} {' > '} {lga} {' > '} {ward} {' > '} {pu}</div>
            <div className="div-label"><div><div className="cell-label">File</div><div className="cell-label">Location</div> <div className="cell-label">Remark</div></div></div>
            <div >
                {viewData.map(data => dataCard(data))}
            </div>
        </div>


    );


}



export default withAuthenticator(DataList);