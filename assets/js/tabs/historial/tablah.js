import React, { useContext, useState, Fragment } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination, Typography } from '@material-ui/core';
import {Context} from '../../context';
const style = {
	table: {
		minWidth: 650,
		paddingTop: '40px'
	},
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
	homeIcon: {
		width: 20,
		height: 20,
		marginRight: '4px'
	},
	form: {
		width: '100%'
	},
	submit: {
		marginTop: 20,
		marginBottom: 20
	},
	space: {
		paddingTop: '20px'
	},
	divider: {
		marginBottom: 20
	},
	search: {
		width: 400,
		marginBottom: 20
	},
	error: {
		marginTop: 20,
		marginBottom: 20
	},
	tableHead: {
		color: '#ffffff',
		backgroundColor: '#27C497'
	},
	tableCell: {
		color: '#ffffff'
	},
	search: {
		width: 400,
		marginBottom: 20
	}
};

function TablaH(props){
	const context = useContext(Context);
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, context.transaccion.length - page * rowsPerPage);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

    return (
		<Fragment>
			<TableContainer component={Paper} style={style.space}>
				<Table style={style.table} aria-label="customized table">
					<TableHead style={style.tableHead}>
						<TableRow>
							<TableCell style={style.tableCell} align="left">
                                Codigo Transacción
                            </TableCell>
                            <TableCell style={style.tableCell} align="center">
                                Tipo Transacción
                            </TableCell>
                            <TableCell style={style.tableCell} align="center">
                                Monto
                            </TableCell>
                            <TableCell style={style.tableCell} align="center">
                                Fecha
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
						{context.transaccion.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaccion, index) => (
							<TableRow key={'transaccion' + index}>
								<TableCell align="left">
									<Typography>{transaccion.codigo_transaccion}</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography>{transaccion.codigo_tipo_t +"-"+transaccion.nombre_transaccion}</Typography>	
								</TableCell>
								<TableCell align="center">
									<Typography>{"$ "+transaccion.monto}</Typography>
								</TableCell>
								<TableCell align="center">
									<Typography>{transaccion.fecha_transaccion}</Typography>
								</TableCell>
							</TableRow>
						))}
                    </TableBody>
                </Table>
            </TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={context.transaccion.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
		</Fragment>
			
    );
}
export default TablaH;