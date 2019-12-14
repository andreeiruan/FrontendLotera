import React, { Component } from 'react'
import api from '../../services/api'

import './style.css'

export default class Resultados extends Component{
  constructor(props){
    super(props)
    this.state = {
      type: 1,
      concurso: 1
    }
  }
 componentDidMount(){
   this.getConcurso(1)
 }

  async getConcurso(type){
    const response = await api.get(`/contests/${type}`)
    if(!response){
      console.log('Não tem response')
    }
    console.log(response)
  }
  add(){
    let conc = this.state.concurso
    conc += 1
    this.setState({ concurso: conc})
  }
  remove(){
    let conc = this.state.concurso
    if(conc < 2){
      return 
    }
    conc -= 1
    this.setState({ concurso: conc })
  }
  render(){
    return(
      <div className="resultados">        
        <button onClick={e => this.remove()}>Anterior</button>
        <div className="info-concurso">
          <h1>Lotofácil</h1>
          <p>Concurso: {this.state.concurso}</p>
          <span>
            1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
            <hr/>
          </span>
          <p>Data do Sorteio: 12/12/2019</p>
        </div>
        <button onClick={e => this.add()} >Proximo</button>
      </div>
    )
  }
}