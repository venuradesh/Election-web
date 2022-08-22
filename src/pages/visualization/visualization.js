import { withAuthenticator } from "@aws-amplify/ui-react";
import Header from "../../compononts/header";
import "./visualization.css"

function Visualization() {
    return (
        <div className="about">
            <Header />
            


        </div>

    );
}



export default withAuthenticator (Visualization);