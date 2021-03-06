import React, { useContext, useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, Paper, Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import ContextProvider from '../context';
import Notificacion from '../notificacion';
import Usuario from './historial/usuario';
import TablaH from './historial/tablah';
import Transaccion from './transacciones/transaccion';

function TabCliente(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabCliente.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function Page(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		alignItems: 'center'
	},
	primary: {
		color: '#e2001A'
	},
	secondary: {
		color: '#e8E8E8'
	},
	container: {
		paddingTop: '120px',
		maxWidth: '900px'
	},
	paper: {
		marginTop: 8,
		display: 'flex',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#f5f5f5'
	},
	tab: {
		display: 'flex'
	}
}));

export default function Pagina(onchangeTab) {
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = useState(0);
	const [ data, setData ] = useState('');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onChangeIndex = (index, data) => {
		setValue(index);
		setData(data);
	};
   //Este es mi componente contenedor, aqui tengo las 2 ventanas a mis otros componentes asi como le paso las propiedades
   //de mi contextprovider
	return (
		<Fragment>
			<Container className={classes.container} component="main" maxWidth="lg" justify="center">
				<ContextProvider>
					<Notificacion />
					<Paper className={classes.paper} elevation={5}>
						<div className={classes.root}>
							<Tabs
								value={value}
								onChange={handleChange}
								className={classes.tab}
								indicatorColor="primary"
								textColor="primary"
							>
								<Tab label="Historial Movimientos" {...Page(0)} />
								<Tab label="Transacciones" {...Page(1)} />
							</Tabs>
							<SwipeableViews
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={value}
								onChangeIndex={onChangeIndex}
							>
								<TabCliente value={value} index={0}>
									<Usuario />
									<TablaH />
								</TabCliente>
								<TabCliente value={value} index={1}>
									<Usuario />
									<Transaccion />
								</TabCliente>
							</SwipeableViews>
						</div>
					</Paper>
				</ContextProvider>
			</Container>
		</Fragment>
	);
}
