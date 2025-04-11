exports.addRepair = (req, res) => {
  const { device, issue, client, date } = req.body;
  // Aquí podrías guardar en una base de datos real
  res.json({ message: 'Reparación agregada al backend.' });
};
