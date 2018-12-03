const clientID = '441668fabc3c41cba1445ae305aaec86'
const clientSecret = '38ca950819b246fb8090748b94bfcf31'
const cors = 'https://cors-anywhere.herokuapp.com/'
const redirectURI = 'http%3A%2F%2Flocalhost%3A3000%2F' // encode or not ???
const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`
const Spotify = { // hérna fer fram API kallið - ætla að nota async  catch error leiðina
  _getAccessToken: () => { // singleton
    if (!window.location.href.match(/access_token=([^&]*)/)) {
      window.location = url
    }
    const currentUrl = window.location.href
    const accessToken = currentUrl.match(/access_token=([^&]*)/)[1]
    const expiresIn = currentUrl.match(/expires_in=([^&]*)/)[1]

    console.log({accessToken, expiresIn})

    console.log(url)

    return accessToken
    // try {
    //   const result = await fetch(url)
    //   console.log('yolo', result)
    //   // const jsonResult = await result.json()
    //   // console.log(jsonResult)
    //   const resultText = result.text()
    //   console.log(resultText)
    // } catch (error) {
    //   console.log(error)
    // }
  },
  search: async (searchTerm) => {
    const accessToken = Spotify._getAccessToken()
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log({response})
      const jsonResponse = await response.json()
      console.log({jsonResponse})
      return jsonResponse.tracks.items
    } catch (error) {
      console.log(error)
    }
  }
}

export default Spotify
