import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default class Jogos extends Component{
  render(){
    return(
        <div className={`container-jogo ${this.props.classe}`} >
          <h3>{this.props.nome}</h3>
              {this.props.jogos.length > 0 ? (
                <>
                <ul className="numeros-ultimas-apostas">
                  {this.props.jogos.map((jogo, indice )=> (
                    <li key={indice}><button>{jogo}</button></li>
                  ))}
                </ul>
                  <hr/>
                  <section>
                    <p>Data do Sorteio {this.props.concursoData}</p>
                    <p>Hora do Sorteio {this.props.concursoHora} </p>
                  </section>
            <Link to={`/jogos/${this.props.tipo}`}><button className="ver-mais">Ver mais</button></Link>
                </>                
              ): (
            <>
              <p id="sem">Você não tem apostas ainda</p>
            </>
              )
              }
        </div>
      
    )
  }
}

