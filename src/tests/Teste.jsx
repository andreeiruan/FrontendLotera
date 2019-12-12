import React, { Component } from 'react'

export default class Teste extends Component{
  constructor(props){
    super(props)
    this.state = {
      counter: 0
    }
  }

  add(){
    let counter = this.state.counter
    counter += 1
    const divTest = document.getElementById('teste')
    const h2 = document.querySelector('#teste>h2')
    h2.innerHTML = counter.toString()
    this.setState({ counter: counter })
  }
  sub(){
    let counter = this.state.counter
    counter -= 1
    const divTest = document.getElementById('teste')
    const h2 = document.querySelector('#teste>h2')
    h2.innerHTML = counter.toString()
    this.setState({ counter: counter })
  }

  render(){
    return ( 
      <>
        <h1>Testando ...</h1>
        <button onClick={e => this.add()}>+</button>
        <button onClick={e => this.sub()}>-</button>
        <div id="teste">
          <h2></h2>
        </div>
      </>

      )
  }
}