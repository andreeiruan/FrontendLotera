import React, {Component } from 'react'
import api from '../../services/api'

import { isAuthenticated, logout } from '../../services/auth'

import './style.css'

export default class Menu extends Component{
  constructor(props){
    super(props) 
    this.state ={
      auth: isAuthenticated()
    }
  }
  sair(){
    logout() 
  
  }
  renderOpcoes(){
    return this.state.auth ? (
      <ul>
        <li><a onClick={this.sair} href="/">Sair</a></li>
      </ul>
    ) : (<ul>
          <li><a href="/login">Entrar</a></li>
          <li><a href="/cadastro">Cadastrar</a></li>
        </ul>)
  }

  render(){
    return (
      <nav className="menu-nav">
        <a href="/">
          <h2>Loteria</h2>
        </a>
        <div className="menu-nav">
          {this.renderOpcoes()}
        </div>
      </nav>
    )
  }
}


