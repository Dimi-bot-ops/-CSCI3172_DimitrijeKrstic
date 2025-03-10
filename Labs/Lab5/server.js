const express = require('express');
const { getSpotifyToken } = require('./spotify');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/artist/:name', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const artistName = req.params.name;

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data.artists.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/recommend/:id', async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const artistId = req.params.id;

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data.artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
