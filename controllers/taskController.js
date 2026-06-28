let tasks = [
  { id: 1, description: 'Comprar' },
  { id: 2, description: 'Estudar' }
];
let nextId = 3;

function getTasks(req, res) {
  res.json(tasks);
}

function postTask(req, res) {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'description required' });
  }
  const task = { id: nextId++, description };
  tasks.push(task);
  res.status(201).json(task);
}

function getTaskById(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Tarefa nao encontrada' });
  }
  res.json(task);
}

function putTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((item) => item.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Tarefa nao encontrada' });
  }
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'description required' });
  }
  task.description = description;
  res.json(task);
}

function deleteTask(req, res) {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Tarefa nao encontrada' });
  }
  tasks.splice(index, 1);
  res.status(204).end();
}

module.exports = {
  getTasks,
  postTask,
  getTaskById,
  putTask,
  deleteTask,
};
