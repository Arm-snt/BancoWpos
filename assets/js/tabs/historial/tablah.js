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
		backgroundColor: '#E2001A'
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
	const context_t = useContext(Context);
	console.log(context_t.transaccion);
	const context = 
	[{'codigotransaccion':'245665','tipotransaccion':'Retiro','monto':'300000','fecha':'12/09/2020'},
	{'codigotransaccion':'908654','tipotransaccion':'Retiro','monto':'10000','fecha':'15/09/2020'},
	{'codigotransaccion':'799475','tipotransaccion':'Deposito','monto':'22000','fecha':'17/09/2020'},
	{'codigotransaccion':'298403','tipotransaccion':'Transferencia','monto':'15000','fecha':'19/09/2020'},
	{'codigotransaccion':'075888','tipotransaccion':'Retiro','monto':'134000','fecha':'24/09/2020'},
	{'codigotransaccion':'198737','tipotransaccion':'Deposito','monto':'22500','fecha':'30/09/2020'}]

    return (
			<TableContainer component={Paper} style={style.space}>
				<Table style={style.table} aria-label="customized table">
					<TableHead style={style.tableHead}>
						<TableRow>
							<TableCell style={style.tableCell} align="center">
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
						{context.map((transaccion, index) => (
							<TableRow key={'transaccion' + index}>
								<TableCell>
									<Typography>{transaccion.codigotransaccion}</Typography>
								</TableCell>
								<TableCell>
									<Typography>{transaccion.tipotransaccion}</Typography>	
								</TableCell>
								<TableCell>
									<Typography>{"$ "+transaccion.monto}</Typography>
								</TableCell>
								<TableCell>
									<Typography>{transaccion.fecha}</Typography>
								</TableCell>
							</TableRow>
						))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}
export default TablaH;