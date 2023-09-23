import React from "react";
import { useState,useEffect } from "react";
import { Box,Paper,Grid,CardMedia,Button, Typography,TextField,Autocomplete } from "@mui/material";
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
import './Home.css'
import usePagination from "./Pagination";
import { CheckBox } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import logo from '../images/logohalfx.webp'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dp from '../images/neutral_dp.jpg'
import GitHubIcon from '@mui/icons-material/GitHub';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { ToastContainer, toast } from "react-toastify";
import Page404 from "./Page404";
import "react-toastify/dist/ReactToastify.css";
const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};
const Home =()=>{
    // const array=[1,2,3,4,5,6,7,8]
    const [openpop, setOpenpop] = useState(false);
    const [openmessage, setOpenmessage] = useState(false);
    const[data,setData]=useState([])
    const[serachData,setsearchData]=useState([])
    const[paginatedData,setpaginatedData]=useState([])
    const [search,setSearch]=useState('')
    const[page,setPage]=useState(1)
    const[name,setName]=useState('')
    const[company,setCompany]=useState('')
    const[email,setEmail]=useState('')
    const[message,setMessage]=useState('')
    const count = Math.ceil(data.length / 20)
    const [open, setOpen] = useState(false);
    const [openorg, setOpenorg] = useState(false);
    const [opentech, setOpentech] = useState(false);
    const [openexp, setOpenexp] = useState(false);
    const [openloc, setOpenloc] = useState(false);
    const [designationvalue, setDesignation] = useState('');
    const [organization, setOrganization] = useState('');
    const [techval, setTech] = useState('');
    const [exp, setExp] = useState('');
    const[image,setImage]=useState('')
    const[linkedin,setLinkedin]=useState('')
    const[github,setGithub]=useState('')
    const[alumEmail,setAlumemail]=useState('')
    const[reset,setReset]=useState(true)
    const[btn,setbtn]=useState(true)
    const[subbtn,setsubbtn]=useState(true)
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);
    const [checkboxesorg, setCheckboxesorg] = useState([]);
    const [checkboxestech, setCheckboxestech] = useState([]);
    const [checkboxeswork, setCheckboxeswork] = useState([]);



    useEffect(() => {
      // Get the current URL
      const currentUrl = window.location.href;
  
      // Split the URL by '/' to get the last part after 'com/'
      const parts = currentUrl.split('/');
      const base64String = parts[parts.length - 1];
      console.log(base64String)
      // Decode the base64 string
      try {
        const decodedString = atob(base64String);
        console.log('Decoded String:', decodedString);
        const sendData = {
          user_id:parseInt(decodedString)
         };
         axios
         .post(
           `https://faculty-preobarding.de.r.appspot.com/alumni/validate`,
           JSON.stringify(sendData),
           options
         ).then((res)=>{
          if(res.data.message=='data not found'){
            setsubbtn(false)
          } 
          else{
           
            setEmail(res.data[0].email)
            setsubbtn(true)
          }
         })
      } catch (error) {
        console.error('Error decoding base64 string:', error);
      }
    }, []);

useEffect(()=>{
if(message){
  setbtn(false)
}
else{
  setbtn(true)
}
},[message])


    const [openLoader, setOpenloader] = useState(false);
  const handleCloseLoader = () => {
    setOpenloader(false);
  };
  const handleOpenLoader = () => {
    setOpenloader(true);
  };
// useEffect(()=>{
//   if(email&&message){
//     setsubbtn(false)
//   }
//   else{
//     setsubbtn(false)
//   }
// },[email,message])
  
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
  // console.log(serachData,"dtttt")
  const _DATA = usePagination(data, 20);
    const handleChange=(e)=>{
      setSearch(e.target.value)
    }
    const handleChangeP = (e, p) => {
      // console.log(p,"pppp")
      setPage(p);
      _DATA.jump(p);
    };
    // function filterData() {
    //   const filteredResults = serachData.filter((item) => { return item.firstname.includes(search)});
    //   // console.log(filteredResults,"rrrr")
    //   setData(filteredResults);
    // }

    // useEffect(()=>{
    //   filterData()
    //   if(search==''){
    //     setData(paginatedData)
    //   }
       
    // },[search])

    const serachFun=()=>{
      const sendData = {
        gender:"male"
       };
       axios
       .post(
         `https://faculty-preobarding.de.r.appspot.com/alumni/search`,
         JSON.stringify(sendData),
         options
       ).then((res)=>{
        //  console.log(res,"data")
        //  setData(res.data)
         setsearchData(res.data.length)
         const sendData2 = {
          gender:"male"
         };
         axios
         .post(
           `https://faculty-preobarding.de.r.appspot.com/alumni/get_alumni?page=${1}&pageSize=20`,
           JSON.stringify(sendData2),
           options
         ).then((res)=>{
          
           handleCloseLoader()
          //  console.log(res,"data")
           setData(res.data)
           // setpaginatedData(res.data)
           // setsearchData(res.data)
         })
       })
    }
    // useEffect(()=>{
    //   serachFun()
    // },[reset])
    useEffect(()=>{
        handleOpenLoader()
        serachFun()
    },[page])
    
    const handleClickOpen = (n,c,i,l,g,e) => {
        setOpenpop(true);
        setName(n)
        setCompany(c)
        setImage(i)
        setLinkedin(l)
        setGithub(g)
        setAlumemail(e)
    };
  
    const handleClose = () => {
        setOpenpop(false);
    };
    const handleClickOpenMess = () => {
      handleClose()
        setOpenmessage(true);
    };
  
    const handleCloseMess = () => {
        setOpenmessage(false);
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
// const Organization=[
//   "INSAID",
//   "On a sabatical",
//   "Wipro"
// ]
const[Organization,setOrganizationsel]=useState(
  [
    "INSAID",
    "On a sabatical",
    "Wipro"
  ]
)
// console.log()
const Technology=[
  "All",
  "EXCEL",
  "Sql",
  "Tally ERP 9.0",
  "Automation"
]
const Exp=[
1,2,3,4,5,6,7,8,9,10
]
// const fetchData=(params)=>{
//   const queryString = Object.keys(params)
//   .map(key => key + '=' + encodeURIComponent(params[key]))
//   .join('&');
//   axios
//   .post(
//     `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${queryString}`,
//     // JSON.stringify(sendData),
//     options
//   ).then((res)=>{
//     console.log(res,"datafilter")
//     setData(res.data)
//     setpaginatedData(res.data)
//     // setsearchData(res.data)
//   })
// }
const Apply=(params)=>{
  handleOpenLoader()
  // document.getElementById('pagi').style.display="none"
  // const selectedParams = Object.keys(checkboxes)
  // .filter(key => checkboxes[key])
  // .reduce((params, key) => {
  //   params[key] = checkboxes[key];
  //   return params;
  // }, {});
  // fetchData(selectedParams);
  // setPage(0)
if(designationvalue==''&&organization==''&&techval==''&&exp==''){
  handleCloseLoader()
}
  if(designationvalue&&organization==''&&techval==''&&exp==''){
    axios
  .post(
    `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${designationvalue}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    // console.log(res,"datafilter")
    handleCloseLoader()
    if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
   
    // setsearchData(res.data)
  })
  }
  if(organization&&designationvalue==''&&techval==''&&exp==''){
    axios
  .post(
    `https://faculty-preobarding.de.r.appspot.com/alumni/filter?current_organization=${organization}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    handleCloseLoader()
    // console.log(res,"datafilter")
    if(res.data.message=='Not Found'){
      setData([])
  }
  else{
      setData(res.data)
      // setpaginatedData(res.data)
      setsearchData(res.data.length)
  }
  })
  }
  if(techval&&designationvalue==''&&organization==''&&exp==''){
    axios
  .post(
    `https://faculty-preobarding.de.r.appspot.com/alumni/filter?technology=${techval}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    handleCloseLoader()
    // console.log(res,"datafilter")
    if(res.data.message=='Not Found'){
      setData([])
  }
  else{
      setData(res.data)
      // setpaginatedData(res.data)
      setsearchData(res.data.length)
  }
  })
  }
  if(exp&&designationvalue==''&&organization==''&&techval==''){
    axios
  .post(
    `https://faculty-preobarding.de.r.appspot.com/alumni/filter?work_ex=${exp}`,
    // JSON.stringify(sendData),
    options
  ).then((res)=>{
    handleCloseLoader()
    // console.log(res,"datafilter")
    if(res.data.message=='Not Found'){
      setData([])
  }
  else{
      setData(res.data)
      // setpaginatedData(res.data)
      setsearchData(res.data.length)
  }
  })
  }
  if(designationvalue&&organization&&techval==''&&exp==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${designationvalue}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(designationvalue&&techval&&organization==''&&exp==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${designationvalue}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
        if(res.data.message=='Not Found'){
            setData([])
        }
        else{
            setData(res.data)
            // setpaginatedData(res.data)
            setsearchData(res.data.length)
        }
      // setsearchData(res.data)
    })
  }
  if(designationvalue&&exp&&techval==''&&organization==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${designationvalue}&work_ex=${exp}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(techval&&exp&&designationvalue==''&&organization==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?technology=${techval}&work_ex=${exp}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(techval&&organization&&designationvalue==''&&exp==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?technology=${techval}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
     
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(exp&&organization&&designationvalue==''&&techval==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?work_ex=${exp}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  
  if(designationvalue&&organization&&techval&&exp==''){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${designationvalue}&current_organization=${organization}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(designationvalue==''&&organization&&techval&&exp){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?work_ex=${exp}&current_organization=${organization}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(designationvalue&&organization==''&&techval&&exp){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?work_ex=${exp}&designation=${designationvalue}&technology=${techval}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(designationvalue&&organization&&techval==''&&exp){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?work_ex=${exp}&designation=${designationvalue}&current_organization=${organization}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  if(designationvalue&&organization&&techval&&exp){
    axios
    .post(
      `https://faculty-preobarding.de.r.appspot.com/alumni/filter?designation=${designationvalue}&current_organization=${organization}&technology=${techval}&work_ex=${exp}`,
      // JSON.stringify(sendData),
      options
    ).then((res)=>{
      handleCloseLoader()
      // console.log(res,"datafilter")
      if(res.data.message=='Not Found'){
        setData([])
    }
    else{
        setData(res.data)
        // setpaginatedData(res.data)
        setsearchData(res.data.length)
    }
    })
  }
  
}
   

    // console.log(alumEmail,"mailllll")
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
    // const handleChangeEmail = (e) => {
    //   setEmail(e.target.value);
    // };
    const handleChangeMessage = (e) => {
      setMessage(e.target.value);
    };

    const handleCheckDesignation=(e)=>{
    //   console.log(e,"ppp")
    //   const updatedCheckboxes = [...checkboxes];
    //   updatedCheckboxes[i] = !updatedCheckboxes[i];
    //   setCheckboxes(updatedCheckboxes);
    //   setDesignation('')
    //   if(e.target.checked){
        // setIsChecked(true)
       
        setDesignation(e.target.value)
    //   }
    }
    // console.log(designationvalue,checkboxes,"checkbox")
    const handleCheckOrg=(e,value)=>{
    //   const updatedCheckboxes = [...checkboxesorg];
    //   updatedCheckboxes[i] = !updatedCheckboxes[i];
    //   setCheckboxesorg(updatedCheckboxes);
    //   setOrganization('')
    //   console.log(e,"ppp")
    //   if(e.target.checked){
        setOrganization(value)
    //   }
    }
    const handleCheckdes=(e,val)=>{
      setDesignation(val)
    }
    const handleChangeTech=(e,val)=>{
      setTech(val)
    }
    const handleChangeExp=(e,val)=>{
      setExp(val)
    }
    const org=(e)=>{
      
      setOrganization(e.target.value)
      
    }
    const handleCheckTech=(e)=>{
    //   const updatedCheckboxes = [...checkboxestech];
    //   updatedCheckboxes[i] = !updatedCheckboxes[i];
    //   setCheckboxestech(updatedCheckboxes);
    //   setTech('')
    //   console.log(e,"ppp")
    //   if(e.target.checked){
        setTech(e.target.value)
    //   }
    }
    const handleCheckExp=(e)=>{
    //   const updatedCheckboxes = [...checkboxeswork];
    //   updatedCheckboxes[i] = !updatedCheckboxes[i];
    //   setCheckboxeswork(updatedCheckboxes);
    //   setExp('')
    //   console.log(e,"ppp")
    //   if(e.target.checked){
        setExp(e.target.value)
    //   }
    }
    const Reset=()=>{
      setReset(false)
        handleOpenLoader()
      // document.getElementById('pagi').style.display="block"
    //   setCheckboxes([])
    //   setCheckboxesorg([])
    //   setCheckboxestech([])
    //   setCheckboxeswork([])
    setDesignation('')
    setOrganization('')
    setTech('')
    setExp('')
      const sendData = {
        gender:"male"
       };
       axios
       .post(
         `https://faculty-preobarding.de.r.appspot.com/alumni/get_alumni?page=${1}&pageSize=20`,
         JSON.stringify(sendData),
         options
       ).then((res)=>{
        serachFun()
        handleCloseLoader()
         console.log(res,"data")
         setData(res.data)
         setpaginatedData(res.data)
        //  setsearchData(res.data)
        
       })

    }

    const handleSubmit=()=>{
      handleOpenLoader()
      const sendData = {
        email:alumEmail,
        name:name,
        userEmail:email,
        message:message
       };
       axios
       .post(
         `https://faculty-preobarding.de.r.appspot.com/alumnimail/sendmail`,
         JSON.stringify(sendData),
         options
       ).then((res)=>{
        handleCloseLoader()
        //  console.log(res,"data")
         if(res.data.status==200){
          toast.success("Your request has been successfully sent to the Alum", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          handleCloseMess();
          handleClose();
          // toast.success('Your message has been sent to the alum', {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "light",
          //   });
         }
         // setsearchData(res.data)
       })
    }
    // console.log(organization,"lll")
    const handleblur=()=>{

    }
    const getOptionLabel = (option) => {
      // Convert the option to a string
      return String(option);
    };
    const handleIncrement=()=>{
      setExp(exp+1)
    }
    const handledecrement=()=>{
      setExp(exp-1)
    }
    const displayCounter = exp > 0;

    return(
        <>
        {subbtn?(
          <Box>
              <Box sx={{background:"#eff1f2",height:"auto",width:{lg:"auto",sm:"auto",md:"auto"},pt:{md:4,lg:8},display:{xs:"none",lg:"block",sm:"block",md:"block"}}}>
            <Box sx={{display:"flex",justifyContent:"center",placeContent:"center"}}>
                <Paper elevation={3} sx={{borderRadius:"4px",p:2,width:{lg:"auto",md:900}}}>
                    <Box sx={{position:"absolute",ml:{lg:84,md:95.5},mt:-2}}>
                        <img style={{position:"absolute",height:100,width:150}} src={side} alt="side"/>
                    </Box>
                <Typography sx={{mt:1.5,fontWeight:'bold',textAlign:"left",ml:2,fontSize:{md:"20px"}}}>People</Typography>
               
                <Box sx={{display:"flex"}}><Typography sx={{mt:2,fontWeight:'bold',textAlign:"left",ml:2}}>{serachData}</Typography><Typography sx={{mt:2,ml:1}}>Accredians</Typography></Box>
                
                <Box sx={{
                    background: "#00bfa9",
                    //  ml:2,
                    height: "2px",
                    width: "20px",
                    margin: "8px 20px",
                    mb:1
                }}></Box>
                <Box sx={{display:{xs:"none",lg:"flex",md:"flex"},justifyContent:"space-between",mt:2,mb:2}}>
                  <Box>
                 

<FormControl sx={{ m: 1, width: 135,textAlign:"left" }} size="small">
<Autocomplete
      disablePortal
     size="small"
     
      value={designationvalue}
      onChange={handleCheckdes}
      options={designation}
      // freeSolo
      // getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
         size="small"
          // variant="outlined"
          label="Designation"
          onChange={handleCheckDesignation}
          value={designationvalue}
        />
      )}
    />
    </FormControl>
                  </Box>

                
<Box>
<FormControl sx={{ m: 1, width: 135,textAlign:"left" }} size="small">
      {/* <InputLabel sx={{fontSize:"14px"}} id="demo-select-small-label">Organization</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={organization}
        label="Designation"
        onChange={handleCheckOrg}
      >
        {Organization.map((val)=>(
             <MenuItem sx={{fontSize:"14px",height:25}} value={val}>{val}</MenuItem>
        ))}
       
        <Box>
            <TextField onBlur={handleblur}  value={organization} onChange={handleCheckOrg} placeholder="enter filter" sx={{width:100,ml:1.5}} size="small"></TextField>

          </Box>
        
       
       
      </Select> */}
      <Autocomplete
      disablePortal
     size="small"
     
      value={organization}
      onChange={handleCheckOrg}
      options={Organization}
      // freeSolo
      // getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
         size="small"
          // variant="outlined"
          label="Organization"
          onChange={org}
          value={organization}
        />
      )}
    />
    </FormControl>

</Box>

<Box>
<FormControl sx={{ m: 1, width: 135,textAlign:"left",fontSize:"14px" }} size="small">
      {/* <InputLabel sx={{fontSize:"14px"}} id="demo-select-small-label">Technology</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={techval}
        label="Designation"
        onChange={handleCheckTech}
      >
        {Technology.map((val)=>(
             <MenuItem sx={{fontSize:"14px",height:25}} value={val}>{val}</MenuItem>
        ))}
       
       
      </Select> */}
      <Autocomplete
      disablePortal
     size="small"
     sx={{fontSize:"14px"}}
      value={techval}
      onChange={handleChangeTech}
      options={Technology}
      // freeSolo
      // getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
         size="small"
          // variant="outlined"
          label="Technology"
          onChange={handleCheckTech}
          value={techval}
        />
      )}
    />
    </FormControl>
</Box>
{/* sx={{ m: 1, width: 135,textAlign:"left",fontSize:"14px",display:"flex",border:"1px solid #d3d3d3",borderRadius:"5px" }} */}
           <Box>
           <FormControl sx={{ m: 1, width: 135,textAlign:"left",fontSize:"14px" }} size="small">
     
       <Autocomplete
      disablePortal
     size="small"
     
      value={exp}
      onChange={handleChangeExp}
      options={Exp}
      // freeSolo
      // getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
         size="small"
          // variant="outlined"
          label="Experience"
          onChange={handleCheckExp}
          value={exp}
        />
      )}
    />
    </FormControl>
    
        {/* <Box width="48px" sx={{color:"#fff",background:"#d3d3d3","&:hover":{color:"#fff",background:"#d3d3d3"},cursor:"pointer",textAlign:"center",p:1,borderRadius:"2px"}} size="small" onClick={handleIncrement}>+</Box>
         <Box width="40px" sx={{textAlign:"center",p:1}} size="small" disabled>{exp}</Box>
         {displayCounter &&  <Box width="48px" sx={{color:"#fff",background:"#d3d3d3","&:hover":{color:"#fff",background:"#d3d3d3"},cursor:"pointer",textAlign:"center",p:1,borderRadius:"2px"}} size="small" onClick={handledecrement}>-</Box> } */}
    
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
      <Button  sx={{textTransform:"none",background:"#00bfa9",mt:1.5,"&:hover":{color:"#fff",background:"#00c4b5"}}} onClick={Apply} variant="contained" size="small">
        Apply Filters
      </Button>
     </Box>
     <Box>
      <Button sx={{textTransform:"none",background:"#00bfa9",mt:1.5,ml:1,"&:hover":{color:"#fff",background:"#00c4b5"}}} onClick={Reset} variant="contained" size="small">
        Reset Filters
      </Button>
     </Box>
     </Box>
    
      
                
                
                </Box>


               
               





                {/* <TextField onChange={handleChange} placeholder="Search" fullWidth type="search" size="small" sx={{width:725,mb:2,ml:1}}></TextField> */}
                
                {data.length==0?(
                    <Box>
                        <Typography sx={{textAlign:"center",fontSize:"18px"}}>Data Not Found</Typography>
                    </Box>
                ):(
                    <Box>
                             {data.map((val)=>(
                    <Box onClick={()=>handleClickOpen(val.firstname+" "+val.lastname,val.designation+" at "+val.current_organization+" | "+val.university,val.filename,val.linkedin,val.github,val.email)} sx={{padding:"10px 0px",display:"flex",cursor:"pointer"}}>
                    <Box sx={{ml:2}}>
                        <a style={{
                            position: "relative",
                            display:" inline-block",
                            verticalAlign: "middle"
                        }} href="#">
                            <img src={val.filename?`https://www.accredian.com/wp-content/uploads/profile/${val.filename}`:dp}
                            style={{
                                height: "56px",
                                width: "56px",
                                display: "block",
                                borderRadius: "28px"
                            }}
                            ></img>
                        </a>
                    </Box>
                    <Box sx={{ml:{lg:3,md:3,sm:3},width:{lg:500,md:585}}}>
                    <Box sx={{display:"flex"}}><Typography sx={{fontWeight:'bold',textAlign:"left"}}>{val.firstname+" "+val.lastname}</Typography><Typography sx={{ml:1,fontSize:"11px",fontWeight:"bold",mt:0.5,color:"#b6c2d2",width:{lg:300,md:400},textAlign:"left"}}>{val.qualification}</Typography></Box>
                    <Box>
                        <Typography sx={{color:"#7d8a9c",fontSize:"13px",fontWeight:"bold",textAlign:"left",width:{lg:400,md:500}}}>{val.designation} at {val.current_organization} | {val.university}</Typography>
                    </Box>
                    </Box>
                    <Box sx={{width:{lg:150,md:150}}}>
                    <Button onClick={()=>handleClickOpen(val.firstname+" "+val.lastname,val.designation+" at "+val.current_organization+" | "+val.university,val.filename,val.linkedin,val.github,val.email)}  variant="contained" size="small"  sx={{color:"#fff",background:"#00c4b5",fotnSize:"10px",textTransform:"none","&:hover":{color:"#fff",background:"#00c4b5"}}}>
                  Connect
                </Button>
                    </Box>
                    
                    </Box>
                ))}
                
                    </Box>
                )}
                {/* <Box sx={{mb:2,mt:2}}>

                

                </Box> */}
               <Box sx={{mt:2,mb:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {/* <Pagination
                id="pagi"
        count={count}
        size="large"
        page={page}
        // variant="outlined"
        // shape="rounded"
        onChange={handleChangeP}
      /> */}
                </Box>
                
                </Paper>
            </Box>


            


        </Box>

        {/* mobile version */}

        {/* <Box sx={{background:"#eff1f2",height:"auto",width:{lg:"auto",sm:"auto",md:"auto"},pt:{md:4,lg:8},display:{xs:"block",lg:"none",sm:"none",md:"none"}}}> */}
            <Box sx={{display:{xs:"flex",lg:"none",sm:"none",md:"none"}}}>
                <Paper elevation={3} sx={{borderRadius:"4px",p:2,width:380}}>
                    <Box sx={{position:"absolute",ml:31,mt:-2}}>
                        <img style={{position:"absolute",height:100,width:150}} src={side} alt="side"/>
                    </Box>
                <Typography sx={{mt:1.5,fontWeight:'bold',textAlign:"left",ml:1,fontSize:{md:"20px"}}}>People</Typography>
               
                <Box sx={{display:"flex"}}><Typography sx={{mt:2,fontWeight:'bold',textAlign:"left",ml:1}}>{serachData}</Typography><Typography sx={{mt:2,ml:1}}>Accredians</Typography></Box>
                
                <Box sx={{
                    background: "#00bfa9",
                    //  ml:2,
                    height: "2px",
                    width: "20px",
                    margin: "8px 13px",
                    mb:1
                }}></Box>
                


                {/* filter mobile version */}
                <Box sx={{display:{xs:"block",lg:"none",md:"none"},justifyContent:"space-between",mt:2,mb:2}}>

                  <Box sx={{display:"flex",justifyContent:"space-between"}}>
                  <Box>
                 

                 <FormControl sx={{ m: 1, width: 150,textAlign:"left" }} size="small">
                 <Autocomplete
                       disablePortal
                      size="small"
                      
                       value={designationvalue}
                       onChange={handleCheckdes}
                       options={designation}
                       // freeSolo
                       // getOptionLabel={getOptionLabel}
                       renderInput={(params) => (
                         <TextField
                           {...params}
                          size="small"
                           // variant="outlined"
                           label="Designation"
                           onChange={handleCheckDesignation}
                           value={designationvalue}
                         />
                       )}
                     />
                     </FormControl>
                                   </Box>
                 
                                 
                 <Box>
                 <FormControl sx={{ m: 1, width: 150,textAlign:"left" }} size="small">
                       {/* <InputLabel sx={{fontSize:"14px"}} id="demo-select-small-label">Organization</InputLabel>
                       <Select
                         labelId="demo-select-small-label"
                         id="demo-select-small"
                         value={organization}
                         label="Designation"
                         onChange={handleCheckOrg}
                       >
                         {Organization.map((val)=>(
                              <MenuItem sx={{fontSize:"14px",height:25}} value={val}>{val}</MenuItem>
                         ))}
                        
                         <Box>
                             <TextField onBlur={handleblur}  value={organization} onChange={handleCheckOrg} placeholder="enter filter" sx={{width:100,ml:1.5}} size="small"></TextField>
                 
                           </Box>
                         
                        
                        
                       </Select> */}
                       <Autocomplete
                       disablePortal
                      size="small"
                      
                       value={organization}
                       onChange={handleCheckOrg}
                       options={Organization}
                       // freeSolo
                       // getOptionLabel={getOptionLabel}
                       renderInput={(params) => (
                         <TextField
                           {...params}
                          size="small"
                           // variant="outlined"
                           label="Organization"
                           onChange={org}
                           value={organization}
                         />
                       )}
                     />
                     </FormControl>
                 
                 </Box>
                 
                 
                             {/* <Box >
          
     
        <Box width="48px" sx={{color:"#fff",background:"#d3d3d3","&:hover":{color:"#fff",background:"#d3d3d3"},cursor:"pointer",textAlign:"center",p:1,borderRadius:"2px"}} size="small" onClick={handleIncrement}>+</Box>
         <Box width="40px" sx={{textAlign:"center",p:1}} size="small" disabled>{exp}</Box>
     {displayCounter &&  <Box width="48px" sx={{color:"#fff",background:"#d3d3d3","&:hover":{color:"#fff",background:"#d3d3d3"},cursor:"pointer",textAlign:"center",p:1,borderRadius:"2px"}} size="small" onClick={handledecrement}>-</Box> }
      
           </Box> */}

                  </Box>
                  <Box sx={{display:"flex",justifyContent:"space-between"}}>
                  <Box>
                 <FormControl sx={{ m: 1, width: 150,textAlign:"left",fontSize:"14px" }} size="small">
                       {/* <InputLabel sx={{fontSize:"14px"}} id="demo-select-small-label">Technology</InputLabel>
                       <Select
                         labelId="demo-select-small-label"
                         id="demo-select-small"
                         value={techval}
                         label="Designation"
                         onChange={handleCheckTech}
                       >
                         {Technology.map((val)=>(
                              <MenuItem sx={{fontSize:"14px",height:25}} value={val}>{val}</MenuItem>
                         ))}
                        
                        
                       </Select> */}
                       <Autocomplete
                       disablePortal
                      size="small"
                      sx={{fontSize:"14px"}}
                       value={techval}
                       onChange={handleChangeTech}
                       options={Technology}
                       // freeSolo
                       // getOptionLabel={getOptionLabel}
                       renderInput={(params) => (
                         <TextField
                           {...params}
                          size="small"
                           // variant="outlined"
                           label="Technology"
                           onChange={handleCheckTech}
                           value={techval}
                         />
                       )}
                     />
                     </FormControl>
                 </Box>
                            <Box>
                            <FormControl sx={{ m: 1, width: 150,textAlign:"left",fontSize:"14px" }} size="small">
                      
                        <Autocomplete
                       disablePortal
                      size="small"
                      
                       value={exp}
                       onChange={handleChangeExp}
                       options={Exp}
                       // freeSolo
                       // getOptionLabel={getOptionLabel}
                       renderInput={(params) => (
                         <TextField
                           {...params}
                          size="small"
                           // variant="outlined"
                           label="Experience"
                           onChange={handleCheckExp}
                           value={exp}
                         />
                       )}
                     />
                     </FormControl>
                            </Box>
                  </Box>

                 
                 

    
     <Box sx={{display:"flex",ml:1}}>
     <Box>
      <Button sx={{textTransform:"none",background:"#00bfa9",mt:1.5,"&:hover":{color:"#fff",background:"#00c4b5"}}} onClick={Apply} variant="contained" size="small">
        Apply Filters
      </Button>
     </Box>
     <Box>
      <Button sx={{textTransform:"none",background:"#00bfa9",mt:1.5,ml:1,"&:hover":{color:"#fff",background:"#00c4b5"}}} onClick={Reset} variant="contained" size="small">
        Reset Filters
      </Button>
     </Box>
     </Box>
    
      
                
                {/* <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Organization</Typography>
                <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Technology</Typography>
                <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Experince</Typography>
                <Typography sx={{fontWeight:"bold",fontSize:"14px"}}>Location</Typography> */}
                </Box>





                {/* <TextField onChange={handleChange} placeholder="Search" fullWidth type="search" size="small" sx={{width:725,mb:2,ml:1}}></TextField> */}
                
                {data.length==0?(
                    <Box>
                        <Typography sx={{textAlign:"center",fontSize:"18px"}}>Data Not Found</Typography>
                    </Box>
                ):(
                    <Box>
                             {data.map((val)=>(
                    <Box onClick={()=>handleClickOpen(val.firstname+" "+val.lastname,val.designation+" at "+val.current_organization+" | "+val.university,val.filename,val.linkedin,val.github,val.email)} sx={{padding:"10px 0px",display:"flex",cursor:"pointer"}}>
                    <Box sx={{ml:2}}>
                        <a style={{
                            position: "relative",
                            display:" inline-block",
                            verticalAlign: "middle"
                        }} href="#">
                            <img src={val.filename?`https://www.accredian.com/wp-content/uploads/profile/${val.filename}`:dp}
                            style={{
                                height: "56px",
                                width: "56px",
                                display: "block",
                                borderRadius: "28px"
                            }}
                            ></img>
                        </a>
                    </Box>
                    <Box sx={{ml:1.5,width:170}}>
                    <Box sx={{display:"flex"}}><Typography sx={{fontWeight:'bold',textAlign:"left"}}>{val.firstname+" "+val.lastname}</Typography><Typography sx={{ml:1,fontSize:"11px",fontWeight:"bold",mt:0.5,color:"#b6c2d2",width:70,textAlign:"left"}}>{val.qualification}</Typography></Box>
                    <Box>
                        <Typography sx={{color:"#7d8a9c",fontSize:"13px",fontWeight:"bold",textAlign:"left",width:120}}>{val.designation} at {val.current_organization} | {val.university}</Typography>
                    </Box>
                    </Box>
                    <Box sx={{width:100}} >
                    <Button onClick={()=>handleClickOpen(val.firstname+" "+val.lastname,val.designation+" at "+val.current_organization+" | "+val.university,val.filename,val.linkedin,val.github,val.email)}  variant="contained" size="small"  sx={{color:"#fff",background:"#00c4b5",fotnSize:"10px",textTransform:"none","&:hover":{color:"#fff",background:"#00c4b5"}}}>
                  Connect
                </Button>
                    </Box>
                    
                    </Box>
                ))}
                
                    </Box>
                )}
                {/* <Box sx={{mb:2,mt:2}}>

                

                </Box> */}
               <Box sx={{mt:2,mb:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {/* <Pagination
                id="pagi"
        count={count}
        size="large"
        page={page}
        // variant="outlined"
        // shape="rounded"
        onChange={handleChangeP}
      /> */}
                </Box>
                
                </Paper>
            </Box>


            


        {/* </Box> */}



        <Dialog
        open={openpop}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {/* <Box sx={{p:1,display:"grid",placeItems:"center"}}>
          
          <img src={logo} alt="logo" width={150} /> 
         </Box> */}
          {/* <Typography sx={{fontWeight:"bold"}}>Alumni Details</Typography> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {/* <Typography sx={{fontWeight:"bold",mb:1}}>Connect with</Typography> */}
           <Box >
            <Box sx={{display:"flex",justifyContent:"space-between",top:"0%",borderBottom:"1px solid #e7ecf2"}}>
            
            <Box>
            <Typography sx={{fontWeight:"bold",fontSize:"25px",color:"#000"}}>
           <i>{name}</i>
           </Typography>
           <Typography sx={{fontSize:"14px",mb:1}}>
          {company}
           </Typography>
           <Box>
           {linkedin?(
            // <Box>
               <LinkedInIcon  sx={{mb:-0.5,color:"#0078d4",fontSize:"25px",cursor:"pointer"}}/>
            // </Box>
            
           ):("")}
           {github?(
            // <Box>
              <GitHubIcon sx={{mb:-0.5,color:"#000",fontSize:"25px",cursor:"pointer",ml:0.5}}/>
            // </Box>
            
           ):("")}
           
           </Box>
          
            </Box>
            <Box>
            <img style={{borderRadius:"9999px",width:"7rem",height:"7rem"}} src={image?`https://www.accredian.com/wp-content/uploads/profile/${image}`:dp} alt="logo"  /> 
          
            </Box>
           
            </Box>
            {/* <hr/> */}
            <Box sx={{borderBottom:"1px solid #e7ecf2",p:1,mt:0.5}}>
            <Typography sx={{}}>Discover and connect with alumni who share your journey. Click the "Send Message" button to reach out, network, and send custom messages to reconnect. Join the alumni network and start connecting today.</Typography>
           
            </Box>

<Box sx={{display:"flex",justifyContent:"flex-end",mt:0.5}}>
<Typography onClick={handleClickOpenMess}  sx={{color:"red",cursor:"pointer",mr:1}}>Send Message</Typography>
    <Typography onClick={handleClose} sx={{color:"red",cursor:"pointer",ml:1}}>Close</Typography>
</Box>
            
            {/* <hr/> */}
          
           
           </Box>
          
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions> */}
            {/* <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",mb:3}}> */}
            {/* <Button variant="contained" onClick={handleClose}> Connect with Linkedin</Button> */}
            {/* </Box> */}
         
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        {/* </DialogActions> */}
      </Dialog>


      <Dialog open={openmessage}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={handleCloseLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
          <DialogContentText sx={{mb:2}}>
            <i>Please enter the message which you want to send to the alum.</i>
          </DialogContentText>
          <TextareaAutosize
          fullWidth
      aria-label="minimum height"
      className="modal"
      minRows={6}
      onChange={handleChangeMessage}
      placeholder="Enter your Message"
      // style={{ width: 480 }}
      // sx={{width:400}}
    />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label=" Enter your email"
            type="email"
            value={email?email:''}
            // fullWidth
            // onChange={handleChangeEmail}
            style={{ width: 480 }}
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button disabled={btn} onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleCloseMess}>Close</Button>
        </DialogActions>
      </Dialog>

    
          </Box>
        ):(
          <Box>
            <Page404/>
          </Box>
        )}
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={handleCloseLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer/>
        </>
    )
}
export default Home