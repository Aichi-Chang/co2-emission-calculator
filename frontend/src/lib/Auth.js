import jwt from 'jsonwebtoken'


class Auth {
  
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  static logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  static getPayload() {
    return jwt.decode(this.getToken())
  }

  static isAuthenticated() {
    const payload = this.getPayload()
    return payload
  }

  static isCurrentUser(user) {
    const payload = this.getPayload()
    return payload && user._id === payload.sub
  }


}



export default Auth