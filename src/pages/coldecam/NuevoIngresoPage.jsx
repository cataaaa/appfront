import React from "react";

import ApiBackend from "../../store/api";

//*Formulario */
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import Swal from "sweetalert2";
import { object, string } from "yup";
import { useState } from "react";
import { useEffect } from "react";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const NuevoIngresoPage = () => {
const [choferes, setChoferes] = useState([])
  useEffect(() => {
    const consultarApi = async () => {
      try {     
        const {data} = await ApiBackend.Api.get("/api/choferes");     
        setChoferes(data)   
        console.log("data")      
      } catch (error) {
        console.log("error")
      }
    }
    consultarApi()
  }, []);


  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
    },
    validationSchema: object({
      nombre: string().required(true),
      apellido: string().required(true),
    }),
    onSubmit: (formValue) => {
      console.log("form enviado");
      console.log(formValue);
    },
  });
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
        <h2>Nuevo Ingresos</h2>

        <Form onSubmit={formik.handleSubmit}>
          <FormGroup row>
            <FormControl sx={{ m: 1 }} variant="outlined" row>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(choferes) => (choferes.nombre +" " +choferes.apellido + " " + choferes.dni)}
                options={choferes}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Chofer" />
                )}
              />
            </FormControl>
            <FormControl
              sx={{ ml: 1, mt: 1, width: "30ch" }}
              variant="outlined"
              row
            >
              {/* <FormHelperText id="outlined-weight-helper-text">
          Nombre
        </FormHelperText> */}
              <TextField
                id="outlined-basic"
                label="Nombre"
                value={formik.values.nombre}
                name="nombre"
                variant="outlined"
                error={formik.errors.nombre}
                onChange={formik.handleChange}
              />
              {/* <OutlinedInput  value={formik.values.nombre} name="nombre"/>        */}
            </FormControl>
            <FormControl
              sx={{ ml: 1, mt: 1, width: "30ch" }}
              variant="outlined"
            >
              {/* <FormHelperText id="outlined-weight-helper-text">
          Apellido
        </FormHelperText> */}
              {/* <OutlinedInput value={formik.values.apellido} name="apellido"/>    */}
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                name="apellido"
                value={formik.values.apellido}
                error={formik.errors.apellido}
                onChange={formik.handleChange}
              />
            </FormControl>
          </FormGroup>

          <Grid container justifyContent="flex-start" sx={{ m: 1 }}>
            <Form.Button type="submit">Guardar</Form.Button>
            {/* <Button type="submit">
          Guardar
        </Button>  */}
          </Grid>
        </Form>
      </div>
    </Box>
  );
};

export default NuevoIngresoPage;
