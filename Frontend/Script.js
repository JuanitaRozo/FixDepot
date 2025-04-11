document.getElementById('repairForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    device: document.getElementById('device').value,
    issue: document.getElementById('issue').value,
    client: document.getElementById('client').value,
    date: document.getElementById('date').value,
  };

  try {
    const response = await fetch('/.netlify/functions/addRepair', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    alert(result.message);
  } catch (error) {
    alert('Error al enviar el formulario');
    console.error(error);
  }
});
