const API = "/.netlify/functions/reparaciones";

const mostrarMensaje = (mensaje, tipo = "exito") => {
  const div = document.getElementById("mensajes");
  div.textContent = mensaje;
  div.style.color = tipo === "exito" ? "green" : "red";
  setTimeout(() => {
    div.textContent = "";
  }, 3000);
};

// Agregar
document.getElementById("form-agregar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      mostrarMensaje("Registro agregado con éxito.");
      mostrarDatos();
      e.target.reset();
    } else {
      mostrarMensaje("Error al agregar registro.", "error");
    }
  } catch (err) {
    mostrarMensaje("Error de red al agregar.", "error");
  }
});

// Consultar
document.getElementById("form-consultar").addEventListener("submit", (e) => {
  e.preventDefault();
  mostrarDatos();
});

// Actualizar
document.getElementById("form-actualizar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const { id, ...rest } = data;
  try {
    const res = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });
    if (res.ok) {
      mostrarMensaje("Registro actualizado con éxito.");
      mostrarDatos();
      e.target.reset();
    } else {
      mostrarMensaje("Error al actualizar.", "error");
    }
  } catch (err) {
    mostrarMensaje("Error de red al actualizar.", "error");
  }
});

// Eliminar
document.getElementById("form-eliminar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = new FormData(e.target).get("id");
  try {
    const res = await fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      mostrarMensaje("Registro eliminado con éxito.");
      mostrarDatos();
      e.target.reset();
    } else {
      mostrarMensaje("Error al eliminar.", "error");
    }
  } catch (err) {
    mostrarMensaje("Error de red al eliminar.", "error");
  }
});

// Botón para actualizar manualmente
document.getElementById("btn-actualizar-manual").addEventListener("click", () => {
  mostrarDatos();
});

// Mostrar registros
async function mostrarDatos() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    const contenedor = document.getElementById("resultados");
    if (data.length === 0) {
      contenedor.innerHTML = "<p>No hay registros disponibles.</p>";
      return;
    }
    contenedor.innerHTML = data
      .map(
        (r) =>
          `<p><strong>ID:</strong> ${r.id} - ${r.cliente} | ${r.articulo} | ${r.fallo}</p>`
      )
      .join("");
  } catch (err) {
    mostrarMensaje("Error al cargar registros.", "error");
  }
}