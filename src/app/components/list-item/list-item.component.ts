// Contenido de: src/app/components/task-item/task-item.component.ts

import { Component, OnInit } from '@angular/core';
// Añadimos las importaciones adicionales que nuestro componente necesita
import { Input } from '@angular/core';
import { Guitarra } from 'src/app/interfaces/guitarra';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  // Añadimos esta línea para que el componente pueda usar las etiquetas de Ionic en su HTML
  imports: [IonicModule, CommonModule]
})
export class ListItemComponent implements OnInit {

  // Propiedad de entrada para recibir los datos de la lista
  @Input() guitarra!: Guitarra;

  constructor() { }

  ngOnInit() {}

  // Método para mostrar los detalles de la lista en la consola
  mostrarDetalles() {
    console.log('Datos de la lista:', this.guitarra);
  }

  verEnMapa(guitarra: Guitarra) {
    if (guitarra.lat && guitarra.lng) {
      // URL estándar para Google Maps
      const url = `https://www.google.com/maps/search/?api=1&query=${guitarra.lat},${guitarra.lng}`;
      window.open(url, '_system');
    }
  }

}