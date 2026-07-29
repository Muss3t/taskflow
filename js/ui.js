import { guardarEnLocalStorage } from "./api.js"; // agrego la importacion para traer la funcion de guardado

export class UI {
  constructor(gestorTareas) {
    this.gestor = gestorTareas;
    // Referencias a elementos del DOM
    this.form = document.getElementById("task-form");
    this.inputDescripcion = document.getElementById("task-input");
    this.inputFechaLimite = document.getElementById("task-deadline");
    this.inputBusqueda = document.getElementById("search-input");
    this.listaTareas = document.getElementById("task-list");
    this.notificacion = document.getElementById("notificacion");
  }

  // Inicializa la escucha de todos los eventos solicitados
  iniciarEventos() {
    // Evento 'submit': Capturar envío del formulario
    this.form.addEventListener("submit", (e) => this.manejarSubmit(e));

    // Evento 'keyup': Búsqueda o filtrado en tiempo real
    this.inputBusqueda.addEventListener("keyup", (e) => this.filtrarTareas(e));

    // Eventos 'click' delegados para cambiar estado o eliminar tareas
    this.listaTareas.addEventListener("click", (e) =>
      this.manejarClickLista(e),
    );

    // NUEVO EVENTO: Iniciar el contador regresivo que se actualiza cada 1 segundo (Paso 4)
    setInterval(() => this.actualizarContadores(), 1000);
  }
  //

  // Maneja el submit del formulario con Asincronía (Paso 4)
  manejarSubmit(e) {
    e.preventDefault();
    const descripcion = this.inputDescripcion.value.trim();
    const fechaLimite = this.inputFechaLimite.value
      ? new Date(this.inputFechaLimite.value)
      : null;

    if (!descripcion) return;

    // Cambio el texto del botón para simular carga
    const btnAgregar = document.getElementById("btn-agregar");
    const textoOriginal = btnAgregar.textContent;
    btnAgregar.textContent = "Agregando...";
    btnAgregar.disabled = true;

    // Simular un retardo de 1 segundo al agregar la tarea (Paso 4)
    setTimeout(() => {
      this.gestor.agregarTarea({ descripcion, fechaLimite });
      this.form.reset();
      this.renderizar();

      // Mostrar notificación tras el guardado
      this.mostrarNotificacion("¡Tarea agregada exitosamente!");

      // Restaurar el botón
      btnAgregar.textContent = textoOriginal;
      btnAgregar.disabled = false;
    }, 1000); // 1000 milisegundos = 1 segundo de retardo
  }

  // Evento 'keyup': Filtra visualmente la lista
  filtrarTareas(e) {
    const texto = e.target.value.toLowerCase();
    const items = this.listaTareas.querySelectorAll("li");

    items.forEach((item) => {
      const descripcion = item
        .querySelector(".descripcion-text")
        .textContent.toLowerCase();
      if (descripcion.includes(texto)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Evento 'click': Delegación de eventos para eliminar o alternar estado
  manejarClickLista(e) {
    const target = e.target;
    const li = target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    // Botón Eliminar
    if (target.classList.contains("btn-eliminar")) {
      this.gestor.eliminarTarea(id);
      this.renderizar();
    }

    // Botón Completar / Cambiar Estado
    if (target.classList.contains("btn-estado")) {
      const tarea = this.gestor.obtenerTareas().find((t) => t.id === id);
      if (tarea) {
        const nuevoEstado =
          tarea.estado === "pendiente" ? "completada" : "pendiente";
        tarea.cambiarEstado(nuevoEstado);
        this.renderizar();
      }
    }
  }

  // Modificar el DOM dinámicamente
  renderizar() {
    this.listaTareas.innerHTML = "";
    const tareas = this.gestor.obtenerTareas();

    tareas.forEach((tarea) => {
      const li = document.createElement("li");
      li.dataset.id = tarea.id;
      li.className = `task-item ${tarea.estado === "completada" ? "completada" : ""}`;

      // Espacio para el contador si la tarea tiene fecha límite
      let htmlContador = "";
      if (tarea.fechaLimite) {
        htmlContador = `<br><small class="countdown" data-limite="${tarea.fechaLimite}"></small>`;
      }

      // Contenido dinámico usando Template Literals
      li.innerHTML = `
                <span class="descripcion-text">${tarea.descripcion}</span>
                ${htmlContador}
                <div class="acciones">
                    <button class="btn-estado">${tarea.estado === "completada" ? "Desmarcar" : "Completar"}</button>
                    <button class="btn-eliminar">Eliminar</button>
                </div>
            `;

      // Evento 'mouseover' y 'mouseout' requeridos en la pauta para interactividad
      li.addEventListener("mouseover", () => {
        li.style.backgroundColor =
          tarea.estado === "completada" ? "#e2e8f0" : "#f0fdf4";
      });
      li.addEventListener("mouseout", () => {
        li.style.backgroundColor = "";
      });

      this.listaTareas.appendChild(li);
    });

    // Guardar automáticamente el estado actual en el LocalStorage
    guardarEnLocalStorage(this.gestor.obtenerTareas());
  }

  // Función que muestra notificación y la oculta tras 2 segundos con setTimeout (Paso 4)
  mostrarNotificacion(mensaje) {
    this.notificacion.textContent = mensaje;
    this.notificacion.style.display = "block";
    this.notificacion.style.backgroundColor = "#d4edda";
    this.notificacion.style.padding = "10px";
    this.notificacion.style.marginBottom = "10px";

    setTimeout(() => {
      this.notificacion.style.display = "none";
    }, 2000);
  }

  // Función ejecutada por setInterval para actualizar el tiempo restante (Paso 4)
  actualizarContadores() {
    const contadores = document.querySelectorAll(".countdown");

    contadores.forEach((contador) => {
      const fechaLimite = new Date(contador.dataset.limite).getTime();
      const ahora = new Date().getTime();
      const distancia = fechaLimite - ahora;

      if (distancia < 0) {
        contador.textContent = "⚠️ ¡Tiempo agotado!";
        contador.style.color = "red";
      } else {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutos = Math.floor(
          (distancia % (1000 * 60 * 60)) / (1000 * 60),
        );
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        contador.textContent = `⏳ Faltan: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
        contador.style.color = "#555";
      }
    });
  }
} //
