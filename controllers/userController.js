let users = [
  { id: 1, nome: 'Admin', login: 'admin', email: 'admin@example.com' }
];
let nextUserId = 2;

function getUsers(req, res) {
  res.json(users);
}

function postUser(req, res) {
  const { nome, login, email } = req.body;
  if (!nome || !login || !email) {
    return res.status(400).json({ error: 'nome, login e email são obrigatórios' });
  }
  const user = { id: nextUserId++, nome, login, email };
  users.push(user);
  res.status(201).json(user);
}

function getUsersById(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = users.find((item) => item.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.json(user);
}

function putUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const user = users.find((item) => item.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  const { nome, login, email } = req.body;
  if (!nome || !login || !email) {
    return res.status(400).json({ error: 'nome, login e email são obrigatórios' });
  }
  user.nome = nome;
  user.login = login;
  user.email = email;
  res.json(user);
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  users.splice(index, 1);
  res.status(204).end();
}

module.exports = {
  getUsers,
  postUser,
  getUsersById,
  putUser,
  deleteUser
};
