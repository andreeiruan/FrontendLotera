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
   console.log('ola')
 }

  async getConcurso(type, concurso){
    const response = await api.get(`/contest/${type}/${concurso}`)
    console.log('olaa', response)
  }

  render(){
    return(
      <h1>Resultados</h1>
    )
  }
}