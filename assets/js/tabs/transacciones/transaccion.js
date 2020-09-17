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
//import { Context } from './Context';
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
		width: '100%'
	},
	submit: {
		marginTop: 20,
		marginBottom: 20,
		backgroundColor: '#e2001A'
	},
	space: {
		paddingTop: '20px'
	}
};

function Transaccion() {
	//const context = useContext(TodoContext);
	const [ codigo_transaccion, setcodigo_transaccion ] = useState();
	const [ numerocuenta, setcumerocuenta ] = useState();
	const [ numerocuentad, setcumerocuentad ] = useState(null);
	const [ monto, setmonto ] = useState();
	const [ fecha, setfecha ] = useState(new Date());
	const [ tipo_transaccion, settipo_transaccion ] = useState();

	const onCreateSubmit = (event) => {
		event.preventDefault();
		console.log({
			codigo_transaccion: codigo_transaccion,
			numero_cuenta: numerocuenta,
			numero_cuenta_d: numerocuentad,
			monto: monto,
			fecha_transaccion: fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate(),
			codigo_tipo_t: tipo_transaccion
		})
	};

	const tipo_t = [
		{ codigo_tipo_t: '10', nombre_transaccion: 'Retiro', detalles: 'Retirar dinero' },
		{ codigo_tipo_t: '20', nombre_transaccion: 'Deposito', detalles: 'Consignar a la cuenta' },
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
			<Paper style={style.paper}>
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
								color="secondary"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={numerocuenta}
								onChange={(event) => {
									setcumerocuenta(event.target.value);
								}}
								fullWidth={true}
								label="Numero Cuenta"
								color="secondary"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4} xs={6}>
							<Autocomplete
								options={tipo_t}
								onChange={(e, a) => {
									settipo_transaccion(a !== null ? a.codigo_tipo_t : '');
									console.log(tipo_transaccion);
								}}
								getOptionLabel={(option) => option.codigo_tipo_t + '-' + option.nombre_transaccion}
								renderInput={(params) => (
									<TextField {...params} label="Tipo Transaccion" variant="outlined" />
								)}
							/>
						</Grid>
						{tipo_transaccion == 30 ? (
							<Grid item md={4} xs={6}>
								<TextField
									type="text"
									value={numerocuenta}
									onChange={(event) => {
										setcumerocuenta(event.target.value);
									}}
									fullWidth={true}
									label="Numero Cuenta"
									color="secondary"
									variant="outlined"
								/>
							</Grid>
						) : null}
						<Grid item md={4} xs={6}>
							<TextField
								type="text"
								value={monto}
								onChange={(event) => {
									setmonto(event.target.value);
								}}
								fullWidth={true}
								label="Monto"
								color="secondary"
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
								color="secondary"
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
								color="secondary"
								style={style.submit}
								onClick={historyBack}
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}
export default Transaccion;
