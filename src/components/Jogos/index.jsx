import React, { Component } from 'react'

import './style.css'

export default class Jogos extends Component{
  render(){
    return(
      <div className="container">
        <div className={`container-jogo ${this.props.classe}`} >
          <h3>{this.props.nome}</h3>
          <ul>
            <li>
              {this.props.jogos.msg ? (
                <> 
                <p>{this.props.jogos.msg}</p>                
                </>
              ): (
                <>
                  <p>{this.props.jogos.nums}</p>
                  <hr/>
                  <p>Data do Concurso: {this.props.concursoData}</p>
                  <p>Hora: {this.props.concursoHora} </p>
                  <button>Ver mais</button>
                </>
              )
              }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

