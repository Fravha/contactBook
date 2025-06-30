// js/ui.js
import { formatFecha } from './utils.js';
let paginaActual = 1;
const contactosPorPagina = 10;
let últimosContactosFiltrados = [];
let últimoFiltro = "";

export function renderTabla(contactos, filtro = "") {
  últimosContactosFiltrados = contactos;
  últimoFiltro = filtro;
  const tabla = document.getElementById("tablaContactos");
  const paginacionContainer = document.getElementById("paginacion");

  const resultados = contactos.filter(c =>
    c.nombre.toLowerCase().includes(filtro) ||
    c.correo.toLowerCase().includes(filtro) ||
    c.telefono.toLowerCase().includes(filtro)
  );

  const totalPaginas = Math.ceil(resultados.length / contactosPorPagina);
  if (paginaActual > totalPaginas) paginaActual = totalPaginas || 1;

  const inicio = (paginaActual - 1) * contactosPorPagina;
  const fin = inicio + contactosPorPagina;
  const paginaResultados = resultados.slice(inicio, fin);

  tabla.innerHTML = "";

  if (resultados.length === 0 && contactos.length > 0) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-gray-500">
      <i data-lucide="search" class="w-8 h-8 mx-auto mb-2 text-gray-300"></i>
      <p>No se encontraron contactos</p></td></tr>`;
    lucide.createIcons();
    return;
  }

  paginaResultados.forEach(c => {
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

  renderPaginacion(totalPaginas);
  lucide.createIcons();
}

function renderPaginacion(totalPaginas) {
  const container = document.getElementById("paginacion");
  container.innerHTML = "";

  if (totalPaginas <= 1) return;

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 mx-1 rounded ${
      i === paginaActual ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;
    btn.addEventListener("click", () => {
      paginaActual = i;
      renderTabla(últimosContactosFiltrados, últimoFiltro); // estos deben ser variables globales o pasarlos
    });
    container.appendChild(btn);
  }
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