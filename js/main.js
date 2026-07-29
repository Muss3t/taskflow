// (este será mi ejemplo de instanciacion provisional, me servirá para probar que todo lo hecho funciona que luego comentaré)
import { GestorTareas } from "./GestorTareas.js";
import { UI } from "./ui.js";

/* ========================================================
   PRUEBAS INICIALES (Puntos 1 y 2)
   --------------------------------------------------------
   Este código lo usé para validar por consola que la POO 
   y los métodos del Gestor funcionaban correctamente.
   
   const gestorDePrueba = new GestorTareas();
   const tarea1 = gestorDePrueba.agregarTarea({ descripcion: 'Configurar base de datos' });
   const tarea2 = gestorDePrueba.agregarTarea({ descripcion: 'Diseñar interfaz UI' });
   
   console.log('Tareas actuales:', gestorDePrueba.obtenerTareas());
   tarea1.cambiarEstado('completada');
   gestorDePrueba.eliminarTarea(tarea2.id);
   console.log('Tareas tras modificaciones:', gestorDePrueba.obtenerTareas());
======================================================== */

// ========================================================
// CÓDIGO OPERATIVO DE LA APLICACIÓN (Paso 3 en adelante)
// ========================================================

// 1. Instanciamos la clase que maneja los datos
const gestor = new GestorTareas();

// 2. Instanciamos la clase que maneja lo visual y le pasamos el gestor
const ui = new UI(gestor);

// 3. Encendemos los eventos del DOM (clicks, submits, teclado)
ui.iniciarEventos();

// 4. Renderizamos la lista inicial (vacía al cargar)
ui.renderizar();
