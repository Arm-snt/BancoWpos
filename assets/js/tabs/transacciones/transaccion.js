import React, { useContext, useState } from 'react';
import {
	Container,
	Paper,
	Grid,
	Breadcrumbs,
	Link,
	Typography,
	TextField,
	IconButton,
	Divider,
	Button,
	InputAdornment
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Context } from '../../context';
import { Save, Cancel } from '@material-ui/icons';

const style = {
	container: {
		paddingTop: '20px'
	},
	paper: {
		marginTop: 15,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	link: {
		display: 'flex'
	},
	form: {
		width: '100%',
	},
	submit: {
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: '##27C497'
	},
	space: {
		paddingTop: '20px'
	}
};

function Transaccion() {
	//Com,ponente de transacciones donde realizo las tres transacciones basicas
	//Basado en el tipo_transaccion el saldo es actualizado respecto al monto
	const context = useContext(Context);
	let numero = Math.floor(Math.random() * (9999999999 - 1111111111 + 1)) + 1111111111;
	const [ numerocuenta, setnumerocuenta ] = useState(context.cliente.numero_cuenta);
	const [ numerocuentad, setnumerocuentad ] = useState(null);
	const [ monto, setmonto ] = useState();
	const [ codigo_transaccion, setcodigo_transaccion ] = useState(numero);
	const [ fecha, setfecha ] = useState(new Date());
	const [ tipo_transaccion, settipo_transaccion ] = useState();
	const [ error, seterror ] = useState({ correo: false, password: false, documento: false, nombre: false, apellido: false, telefono: false});
	const [ textoAyuda, settextoAyuda ] = useState({ correo: '', password: '', documento: '', nombre: '', apellido: '', telefono:''});
	
	const onCreateSubmit = (event) => {
		event.preventDefault();
		//estas son pequeñas validaciones sobre los estados, como: si esta al gun campo vacio devuelva el snackbar
		//o si por ejemplo se piensa hacer un retirp y el monto es mayor que el saldo disponible
		if (numerocuenta == '' || monto == '' || codigo_transaccion == '' || tipo_transaccion == '') {
			return context.setMessage({
				level: 'error',
				text: [ 'Debe llenar todos los campos del formulario' ]
			});
		}
		if(tipo_transaccion==20 && monto>context.cliente.saldo){
			return context.setMessage({
				level: 'error',
				text: [ 'No posee los fondos suficientes para el retiro' ]
			});
		}
		context.createTransacciones(event, {
			codigo_transaccion: codigo_transaccion,
			numero_cuenta: numerocuenta,
			numero_cuenta_d: numerocuentad,
			monto: monto,
			fecha_transaccion: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			codigo_tipo_t: tipo_transaccion
		})
		setmonto('');
		settipo_transaccion('');

	};

	const tipo_t = [
		{ codigo_tipo_t: '10', nombre_transaccion: 'Deposito', detalles: 'Retirar dinero' },
		{ codigo_tipo_t: '20', nombre_transaccion: 'Retiro', detalles: 'Consignar a la cuenta' },
		{ codigo_tipo_t: '30', nombre_transaccion: 'Transferencia', detalles: 'Transferencia entre cuentas' }
	];

	const agregarfechayhora = (date) => {
		setfecha(date);
	};

	function historyBack() {
		window.history.back();
	}

	return (
		<Container style={style.container} component="main" maxWidth="lg" justify="center">
			
				<form style={style.form}>
					<Grid container spacing={2}>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={codigo_transaccion}
								onChange={(event) => {
									setcodigo_transaccion(event.target.value);
								}}
								fullWidth={true}
								label="Codigo Transaccion"
								color="primary"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={numerocuenta}
								onChange={(event) => {
									setnumerocuenta(event.target.value);
								}}
								disabled
								fullWidth={true}
								label="Numero Cuenta"
								color="primary"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={tipo_t}
								onChange={(e, a) => {
									settipo_transaccion(a !== null ? a.codigo_tipo_t : '');
								}}
								getOptionLabel={(option) => option.codigo_tipo_t + '-' + option.nombre_transaccion}
								renderInput={(params) => (
									<TextField {...params} label="Tipo Transaccion" color="primary" variant="outlined" />
								)}
							/>
						</Grid>
						{tipo_transaccion == 30 ? (
							<Grid item md={4} xs={6}>
								<TextField
									type="number"
									value={numerocuentad}
									onChange={(event) => {
										setnumerocuentad(event.target.value);
										if(!/^[0-9]{10}$/.exec(event.target.value)){
											error.numerocuentad=true;
											textoAyuda.numerocuentad="Ingrese un numero de 10 digitos";
										}else{
											error.numerocuentad=false;
											textoAyuda.numerocuentad="";
										}
									}}
									fullWidth
									error={error.numerocuentad}
									helperText={textoAyuda.numerocuentad}
									label="Numero Cuenta"
									color="primary"
									variant="outlined"
								/>
							</Grid>
						) : null}
						<Grid item md={4} xs={6}>
							<TextField
								type="number"
								value={monto}
								onChange={(event) => {
									setmonto(event.target.value);
								}}
								fullWidth={true}
								label="Monto"
								color="primary"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Fecha Préstamo"
									format="dd/MM/yyyy"
									value={fecha}
									variant="outlined"
									onChange={agregarfechayhora}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={3} md={2}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={onCreateSubmit}								
							>
								Guardar
							</Button>
						</Grid>
						<Grid item xs={3} md={2}>
							<Button
								variant="contained"
								fullWidth
								size="medium"
								color="primary"
								style={style.submit}
								onClick={historyBack}
								
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</form>
			
		</Container>
	);
}
export default Transaccion;
