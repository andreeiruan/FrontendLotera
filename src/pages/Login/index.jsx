import React, { Component } from 'react'
import api from '../../services/api'
import { login }  from '../../services/auth'

import Menu from '../../components/Menu'
import './style.css'

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  async handleSubmit(e){
    e.preventDefault()

    const { email, password } = this.state

    if(email.length === 0){
      return this.setState({error: "Insira seu email"})
    }
    if(password.length === 0){
      return this.setState({error: "Insira sua senha"})
    }
   try {
     const response = await api.post('/authenticate', { email, password })
     if(!response.data.error){
       login(response.data.token, response.data.user.id)
       this.props.history.push('/home')   
     }
     else{
       return this.setState({error: response.data.error})
     }     
   } catch (error) {
     return window.alert('Desculpa, estamos com problema em nosso servidor!')
   }
  }

  render(){
    return (
      <>
        <Menu /> 
        <div className="container">
          <form className="cadastro" onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value})}
            placeholder='Seu email'/>
            <label htmlFor="senha">Senha</label>          
            <input type="password" name="senha"
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}
            placeholder='Sua senha'/>
            <button type="submit">Entrar</button>
            <span><p>{this.state.error}</p></span>
          </form>
        </div>
      </>
    )
  }
}

