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
      jogo: '',
      semApostas: ''
    }
  }
   componentDidMount(){
     this.getResponse()
  }
  
  async getResponse(){
    const id = localStorage.getItem('idUser')
    const response = await api.get(`/users/${id}`)
    this.getGames(id)
    return this.setState({ user: response.data.name})
  }
  async handleSubmit(e){
    e.preventDefault()
    return this.redirecionarPara(this.state.jogo)
  }

  redirecionarPara(jogo){
    if(!jogo) return window.alert('Selecione um jogo!')
    return this.props.history.push(`/${jogo}`)
  }
  formatarHora(data) {
    const dt = new Date(data)
    let string = dt.toLocaleTimeString()
    string = string.split(':')
    const [hora, minutos] = string
    return `${hora}:${minutos}`
  }
  
  async getGames(id){
    const responseLoto = await api.get(`/games/${id}/1`)
    const responseMega = await api.get(`/games/${id}/2`)
    const responseQuina = await api.get(`/games/${id}/3`)

    if(!responseLoto.data.nums){
      this.setState({semApostas: 'sem-aposta'})
    }else{
      const numsLoto = responseLoto.data.nums.split('-')
      this.setState({ loto: numsLoto})
      if(responseLoto.data.contest){
        const dataConcursoLoto = new Date(responseLoto.data.contest.date)
        this.setState({ dataLoto: dataConcursoLoto.toLocaleDateString()})
        this.setState({ horaLoto: this.formatarHora(dataConcursoLoto)})
      }
    }

    if(!responseMega.data.nums){
      this.setState({semApostas: 'sem-aposta'})
    }else{      
      const numsMega = responseMega.data.nums.split('-')
      this.setState({ mega: numsMega})
      if(responseMega.data.contest){
        const dataConcursoMega = new Date(responseMega.data.contest.date)
        this.setState({ dataMega: dataConcursoMega.toLocaleDateString()})
        this.setState({ horaMega: this.formatarHora(dataConcursoMega) })      
      }
    }
    
    if(!responseQuina.data.nums){
      this.setState({ semApostas: 'sem-aposta' })
    }else{
      const numsQuina = responseQuina.data.nums.split('-')
      this.setState({ quina: numsQuina})
      if(responseQuina.data.contest){
        const dataConcursoQuina = new Date(responseQuina.data.contest.date)
        this.setState({ dataQuina: dataConcursoQuina.toLocaleDateString()})
        this.setState({ horaQuina: this.formatarHora(dataConcursoQuina) })
      }
    }
  }
  render(){
    return ( 
      <>
        <Menu />
        <div className='home-usuario'>
          <header className="cabecalho">
            <h1 className='ola'>{`Olá, ${this.state.user} confira os sorteios da semana`}</h1>   
              <div className="selecao-jogo">
                <Resultados /> 
                <form onSubmit={e => this.handleSubmit(e)}>
                  <label htmlFor="tipos">Fazer uma aposta?</label>
                  <select name="tipos" value={this.state.jogo}
                    onChange={e => this.setState({ jogo: e.target.value })}>
                    <option value={undefined}>Selecione um Jogo</option>
                    <option value={'lotofacil'} >Lotofácil</option>
                    <option value={'megasena'}>Mega Sena</option>
                    <option value={'quina'}>Quina</option>
                  </select>
                  <button type='submit'>Fazer uma aposta</button>
                </form>
              </div>''
          </header>
          <div className="ultimas-apostas">
            <h3>Suas últimas apostas</h3>
            <div className="jogos">
              <Jogos nome='Lotofácil' concursoData={this.state.dataLoto}
              concursoHora={this.state.horaLoto} tipo='1'
                jogos={this.state.loto} classe={`loto ${this.state.semApostas}`} />
              
              <Jogos nome='Mega Sena' concursoData={this.state.dataMega}
              concursoHora={this.state.horaMega} tipo='2'
              jogos={this.state.mega} classe={`mega ${this.state.semApostas}`}/>            
              
              <Jogos nome='Quina' concursoData={this.state.dataQuina}
              concursoHora={this.state.horaQuina} tipo='3'
              jogos={this.state.quina} classe={`quina ${this.state.semApostas}`}/>
            </div>
          </div>
      </div>
    </>
    )
  }
}