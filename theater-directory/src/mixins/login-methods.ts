const loginMethods = {
  methods: {
    getUserId() {
      const userIdCookie = "userId="
      var decodedCookie = decodeURIComponent(document.cookie)
      var cookies = decodedCookie.split(";")
      for (var i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i]
        if (cookie.startsWith(userIdCookie) && cookie !== userIdCookie) {
          return cookie.substring(userIdCookie.length)
        }
      }
      return null
    }
  }
}

export default loginMethods