const repairs = [];

exports.handler = async (event) => {
  const { httpMethod, queryStringParameters, body } = event;

  if (httpMethod === 'POST') {
    const data = JSON.parse(body);
    const id = `${Date.now()}`;
    repairs.push({ id, ...data });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Reparación agregada', id }),
    };
  }

  if (httpMethod === 'GET') {
    const { id } = queryStringParameters;
    const repair = repairs.find(r => r.id === id);
    return {
      statusCode: 200,
      body: JSON.stringify(repair || { error: 'No encontrado' }),
    };
  }

  if (httpMethod === 'PUT') {
    const { id } = queryStringParameters;
    const data = JSON.parse(body);
    const repair = repairs.find(r => r.id === id);
    if (repair) {
      Object.assign(repair, data);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Actualizado correctamente' }),
      };
    }
    return { statusCode: 404, body: 'No encontrado' };
  }

  if (httpMethod === 'DELETE') {
    const { id } = queryStringParameters;
    const index = repairs.findIndex(r => r.id === id);
    if (index !== -1) {
      repairs.splice(index, 1);
      return { statusCode: 200, body: 'Eliminado correctamente' };
    }
    return { statusCode: 404, body: 'No encontrado' };
  }

  return {
    statusCode: 405,
    body: 'Método no permitido',
  };
};
