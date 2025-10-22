import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonImg } from '@ionic/angular/standalone';

// Imports de nuestra aplicación
import { Lista } from '../interfaces/lista'; // Nuestra interfaz de datos
import { ListItemComponent } from '../components/list-item/list-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor

// Import de nuevo componente app-header
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { GuitarraItemComponent } from "../components/guitarra-item/guitarra-item.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonImg, IonButton, IonLabel, IonItem, IonCard, IonList,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, // Componentes de Ionic
    ListItemComponent, // Nuestro componente hijo
    CommonModule, // El módulo para las directivas estructurales
    AppHeaderComponent, // Nuestro nuevo componente de encabezado
     GuitarraItemComponent // Componente para mostrar cada guitarra
     
  ],
})
export class HomePage {

  listaDeGuitarras: Lista[] = [
    { id: 1, nombre: "Fender Stratocaster", corte: "Strat", anio: 1954, enProduccion: true },
    { id: 2, nombre: "Gibson Les Paul Standard", corte: "Single Cut", anio: 1952, enProduccion: true },
    { id: 3, nombre: "Ibanez RG550", corte: "Superstrat", anio: 1987, enProduccion: true },
    { id: 4, nombre: "Gibson SG", corte: "Double Cut", anio: 1961, enProduccion: true },
    { id: 5, nombre: "Fender Telecaster", corte: "Single Cut", anio: 1950, enProduccion: true },
    { id: 6, nombre: "Jackson Soloist", corte: "Superstrat", anio: 1984, enProduccion: true },
    { id: 7, nombre: "Gretsch White Falcon", corte: "Hollow Body", anio: 1955, enProduccion: false },
    { id: 8, nombre: "PRS Custom 24", corte: "Double Cut", anio: 1985, enProduccion: true }
  ];
  mostrarDetalles(guitarra: Lista) {
  console.log('Detalles:', guitarra);
  // Aquí podrías abrir un modal o navegar a otra página
}


  constructor() {}
  
}