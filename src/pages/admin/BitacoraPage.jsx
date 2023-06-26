import React,{ useState } from "react";
import PropTypes from 'prop-types';

import ApiBackend from "../../store/api";

import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { Box,Typography, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { TablePagination } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { tableCellClasses } from "@mui/material/TableCell";
import TableFooter from '@mui/material/TableFooter';
import { useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { Row } from "react-bootstrap";

const BitacoraPage = () => {
  const theme = useTheme();

  const [allBitacora, setAllBitacora] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const consultarApi = async () => {
      try {     
        const {data} = await ApiBackend.Api.get("/api/bitacora");     
        setAllBitacora(data)   
        console.log("first")          
      } catch (error) {
        console.log("error")
      }
    }
    consultarApi()
  }, []);

  useEffect(() => {
    setRows([...allBitacora])   
  }, [allBitacora])

   /**ESTILO DE LA TABLA */
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#618387",
      color: "white",
      fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {   
      backgroundColor: "#e0dada",
      border: 0,
    },
  }));
  /**FIN ESTILO DE LA TABLA */

  
   /**BUSCADOR FILTRO */
   const requestSearch = (searchedVal) => {
    const filteredRows = allBitacora.filter((row) => {

      if (row.tipoError.toLowerCase().includes(searchedVal.toLowerCase())) {
        return row.tipoError.toLowerCase().includes(searchedVal.toLowerCase());
      } else if (
        row.descripcionError.toLowerCase().includes(searchedVal.toLowerCase())
      ) {
        return row.descripcionError.toLowerCase().includes(searchedVal.toLowerCase());
      } else if (row.usuario.toLowerCase().includes(searchedVal.toLowerCase())) {
        return row.usuario.toLowerCase().includes(searchedVal.toLowerCase());
       }
    });
    setRows(filteredRows);
  };
  /**FIN BUSCADOR FILTRO */

/**PAGINATION */
  function TablePaginationActions(props) {
    const theme = useTheme();
    
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
/** FIN PAGINATION */

  return (
    <Box m="10px">
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        backgroundColor="#f2f1f0"
        borderRadius="3px"
      >
        <IconButton
          type="button"
          sx={{ p: 1 }}
          onChange={() => requestSearch()}
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Buscar"
          name="searchedVal"
          onChange={(e) => requestSearch(e.target.value)}
        />
      </Box>

      <TableContainer >
        <Table >
          <TableHead>
            <TableRow>
              <StyledTableCell>Tipo Error</StyledTableCell>
              <StyledTableCell>Descripcion </StyledTableCell>
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell>Usuario</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row)  => (
              <StyledTableRow key={row.id} >
                <TableCell>{row.tipoError}</TableCell>
                <TableCell>{row.descripcionError}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.usuario}</TableCell>           
              </StyledTableRow >
            ))}
             {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
               rowsPerPageOptions={[1,5,10, 25, { label: 'All', value: -1 }]}
              // colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Filas',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
        
      </TableContainer>
     

    </Box>
    

  );

  
}

export default BitacoraPage