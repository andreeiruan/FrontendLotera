import React from 'react'

import './style.css'

export default () => {
  return (
    <div className="fim">
      <footer className="rodape">
        <span>Desenvolvido por Andrei Ruã</span>
        <button className="redes"><a href="https://github.com/andreeiruan" 
        target="_blank" rel="noopener noreferrer">GitHub</a></button>
        <button className="redes"><a 
        href="https://www.linkedin.com/in/andrei-ru%C3%A3-de-avila-silva-683134195/" 
        target="_blank" rel="noopener noreferrer">Linkedin</a></button>
      </footer>
    </div>
  )
}