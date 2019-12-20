import React, { Component } from 'react';
import Menu from '../../components/Menu'
import api from '../../services/api'

import './style.css'

export default class JogosUsuario extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuario: localStorage.getItem('idUser'),
      tipoJogo: this.props.match.params.id_user
    }
  }

  componentDidMount(){
    this.getJogos()
  }
  async getJogos(){
    const usuario = this.state.usuario
    const tipo = this.state.tipoJogo
    const response = await api.get(`/games/${usuario}/${tipo}`)

    console.log(response)
  }

  render() {
    return (
      <>
        <Menu />
          <h1>{this.props.match.params.id_user}</h1>
    <p>{this.state.usuario}</p>
      </>
    )
  }
}
