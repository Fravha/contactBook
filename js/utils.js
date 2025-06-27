// js/utils.js
export function formatFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export function getFormData() {
  return {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    telefono: `${document.getElementById("codigoPais").value} ${document.getElementById("telefono").value}`,
    linkedin: document.getElementById("linkedin").value,
    fecha: new Date().toISOString()
  };
}