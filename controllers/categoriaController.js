let categorias = [
  { id: 1, nome: 'Sobremesa' },
  { id: 2, nome: 'Salada' }
];
let nextCategoriaId = 3;

function getCategorias(req, res) {
  res.json(categorias);
}

function postCategoria(req, res) {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'nome é obrigatório' });
  }
  const categoria = { id: nextCategoriaId++, nome };
  categorias.push(categoria);
  res.status(201).json(categoria);
}

function getCategoriaById(req, res) {
  const id = parseInt(req.params.id, 10);
  const categoria = categorias.find((item) => item.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
  res.json(categoria);
}

function putCategoria(req, res) {
  const id = parseInt(req.params.id, 10);
  const categoria = categorias.find((item) => item.id === id);
  if (!categoria) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ error: 'nome é obrigatório' });
  }
  categoria.nome = nome;
  res.json(categoria);
}

function deleteCategoria(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = categorias.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
  categorias.splice(index, 1);
  res.status(204).end();
}

module.exports = {
  getCategorias,
  postCategoria,
  getCategoriaById,
  putCategoria,
  deleteCategoria
};
