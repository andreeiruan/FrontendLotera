import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Home from './pages/Home'
import Lotofacil from './pages/Lotofacil'
import MegaSena from './pages/Megasena'
import Quina from './pages/Quina'
import Teste from './tests/Teste'

import PrivateRoute from './PrivateRoute'

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/teste' component={Teste}/>
        <Route path='/cadastro' component={Cadastro}/>
        <Route exact path='/login' component={Login}/>
        <PrivateRoute exact path='/' component={Home}/>
        <PrivateRoute path='/lotofacil' component={Lotofacil}/>
        <PrivateRoute path='/megasena' component={MegaSena}/>        
        <PrivateRoute path='/quina' component={Quina}/>        
        <PrivateRoute component={Home}/>
      </Switch>
    </BrowserRouter>
    )
}