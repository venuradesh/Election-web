

import Lottie from "react-lottie";
import Header from "../../compononts/header";
import animationData from '../../assets/election';
import { useNavigate } from 'react-router-dom';
import './home.css'

function Home() {
   const navigate = useNavigate();
   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
         preserveAspectRatio: 'xMidYMid slice'
      }
   };
   return (

      <div className="home"> <Header isHome={true} />

         <div className="gird">
            <div class="cellContainer">
               <div className="name" >ELECTION</div>
               <div className="sologon" >This is sologon</div>
               <div className="login" ><button className="btn" onClick={()=>navigate('/login')}>Sign In </button ></div>
            </div>
            <div class="cellContainer">
               <div ><Lottie options={defaultOptions}
                  height={300}
                  width={400}
               /></div>
            </div>

         </div>
      </div>

   );
}


export default Home;