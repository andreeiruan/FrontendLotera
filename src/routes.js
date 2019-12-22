import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Home from './pages/Home'
import Lotofacil from './pages/Lotofacil'
import MegaSena from './pages/Megasena'
import Quina from './pages/Quina'

import PrivateRoute from './PrivateRoute'
import JogosUsuario from './pages/JogosUsuario'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/cadastro' component={Cadastro}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/' component={Home}/>
        <PrivateRoute path='/lotofacil' component={Lotofacil}/>
        <PrivateRoute path='/megasena' component={MegaSena}/>        
        <PrivateRoute path='/quina' component={Quina}/>  
        <PrivateRoute path='/jogos/:tipo' component={JogosUsuario}/>      
        <PrivateRoute component={Home}/>
      </Switch>
    </BrowserRouter>
    )
}