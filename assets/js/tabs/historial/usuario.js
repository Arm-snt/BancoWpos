import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, Grid, Avatar, Label } from "@material-ui/core";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TextField } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { Container, Paper } from "@material-ui/core";
import user from '../../../imagenes/user_m.png';
import {Context} from '../../context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: 'auto'
    },
  },
  avatar: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

function Usuario(props) {
  const context = useContext(Context);
  //Este es un componente tipo card para tener la informacion del cliente a la mano
  //ademas de tener a la vista el saldo en la cuenta
  const [nombre, setnombre]=useState();
  const [telefono, settelefono]=useState();
  const [saldo, setsaldo]=useState();
  const [direccion, setdireccion]=useState();
  const style = useStyles();
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12} >
          <div className={style.root}>
            <Avatar
              className={style.avatar}
              src={user}
            />
          </div>
        </Grid>
        <Grid item md={4} xs={6} className={style.info}>
          <TextField type="text" value={context.cliente.nombre_cliente+" "+context.cliente.apellido_cliente} fullwidth="true" disabled label="Nombre del cliente" />
          <TextField type="text" value="3022551956" fullwidth="true" disabled label="Telefono" />
        </Grid>
        <Grid item md={4} xs={6} className={style.info}>
          <TextField type="text" value={"$"+context.cliente.saldo} fullwidth="true" disabled label="Saldo" />
          <TextField type="text" value="Cra 11b 6a-33" fullwidth="true" disabled label="Dirección" />
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default Usuario;
