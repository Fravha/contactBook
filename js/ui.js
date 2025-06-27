// js/ui.js
import { formatFecha } from './utils.js';

export function renderTabla(contactos, filtro = "") {
  const tabla = document.getElementById("tablaContactos");
  const resultados = contactos.filter(c =>
    c.nombre.toLowerCase().includes(filtro) ||
    c.correo.toLowerCase().includes(filtro) ||
    c.telefono.toLowerCase().includes(filtro)
  );

  tabla.innerHTML = "";

  if (resultados.length === 0 && contactos.length > 0) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-gray-500">
      <i data-lucide="search" class="w-8 h-8 mx-auto mb-2 text-gray-300"></i>
      <p>No se encontraron contactos</p></td></tr>`;
    lucide.createIcons();
    return;
  }

  resultados.forEach(c => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-50 transition-colors";
    tr.innerHTML = `
      <td class="p-4 text-sm text-gray-600">${formatFecha(c.fecha)}</td>
      <td class="p-4 font-medium text-gray-800">${c.nombre}</td>
      <td class="p-4 text-sm text-gray-600">${c.correo}</td>
      <td class="p-4 text-sm text-gray-600">${c.telefono}</td>
      <td class="p-4">
        ${c.linkedin ? `<a href="${c.linkedin}" class="text-blue-600 hover:underline text-sm" target="_blank">
          Ver perfil</a>` : `<span class="text-gray-400 text-sm">-</span>`}
      </td>`;
    tabla.appendChild(tr);
  });

  lucide.createIcons();
}

export function updateStats(contactos) {
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

  document.getElementById("statTotalContactos").textContent = contactos.length;
  document.getElementById("statEsteMes").textContent = contactos.filter(c => new Date(c.fecha) >= inicioMes).length;
  document.getElementById("statConLinkedIn").textContent = contactos.filter(c => c.linkedin?.trim()).length;
}

export function updateContactCount(contactos) {
  const count = contactos.length;
  document.getElementById("contactCount").textContent = `${count} contacto${count !== 1 ? "s" : ""}`;
}

export function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
  }`;
  notification.setAttribute('role', 'alert');

  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}" class="w-4 h-4"></i>
      <span class="text-sm">${message}</span>
    </div>`;

  document.body.appendChild(notification);
  lucide.createIcons();

  setTimeout(() => { notification.style.transform = 'translateX(0)' }, 100);
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

export function showView(viewId) {
  document.querySelectorAll(".view-content").forEach(v => v.classList.add("hidden"));
  document.getElementById(viewId).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active", "bg-blue-50", "text-blue-600");
    btn.classList.add("text-gray-700");
  });

  const viewMap = {
    "vistaContactos": "btnTodosContactos",
    "vistaFormulario": "btnFormulario",
    "vistaEstadisticas": "btnEstadisticas"
  };
  const btn = document.getElementById(viewMap[viewId]);
  btn.classList.add("active", "bg-blue-50", "text-blue-600");

  if (window.innerWidth < 768) closeSidebar();
}

export function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.style.transform = "translateX(0)";
  overlay.classList.remove("hidden");
}

export function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.style.transform = "translateX(-100%)";
  overlay.classList.add("hidden");
}