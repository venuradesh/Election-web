import { withAuthenticator } from "@aws-amplify/ui-react";
import Header from "../../compononts/header";
import "./results.css"

function Results() {
    return (
        <div className="results">
            <Header />
           


        </div>

    );
}



export default withAuthenticator  (Results);