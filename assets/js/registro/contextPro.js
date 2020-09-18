import React, { useContext, useState, Fragment } from 'react';
import ContextProvider from '../context';
import Login from './login';
import Registro from './registro'
import Notificacion from '../notificacion'

export default function contextPro() {
    //Esta funcion solo hace de contenedor para poder acceder desde registro a todos los metodos del ContextProvider
    return (
        <ContextProvider>
            <Notificacion />
            <Registro />
        </ContextProvider>
    )
}
