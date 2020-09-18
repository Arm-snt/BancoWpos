import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Context } from '../context';
import Login from './login';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Registro() {
	const context = useContext(Context);
	const classes = useStyles();
	const [ sexo, setsexo ] = useState('');
	const [ nombre, setnombre ] = useState('');
	const [ apellido, setapellido ] = useState('');
	const [ documento, setdocumento ] = useState('');
	const [ telefono, settelefono ] = useState('');
	const [ direccion, setdireccion ] = useState('');
	const [ correo, setcorreo ] = useState('');
	const [ password, setpassword ] = useState('');
	const [ fecha, setfecha ] = useState(new Date());
	const [ numero_cuenta, setnumero_cuenta ] = useState();
	const [ error, seterror ] = useState({ correo: false, password: false, documento: false, nombre: false, apellido: false, telefono: false});
	const [ textoAyuda, settextoAyuda ] = useState({ correo: '', password: '', documento: '', nombre: '', apellido: '', telefono:''});
	const generos = [
		{ value: 'masculino', label: 'Masculino' },
		{ value: 'femenino', label: 'Femenino' },
		{ value: 'lgtbi', label: 'LGTBI' }
	];

	const onCreateSubmit = (event) => {
		event.preventDefault();
		if (nombre == '' || apellido == '' || documento == '' || telefono == '' || telefono == '' || direccion == '' || correo == '' || password == '' ) {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar todos los campos del formulario' ]
			});
		}
		//Atravez de la constante context invoco los metodos para crear al cliente y envio los
		//campos necesarios para generar su cuenta y sus credenciales de acceso
		context.createCliente(event, {
			documento: documento,
			nombre_cliente: nombre,
			apellido_cliente: apellido,
			telefono: telefono,
			sexo: sexo,
			direccion: direccion,
			numero_cuenta: Math.floor(Math.random() * (9999999999 - 1111111111 + 1)) + 1111111111,
			estado: 'Activo',
			fecha_creacion: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			codigo_acceso: Math.floor(Math.random() * (9999999999 - 1111111111 + 1)) + 1111111111,
			correo: correo,
			password: password
		});
		setnombre('');
		setapellido('');
		setdocumento('');
		settelefono('');
		setdireccion('');
		setcorreo('');
		setpassword('');
		

	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper} elevation={5}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Registrarse
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="nombre"
								value={nombre}
								onChange={(event) => {
									setnombre(event.target.value);
									if(!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.exec(event.target.value)){
										error.nombre=true;
										textoAyuda.nombre="Ingrese solo letras para el nombre";
									}else{
										error.nombre=false;
										textoAyuda.nombre="";
									}
								}}
								error={error.nombre}
								helperText={textoAyuda.nombre}
								variant="outlined"
								fullWidth
								label="Nombre"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								value={apellido}
								onChange={(event) => {
									setapellido(event.target.value);
									if(!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.exec(event.target.value)){
										error.apellido=true;
										textoAyuda.apellido="Ingrese solo letras para el apllido";
									}else{
										error.apellido=false;
										textoAyuda.apellido="";
									}
								}}
								error={error.apellido}
								helperText={textoAyuda.apellido}
								fullWidth
								label="Apellido"
								name="apellido"
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								value={documento}
								onChange={(event) => {
									setdocumento(event.target.value);
									if(!/^[0-9]{10}$/.exec(event.target.value)){
										error.documento=true;
										textoAyuda.documento="Ingrese un documento de 10 digitos";
									}else{
										error.documento=false;
										textoAyuda.documento="";
									}
								}}
								fullWidth
								error={error.documento}
								helperText={textoAyuda.documento}
								type="number"
								label="Documento"
								name="documento"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								value={telefono}
								onChange={(event) => {
									settelefono(event.target.value);
									if(!/^[0-9]{10}$/.exec(event.target.value)){
										error.telefono=true;
										textoAyuda.telefono="Ingrese un numero de 10 digitos";
									}else{
										error.telefono=false;
										textoAyuda.telefono="";
									}
								}}
								fullWidth
								error={error.telefono}
								helperText={textoAyuda.telefono}
								type="number"
								name="telefono"
								label="Telefono"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								select
								label="Sexo"
								name="sexo"
								value={sexo}
								required
								fullWidth
								variant="outlined"
								onChange={(event) => {
									setsexo(event.target.value);
								}}
								helperText="Seleccione su genero"
							>
								{generos.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								value={direccion}
								onChange={(event) => {
									setdireccion(event.target.value);
								}}
								fullWidth
								type="text"
								label="Dirección"
								name="direccion"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								name="correo"
								required								   
								fullWidth
								value={correo}
								onChange={(event) => {
									setcorreo(event.target.value);
									if(!/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(event.target.value)) {
										error.correo=true;
										textoAyuda.correo="Ingrese un correo valido";
									  }else{
										error.correo=false;
										textoAyuda.correo="";
									  }
									}
								}
								error={error.correo}
								helperText={textoAyuda.correo}
								label="Correo"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								value={password}
								onChange={(event) => {
									setpassword(event.target.value);
									if(!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(event.target.value)) {
										error.password=true;
										textoAyuda.password="Contraseña devil, use mayusculas y numeros";										
									  }else{
										if(event.target.value<8){
											error.password=true;
											textoAyuda.password="Contraseña devil, 8 caracteres minimos";
										}
										error.password=false;
										textoAyuda.password="";
									  }
								}}
								error={error.password}
								helperText={textoAyuda.password}
								name="password"
								label="Contraseña"
								type="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={onCreateSubmit}
					>
						Registrarse
					</Button>
					<Grid container>
						<Grid item>
							<Link to="./login">¿Ya tienes una cuenta? Ingresa aqui</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
