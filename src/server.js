require('dotenv').config();
const app = require('./api');

const Controller = require('./controller/userController');
const { loginVerify } = require('./middleware/liginVerify');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginVerify, Controller.login);

app.listen(port, () => console.log('ouvindo porta', port));
