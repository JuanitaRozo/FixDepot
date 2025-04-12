const { baseUrl } = require("./Script");

// Eliminar
document.getElementById('form-eliminar').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = new FormData(e.target).get('id');
  const res = await fetch(baseUrl, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  const result = await res.json();
  alert(`Eliminado: ${JSON.stringify(result)}`);

  function listar() {
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    //Ejemplo cuando se devuelve algo
    function cargar(almacenado) {
      let transformado = JSON.parse(almacenado);
      var salida = "";
      var elemento = "";


      for (let vc in transformado) {
        elemento = "<br>Id: " + transformado[vc].dni;
        elemento = elemento + "<br>Nombres y equipo: " + transformado[vc].nombre + " " + transformado[vc].equipo;
        elemento = elemento + "<br>problema: " + transformado[vc].problema;
        salida = salida + elemento + "<br><br>";
      }

      document.getElementById("rta").innerHTML = salida;

      fetch("https://github.com/JuanitaRozo/FixDepotHTML.git", requestOptions)
        .then((response) => response.text())
        .then((result) => cargar(result))
        .catch((error) => console.error(error));
    };
  }
});
