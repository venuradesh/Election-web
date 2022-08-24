import Header from "../../compononts/header";
import Image from "../../assets/buildings.png";

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
            <div className="head-text">Let's talk about</div>
            <div className="head-text">everything!</div>
            <div className="detail-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              <br />
              Voluptas debitis, fugit natus?
            </div>
            <Box className="image" sx={{ width: 350 }}>
              <img className={classes.image} src={require("../../assets/contact.png")} alt="Contact" width={400} />
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
});
