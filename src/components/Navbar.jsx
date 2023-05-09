import React from "react";
import { Box,Paper,Grid,CardMedia,Button } from "@mui/material";
// import CardMedia from "@mui/material";
// import XLRI_LOGO from '../images/xlri.png'
// import iit from '../images/EICTIITG.webp'
import logo from '../images/logohalfx.webp'
import AppBar from "@mui/material/AppBar";
// import { useNavigate } from "react-router-dom";
const Navbar=()=>{
//   const navigate=useNavigate()
//   const handleLogout = () => {
//     localStorage.removeItem("user_id");
//     localStorage.removeItem("email");
//     localStorage.clear();
//     navigate("/login");
//   };
    return(
        <>
        <AppBar
        
        position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0 0 2px 0 rgb(0 0 0 / 50%)",
          position: "fixed",
          zIndex: "99",
          height: "75px",
          display: { xs: "none", lg: "block" },
        }}
        >


        
        {/* <Box sx={{background:"#fff",height:70}}> */}
          {/* <Box sx={{display:"flex"}}> */}
          <Box sx={{display:"flex",ml:6.8,justifyContent:"space-between"}}>
              {/* <Box sx={{p:1}}>
               <img src={iit} alt="logo" width={50} /> 
             
              </Box> */}
              
              
           
            {/* <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",ml:1}}>
            <hr style={{
                transform:"rotate(180deg)",
                 height: "55px",
               
                 border:"none",
                 background:"#000",
                 width:"1px",
               
                

            }} />
            </Box> */}
           <Box sx={{p:1}}>
          
            <img src={logo} alt="logo" width={160} /> 
           </Box>
           <Box sx={{mr:4,display:"flex",justifyContent:"center",placeItems:"center"}} >
            <Button  variant="contained" size="small"  sx={{color:"#fff",background:"#00c4b5",textTransform:"none","&:hover":{color:"#fff",background:"#00c4b5"}}}>
              Logout
            </Button>
            </Box>
            </Box>
           
            
          {/* </Box> */}
           
        {/* </Box> */}
        </AppBar>
        </>
    )
}
export default Navbar