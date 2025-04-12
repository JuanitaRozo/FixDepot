let repairs = []; // base de datos en memoria

exports.handler = async (event) => {
  const method = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : null;

  if (method === 'POST') {
    const newRepair = { id: Date.now().toString(), ...body };
    repairs.push(newRepair);
    return response(201, newRepair);
  }

  if (method === 'GET') {
    const id = event.queryStringParameters.id;
    const found = repairs.find(r => r.id === id);
    return found ? response(200, found) : response(404, { error: 'No encontrado' });
  }

  if (method === 'PUT') {
    const idx = repairs.findIndex(r => r.id === body.id);
    if (idx === -1) return response(404, { error: 'No encontrado' });
    repairs[idx] = { ...repairs[idx], ...body };
    return response(200, repairs[idx]);
  }

  if (method === 'DELETE') {
    const id = body.id;
    repairs = repairs.filter(r => r.id !== id);
    return response(200, { deleted: id });
  }

  return response(405, { error: 'Método no permitido' });
};

function response(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
