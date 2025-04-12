const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../backend/db/reparaciones.json");

function leerBaseDeDatos() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({}));
  }
  const contenido = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(contenido || "{}");
}

function escribirBaseDeDatos(datos) {
  fs.writeFileSync(DB_PATH, JSON.stringify(datos, null, 2));
}

exports.handler = async (event) => {
  const method = event.httpMethod;
  const id = event.queryStringParameters?.id;
  const listar = event.queryStringParameters?.listar;

  let reparaciones = leerBaseDeDatos();

  switch (method) {
    case "POST": {
      const data = JSON.parse(event.body);
      const newId = Date.now().toString();
      reparaciones[newId] = { id: newId, ...data };
      escribirBaseDeDatos(reparaciones);

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Reparación agregada correctamente", id: newId })
      };
    }

    case "GET": {
      if (listar === "1") {
        return {
          statusCode: 200,
          body: JSON.stringify(reparaciones, null, 2)
        };
      }

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
      escribirBaseDeDatos(reparaciones);

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
      escribirBaseDeDatos(reparaciones);

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
