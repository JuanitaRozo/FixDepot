let reparaciones = [];
let id = 1;

exports.handler = async (event) => {
  const method = event.httpMethod;
  const body = event.body ? JSON.parse(event.body) : {};
  const pathId = event.path.split("/").pop();

  switch (method) {
    case "GET":
      return { statusCode: 200, body: JSON.stringify(reparaciones) };

    case "POST":
      const nuevo = { id: id++, ...body };
      reparaciones.push(nuevo);
      return { statusCode: 201, body: JSON.stringify(nuevo) };

    case "PUT":
      const index = reparaciones.findIndex((r) => r.id == pathId);
      if (index === -1) return { statusCode: 404, body: "No encontrado" };
      reparaciones[index] = { ...reparaciones[index], ...body };
      return { statusCode: 200, body: JSON.stringify(reparaciones[index]) };

    case "DELETE":
      reparaciones = reparaciones.filter((r) => r.id != pathId);
      return { statusCode: 204 };

    default:
      return { statusCode: 405, body: "Método no permitido" };
  }
};
