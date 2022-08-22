import Header from "../../compononts/header";
import DoneIcon from '@mui/icons-material/Done';
import "./about.css"

function About() {
    return (
        <div className="about">
            <Header />
            <div className="banner"><img src={require("../../assets/about.png")} alt="About" /></div>
            <div className="gird">
                <div class="cellContainer">
                    <div className="aboutus-title">ABOUT US</div>
                    <div className="aboutus-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem.</div>
                </div>
                <div class="cellContainer"  style={{marginTop:'100px'}}>
                    <div className="cellContainer">
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                    </div>
                    <div className="cellContainer">
                    <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                        <div className="list">
                            <DoneIcon sx={{ color: "blue" }} />  
                            <div className="list-title">This is sample text</div>
                        </div>
                    </div>
                </div>

            </div>


        </div>

    );
}



export default About;