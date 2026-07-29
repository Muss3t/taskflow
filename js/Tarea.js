// en este módulo debo exportar la clase individual de la tarea, añadiendo una fechaLimite para más adelante poder cumplir con el requerimiento de tener un contador regresivo

export class Tarea {
  // Uso de destructuring en el constructor para recibir un objeto
  constructor({
    id,
    descripcion,
    estado = "pendiente",
    fechaCreacion = new Date(),
    fechaLimite = null,
  }) {
    // Uso de const y let no aplica en propiedades de clase, pero usamos crypto.randomUUID() para IDs únicos
    this.id = id || crypto.randomUUID(); // Nota IMPORTANTE: investigué en la documentación de MDN y se utilicé crypto.randomUUID() como buena práctica de JS moderno para generar identificadores únicos de forma nativa.
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaLimite = fechaLimite;
  }

  // Método para cambiar el estado (Punto 1)
  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
    console.log(`Estado actualizado a: ${this.estado}`); // Template literal (Punto 2)
  }

  // Método para simular la eliminación antes de sacarla del gestor
  eliminar() {
    console.log(
      `La tarea "${this.descripcion}" ha sido marcada para eliminación.`,
    );
  }
}
