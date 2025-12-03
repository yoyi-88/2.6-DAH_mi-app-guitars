import { Injectable } from '@angular/core';
import { Guitarra } from '../interfaces/guitarra';

@Injectable({
  providedIn: 'root'
})
export class GuitarraService {
  private listaDeGuitarras: Guitarra[] = [
    { id: 1, imagen: "assets/images/fender.webp", nombre: "Fender Stratocaster", corte: "Strat", anio: 1954, enProduccion: true },
    { id: 2, imagen: "assets/images/lesPaul.webp", nombre: "Gibson Les Paul Standard", corte: "Single Cut", anio: 1952, enProduccion: true },
    { id: 3, imagen: "assets/images/ibanez.webp", nombre: "Ibanez RG550", corte: "Superstrat", anio: 1987, enProduccion: true },
    { id: 4, imagen: "assets/images/sg.jpg", nombre: "Gibson SG", corte: "Double Cut", anio: 1961, enProduccion: true },
    { id: 5, imagen: "assets/images/telecaster.webp", nombre: "Fender Telecaster", corte: "Single Cut", anio: 1950, enProduccion: true },
    { id: 6, imagen: "assets/images/superStrat.webp", nombre: "Jackson Soloist", corte: "Superstrat", anio: 1984, enProduccion: true },
    { id: 7, imagen: "assets/images/falcon.webp", nombre: "Gretsch White Falcon", corte: "Hollow Body", anio: 1955, enProduccion: false },
    { id: 8, imagen: "assets/images/prs.jpg", nombre: "PRS Custom 24", corte: "Double Cut", anio: 1985, enProduccion: true }
  ];

  constructor() { }

  getGuitarras(): Guitarra[] {
    // Retornamos una copia o la lista, dependiendo de si quieres que sea mutable.
    return this.listaDeGuitarras; 
  }

  anadirGuitarra(nuevaGuitarra: Guitarra): void {
    const guitarraConId: Guitarra = {
      ...nuevaGuitarra,
      id: Date.now() 
    };
    
    this.listaDeGuitarras.unshift(guitarraConId);
  }


  
}
