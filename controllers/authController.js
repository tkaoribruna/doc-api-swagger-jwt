const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'supersecretkey';

const USER = {
  id: 1,
  login: 'admin',
  senha: '1234',
  email: 'admin@example.com',
  nome: 'Admin'
};

module.exports = {
  login(req, res) {
    const { login, senha } = req.body;
    if (!login || !senha) {
      return res.status(400).json({ error: 'login e senha são obrigatórios' });
    }

    if (login !== USER.login || senha !== USER.senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: USER.id, login: USER.login }, secretKey, {
      expiresIn: '1h'
    });

    return res.status(200).json({ token });
  }
};
