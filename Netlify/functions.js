let reparaciones = {}; // Simula almacenamiento en memoria
let currentId = 1;

exports.handler = async (event) => {
  const method = event.httpMethod;
  const id = event.queryStringParameters?.id;

  switch (method) {
    case "POST": {
      const data = JSON.parse(event.body);
      const newId = currentId++;
      reparaciones[newId] = { id: newId, ...data };

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Reparación agregada correctamente", id: newId })
      };
    }

    case "GET": {
      if (!id || !reparaciones[id]) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Reparación no encontrada" })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(reparaciones[id], null, 2)
      };
    }

    case "PUT": {
      if (!id || !reparaciones[id]) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "No se puede actualizar. Reparación no encontrada." })
        };
      }

      const nuevosDatos = JSON.parse(event.body);
      reparaciones[id] = { ...reparaciones[id], ...nuevosDatos };

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: `Reparación ${id} actualizada correctamente` })
      };
    }

    case "DELETE": {
      if (!id || !reparaciones[id]) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "No se puede eliminar. Reparación no encontrada." })
        };
      }

      delete reparaciones[id];

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: `Reparación ${id} eliminada correctamente` })
      };
    }

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método no permitido" })
      };
  }
};
