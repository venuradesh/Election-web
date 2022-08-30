import Header from "../../compononts/header";
import Image from "../../assets/buildings.png";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Twitter from "../../assets/twitter.png";

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import "./contact.css";

function Contact() {
  const classes = useStyles();
  return (
    <>
      <Box sx={{ zIndex: 0, position: "absolute", bottom: 0, left: 0, width: "100%", height: 300, backgroundImage: `url(${Image})`, backgroundSize: "contain", backgroundPosition: "center", opacity: 0.3 }}></Box>
      <Box className="contact" display="flex" alignItems="center" justifyContent={"center"} sx={{ width: "100vw" }}>
        <Header />

        <Box className={classes.container} sx={{ boxShadow: 3 }}>
          <Box class="cellContainer-one">
            <Box className="head-text" sx={{ fontSize: 24 }}>
              Let's talk about
            </Box>
            <Box className="head-text" sx={{ fontSize: 20 }}>
              everything!
            </Box>
            <div className="detail-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              <br />
              Voluptas debitis, fugit natus?
            </div>

            <Box className={classes.socialMediaContainer}>
              <Box className={classes.socialMedia}>
                <img src={Facebook} alt="facebook" className={classes.socialIcon} />
              </Box>
              <Box className={classes.socialMedia}>
                <img src={Instagram} alt="instagram" className={classes.socialIcon} />
              </Box>
              <Box className={classes.socialMedia}>
                <img src={Twitter} alt="twitter" className={classes.socialIcon} />
              </Box>
            </Box>
          </Box>
          <Box className={classes.itemsSplitter}></Box>
          <Box class={`cellContainer-two `}>
            <form>
              <div className="input-text">
                <input type="text" placeholder="Your Name" require />
              </div>
              <div className="input-text">
                <input type="email" placeholder="Email" require />
              </div>
              <div className="input-text">
                <input type="text" placeholder="Subject" require />
              </div>
              <div className="input-text">
                <textarea placeholder="Write your message" require></textarea>
              </div>
              <div className="div-btn">
                <button className="btn-submit">Send Message</button>
              </div>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Contact;

const useStyles = makeStyles({
  container: {
    marginTop: 30,
    width: 850,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 35,
    padding: 30,
    zIndex: 10,
    borderRadius: 12,
  },

  itemsSplitter: {
    width: 2,
    height: 450,
    backgroundColor: "#f3f3f3",
  },

  image: {
    width: "100%",
  },

  socialMediaContainer: {
    marginTop: 30,
    width: 150,
    height: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  socialMedia: {
    cursor: "pointer",
  },

  socialIcon: {
    width: 30,
    height: 30,
  },
});
