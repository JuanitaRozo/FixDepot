const API = "/.netlify/functions/reparaciones";

// AGREGAR
formAgregar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    cliente: cliente.value,
    equipo: equipo.value,
    marca: marca.value,
    modelo: modelo.value,
    falla: falla.value,
    fechaIngreso: fechaIngreso.value
  };
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  alert((await res.json()).mensaje);
});

// CONSULTAR
formConsultar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = consultaId.value;
  const res = await fetch(`${API}?id=${id}`);
  const data = await res.text();
  resultadoConsulta.textContent = data;
});

// ACTUALIZAR
formActualizar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = actualizarId.value;
  const nuevosDatos = {
    cliente: nuevoCliente.value,
    equipo: nuevoEquipo.value,
    marca: nuevaMarca.value,
    modelo: nuevoModelo.value,
    falla: nuevaFalla.value,
    fechaIngreso: nuevaFecha.value
  };
  const res = await fetch(`${API}?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(nuevosDatos),
    headers: { "Content-Type": "application/json" }
  });
  alert((await res.json()).mensaje);
});

// ELIMINAR
formEliminar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = eliminarId.value;
  const res = await fetch(`${API}?id=${id}`, { method: "DELETE" });
  alert((await res.json()).mensaje);
});

document.getElementById("btn-actualizar-manual").addEventListener("click", () => {
  mostrarDatos();
});
