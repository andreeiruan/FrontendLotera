
export const TOKEN_KEY = ''
export const isAuthenticated = () => getToken() !== undefined
export const getToken = () => {
  let cookie = decodeURIComponent(document.cookie)
  cookie = cookie.split(';')
  for(let item of cookie){
    let c = item
    c = c.split('=')
    c = c[1]    
    return c   
  }
}
export const login = (token, id) => {
  const date = new Date()
  date.setTime(date.getTime() + (1*24*60*60*1000))
  localStorage.setItem('idUser', id) 
  document.cookie = `authToken=${token};expires=${date.toGMTString()}`
}
export const logout = () => {
  const date = new Date()
  date.setTime(date.getTime() - (4*24*60*60*1000)) 
  localStorage.removeItem('idUser') 
  return document.cookie = `authToken=; expires=${date.toGMTString()}`
}