require('dotenv').config();
const app = require('./api');

const Controller = require('./controller/userController');
const { loginVerify } = require('./middleware/liginVerify');
const { validateUser } = require('./middleware/createUserValidate');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginVerify, Controller.login);

app.post('/user', validateUser, Controller.createUser);

app.listen(port, () => console.log('ouvindo porta', port));
