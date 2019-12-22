import React, { Component } from 'react';
import Menu from '../../components/Menu'
import api from '../../services/api'

import './style.css'

export default class JogosUsuario extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuario: localStorage.getItem('idUser'),
      tipoJogo: this.props.match.params.tipo,
      jogos: [],
      jogo: '',
      classe: ''
    }
  }

  componentDidMount(){
    this.getJogos()
  }
  async getJogos(){
    const usuario = this.state.usuario
    const tipo = this.state.tipoJogo
    const response = await api.get(`/everygames/${usuario}/${tipo}`)
   
    this.setState({ jogos: response.data})
    if (parseInt(tipo) === 1){
      this.setState({jogo: 'Lotofácil'})
      this.setState({classe: 'loto'})
    }else if(parseInt(tipo) === 2){
      this.setState({jogo: 'Mega Sena'})
      this.setState({classe: 'mega'})
    }else{
      this.setState({jogo: 'Quina'})
      this.setState({classe: 'quina'})
    }
  
  }

  formatarNumeros(numeros){
    const lista = numeros.split('-')
    return lista
  }
  formatarData(data){
    const dt = new Date(data)
    return dt.toLocaleDateString()
  }

  render() {
    return (
      <>
        <Menu />
        <div className={`container-vermais ${this.state.classe}`}>
          <h1>{this.state.jogo}</h1>
          <ul>
          <h3>Seus jogos</h3>
            {this.state.jogos.map(jogo => (
              <li key={jogo.id} className="principal">
                <h4>Concurso {jogo.contest.id}</h4>
                <div className="numeros">
                  <ul>
                    {this.formatarNumeros(jogo.nums).map((num, indice) => (
                      <li key={indice}>{num}</li>
                    ))}                                  
                  </ul>
                </div>
                  <p>Data do concurso: {this.formatarData(jogo.contest.date)}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}
