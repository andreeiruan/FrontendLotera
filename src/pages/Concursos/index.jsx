import React, { Component } from 'react'
import api from '../../services/api'

import Menu from '../../components/Menu'
import './style.css'

export default class Concursos extends Component{
  constructor(props){
    super(props)
    this.state = {
      tipo: this.props.match.params.tipo,
      titulo: '',
      concursos: []
    }
  }
  componentDidMount(){
    this.getConcursos()
  }
  
  async getConcursos() {
    const tipo = this.state.tipo
    const response = await api.get(`/contestsfortype/${tipo}`)
    
    this.setState({ concursos: response.data })
    if (parseInt(tipo) === 1) {
      this.setState({ titulo: 'Lotofácil' })
      this.setState({ classe: 'loto' })
    } else if (parseInt(tipo) === 2) {
      this.setState({ titulo: 'Mega Sena' })
      this.setState({ classe: 'mega' })
    } else {
      this.setState({ titulo: 'Quina' })
      this.setState({ classe: 'quina' })
    }

  }
  formatarData(data) {
    const dt = new Date(data)
    return dt.toLocaleDateString()
  }
  formatarHora(data) {
    const dt = new Date(data)
    let string = dt.toLocaleTimeString()
    string = string.split(':')
    const [ hora, minutos ] = string
    return `${hora}:${minutos}`
  }
  render(){
    return (
      <>  
        <Menu />
        <h1>Concursos da {this.state.titulo}</h1>
        <div className="container-concursos">
          <ul>
            {this.state.concursos.map(conc => (
              <li key={conc.id}>
                <section>
                  <p>Concurso {conc.id}</p>
                  <p>Data do Concurso: {this.formatarData(conc.date)}</p>
                  <p>Hora do concurso: {this.formatarHora(conc.date)}</p>
                  {conc.accomplished ? (
                  <p>{conc.results[0].result}</p>
                  ) : (
                    <p>Concurso não realizado</p>
                  )}
                </section>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}