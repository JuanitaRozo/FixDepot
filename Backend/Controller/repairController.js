let registrosOriginales = [];
let registrosActualizados = [];
let idCounter = 1;

exports.getAll = (req, res) => {
  res.json({
    originales: registrosOriginales,
    actualizados: registrosActualizados
  });
};

exports.create = (req, res) => {
  const nuevo = { id: idCounter++, ...req.body };
  registrosOriginales.push(nuevo);
  res.status(201).json(nuevo);
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const index = registrosOriginales.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).send("No encontrado");
  const actualizado = { ...registrosOriginales[index], ...req.body };
  registrosOriginales[index] = actualizado;

  // Reemplaza si ya está en actualizados, si no lo añade
  const actualizadoIndex = registrosActualizados.findIndex(r => r.id === id);
  if (actualizadoIndex !== -1) {
    registrosActualizados[actualizadoIndex] = actualizado;
  } else {
    registrosActualizados.push(actualizado);
  }

  res.json(actualizado);
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id);
  registrosOriginales = registrosOriginales.filter(r => r.id !== id);
  registrosActualizados = registrosActualizados.filter(r => r.id !== id);
  res.status(204).send();
};
