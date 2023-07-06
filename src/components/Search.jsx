import React from "react";
import { useState,useEffect } from "react";
import { Box,Paper,Grid,CardMedia,Button, Typography,TextField } from "@mui/material";
import side from '../images/aa.png'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import usePagination from "./Pagination";
import { CheckBox } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import logo from '../images/logohalfx.webp'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};
const Search =()=>{
    // const array=[1,2,3,4,5,6,7,8]
    const [openpop, setOpenpop] = useState(false);
    const[data,setData]=useState([])
    const[serachData,setsearchData]=useState([])
    const[paginatedData,setpaginatedData]=useState([])
    const [search,setSearch]=useState('')
    const[page,setPage]=useState(1)

    // const [isBottomReached, setIsBottomReached] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;
  //     const scrollPosition = window.scrollY || window.pageYOffset;

  //     if (scrollPosition + windowHeight+0.5 >= documentHeight) {
  //       setPage(page+1);
  //     } 
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [page]);

  // const [checkboxes, setCheckboxes] = useState({
  //   designation: false,
  //   technology: false,
  //   work_ex: false,
  //   current_organization:false
  //   // Add more checkboxes as needed
  // });

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setCheckboxes(prevCheckboxes => ({
  //     ...prevCheckboxes,
  //     [name]: checked
  //   }));
  // };
  const _DATA = usePagination(serachData, 20);
    const handleChange=(e)=>{
      setSearch(e.target.value)
    }
    const handleChangeP = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };
    function filterData() {
      const filteredResults = serachData.filter((item) => { return item.firstname.includes(search)});
      console.log(filteredResults,"rrrr")
      setData(filteredResults);
    }

    useEffect(()=>{
      filterData()
      if(search==''){
        setData(paginatedData)
      }
       
    },[search])

    useEffect(()=>{
      const sendData = {
        gender:"male"
       };
       axios
       .post(
         `http://localhost:5000/alumni/search`,
         JSON.stringify(sendData),
         options
       ).then((res)=>{
         console.log(res,"data")
        //  setData(res.data)
         setsearchData(res.data)
       })
    },[])
    useEffect(()=>{
      const sendData = {
       gender:"male"
      };
      axios
      .post(
        `http://localhost:5000/alumni/get_alumni?page=${page}&pageSize=20`,
        JSON.stringify(sendData),
        options
      ).then((res)=>{
        console.log(res,"data")
        setData(res.data)
        setpaginatedData(res.data)
        // setsearchData(res.data)
      })
    },[page])
    console.log(page)
    const handleClickOpen = () => {
        setOpenpop(true);
    };
  
    const handleClose = () => {
        setOpenpop(false);
    };
const designation=[
"Full Stack Developer",
"NA",
"Business Analyst",
"Accountant",
"Vice President",
"Software developer",
"CONSULTANT",
"Software Test Engineer"
]
const Organization=[
  "INSAID",
  "On a sabatical",
  "Wipro"
]
const Technology=[
  "All",
  "EXCEL",
  "Sql",
  "Tally ERP 9.0",
  "Automation"
]
const Exp=[
16,5,3,4,6
]
const fetchData=(params)=>{
  const queryString = Object.keys(params)
  .map(key => key + '=' + encodeURIComponent(params[key]))
  .join('&');
  axios
  .post(
    `http://localhost:5000/alumni/filter?designation=${queryString}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    console.log(res,"datafilter")
    setData(res.data)
    setpaginatedData(res.data)
    // setsearchData(res.data)
  })
}
const Apply=(params)=>{
  document.getElementById('pagi').style.display="none"
  // const selectedParams = Object.keys(checkboxes)
  // .filter(key => checkboxes[key])
  // .reduce((params, key) => {
  //   params[key] = checkboxes[key];
  //   return params;
  // }, {});
  // fetchData(selectedParams);
  if(designationvalue&&organization==''&&techval==''&&exp==''){
    axios
  .post(
    `http://localhost:5000/alumni/filter?designation=${designationvalue}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    console.log(res,"datafilter")
    setData(res.data)
    setpaginatedData(res.data)
    // setsearchData(res.data)
  })
  }
  if(organization&&designationvalue==''&&techval==''&&exp==''){
    axios
  .post(
    `http://localhost:5000/alumni/filter?current_organization=${organization}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    console.log(res,"datafilter")
    setData(res.data)
    setpaginatedData(res.data)
    // setsearchData(res.data)
  })
  }
  if(techval&&designationvalue==''&&organization==''&&exp==''){
    axios
  .post(
    `http://localhost:5000/alumni/filter?technology=${techval}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    console.log(res,"datafilter")
    setData(res.data)
    setpaginatedData(res.data)
    // setsearchData(res.data)
  })
  }
  if(exp&&designationvalue==''&&organization==''&&techval==''){
    axios
  .post(
    `http://localhost:5000/alumni/filter?work_ex=${exp}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    console.log(res,"datafilter")
    setData(res.data)
    setpaginatedData(res.data)
    // setsearchData(res.data)
  })
  }
  if(designationvalue&&organization&&techval==''&&exp==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?designation=${designationvalue}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(designationvalue&&techval&&organization==''&&exp==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?designation=${designationvalue}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(designationvalue&&exp&&techval==''&&organization==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?designation=${designationvalue}&work_ex=${exp}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(techval&&exp&&designationvalue==''&&organization==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?technology=${techval}&work_ex=${exp}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(techval&&organization&&designationvalue==''&&exp==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?technology=${techval}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(exp&&organization&&designationvalue==''&&techval==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?work_ex=${exp}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  
  if(designationvalue&&organization&&techval&&exp==''){
    axios
    .post(
      `http://localhost:5000/alumni/filter?designation=${designationvalue}&current_organization=${organization}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(designationvalue==''&&organization&&techval&&exp){
    axios
    .post(
      `http://localhost:5000/alumni/filter?work_ex=${exp}&current_organization=${organization}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(designationvalue&&organization==''&&techval&&exp){
    axios
    .post(
      `http://localhost:5000/alumni/filter?work_ex=${exp}&designation=${designationvalue}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(designationvalue&&organization&&techval==''&&exp){
    axios
    .post(
      `http://localhost:5000/alumni/filter?work_ex=${exp}&designation=${designationvalue}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  if(designationvalue&&organization&&techval&&exp){
    axios
    .post(
      `http://localhost:5000/alumni/filter?designation=${designationvalue}&current_organization=${organization}&technology=${techval}&work_ex=${exp}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      console.log(res,"datafilter")
      setData(res.data)
      setpaginatedData(res.data)
      // setsearchData(res.data)
    })
  }
  
}
    const count = Math.ceil(serachData.length / 20)
    const [open, setOpen] = useState(false);
    const [openorg, setOpenorg] = useState(false);
    const [opentech, setOpentech] = useState(false);
    const [openexp, setOpenexp] = useState(false);
    const [openloc, setOpenloc] = useState(false);
    const [designationvalue, setDesignation] = useState('');
    const [organization, setOrganization] = useState('');
    const [techval, setTech] = useState('');
    const [exp, setExp] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);
    const [checkboxesorg, setCheckboxesorg] = useState([]);
    const [checkboxestech, setCheckboxestech] = useState([]);
    const [checkboxeswork, setCheckboxeswork] = useState([]);

    const handleClick = () => {
      // setCheckboxes([]);
      setOpen(!open);
    };
    const handleClickOrg = () => {
      setOpenorg(!openorg);
    };
    const handleClickTech = () => {
      setOpentech(!opentech);
    };
    const handleClickExp = () => {
      setOpenexp(!openexp);
    };
    const handleClickLoc = () => {
      setOpenloc(!openloc);
    };

    const handleCheckDesignation=(e,i)=>{
      console.log(e,"ppp")
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[i] = !updatedCheckboxes[i];
      setCheckboxes(updatedCheckboxes);
      setDesignation('')
      if(e.target.checked){
        // setIsChecked(true)
       
        setDesignation(e.target.value)
      }
    }
    console.log(designationvalue,checkboxes,"checkbox")
    const handleCheckOrg=(e,i)=>{
      const updatedCheckboxes = [...checkboxesorg];
      updatedCheckboxes[i] = !updatedCheckboxes[i];
      setCheckboxesorg(updatedCheckboxes);
      setOrganization('')
      console.log(e,"ppp")
      if(e.target.checked){
        setOrganization(e.target.value)
      }
    }
    const handleCheckTech=(e,i)=>{
      const updatedCheckboxes = [...checkboxestech];
      updatedCheckboxes[i] = !updatedCheckboxes[i];
      setCheckboxestech(updatedCheckboxes);
      setTech('')
      console.log(e,"ppp")
      if(e.target.checked){
        setTech(e.target.value)
      }
    }
    const handleCheckExp=(e,i)=>{
      const updatedCheckboxes = [...checkboxeswork];
      updatedCheckboxes[i] = !updatedCheckboxes[i];
      setCheckboxeswork(updatedCheckboxes);
      setExp('')
      console.log(e,"ppp")
      if(e.target.checked){
        setExp(e.target.value)
      }
    }
    const Reset=()=>{
      document.getElementById('pagi').style.display="block"
      setCheckboxes([])
      setCheckboxesorg([])
      setCheckboxestech([])
      setCheckboxeswork([])
      const sendData = {
        gender:"male"
       };
       axios
       .post(
         `http://localhost:5000/alumni/get_alumni?page=${page}&pageSize=20`,
         JSON.stringify(sendData),
         options
       ).then((res)=>{
         console.log(res,"data")
         setData(res.data)
         setpaginatedData(res.data)
         // setsearchData(res.data)
       })

    }
    console.log(search,"lll")
    return(
        <>
        <Box sx={{background:"#eff1f2",height:"auto",width:"100%",pt:15}}>
            <Box sx={{display:"flex",justifyContent:"center",placeContent:"center"}}>
                <Paper elevation={3} sx={{borderRadius:"4px",p:2}}>
                    <Box sx={{position:"absolute",ml:76,mt:-2}}>
                        <img style={{position:"absolute",height:100,width:150}} src={side} alt="side"/>
                    </Box>
                <Typography sx={{mt:1.5,fontWeight:'bold',textAlign:"left",ml:2}}>People</Typography>
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
                <Box sx={{display:"flex"}}><Typography sx={{mt:2,fontWeight:'bold',textAlign:"left",ml:2}}>{serachData.length}</Typography><Typography sx={{mt:2,ml:1}}>Insaidians</Typography></Box>
                
                <Box sx={{
                    background: "#00bfa9",
                    //  ml:2,
                    height: "2px",
                    width: "20px",
                    margin: "8px 20px",
                    mb:1
                }}></Box>
                <Box sx={{display:"flex",justifyContent:"space-between",mt:2,mb:2}}>
                  <Box>
                  <ListItemButton onClick={handleClick}>
        
        <ListItemText>
        <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Designation</Typography>
        </ListItemText>
        {open ? <ExpandLess sx={{color:"#00bfa9"}} /> : <ExpandMore sx={{color:"#00bfa9"}} />}

      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card sx={{display:"flex",justifyContent:"center",alignItems:"center",position:"absolute",zIndex:1}}>
        <List component="div" disablePadding>
        {designation.map((val,i)=>(
          <ListItemButton sx={{ height:30}}>
          <Checkbox name="designation" checked={checkboxes[i] || false} value={val} onChange={(event)=>handleCheckDesignation(event,i)} size="small"/>
         <Typography sx={{fontSize:"13px"}}>{val}</Typography>
        </ListItemButton>
        ))}
          
          
        </List>
        </Card>
       
      </Collapse>
                  </Box>
                
<Box>
<ListItemButton onClick={handleClickOrg}>
        
        <ListItemText>
        <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Organization</Typography>
        </ListItemText>
        {openorg ? <ExpandLess sx={{color:"#00bfa9"}} /> : <ExpandMore sx={{color:"#00bfa9"}} />}
      </ListItemButton>
      <Collapse in={openorg} timeout="auto" unmountOnExit>
        <Card sx={{position:"absolute",zIndex:1}}>
        <List component="div" disablePadding>
        {Organization.map((val,i)=>(
          <ListItemButton sx={{height:30 }}>
          <Checkbox name="organization" checked={checkboxesorg[i] || false} value={val} onChange={(e)=>handleCheckOrg(e,i)} size="small"/>
         <Typography sx={{fontSize:"13px"}}>{val}</Typography>
        </ListItemButton>
        ))}
        </List>
        </Card>
       
      </Collapse>

</Box>

<Box>
<ListItemButton onClick={handleClickTech}>
        
        <ListItemText>
        <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Technology</Typography>
        </ListItemText>
        {opentech ? <ExpandLess sx={{color:"#00bfa9"}} /> : <ExpandMore sx={{color:"#00bfa9"}} />}
      </ListItemButton>
      <Collapse in={opentech} timeout="auto" unmountOnExit>
        <Card sx={{position:"absolute",zIndex:1}}>
        <List component="div" disablePadding>
        {Technology.map((val,i)=>(
          <ListItemButton sx={{height:30 }}>
          <Checkbox name="technology" checked={checkboxestech[i] || false} value={val} onChange={(e)=>handleCheckTech(e,i)} size="small"/>
         <Typography sx={{fontSize:"13px"}}>{val}</Typography>
        </ListItemButton>
        ))}
        </List>
        </Card>
       
      </Collapse>
</Box>
           <Box>
           <ListItemButton onClick={handleClickExp}>
        
        <ListItemText>
        <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Experince</Typography>
        </ListItemText>
        {openexp ? <ExpandLess sx={{color:"#00bfa9"}} /> : <ExpandMore sx={{color:"#00bfa9"}} />}
      </ListItemButton>
      <Collapse in={openexp} timeout="auto" unmountOnExit>
        <Card sx={{position:"absolute",zIndex:1}}>
        <List component="div" disablePadding>
        {Exp.map((val,i)=>(
          <ListItemButton sx={{ height:30}}>
          <Checkbox  name="work_ex" checked={checkboxeswork[i] || false} value={val} onChange={(e)=>handleCheckExp(e,i)} size="small"/>
         <Typography sx={{fontSize:"13px"}}>{val}</Typography>
        </ListItemButton>
        ))}
        </List>
        </Card>
       
      </Collapse>
           </Box>
     {/* <Box>
     <ListItemButton onClick={handleClickLoc}>
        
        <ListItemText>
        <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Location</Typography>
        </ListItemText>
        {openloc ? <ExpandLess sx={{color:"#00bfa9"}} /> : <ExpandMore sx={{color:"#00bfa9"}} />}
      </ListItemButton>
      <Collapse in={openloc} timeout="auto" unmountOnExit>
        <Card>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Checkbox size="small"/>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
        </Card>
       
      </Collapse>
     </Box> */}
     <Box sx={{display:"flex",justifyContent:"space-between"}}>
     <Box>
      <Button sx={{textTransform:"none",background:"#00bfa9",mt:1,"&:hover":{color:"#fff",background:"#00c4b5"}}} onClick={Apply} variant="contained" size="small">
        Apply Filters
      </Button>
     </Box>
     <Box>
      <Button sx={{textTransform:"none",background:"#00bfa9",mt:1,ml:1,"&:hover":{color:"#fff",background:"#00c4b5"}}} onClick={Reset} variant="contained" size="small">
        Reset Filters
      </Button>
     </Box>
     </Box>
    
      
                
                {/* <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Organization</Typography>
                <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Technology</Typography>
                <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Experince</Typography>
                <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Location</Typography> */}
                </Box>
                <TextField onChange={handleChange} placeholder="Search" fullWidth type="search" size="small" sx={{width:725,mb:2,ml:1}}></TextField>
                

                {/* <Box sx={{mb:2,mt:2}}>

                </Box> */}
                {data.map((val)=>(
                    <Box sx={{padding:"10px 0px",display:"flex"}}>
                    <Box sx={{ml:2}}>
                        <a style={{
                            position: "relative",
                            display:" inline-block",
                            verticalAlign: "middle"
                        }} href="#">
                            <img src={`https://www.insaid.co/wp-content/uploads/profile/${val.filename}`}
                            style={{
                                height: "56px",
                                width: "56px",
                                display: "block",
                                borderRadius: "28px"
                            }}
                            ></img>
                        </a>
                    </Box>
                    <Box sx={{ml:3,width:500}}>
                    <Box sx={{display:"flex"}}><Typography sx={{fontWeight:'bold',textAlign:"left"}}>{val.firstname+" "+val.lastname}</Typography><Typography sx={{ml:1,fontSize:"11px",fontWeight:"bold",mt:0.5,color:"#b6c2d2",width:300,textAlign:"left"}}>{val.qualification}</Typography></Box>
                    <Box>
                        <Typography sx={{color:"#7d8a9c",fontSize:"13px",fontWeight:"bold",textAlign:"left",width:400}}>{val.designation} at {val.current_organization} | {val.university}</Typography>
                    </Box>
                    </Box>
                    <Box sx={{width:150}}>
                    <Button onClick={handleClickOpen}  variant="contained" size="small"  sx={{color:"#fff",background:"#00c4b5",fotnSize:"10px",textTransform:"none","&:hover":{color:"#fff",background:"#00c4b5"}}}>
                  Connect
                </Button>
                    </Box>
                    
                    </Box>
                ))}
                <Box sx={{mt:2,mb:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Pagination
                id="pagi"
        count={count}
        size="large"
        page={page}
        // variant="outlined"
        // shape="rounded"
        onChange={handleChangeP}
      />
                </Box>
                
                </Paper>
            </Box>


            


        </Box>
        <Dialog
        open={openpop}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <Box sx={{p:1,display:"grid",placeItems:"center"}}>
          
          <img src={logo} alt="logo" width={150} /> 
         </Box>
          <Typography sx={{fontWeight:"bold"}}>Alumni Details</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <Typography sx={{fontWeight:"bold",mb:1}}>Connect with</Typography>
           <Box >
            <Box sx={{display:"flex"}}>
            <img style={{borderRadius:"3px"}} src={"https://www.insaid.co/wp-content/uploads/profile/19201.png"} alt="logo" width={100} /> 
            <Box>
            <Typography sx={{fontWeight:"bold",fontSize:"17px",ml:2,mb:1}}>
           <i>Jitumoni Sharma</i> | Full Stack Developer at INSAID
           </Typography>
           <Typography sx={{ml:2}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis nesciunt reiciendis amet atque illum ut totam aliquid similique               </Typography>
            </Box>
          
          
            </Box>
          
           
           </Box>
          
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions> */}
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",mb:3}}>
            <Button variant="contained" onClick={handleClose}> <LinkedInIcon sx={{mr:1}}/> Connect with Linkedin</Button>
            </Box>
         
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        {/* </DialogActions> */}
      </Dialog>
        </>
    )
}
export default Search