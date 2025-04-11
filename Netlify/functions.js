exports.handler = async (event) => {
  const repair = JSON.parse(event.body);

  // Aquí normalmente guardarías en una base de datos, por ahora simulemos:
  console.log('Reparación recibida:', repair);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Reparación agregada con éxito' }),
  };
};
