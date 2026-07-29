//aqui voy a gestionar la comunicacion con el exterior y con
// la persistencia de datos, comnsumiendo la API de prueba (JSONPlaceholder)


// 1. Consumo de API con fetch y try/catch
export const obtenerTareasAPI = async () => {
    try {
        // Traemos 3 tareas de prueba de la API sugerida
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
        
        if (!respuesta.ok) {
            throw new Error('Error de red al intentar conectar con la API');
        }
        
        const datos = await respuesta.json();
        
        // Formateamos los datos de la API para que coincidan con nuestra clase Tarea
        return datos.map(item => ({
            id: crypto.randomUUID(),
            descripcion: item.title,
            estado: item.completed ? 'completada' : 'pendiente',
            fechaCreacion: new Date(),
            fechaLimite: null // La API no trae fecha límite, así que la dejamos nula
        }));
    } catch (error) {
        console.error('Error consumiendo la API:', error);
        return []; // Retornamos un arreglo vacío si la API falla para no romper la app
    }
};

// 2. Almacenamiento en LocalStorage
export const guardarEnLocalStorage = (tareas) => {
    // LocalStorage solo guarda texto, por lo que convertimos el arreglo a un string JSON
    localStorage.setItem('taskflow_tareas', JSON.stringify(tareas));
};

// 3. Recuperación de LocalStorage
export const recuperarDeLocalStorage = () => {
    const datos = localStorage.getItem('taskflow_tareas');
    // Si hay datos, los parseamos de vuelta a arreglo de objetos; si no, retornamos arreglo vacío
    return datos ? JSON.parse(datos) : [];
};