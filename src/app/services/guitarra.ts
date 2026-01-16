import { Injectable } from '@angular/core';
import { Guitarra } from '../interfaces/guitarra';
import { SettingsService } from './settings.service'; // Importamos SettingsService
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { firstValueFrom } from 'rxjs';             // Importar utilidad para Promesas

@Injectable({
  providedIn: 'root'
})
export class GuitarraService {
  // Definimos la URL base de nuestra API (OJO: puerto 3000 por defecto de JSON Server)
  // Asegúrate de que '/tareas' coincide con la colección en tu db.json
  private _url = 'http://localhost:3000/guitarras';

  // CLAVE para el Storage
  private readonly GUITAR_STORAGE_KEY = 'lista_de_guitarras'; 
  
  // Lista inicial por defecto si el storage está vacío
  private guitarrasIniciales: Guitarra[] = [
    { id: 1, imagen: "assets/images/fender.webp", nombre: "Fender Stratocaster", corte: "Strat", anio: 1954, enProduccion: true },
    { id: 2, imagen: "assets/images/lesPaul.webp", nombre: "Gibson Les Paul Standard", corte: "Single Cut", anio: 1952, enProduccion: true },
    { id: 3, imagen: "assets/images/ibanez.webp", nombre: "Ibanez RG550", corte: "Superstrat", anio: 1987, enProduccion: true },
    { id: 4, imagen: "assets/images/sg.jpg", nombre: "Gibson SG", corte: "Double Cut", anio: 1961, enProduccion: true },
    { id: 5, imagen: "assets/images/telecaster.webp", nombre: "Fender Telecaster", corte: "Single Cut", anio: 1950, enProduccion: true },
    { id: 6, imagen: "assets/images/superStrat.webp", nombre: "Jackson Soloist", corte: "Superstrat", anio: 1984, enProduccion: true },
    { id: 7, imagen: "assets/images/falcon.webp", nombre: "Gretsch White Falcon", corte: "Hollow Body", anio: 1955, enProduccion: false },
    { id: 8, imagen: "assets/images/prs.jpg", nombre: "PRS Custom 24", corte: "Double Cut", anio: 1985, enProduccion: true }
  ];

  private listaDeGuitarras: Guitarra[] = []; // Ahora se inicializa vacía y se carga

  constructor(private settingsService: SettingsService, private http: HttpClient) {
    this.cargarGuitarras(); // Cargar la lista al iniciar el servicio

    
  }

  // **NUEVO** Método para cargar la lista desde el Storage
  private async cargarGuitarras(): Promise<void> {
    await this.settingsService.init();
    const storedGuitarras = await this.settingsService.get(this.GUITAR_STORAGE_KEY);
    
    // Si hay datos en Storage, úsalos; si no, usa las iniciales.
    this.listaDeGuitarras = storedGuitarras || this.guitarrasIniciales;
  }

  // **NUEVO** Método para guardar la lista en el Storage
  private async guardarGuitarras(): Promise<void> {
    await this.settingsService.set(this.GUITAR_STORAGE_KEY, this.listaDeGuitarras);
  }

  // MODIFICADO: Ahora es asíncrono para asegurar que la lista esté cargada
  async getGuitarras(): Promise<Guitarra[]> {
    await this.cargarGuitarras();
    // Retornamos una copia para evitar mutación directa
    return [...this.listaDeGuitarras]; 
  }

  // MODIFICADO: Ahora es asíncrono y guarda en Storage
  async anadirGuitarra(nuevaGuitarra: Guitarra): Promise<void> {
    const guitarraConId: Guitarra = {
      ...nuevaGuitarra,
      id: Date.now() 
    };
    
    this.listaDeGuitarras.unshift(guitarraConId);
    await this.guardarGuitarras(); // Guardar el cambio
  }

  // MODIFICADO: Ahora es asíncrono y se asegura de que la lista esté cargada
  async getGuitarraPorId(id: number): Promise<Guitarra | undefined> {
    await this.cargarGuitarras();
    return this.listaDeGuitarras.find(t => t.id === id);
  }

  // Método de borrado
  async deleteGuitarra(id: number): Promise<void> {
    await this.cargarGuitarras(); // Asegurar que tenemos la última lista
    
    // Filtrar la lista, dejando solo las guitarras cuyo ID NO coincide
    this.listaDeGuitarras = this.listaDeGuitarras.filter(g => g.id !== id);
    
    await this.guardarGuitarras(); // Guardar el cambio en el Storage
  }
}