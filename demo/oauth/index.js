const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

const client_secret = fs.readFileSync('./.client_secret').toString();

app.get('/', (req, res) => {
  res.redirect('https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1754498391994994&redirect_uri=https://localhost:3000/oauth/authorize/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish');
});

app.get('/oauth/authorize/callback', async (req, res) => {
  const client_id = '1754498391994994';
  const redirect_uri = 'https://localhost:3000/oauth/authorize/callback';
  const code = req.query.code;

  const fetchShortLivedAccessToken = async () => {
    const data = new URLSearchParams();
    data.append('client_id', client_id);
    data.append('client_secret', client_secret);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirect_uri);
    data.append('code', code);

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data
    });

    const { access_token: shortLivedAccessToken } = await response.json();

    return shortLivedAccessToken;
  }

  const exchangeLongLivedAccessToken = async (shortLivedAccessToken) => {
    const response = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${client_secret}&access_token=${shortLivedAccessToken}`);
    const { access_token: longLivedAccessToken } = await response.json();

    return longLivedAccessToken;
  };


  const shortLivedAccessToken = await fetchShortLivedAccessToken();
  const longLivedAccessToken = await exchangeLongLivedAccessToken(shortLivedAccessToken);
  res.send({ access_token: longLivedAccessToken });
});

const options = {
  key: fs.readFileSync('./.https_cert/localhost-key.pem'),
  cert: fs.readFileSync('./.https_cert/localhost.pem'),
};

https.createServer(options, app).listen(3000, () => {
  console.log('HTTPS server running on https://localhost:3000');
});