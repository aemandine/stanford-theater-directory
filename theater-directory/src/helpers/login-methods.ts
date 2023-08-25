const loginMethods = {
  methods: {
    getSessionId() {
      const sessionCookieName = "session="
      var decodedCookie = decodeURIComponent(document.cookie)
      var cookies = decodedCookie.split(";")
      for (var i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith(sessionCookieName) && cookie !== sessionCookieName) {
          return cookie.substring(sessionCookieName.length)
        }
      }
      return null
    },
    getUserId() {
      const userIdCookieName = "userId="
      var decodedCookie = decodeURIComponent(document.cookie)
      var cookies = decodedCookie.split(";")
      for (var i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith(userIdCookieName) && cookie !== userIdCookieName) {
          return cookie.substring(userIdCookieName.length)
        }
      }
      return null
    },
    isLoggedIn() {
      return this.getSessionId() !== null && this.getUserId() !== null
    }
  }
}

export default loginMethods