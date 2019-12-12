export const TOKEN_KEY = ''
export const isAuthenticated = () => localStorage.getItem('TOKEN_KEY') !== null
export const getToken = () => localStorage.getItem('TOKEN_KEY')
export const login = (token, id) => {
  localStorage.setItem('idUser', id)
  localStorage.setItem('TOKEN_KEY', token)
}
export const logout = () => {
  localStorage.removeItem('idUser')
  return localStorage.removeItem('TOKEN_KEY')
}