import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const Context = createContext();

class ContextProvider extends Component {

    constructor(props){
        super(props);
        this.state ={
			transaccion: [],
			cliente:[],
			message: {},
        }
        this.readTransacciones();
        this.readCliente();
    }

    //Read transacciones
    readTransacciones() {
		axios
		.get('/api/transaccion/read')
		.then((response) => {
			this.setState({
					transaccion: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	readCliente() {
		axios
		.get('/api/transaccion/readCliente')
		.then((response) => {
			this.setState({
					cliente: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

    //Create Transacciones
    createTransacciones(event, data) {
		event.preventDefault();
		axios
			.post('/api/transaccion/create', data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let transaccion = [ ...this.state.transaccion ];
					transaccion.push(response.data.transaccion);
					this.setState({
						transaccion: transaccion,
						cliente: response.data.cliente,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	createCliente(event, data) {
		event.preventDefault();
		axios
			.post('/api/transaccion/createCliente', data)
			.then((response) => {
				if (response.data.message.level === 'success') {
					let transaccion = [ ...this.state.transaccion ];
					transaccion.push(response.data.todo);
					this.setState({
						transaccion: transaccion,
						message: response.data.message
					});
				} else {
					this.setState({
						message: response.data.message
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
    
    render() {
        return (
            <Context.Provider
				value={{
					...this.state,
					//updateTodo: this.updateTodo.bind(this),
					//updatePrestamoEle: this.updatePrestamoEle.bind(this),
					//deleteTodo: this.deleteTodo.bind(this),
					createTransacciones: this.createTransacciones.bind(this),
					createCliente: this.createCliente.bind(this),
					setMessage: (message) => this.setState({ message: message })
				}}>
				{this.props.children}
			</Context.Provider>
        )
    }
}
export default  ContextProvider;