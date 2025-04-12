export const baseUrl = '/.netlify/functions/api';

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
});

// Consultar
document.getElementById('form-consultar').addEventListener('submit', async e => {
  e.preventDefault();
  const id = new FormData(e.target).get('id');
  const res = await fetch(`${baseUrl}?id=${id}`);
  const result = await res.json();
  alert(`Consulta: ${JSON.stringify(result)}`);
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
});
