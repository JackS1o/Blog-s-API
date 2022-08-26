const jwt = require('jsonwebtoken');
const Service = require('../service/userService');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: '1d',
  });
  const result = await Service.login({ email });
  if (!result) return res.status(400).json({ message: 'Invalid fields' });
  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { body } = req;
  const token = jwt.sign({ body }, JWT_SECRET, {
    expiresIn: '1d',
  });
  const result = await Service.createUser(body);
  if (!result) return res.status(409).json({ message: 'User already registered' });
  return res.status(201).json({ token });
};

module.exports = {
  login,
  createUser,
};
