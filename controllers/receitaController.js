let receitas = [
  { id: 1, titulo: 'Bolo', descricao: 'Receita de bolo simples', categoriaId: 1 },
  { id: 2, titulo: 'Salada', descricao: 'Salada refrescante', categoriaId: 2 }
];
let nextReceitaId = 3;

function getReceitas(req, res) {
  res.json(receitas);
}

function postReceita(req, res) {
  const { titulo, descricao, categoriaId } = req.body;
  if (!titulo || !descricao || !categoriaId) {
    return res.status(400).json({ error: 'titulo, descricao e categoriaId são obrigatórios' });
  }
  const receita = { id: nextReceitaId++, titulo, descricao, categoriaId };
  receitas.push(receita);
  res.status(201).json(receita);
}

function getReceitaById(req, res) {
  const id = parseInt(req.params.id, 10);
  const receita = receitas.find((item) => item.id === id);
  if (!receita) {
    return res.status(404).json({ error: 'Receita não encontrada' });
  }
  res.json(receita);
}

function putReceita(req, res) {
  const id = parseInt(req.params.id, 10);
  const receita = receitas.find((item) => item.id === id);
  if (!receita) {
    return res.status(404).json({ error: 'Receita não encontrada' });
  }
  const { titulo, descricao, categoriaId } = req.body;
  if (!titulo || !descricao || !categoriaId) {
    return res.status(400).json({ error: 'titulo, descricao e categoriaId são obrigatórios' });
  }
  receita.titulo = titulo;
  receita.descricao = descricao;
  receita.categoriaId = categoriaId;
  res.json(receita);
}

function deleteReceita(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = receitas.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Receita não encontrada' });
  }
  receitas.splice(index, 1);
  res.status(204).end();
}

function getReceitasByCategoria(req, res) {
  const categoriaId = parseInt(req.params.id, 10);
  const results = receitas.filter((item) => item.categoriaId === categoriaId);
  res.json(results);
}

module.exports = {
  getReceitas,
  postReceita,
  getReceitaById,
  putReceita,
  deleteReceita,
  getReceitasByCategoria
};
