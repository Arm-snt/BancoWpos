import React, { useContext, useState, Fragment } from 'react';
import ContextProvider from '../context';
import Login from './login';
import Registro from './registro'
import Notificacion from '../notificacion'

export default function contextPro() {
    return (
        <ContextProvider>
            <Notificacion />
            <Registro />
        </ContextProvider>
    )
}
