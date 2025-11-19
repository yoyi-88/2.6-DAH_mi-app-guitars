import { Component } from '@angular/core';
import { IonInput, IonToggle, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonButton, IonImg, IonCardHeader, IonCardTitle, IonCardContent, ToastController, AlertController} from '@ionic/angular/standalone';

// Imports de nuestra aplicación
import { Guitarra } from '../interfaces/guitarra'; // Nuestra interfaz de datos
import { ListItemComponent } from '../components/list-item/list-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor
import { FormsModule } from '@angular/forms';

// Import de nuevo componente app-header
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { GuitarraItemComponent } from "../components/guitarra-item/guitarra-item.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonImg, IonButton, IonLabel, IonItem, IonCard, IonList,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, // Componentes de Ionic
    ListItemComponent, // Nuestro componente hijo
    CommonModule, // El módulo para las directivas estructurales
    AppHeaderComponent, // Nuestro nuevo componente de encabezado
    GuitarraItemComponent, // Componente para mostrar cada guitarra
    FormsModule, IonInput, IonToggle
  ],
})
export class HomePage {

  listaDeGuitarras: Guitarra[] = [
    { id: 1, imagen: "assets/images/fender.webp", nombre: "Fender Stratocaster", corte: "Strat", anio: 1954, enProduccion: true },
    { id: 2, imagen: "assets/images/lesPaul.webp", nombre: "Gibson Les Paul Standard", corte: "Single Cut", anio: 1952, enProduccion: true },
    { id: 3, imagen: "assets/images/ibanez.webp", nombre: "Ibanez RG550", corte: "Superstrat", anio: 1987, enProduccion: true },
    { id: 4, imagen: "assets/images/sg.jpg", nombre: "Gibson SG", corte: "Double Cut", anio: 1961, enProduccion: true },
    { id: 5, imagen: "assets/images/telecaster.webp", nombre: "Fender Telecaster", corte: "Single Cut", anio: 1950, enProduccion: true },
    { id: 6, imagen: "assets/images/superStrat.webp", nombre: "Jackson Soloist", corte: "Superstrat", anio: 1984, enProduccion: true },
    { id: 7, imagen: "assets/images/falcon.webp", nombre: "Gretsch White Falcon", corte: "Hollow Body", anio: 1955, enProduccion: false },
    { id: 8, imagen: "assets/images/prs.jpg", nombre: "PRS Custom 24", corte: "Double Cut", anio: 1985, enProduccion: true }
  ];
  mostrarDetalles(guitarra: Guitarra) {
    console.log('Detalles:', guitarra);
    // Aquí podrías abrir un modal o navegar a otra página
  }

  public nuevaGuitarra: Guitarra = {
    id: 0, // Daremos un ID real al añadirla
    imagen: "", // Enlazaremos esto al input
    nombre: "",
    corte: "",
    anio: 0,
    enProduccion: false
  };


  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async mostrarAlertaConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Acción aceptada');
          },
        },
      ],
    });
    await alert.present();
  }

   // --- Métodos para Toast y Alert ---
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: 'Guitarra creada exitosamente',
      duration: 2000, // Duración en milisegundos
      position: 'top' // Puede ser 'top', 'middle' o 'bottom'
    });
    await toast.present();
  }

  agregarGuitarra() {

    // 1. VALIDACIÓN SIMPLE: Si el nombre está vacío, salimos.
    if (this.nuevaGuitarra.nombre.trim().length === 0) {
      console.warn("Validación fallida: El nombre está vacío.");
      return;
    }

    if (this.nuevaGuitarra.corte.trim().length === 0) {
      console.warn("Validación fallida: El corte está vacío.");
      return;
    }

    // Si llegamos aquí, la validación fue exitosa
    console.log("¡Validación OK! Añadiendo guitarra...");

    // 2. CREAR COPIA Y ASIGNAR ID: 
    // Copiamos los datos del formulario (nuevaGuitarra) y le damos un ID.
    const guitarraParaAnadir: Guitarra = {
      ...this.nuevaGuitarra, // Copia nombre, corte, año, etc.
      id: Date.now()         // Asigna un ID único
    };

    // 3. AÑADIR: La agregamos al principio de la lista.
    this.listaDeGuitarras.unshift(guitarraParaAnadir);

    // 4. RESETEAR: Limpiamos el formulario.
    this.nuevaGuitarra = {
      id: 0,
      imagen: "",
      nombre: "",
      corte: "",
      anio: 0,
      enProduccion: false
    };
  }

}