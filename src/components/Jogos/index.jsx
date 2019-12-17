import React, { Component } from 'react'

import './style.css'

export default class Jogos extends Component{
  render(){
    return(
        <div className={`container-jogo ${this.props.classe}`} >
          <h3>{this.props.nome}</h3>
              {this.props.jogos.msg ? (
                <> 
                <p>{this.props.jogos.msg}</p>                
                </>
              ): (
                <>
                <ul className="numeros-ultimas-apostas">
                  {this.props.jogos.map((jogo, indice )=> (
                    <li key={indice}><button>{jogo}</button></li>
                  ))}
                </ul>
                  <hr/>
                  <section>
                    <p>Data do Concurso: {this.props.concursoData}</p>
                    <p>Hora: {this.props.concursoHora} </p>
                  </section>
                  <button className="ver-mais">Ver mais</button>
                </>
              )
              }
        </div>
      
    )
  }
}

