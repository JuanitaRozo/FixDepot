const BASE_URL = '/.netlify/functions/api';

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    cliente: document.getElementById('cliente').value,
    equipo: document.getElementById('equipo').value,
    falla: document.getElementById('falla').value,
    fechaIngreso: document.getElementById('fechaIngreso').value,
  };
  await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
});

document.getElementById('getForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('consultaId').value;
  const res = await fetch(`${BASE_URL}?id=${id}`);
  const data = await res.json();
  alert(JSON.stringify(data));
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('updateId').value;
  const estado = document.getElementById('nuevoEstado').value;
  await fetch(`${BASE_URL}?id=${id}`, {
    method: 'PUT',
    body: JSON.stringify({ estado }),
  });
});

document.getElementById('deleteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('deleteId').value;
  await fetch(`${BASE_URL}?id=${id}`, {
    method: 'DELETE',
  });
});

function listar(){
  event.preventDefault();
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("https://ejemplodedsws.netlify.app/.netlify/functions.js", requestOptions)
    .then((response) =>
      response.text())
    .then((result) =>
      cargar(result))
    .catch((error) =>
      console.error(error));