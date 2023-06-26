import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {postUsuario} from "../../store/usuarios/thunks"

//*Formulario */
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';

import Swal from "sweetalert2";

const CrearUsuarioPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(decodeURIComponent(queryParams.get("data")));
  const dispatch = useDispatch();
const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth);
console.log()
  const [rol, setRol] = useState();
  const [roles, setRoles] = useState();
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [iniciales, setIniciales] = useState();
  const [email, setEmail] = useState();
  const [ids, setIds] = useState();
  const [password, setPassword] = useState();

  const [nameError, setNameError] = useState(true);
  const [apellidoError, setapellidoError] = useState(true);
  const [inicialesError, setInicialesError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const[passwordError, setPasswordError] = useState(true)

  useEffect(() => {
      //  console.log(id);
    }, []);

    const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const validateName = () => {
  const regex = /^[a-zA-Z]*$/;
  if (!regex.test(nombre)) {
      setNameError(true);
  } else {
    if(nombre?.trim() == "")
    {
      setNameError(true);
    }
    else{
      setNameError(false);
    }
  }
};
const validateApellido = () => {
const regex = /^[a-zA-Z ]*$/;
if (!regex.test(apellido)) {
    setapellidoError(true);
} else {
  if(apellido?.trim() == ""){
  setapellidoError(true)
  }else{
  setapellidoError(false)}
}
};

const validateIniciales = () => {
const regex = /^[a-zA-Z ]*$/;
if (!regex.test(iniciales)) {
    setInicialesError(true);
} else {
  if(iniciales?.trim() == ""){
    setInicialesError(true)
  } else {
  setInicialesError(false)};
}
};

const validateEmail = () => {
const regex = /\S+@\S+\.\S+/;
if (!regex.test(email)) {
    setEmailError(true);
} else {
  setEmailError(false);
}
};

const validatePassword = () => {
  console.log("first")
  // const regex = /^(?!\s*$).+/;
  const regex = /^.{6,20}$/;
  if (!regex.test(password)) {
      setPasswordError(true);
  } else {
    console.log("false")
    setPasswordError(false);
  }
  };

const onSubmit = async  (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("email", email);
  formData.append("iniciales", iniciales)
  formData.append("id", ids)
  formData.append("password", password) 
  
  try {   
   const res = await dispatch(postUsuario(formData,user.user.email,email))
   console.log("front resp: ",res)
   if (res.status == 200)
   {
     Swal.fire({
       icon: "success",
       title: "Editado correctamente",       
      })         
    }
    setTimeout(() => {
      navigate('/usuarios')
  }, 2000);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Se produjo un error",
     })
  }
};



return (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      marginRight: "15%",
      marginLeft: "15%",
    }}
  >
    <div>
      <h2>Crear Usuario</h2>
      <FormGroup row>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined" row>
      <FormHelperText id="outlined-weight-helper-text">
          Nombre
        </FormHelperText>
        <OutlinedInput  value={nombre} onChange={(e) => setNombre(e.target.value)} onBlur={validateName} required />       
        {nameError && <FormHelperText error> Solo puede contener letras </FormHelperText>}  
      </FormControl>
      <FormControl sx={{ ml: 1 , mt:1, width: "35ch" }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">
          Apellido
        </FormHelperText>
        <OutlinedInput value={apellido} onChange={(e) => setApellido(e.target.value)} onBlur={validateApellido}/>   
        {apellidoError && <FormHelperText error> Solo puede contener letras </FormHelperText>}      
      </FormControl>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
      <FormHelperText id="outlined-weight-helper-text">
          Iniciales
        </FormHelperText>
        <OutlinedInput value={iniciales} onChange={(e) => setIniciales(e.target.value)} onBlur={validateIniciales}/>
        {inicialesError && <FormHelperText error> Solo puede contener letras </FormHelperText>}  
      </FormControl>
      </FormGroup>
      <FormGroup row>
     
      <FormControl sx={{ ml: 1,mt: 1, width: "35ch" }} variant="outlined">
        <FormHelperText id="outlined-weight-helper-text">
          Email
        </FormHelperText>
        <OutlinedInput value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail}/>
        {emailError && <FormHelperText error>Debe tener un formato de mail valido </FormHelperText>}  
      </FormControl>
      <FormControl sx={{ m: 1, width: "32ch" }} variant="outlined">
        {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
        <FormHelperText id="outlined-weight-helper-text">
          Contraseña
        </FormHelperText>
        <OutlinedInput
        
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {passwordError && <FormHelperText error> Debe tener al menos 6 caracteres </FormHelperText>}  
        </FormControl> 
      </FormGroup>
     <FormGroup row>
           
      </FormGroup>
     
      <Grid container justifyContent="flex-start" sx={{ m: 1 }}>
        {!nameError &&  !apellidoError && !inicialesError && !emailError && !passwordError ?
         <Button color="info" variant="contained" endIcon={<SendIcon />} onClick={onSubmit}>
          Guardar
        </Button> :
        <Button color="info" variant="contained" endIcon={<SendIcon />} onClick={onSubmit} disabled>
          Guardar
        </Button>
        }
      </Grid>      
    </div>
   
  </Box>
)
}

export default CrearUsuarioPage