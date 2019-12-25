import React, { Component } from 'react'
import api from '../../services/api'

import './style.css'

export default class Resultados extends Component{
  constructor(props){
    super(props)
    this.state = {
      type: 1,
      numeros: [],
      concurso: 0,
      nomeTipo: 'Lotofácil',
      data: ''

    }
  }
 componentDidMount(){
   api.get(`/results/${this.state.type}`).then( response => {
     let numeros = response.data.result.split('-')
     const data = new Date(response.data.results.date)
     this.setState({ data: data.toLocaleDateString()})
     this.setState({ numeros: numeros})
     this.setState({ concurso: response.data.results.id}) 
   })
 }
 async mudarJogo(sinal){
   let type = this.state.type
   if (sinal === 'anterior'){
     if (type === 3) {
       type = 1
     } else {
       type += 1
     }
   }else{
     if (type === 1) {
       type = 3
     } else {
       type -= 1
     }
   }
   
    const response = await api.get(`/results/${type}`)
    this.setState({ type })
    let numeros = response.data.result.split('-')
    this.setState({ numeros: numeros })
    this.setState({ concurso: response.data.results.id })
    const data = new Date(response.data.results.date)
    this.setState({ data: data.toLocaleDateString() })

   switch (type) {
     case 1:
       this.setState({ nomeTipo: 'Lotofácil' })
       break
     case 2:
       this.setState({ nomeTipo: 'Mega Sena' })
       break
     case 3:
       this.setState({ nomeTipo: 'Quina' })
       break
     default:
       this.setState({ nomeTipo: 'Lotofácil' })
   }

 } 
 
  render(){
    return(
      <>
      <div className="resultados">        
        <button onClick={e => this.mudarJogo('anterior')} className="btn">Anterior</button>
        <div className="info-concurso">
        <h1>{this.state.nomeTipo}</h1>
          <ul>
            {this.state.numeros.map((num, indice) => (
              <li key={indice}><button>{num}</button></li>
              ))}
          </ul>
          <p>Concurso: {this.state.concurso}</p>
          <p>Data do Sorteio: {this.state.data}</p>
        </div>
        <button onClick={e => this.mudarJogo('proximo')} className="btn">Proximo</button>
      </div>
        <button onClick={ e => console.log('ola')} id="ver-mais">Ver mais</button>
      </>
    )
  }
}