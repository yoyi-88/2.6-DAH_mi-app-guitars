export interface Guitarra {
    id: number | string;
    imagen: string;
    nombre: string;
    corte: string;
    anio: number;
    enProduccion: boolean;
    // Nuevos campos para la ubicación
    ubicacionNombre?: string; 
    lat?: number;
    lng?: number;
}
