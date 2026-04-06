// js/utils.js
export function formatFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export function formatCumpleanos(fechaStr) {
  if (!fechaStr) return "-";

  const [year, month, day] = fechaStr.split("-").map(Number);
  if (!year || !month || !day) return "-";

  return new Date(year, month - 1, day).toLocaleDateString("es-ES", {
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
    cumpleanos: document.getElementById("cumpleanos").value || null,
    fecha: new Date().toISOString()
  };
}
