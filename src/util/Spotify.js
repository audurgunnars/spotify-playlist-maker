const clientID = '441668fabc3c41cba1445ae305aaec86'
const clientSecret = '38ca950819b246fb8090748b94bfcf31'
const cors = 'https://cors-anywhere.herokuapp.com/'
const redirectURI = 'http%3A%2F%2Flocalhost%3A3000%2F'
const scope = 'playlist-modify-private playlist-modify-public'
const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scope}`
const Spotify = {
  _getAccessToken: () => {
    if (!window.location.href.match(/access_token=([^&]*)/)) {
      window.location = url
    }
    const currentUrl = window.location.href
    const accessToken = currentUrl.match(/access_token=([^&]*)/)[1]
    const expiresIn = currentUrl.match(/expires_in=([^&]*)/)[1]
    // console.log({accessToken, expiresIn})
    return accessToken
  },
  search: async (searchTerm) => {
    const accessToken = Spotify._getAccessToken()
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const jsonResponse = await response.json()
      return jsonResponse.tracks.items
    } catch (error) {
      console.log(error)
    }
  },
  savePlaylist: async (playlistName, trackURIs) => {
    console.log('playlistName', playlistName)
    console.log('trackURIs', trackURIs)
    // playlistName !== "" ? return playlistName : "something"
    // trackURIs !== [] ? return trackURIs : "something"
    const accessToken = Spotify._getAccessToken()
    let userID = ''
    let playlistID = ''
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}`}
      })
      if (response.ok) {
        const jsonResponse = await response.json()
        userID = jsonResponse.id
      }
    } catch (error) {
      return console.log(error)
    }
    try {
      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({name: "commit me if i'm a playlist"})
      })
      if (playlistResponse.ok) {
        const jsonPlaylistResponse = await playlistResponse.json()
        playlistID = jsonPlaylistResponse.id
      }
    } catch (error) {
      console.log(error)
    }
    try {
      const addSongsToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default Spotify
