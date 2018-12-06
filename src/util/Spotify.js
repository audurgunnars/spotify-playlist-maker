const clientID = '441668fabc3c41cba1445ae305aaec86'
const redirectURI = 'http%3A%2F%2Flocalhost%3A3000%2F'
const scope = 'playlist-modify-private playlist-modify-public'
const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${scope}`
let accessToken = ''
let expiresIn = 0

const getUserID = async accessToken => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
    if (response.ok) {
      const jsonResponse = await response.json()
      return jsonResponse.id
    }
  } catch (error) {
    return console.log(error)
  }
}
const createPlaylistID = async (userID, accessToken, playlistName) => {
  try {
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    })
    if (playlistResponse.ok) {
      const jsonPlaylistResponse = await playlistResponse.json()
      return jsonPlaylistResponse.id
    }
  } catch (error) {
    console.log(error)
  }
}
const trackToPlaylist = async (playlistID, accessToken, trackURIs) => {
  try {
    const addSongsToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      headers: {Authorization: `Bearer ${accessToken}`},
      method: 'POST',
      body: JSON.stringify({uris: trackURIs})
    })
    return addSongsToPlaylist
  } catch (error) {
    console.log(error)
  }
}

const Spotify = {
  _getAccessToken: () => {
    if (accessToken) return accessToken
    const currentUrl = window.location.href
    accessToken = currentUrl.match(/access_token=([^&]*)/)
    expiresIn = currentUrl.match(/expires_in=([^&]*)/)

    if (accessToken && expiresIn) {
      accessToken = accessToken[1]
      expiresIn = +expiresIn[1]

      window.setTimeout(() => accessToken = '', expiresIn * 1000)
      window.history.pushState('Access Token', null, '/')
      return accessToken
    }
    window.location = url
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
    const accessToken = Spotify._getAccessToken()
    const userID = await getUserID(accessToken)
    const playlistID = await createPlaylistID(userID, accessToken)
    await trackToPlaylist(playlistID, accessToken, trackURIs)
  }
}

export default Spotify
