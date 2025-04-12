async function mostrarReparacionesRegistradas() {
  const res = await fetch(`${baseUrl}`);
  const reparaciones = await res.json();
  console.log('Reparaciones obtenidas:', reparaciones); // 👈

  const contenedor = document.getElementById('reparaciones-registradas');
  contenedor.innerHTML = '';

  if (!Array.isArray(reparaciones) || reparaciones.length === 0) {
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