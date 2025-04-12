export const baseUrl = '/.netlify/functions/api';

// Función para mostrar reparaciones registradas en tabla
async function mostrarReparacionesRegistradas() {
  const res = await fetch(`${baseUrl}`);
  const reparaciones = await res.json();
  const contenedor = document.getElementById('reparaciones-registradas');
  contenedor.innerHTML = '';

  if (reparaciones.length === 0) {
    contenedor.textContent = 'No hay reparaciones registradas.';
    return;
  }

  const tabla = document.createElement('table');
  tabla.border = '1';
  const encabezado = document.createElement('tr');
  encabezado.innerHTML = `<th>ID</th><th>Cliente</th><th>Equipo</th><th>Problema</th><th>Fecha de Ingreso</th>`;
  tabla.appendChild(encabezado);

  reparaciones.forEach(rep => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${rep.id}</td>
      <td>${rep.cliente}</td>
      <td>${rep.equipo}</td>
      <td>${rep.problema}</td>
      <td>${rep.fechaIngreso}</td>
    `;
    tabla.appendChild(fila);
  });

  contenedor.appendChild(tabla);
}

// Agregar
document.getElementById('form-agregar').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await res.json();
  alert(`Agregado: ${JSON.stringify(result)}`);
  await mostrarReparacionesRegistradas();
});

// Consultar
document.getElementById('form-consultar').addEventListener('submit', async e => {
  e.preventDefault();
  const id = new FormData(e.target).get('id');
  const res = await fetch(`${baseUrl}?id=${id}`);
  const result = await res.json();
  alert(`Consulta: ${JSON.stringify(result)}`);
  await mostrarReparacionesRegistradas();
});

// Actualizar
document.getElementById('form-actualizar').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch(baseUrl, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const result = await res.json();
  alert(`Actualizado: ${JSON.stringify(result)}`);
  await mostrarReparacionesRegistradas();
});

// Eliminar
document.getElementById('form-eliminar').addEventListener('submit', async e => {
  e.preventDefault();
  const id = new FormData(e.target).get('id');
  const res = await fetch(baseUrl, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  const result = await res.json();
  alert(`Eliminado: ${JSON.stringify(result)}`);
  await mostrarReparacionesRegistradas();
});

// Listar
document.getElementById('form-listar').addEventListener('submit', async e => {
  e.preventDefault();
  const res = await fetch(`${baseUrl}`);
  const result = await res.json();
  const lista = document.getElementById('lista-reparaciones');
  lista.innerHTML = '';
  result.forEach(rep => {
    const li = document.createElement('li');
    li.textContent = `ID: ${rep.id}, Cliente: ${rep.cliente}, Equipo: ${rep.equipo}`;
    lista.appendChild(li);
  });
  await mostrarReparacionesRegistradas();
});

// Botón manual para actualizar listado
document.getElementById('btn-actualizar-listado').addEventListener('click', mostrarReparacionesRegistradas);
