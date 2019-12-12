import React, { Component } from 'react'

import './style.css'

import Menu from '../../components/Menu'
import api from '../../services/api'

export default class MegaSena extends Component{
  constructor(props){
    super(props)
    this.state = {
      id_user: localStorage.getItem('idUser'),
      id_contest: undefined,
      numeros: [],
      concursos: [],
    }
  }
  componentDidMount(){
    this.getConcursos()
    console.log(this.state.concursos)

  }

  async getConcursos(){
    const concursos = await api.get('/contests/2')
    this.setState({ concursos: concursos.data})

  }

  async handleSubmit(e){
    e.preventDefault()
    const { id_contest, numeros } = this.state

    if(numeros.length == 0) return window.alert('Selecione os números da sua aposta!')
    if(numeros.length > 6) return window.alert('Você selecionou mais de 6 números!')
    if(numeros.length < 6) return window.alert('Você selecionou menos de 6 números!')
    if(!id_contest) return window.alert('Selecione um concurso!')

    const nums = numeros.join('-')

    await api.post('/games', {
      id_type: 2,
      id_contest,
      nums
    })

    window.alert('Apostado!! Boa sorte!!')
    this.setState({ numeros: [], id_contest: undefined})
    this.setBackground(this.state.numeros)
  }

  formatarData(data){
    const date = new Date(data)
    return date.toLocaleDateString()
  }
  selectNum(e){
    e.preventDefault()
    const n = parseInt(e.target.value)
    let nums = this.state.numeros

    const btn = document.getElementById(`${n}`)

    if(!nums.includes(n)){
      nums.push(n)
      btn.setAttribute('class', 'selecionado-mega')
    }else{
      const apagarNum = nums.indexOf(n)
      nums.splice(apagarNum, 1) 
      btn.removeAttribute('class', 'selecionado-mega')
    }

    nums = nums.sort((a, b) => a - b)
    return this.setState({ numeros: nums })
  }
  surpresinha(e) {
    e.preventDefault()
    let numeros = []

    for (let i = 0; i < 6; i++) {
      let n = Math.random() * 60
      n = parseInt(n.toFixed(0))

      if (n === 0 || numeros.includes(n)) {
        i -= 1
      } else {
        numeros.push(n)
      }
    }

    numeros = numeros.sort((a, b) => a - b)
    this.setState({ numeros: numeros })
    this.setBackground(numeros)
  }

  setBackground(numeros) {
    for (let i = 0; i < 60; i++) {
      const btn = document.getElementById(`${i}`)
      if (numeros.includes(i)) {
        btn.setAttribute('class', 'selecionado-mega')
      } else {
        if (btn) {
          btn.removeAttribute('class', 'selecionado-mega')        
        }
      }
    }
  }

  render(){
    return(
      <> 
        <Menu /> 
        <div className="mega">
          <h1>MegaSena</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
            <ul className="escolha-mega">
              <li><button id='1' value={1} onClick={e => this.selectNum(e)}>1</button></li>
              <li><button id='2' value={2} onClick={e => this.selectNum(e)}>2</button></li>
              <li><button id='3' value={3} onClick={e => this.selectNum(e)}>3</button></li>
              <li><button id='4' value={4} onClick={e => this.selectNum(e)}>4</button></li>
              <li><button id='5' value={5} onClick={e => this.selectNum(e)}>5</button></li>
              <li><button id='6' value={6} onClick={e => this.selectNum(e)}>6</button></li>
              <li><button id='7' value={7} onClick={e => this.selectNum(e)}>7</button></li>
              <li><button id='8' value={8} onClick={e => this.selectNum(e)}>8</button></li>
              <li><button id='9' value={9} onClick={e => this.selectNum(e)}>9</button></li>
              <li><button id='10' value={10} onClick={e => this.selectNum(e)}>10</button></li>
              <li><button id='11' value={11} onClick={e => this.selectNum(e)}>11</button></li>
              <li><button id='12' value={12} onClick={e => this.selectNum(e)}>12</button></li>
              <li><button id='13' value={13} onClick={e => this.selectNum(e)}>13</button></li>
              <li><button id='14' value={14} onClick={e => this.selectNum(e)}>14</button></li>
              <li><button id='15' value={15} onClick={e => this.selectNum(e)}>15</button></li>
              <li><button id='16' value={16} onClick={e => this.selectNum(e)}>16</button></li>
              <li><button id='17' value={17} onClick={e => this.selectNum(e)}>17</button></li>
              <li><button id='18' value={18} onClick={e => this.selectNum(e)}>18</button></li>
              <li><button id='19' value={19} onClick={e => this.selectNum(e)}>19</button></li>
              <li><button id='20' value={20} onClick={e => this.selectNum(e)}>20</button></li>
              <li><button id='21' value={21} onClick={e => this.selectNum(e)}>21</button></li>
              <li><button id='22' value={22} onClick={e => this.selectNum(e)}>22</button></li>
              <li><button id='23' value={23} onClick={e => this.selectNum(e)}>23</button></li>
              <li><button id='24' value={24} onClick={e => this.selectNum(e)}>24</button></li>
              <li><button id='25' value={25} onClick={e => this.selectNum(e)}>25</button></li>
              <li><button id='26' value={26} onClick={e => this.selectNum(e)}>26</button></li>
              <li><button id='27' value={27} onClick={e => this.selectNum(e)}>27</button></li>
              <li><button id='28' value={28} onClick={e => this.selectNum(e)}>28</button></li>
              <li><button id='29' value={29} onClick={e => this.selectNum(e)}>29</button></li>
              <li><button id='30' value={30} onClick={e => this.selectNum(e)}>30</button></li>
              <li><button id='31' value={31} onClick={e => this.selectNum(e)}>31</button></li>
              <li><button id='32' value={32} onClick={e => this.selectNum(e)}>32</button></li>
              <li><button id='33' value={33} onClick={e => this.selectNum(e)}>33</button></li>
              <li><button id='34' value={34} onClick={e => this.selectNum(e)}>34</button></li>
              <li><button id='35' value={35} onClick={e => this.selectNum(e)}>35</button></li>
              <li><button id='36' value={36} onClick={e => this.selectNum(e)}>36</button></li>
              <li><button id='37' value={37} onClick={e => this.selectNum(e)}>37</button></li>
              <li><button id='38' value={38} onClick={e => this.selectNum(e)}>38</button></li>
              <li><button id='39' value={39} onClick={e => this.selectNum(e)}>39</button></li>
              <li><button id='40' value={40} onClick={e => this.selectNum(e)}>40</button></li>
              <li><button id='41' value={41} onClick={e => this.selectNum(e)}>41</button></li>
              <li><button id='42' value={42} onClick={e => this.selectNum(e)}>42</button></li>
              <li><button id='43' value={43} onClick={e => this.selectNum(e)}>43</button></li>
              <li><button id='44' value={44} onClick={e => this.selectNum(e)}>44</button></li>
              <li><button id='45' value={45} onClick={e => this.selectNum(e)}>45</button></li>
              <li><button id='46' value={46} onClick={e => this.selectNum(e)}>46</button></li>
              <li><button id='47' value={47} onClick={e => this.selectNum(e)}>47</button></li>
              <li><button id='48' value={48} onClick={e => this.selectNum(e)}>48</button></li>
              <li><button id='49' value={49} onClick={e => this.selectNum(e)}>49</button></li>
              <li><button id='50' value={50} onClick={e => this.selectNum(e)}>50</button></li>
              <li><button id='51' value={51} onClick={e => this.selectNum(e)}>51</button></li>
              <li><button id='52' value={52} onClick={e => this.selectNum(e)}>52</button></li>
              <li><button id='53' value={53} onClick={e => this.selectNum(e)}>53</button></li>
              <li><button id='54' value={54} onClick={e => this.selectNum(e)}>54</button></li>
              <li><button id='55' value={55} onClick={e => this.selectNum(e)}>55</button></li>
              <li><button id='56' value={56} onClick={e => this.selectNum(e)}>56</button></li>
              <li><button id='57' value={57} onClick={e => this.selectNum(e)}>57</button></li>
              <li><button id='58' value={58} onClick={e => this.selectNum(e)}>58</button></li>
              <li><button id='59' value={59} onClick={e => this.selectNum(e)}>59</button></li>
              <li><button id='60' value={60} onClick={e => this.selectNum(e)}>60</button></li>
            </ul>
            <ul className="escolhidos">
              {this.state.numeros.map((num, index) => (
              <li key={index}>{num}</li>
              ))}
            </ul>
            <hr/>
            <button id="surpresinha" onClick={e => this.surpresinha(e)}>Surpresinha</button>
            <label htmlFor="concursos">Concursos</label>
            <select name="concursos"  onChange={e => this.setState({ id_contest: e.target.value})}>
              <option value={undefined}>Selecione um concurso</option>

              {this.state.concursos.length > 0  ? this.state.concursos.map(c => (
                <option key={c.id} value={c.id}>{this.formatarData(c.date)}</option>
              )) : ( <option value={undefined}>Não existem Concursos</option> )}

            </select>
            <button id="submit" type='submit'>Apostar</button>
          </form>
        </div>
      </>
    )

  }
}