import Header from "../../compononts/header";

import "./contact.css"

function Contact() {
    return (
        <div className="contact">
            <Header />

            <div className="gird">
                <div class="cellContainer-one">
                    <div className="head-text">Let's talk about</div>
                    <div className="head-text">everything!</div>
                    <div className="detail-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />Voluptas debitis, fugit natus?</div>
                    <div className="image">
                        <img src={require("../../assets/contact.png")} alt="Contact" width={400} />
                    </div>
                </div>
                <div class="cellContainer-two" >
                    <form>
                        <div className="input-text"><input type="text" placeholder="Your Name" require /></div>
                        <div className="input-text"><input type="email" placeholder="Email"  require/></div>
                        <div className="input-text"><input type="text" placeholder="Subject" require/></div>
                        <div className="input-text"><textarea placeholder="Write your message" require></textarea></div>
                        <div className="div-btn"><button className="btn-submit">Send Message</button></div>
                    </form>

                </div>

            </div>


        </div>

    );
}

export default Contact;