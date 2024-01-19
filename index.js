const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('chill bro');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// docker build --platform linux/amd64 -t lakhansamani/docker-demo .
