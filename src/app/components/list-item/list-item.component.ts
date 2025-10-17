// Contenido de: src/app/components/task-item/task-item.component.ts

import { Component, OnInit } from '@angular/core';
// Añadimos las importaciones adicionales que nuestro componente necesita
import { Input } from '@angular/core';
import { Lista } from 'src/app/interfaces/lista';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  // Añadimos esta línea para que el componente pueda usar las etiquetas de Ionic en su HTML
  imports: [IonicModule]
})
export class ListItemComponent implements OnInit {

  // Propiedad de entrada para recibir los datos de la lista
  @Input() lista!: Lista;

  constructor() { }

  ngOnInit() {}

  // Método para mostrar los detalles de la lista en la consola
  mostrarDetalles() {
    console.log('Datos de la lista:', this.lista);
  }

}