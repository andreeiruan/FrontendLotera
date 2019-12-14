import React, { Component } from 'react'

import api from '../../services/api'

import './style.css'

import Jogos from '../../components/Jogos'
import Menu from '../../components/Menu'
import Resultados from '../../components/Resultados'

export default class Home extends Component{
  constructor(props){
    super(props)
    this.state = {
      loto: [],
      dataLoto: '',
      horaLoto: '', 
      mega: [],
      dataMega: '',
      horaMega: '',      
      quina: [],
      dataQuina: '',
      horaQuina: '',
      user: '',
      jogo: ''
    }
  }
   componentDidMount(){
     const id = localStorage.getItem('idUser')
     const response = api.get(`/users/${id}`)
       .then(resp => this.setState({ user: resp.data.name }))
     this.getGames(id)
     if(!response){
       console.log('Não tem response ')
     }
  }

  async handleSubmit(e){
    e.preventDefault()
    console.log(this.state)
    return this.redirecionarPara(this.state.jogo)
  }

  redirecionarPara(jogo){
    if(!jogo) return window.alert('Selecione um jogo!')
    return this.props.history.push(`/${jogo}`)
  }
  
  async getGames(id){
    const responseLoto = await api.get(`/games/${id}/1`)
    const responseMega = await api.get(`/games/${id}/2`)
    const responseQuina = await api.get(`/games/${id}/3`)

    this.setState({ loto: responseLoto.data})
    if(this.state.loto.contest){
      const dataConcursoLoto = new Date(this.state.loto.contest.date)
      this.setState({ dataLoto: dataConcursoLoto.toLocaleDateString()})
      this.setState({ horaLoto: dataConcursoLoto.toLocaleTimeString()})
    }
    
    this.setState({ mega: responseMega.data})
    if(this.state.mega.contest){
      const dataConcursoMega = new Date(this.state.mega.contest.date)
      this.setState({ dataMega: dataConcursoMega.toLocaleDateString()})
      this.setState({ horaMega: dataConcursoMega.toLocaleTimeString() })      
    }

    this.setState({ quina: responseQuina.data})
    if(this.state.quina.contest){
      const dataConcursoQuina = new Date(this.state.quina.contest.date)
      this.setState({ dataQuina: dataConcursoQuina.toLocaleDateString()})
      this.setState({ horaQuina: dataConcursoQuina.toLocaleTimeString() })
    }
  }
  render(){
    return ( 
      <>
        <Menu />
        <h1 className='ola'>{`Olá, ${this.state.user}`}</h1>   
        <div className='home-usuario'>
        <Resultados />     
        <div className="jogos">
          <h3>Suas últimas apostas</h3>
          <Jogos nome='Lotofácil' concursoData={this.state.dataLoto}
          concursoHora={this.state.horaLoto}
            jogos={this.state.loto} classe={'loto'} />
          <hr/>
          <Jogos nome='Mega Sena' concursoData={this.state.dataMega}
          concursoHora={this.state.horaMega}
          jogos={this.state.mega} classe={'mega'}/>            
          <hr/>
          <Jogos nome='Quina' concursoData={this.state.dataQuina}
          concursoHora={this.state.horaQuina}
          jogos={this.state.quina} classe={'quina'}/>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="tipos">Jogo</label>
            <select name="tipos" value={this.state.jogo}
              onChange={e => this.setState({ jogo: e.target.value })}>
              <option value={undefined}>Selecione um Jogo</option>
              <option value={'lotofacil'} >Lotofácil</option>
              <option value={'megasena'}>Mega Sena</option>
              <option value={'quina'}>Quina</option>
            </select>
            <button type='submit'>Fazer uma aposta</button>
          </form>
        </div>
      </div>
    </>
    )
  }
}