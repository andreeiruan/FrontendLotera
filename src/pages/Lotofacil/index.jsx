import React from 'react'
import api from '../../services/api'

import Menu from '../../components/Menu'
import './style.css'

export default class Lotofacil extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      concursos: [],
      value: '',
      contest: undefined,
      numeros: [],
    }   
  }

  componentDidMount(){
    this.getConcursos()
  }
  async handleSubmit(e){
    e.preventDefault()
    const { id_type, contest, numeros } = this.state

    if(numeros.length > 15) return window.alert('Você selecionou mais de 15 números')
    if(numeros.length < 15) return window.alert('Você selecionou menos de 15 números')
    if(!contest) return window.alert('Selecione um concurso!')

    const nums = numeros.join('-')

    await api.post('/games', {
      id_type: 1,
      id_contest: contest,
      nums
    })

    return this.props.history.push('/home')
  }

  setBackground(numeros) {
    for(let i = 0; i < 25; i++){
      const btn = document.getElementById(`${i}`)
      if(numeros.includes(i)){
        btn.setAttribute('class', 'selecionado')
      }else{
        if(btn){
          btn.removeAttribute('class', 'selecionado')
        }
      }
    }
  }
  
  selectNum(e){
    e.preventDefault()
    const n = parseInt(e.target.value)
    const btn = document.getElementById(`${n}`)
    btn.setAttribute('class', 'selecionado')  
    this.setState({value: n})

    if(this.state.numeros.includes(n)){
      btn.removeAttribute('class', 'selecionado')
      const apagarIndice = this.state.numeros.indexOf(n)
      this.state.numeros.splice(apagarIndice, 1)
      return 
    }

    this.state.numeros.push(parseInt(n))
    let numeros = this.state.numeros.sort((a, b) => a - b)  
  }

  surpresinha(e){
    e.preventDefault()
    let numeros = []

    for(let i = 0; i < 15; i++){
      let n = Math.random() * 25          
      n = parseInt(n.toFixed(0))

      if (n === 0 || numeros.includes(n)){
        i -= 1
      }else{        
        numeros.push(n)
      }      
    }   
    
    numeros = numeros.sort((a, b) => a - b)
    this.setState({ numeros: numeros})
    this.setBackground(numeros)
  }

  async getConcursos(){
    const concursos =  await api.get('/contests/1')
    this.setState({concursos: concursos.data})
  }

  formatarData(data){
    const date = new Date(data)
    return date.toLocaleDateString()    
  }

  
  render(){
    return (
      <> 
        <Menu />
        <div className="loto">
          <h1>Lotofácil</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <ul className="escolha-loto">
              <li><button id='1' value={1} 
              onClick={e => this.selectNum(e)}>1</button></li>
              <li><button id='2' value={2} 
              onClick={e => this.selectNum(e)}>2</button></li>
              <li><button id='3' value={3} 
              onClick={e => this.selectNum(e)}>3</button></li>
              <li><button id='4' value={4} 
              onClick={e => this.selectNum(e)}>4</button></li>
              <li><button id='5' value={5} 
              onClick={e => this.selectNum(e)}>5</button></li>
              <li><button id='6' value={6} 
              onClick={e => this.selectNum(e)}>6</button></li>
              <li><button id='7' value={7} 
              onClick={e => this.selectNum(e)}>7</button></li>
              <li><button id='8' value={8} 
              onClick={e => this.selectNum(e)}>8</button></li>
              <li><button id='9' value={9} 
              onClick={e => this.selectNum(e)}>9</button></li>
              <li><button id='10' value={10} 
              onClick={e => this.selectNum(e)}>10</button></li>
              <li><button id='11' value={11} 
              onClick={e => this.selectNum(e)}>11</button></li>
              <li><button id='12' value={12} 
              onClick={e => this.selectNum(e)}>12</button></li>
              <li><button id='13' value={13} 
              onClick={e => this.selectNum(e)}>13</button></li>
              <li><button id='14' value={14} 
              onClick={e => this.selectNum(e)}>14</button></li>
              <li><button id='15' value={15} 
              onClick={e => this.selectNum(e)}>15</button></li>
              <li><button id='16' value={16} 
              onClick={e => this.selectNum(e)}>16</button></li>
              <li><button id='17' value={17} 
              onClick={e => this.selectNum(e)}>17</button></li>
              <li><button id='18' value={18} 
              onClick={e => this.selectNum(e)}>18</button></li>
              <li><button id='19' value={19} 
              onClick={e => this.selectNum(e)}>19</button></li>
              <li><button id='20' value={20} 
              onClick={e => this.selectNum(e)}>20</button></li>
              <li><button id='21' value={21} 
              onClick={e => this.selectNum(e)}>21</button></li>
              <li><button id='22' value={22} 
              onClick={e => this.selectNum(e)}>22</button></li>
              <li><button id='23' value={23} 
              onClick={e => this.selectNum(e)}>23</button></li>
              <li><button id='24' value={24} 
              onClick={e => this.selectNum(e)}>24</button></li>
              <li><button id='25' value={25} 
              onClick={e => this.selectNum(e)}>25</button></li>
            </ul>
            <button id="surpresinha"
            onClick={e => {
              this.surpresinha(e)}}>Surpresinha</button>
            <ul className="escolhidos">           
              {this.state.numeros.map(( num, index) => (
                
                <li key={index}>{num}</li>
              )) }
            </ul>
            <hr />
            <label htmlFor="concursos">Concursos</label>
            <select name="Concursos" 
            onChange={e => this.setState({ contest: e.target.value })} >
                <option value={undefined}>Selecione um concurso</option>
              {this.state.concursos.length > 0 ? this.state.concursos.map(c => (
                <option key={c.id} value={c.id}>{this.formatarData(c.date)}</option>
              )) : (<option value={undefined}>Não existem Concursos</option>)}
            </select>
            <button id="submit" type='submit'>Apostar</button>
          </form>
        </div>
      </>
    )
  }
}