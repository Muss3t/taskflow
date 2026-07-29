// (este será mi ejemplo de instanciacion provisional, me servirá para probar que todo lo hecho funciona)
import { GestorTareas } from './GestorTareas.js';

// Instanciación (Punto 1)
const gestor = new GestorTareas();

// Creo un par de tareas de prueba usando let/const y objetos (Punto 2)
const tarea1 = gestor.agregarTarea({ descripcion: 'Configurar base de datos' });
const tarea2 = gestor.agregarTarea({ descripcion: 'Diseñar interfaz UI' });

console.log('Tareas actuales:', gestor.obtenerTareas());

// Cambio el estado de una tarea
tarea1.cambiarEstado('completada');

// Elimino segunda tarea
gestor.eliminarTarea(tarea2.id);

console.log('Tareas tras modificaciones:', gestor.obtenerTareas());