// js/api.js
export async function cargarContactosDesdeBackend() {
  const loader = document.getElementById("loader");
  const errorMsg = document.getElementById("errorMsg");
  const noContactsMsg = document.getElementById("noContactsMsg");

  loader.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  noContactsMsg.classList.add("hidden");

  try {
    const res = await fetch("https://contactbook-backend-9ei1.onrender.com/api/contactos");
    if (res.ok) {
      const data = await res.json();
      if (data.length === 0) noContactsMsg.classList.remove("hidden");
      return data;
    } else {
      errorMsg.classList.remove("hidden");
      return [];
    }
  } catch (err) {
    console.error("Error de conexión:", err);
    errorMsg.classList.remove("hidden");
    return [];
  } finally {
    loader.classList.add("hidden");
  }
}

export async function agregarContacto(data) {
  try {
    const res = await fetch("https://contactbook-backend-9ei1.onrender.com/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (err) {
    console.error("Error al agregar:", err);
    return false;
  }
}