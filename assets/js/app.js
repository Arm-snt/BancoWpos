import React from "react";
import ReactDOM from "react-dom";
import "../css/app.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import Grid from '@material-ui/core/Grid';
import Login from './registro/login'
import Registro from './registro/contextPro'
import Pagina from './tabs/pagina'

//Esta es mi funcion indice la utilizo para asignar rutas a los componentes
//Registro es mi pagina de inicio ya que cambie la ruta en el controldaor indice
function App(props){
    return(
        <Router>
			<MuiThemeProvider theme={theme}>
				<Grid container>
					<Switch>
						<Route path="/" exact component={Registro} /> 
						<Route path="/Login" component={Login} />
						<Route path="/Pagina" component={Pagina} />
					</Switch>
				</Grid>
			</MuiThemeProvider>
		</Router>
    );
}
ReactDOM.render(<App />, document.getElementById("root"));