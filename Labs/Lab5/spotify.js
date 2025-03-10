require('dotenv').config();
const axios = require('axios');

const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('🔑 Token:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('🚨 Error getting token:', error.response?.data || error.message);
  }
};

module.exports = { getSpotifyToken };
