// En este módulo se administra la lista, aplico arrow functions y el spread/rest operator.

import { Tarea } from "./Tarea.js";

export class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  // Agregar tarea usando Spread Operator (Punto 2)
  agregarTarea(datosTarea) {
    const nuevaTarea = new Tarea(datosTarea);
    this.tareas = [...this.tareas, nuevaTarea];
    return nuevaTarea;
  }

  // Eliminar tarea usando Arrow Function y filter (Punto 1 y 2)
  eliminarTarea = (id) => {
    const tareaAEliminar = this.tareas.find((t) => t.id === id);
    if (tareaAEliminar) {
      tareaAEliminar.eliminar(); // Llamamos al método de la clase Tarea
      this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    }
  };

  // Obtener todas las tareas
  obtenerTareas() {
    return this.tareas;
  }
  // Método para inicializar la lista de tareas (Paso 5)
  cargarTareas(tareasData) {
    // Toma los objetos genéricos y los transforma en instancias de la clase Tarea
    this.tareas = tareasData.map((datos) => new Tarea(datos));
  }
}
