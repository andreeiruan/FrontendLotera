import React, { Component} from 'react'
import api from '../../services/api'

import Menu from '../../components/Menu'

import './style.css'

export default class Cadastro extends Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '', 
      confirm: '',
      error: ''
    }
  }

  async handleSubmit(event){
    event.preventDefault()
    const { name, email, password, confirm } = this.state

    if(name.length === 0) return this.setState({error: 'Digite seu nome'})
    if(email.length === 0) return this.setState({error: 'Email invalído'})

    if(password < 6) return this.setState({error: 'Senha muito curta'})
    if(password !== confirm) return this.setState({error: 'Senhas não batem'})
    
    try {
       const response = await api.post('/users', { 
        name,
        email,
        password
      })
      console.log(response)
      if(response.data.error){
        return this.setState({error: response.data.error})
      }
    } catch (error) {
      return window.alert('Estamos com problema em nosso servidor')      
    }
    window.alert('Cadastro realizado com sucesso!')
    return this.props.history.push('/')
  }

  render(){
    return (
      <> 
        <Menu/>
        <div className="container">
          <form className="cadastro" onSubmit={ e => this.handleSubmit(e)}>
            <label htmlFor="nome">Nome</label>
            <input type="text" name="nome"
            value={this.state.name}
            onChange={e => this.setState({name: e.target.value})}
            placeholder='Seu nome completo'/>
            <label htmlFor="email">Email</label>
            <input type="text" name="email"
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
            placeholder='Seu email'/>
            <label htmlFor="senha">Senha</label>
            <input type="password" name="senha"
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})} 
            placeholder='minímo 6 caracteres'/>
            <label htmlFor="confirmar">Confirme sua senha</label>
            <input type="password" name="confirmar"
            value={this.state.confirm}
            onChange={e => this.setState({confirm: e.target.value})} 
            placeholder='Confirme sua senha'/>
            <button type="submit">Registrar</button>
            <span><p>{this.state.error}</p></span>
          </form>
        </div>
      </>
    )
  }  
}