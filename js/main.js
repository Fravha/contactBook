// js/main.js
import { cargarContactosDesdeBackend, agregarContacto } from './api.js';
import { renderTabla, updateStats, updateContactCount, showNotification } from './ui.js';
import { toggleSidebar, closeSidebar, showView } from './ui.js';
import { getFormData } from './utils.js';

let contactos = [];

window.contactos = contactos; // opcional para debug

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();

  // Vistas
  document.getElementById("btnTodosContactos").onclick = () => showView("vistaContactos");
  document.getElementById("btnFormulario").onclick = () => showView("vistaFormulario");
  document.getElementById("btnEstadisticas").onclick = () => {
    showView("vistaEstadisticas");
    updateStats(contactos);
  };
  document.getElementById("btnCancelar").onclick = () => showView("vistaContactos");

  // Sidebar
  document.getElementById("sidebarToggle").onclick = toggleSidebar;
  document.getElementById("sidebarOverlay").onclick = closeSidebar;

  // Buscar
  document.getElementById("buscador").oninput = e => renderTabla(contactos, e.target.value.toLowerCase());

  // Formulario
  document.getElementById("contactForm").onsubmit = async (e) => {
    e.preventDefault();
    const data = getFormData();

    const success = await agregarContacto(data);
    if (success) {
      contactos.unshift(data);
      renderTabla(contactos);
      updateContactCount(contactos);
      document.getElementById("contactForm").reset();
      showView("vistaContactos");
      showNotification("Contacto agregado exitosamente", "success");
    } else {
      showNotification("Error al guardar el contacto", "error");
    }
  };

  // Inicial
  contactos = await cargarContactosDesdeBackend();
  renderTabla(contactos);
  updateContactCount(contactos);
});