import React from "react";
import { Box,Paper,Grid,CardMedia,Button, Typography,TextField } from "@mui/material";
import side from '../images/aa.png'

const Search =()=>{
    const array=[1,2,3,4,5,6,7,8]
    return(
        <>
        <Box sx={{background:"#eff1f2",height:"auto",width:"100%",pt:15}}>
            <Box sx={{display:"flex",justifyContent:"center",placeContent:"center"}}>
                <Paper elevation={3} sx={{borderRadius:"4px",p:2}}>
                    <Box sx={{position:"absolute",ml:53,mt:-2}}>
                        <img style={{position:"absolute",height:100,width:150}} src={side} alt="side"/>
                    </Box>
                <Typography sx={{mt:1.5,fontWeight:'bold',textAlign:"left"}}>People</Typography>
                {/* <Box sx={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    opacity: 0.15
                }}>
                <Box sx={{
                    // pt:30,
                    background: "#fcd900",
                    width: "61.3px",
                    height: "61.3px",
                    borderRadius: "30px",
                    position: "absolute",
                    top: "20px",
                    right: "0px"
                }}>

                </Box>
                </Box> */}
                <Box sx={{display:"flex"}}><Typography sx={{mt:2,fontWeight:'bold',textAlign:"left"}}>1000</Typography><Typography sx={{mt:2,ml:1}}>Insaidians</Typography></Box>
                <Box sx={{
                    background: "#00bfa9",
                    height: "2px",
                    width: "20px",
                    margin: "8px 0px",
                    mb:1
                }}></Box>
                <TextField placeholder="Search" fullWidth type="search" size="small" sx={{width:570,mb:2}}></TextField>
                

                {/* <Box sx={{mb:2,mt:2}}>

                </Box> */}
                {array.map((val)=>(
                    <Box sx={{padding:"10px 0px",display:"flex"}}>
                    <Box>
                        <a style={{
                            position: "relative",
                            display:" inline-block",
                            verticalAlign: "middle"
                        }} href="#">
                            <img src="https://d3sr7cc30ek8f4.cloudfront.net/images/size:100x100/type:crop/prod/610a21a648eb04001656a531/JitumoniSharma.JPG"
                            style={{
                                height: "56px",
                                width: "56px",
                                display: "block",
                                borderRadius: "28px"
                            }}
                            ></img>
                        </a>
                    </Box>
                    <Box sx={{ml:3}}>
                    <Box sx={{display:"flex"}}><Typography sx={{fontWeight:'bold',textAlign:"left"}}>Jitumoni Sharma </Typography><Typography sx={{ml:1,fontSize:"11px",fontWeight:"bold",mt:0.5,color:"#b6c2d2"}}>PGDM-FT'22</Typography></Box>
                    <Box>
                        <Typography sx={{color:"#7d8a9c",fontSize:"13px",fontWeight:"bold",textAlign:"left"}}>Management Trainee at Wipro | PGDM IMI-K (2021-23)</Typography>
                    </Box>
                    </Box>
                    <Box sx={{ml:10}}>
                    <Button  variant="contained" size="small"  sx={{color:"#fff",background:"#00c4b5",textTransform:"none","&:hover":{color:"#fff",background:"#00c4b5"}}}>
                  Connect
                </Button>
                    </Box>
                    
                    </Box>
                ))}
                
                </Paper>
            </Box>

        </Box>
        </>
    )
}
export default Search