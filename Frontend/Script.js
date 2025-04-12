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

