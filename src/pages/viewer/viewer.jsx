import { withAuthenticator } from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Map from "./map";
import Header from "../../compononts/header";
import Viewer from 'react-viewer';
import * as React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useNavigate } from "react-router-dom";

import "./viewer.css"
import { API_URL, FILE_PATH } from "../../config";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DataViewer() {
    const [visible, setVisible] = React.useState(false);
    const navigate = useNavigate();
    const [ml, setML] = React.useState(null);

    const location = useLocation()
    const { sta, lga, ward, pu, file, file_type, lat, long, remark } = location.state;


    const getMLRemark = (url) => {

        axios
            .get(API_URL + "mlPredict?" + "url=" + url)
            .then((response) => {
                var mlData = response.data

                setML({ mlData });

            });
    }



    if (ml == null) { getMLRemark(FILE_PATH + file) }


    return (
        <div className="dataviewer">
            <Header />
            <div className="div-back"><IconButton onClick={() => navigate(-1)} aria-label="back">
                <ArrowBackIcon />
            </IconButton></div>
            <div className="row-1">
                <div className="div-map">
                    <Map center={{ lat: lat, lng: long }} />
                </div>

                <div className="div-image">
                    {
                        file_type == 0 ?
                            (!visible ?
                                <img onClick={() => { setVisible(true); }} src={FILE_PATH + file} height='390px' alt="uploaded" />
                                : null)
                            :
                            <ReactPlayer controls={true} url={FILE_PATH + file} />
                    }
                    <Viewer
                        onClose={() => { setVisible(false); }}
                        visible={visible}
                        images={[{ src: FILE_PATH + file, alt: '' }]}
                    />
                </div>
            </div>
            <div className="row-2">
                <div className="div-remark">
                    <div className="div-text">
                        <p className="head-text">Addional Remark</p>
                        <p className="remark-text">{remark}</p>
                    </div>
                </div>
                <div className="div-remark">
                    {file_type == 0 ? <div className="div-text" >
                        <p className="head-text">ML Remark</p>
                        <p className="remark-text">{ml != null ? Object.keys(ml['mlData']) : 'Loading...'}</p>
                        <p className="remark-text">{ml != null ? ml['mlData'][Object.keys(ml['mlData'])] : null}</p>
                    </div> :
                        <div className="div-text" >
                            <p className="head-text">ML Remark</p>
                            <p style={{ color: 'red' }}>Ml Remark not provide for video !</p>

                        </div>}
                </div>
            </div>
        </div>


    );


}



export default withAuthenticator(DataViewer);