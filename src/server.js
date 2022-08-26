require('dotenv').config();
const app = require('./api');

const Controller = require('./controller/userController');
const CategoryContoler = require('./controller/categoryController');
const { loginVerify } = require('./middleware/liginVerify');
const { validateUser } = require('./middleware/createUserValidate');
const { authToken } = require('./middleware/validateToken');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginVerify, Controller.login);

app.post('/user', validateUser, Controller.createUser);

app.get('/user', authToken, Controller.getAllUsers);

app.get('/user/:id', authToken, Controller.getUserById);

app.post('/categories', authToken, CategoryContoler.addCategory);

app.get('/categories', authToken, CategoryContoler.getCategory);

app.listen(port, () => console.log('ouvindo porta', port));
