import React, { useContext, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, Grid, Avatar, Label } from "@material-ui/core";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TextField } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { Container, Paper } from "@material-ui/core";
import user from '../../../imagenes/user_m.png';

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

function Usuario() {
  const style = useStyles();
  let saldo = 1000000;
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
        <Grid item md={4} xs={6}>
          <TextField type="text" value="Armando Santana" fullwidth="true" disabled label="Nombre del cliente" />
          <TextField type="text" value="3022337899" fullwidth="true" disabled label="Telefono" />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField type="text" value={"$"+saldo} fullwidth="true" disabled label="Saldo" />
          <TextField type="text" value="Cra 11B 45-33" fullwidth="true" disabled label="Dirección" />
        </Grid>
      </Grid>
    </Fragment>
  );
}
export default Usuario;
