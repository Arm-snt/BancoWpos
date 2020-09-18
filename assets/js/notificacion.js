import { Snackbar, SnackbarContent, Button } from '@material-ui/core';
import React, { useContext, Fragment } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Context } from './context';

const style = {
	snack: {
		padding: '65px'
	}
};

function checkLevel(level) {
	switch (level) {
		case 'success':
			return '#28B463';
		case 'error':
			return '#e2001A';
		case 'warning':
			return '#FF9800';
		default:
			return '#e8E8E8';
	}
}

function Notificacion() {
	const context = useContext(Context);
	const handleClose = () => {
		context.setMessage({});
	};

	return (
		<Snackbar
			open={context.message.text !== undefined}
			onClose={handleClose}
			autoHideDuration={4000}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}
			style={style.snack}
		>
			{context.message.text && (
				<Alert
					severity={context.message.level}
					style={{ backgroundColor: checkLevel(context.message.level) }}
					variant="filled"
					action={[
						<Button onClick={handleClose} key="dissmiss" color="inherit">
							Cerrar
						</Button>
					]}
				>
					{context.message.text}
				</Alert>
			)}
		</Snackbar>
	);
}

export default Notificacion;
