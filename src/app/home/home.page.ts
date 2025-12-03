import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonInput, IonToggle, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonItem, IonLabel, IonGrid, IonRow, IonCol, 
  IonButton, IonButtons, IonImg, IonCardHeader, IonCardTitle, IonCardContent, ToastController, AlertController, IonSkeletonText, IonCheckbox, AnimationController, Animation, IonIcon } from '@ionic/angular/standalone';
import { Injectable } from '@angular/core';
import { Guitarra } from '../interfaces/guitarra'; // Nuestra interfaz de datos
import { ListItemComponent } from '../components/list-item/list-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {RouterLink} from '@angular/router';

// Import de nuevo componente app-header
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { GuitarraItemComponent } from "../components/guitarra-item/guitarra-item.component";
import { GuitarraService } from '../services/guitarra';
import { IonicModule } from "@ionic/angular";

@Injectable({
  providedIn: 'root' // Esto le dice a Angular que el servicio es un singleton
})  

export class MiServicio {
  constructor() { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCheckbox, IonCardContent, IonCardTitle, IonCardHeader, IonImg, IonButton, IonLabel, IonItem, IonCard, IonList,
    IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, // Componentes de Ionic
    ListItemComponent, // Nuestro componente hijo
    CommonModule, // El módulo para las directivas estructurales
    AppHeaderComponent, // Nuestro nuevo componente de encabezado
    GuitarraItemComponent, // Componente para mostrar cada guitarra
    FormsModule, IonInput, IonToggle,
    IonSkeletonText, // Componente para hacer la carga
    IonButtons,
    RouterModule, RouterLink
  ],
})
export class HomePage implements AfterViewInit {

  
  public listaDeGuitarras: Guitarra[] = [];

  public cargando: boolean = true;

  mostrarDetalles(guitarra: Guitarra) {
    console.log('Detalles:', guitarra);
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
    private alertController: AlertController,
    // 3. Inyectamos el AnimationController
    private animationCtrl: AnimationController,
    private guitarraService: GuitarraService
    
    
  ) { // Simulamos una carga de datos de 2 segundos
    this.listaDeGuitarras = this.guitarraService.getGuitarras();

    setTimeout(() => {
      this.cargando = false; // Cambiamos el estado a "cargado"
    }, 2000)
  }

  async confirmarYAgregar() {
    
    // 1. VALIDACIÓN PREVIA (NO SE MUESTRA ALERTA SI NO HAY DATOS)
    if (this.nuevaGuitarra.nombre.trim().length === 0 || this.nuevaGuitarra.corte.trim().length === 0) {
      this.mostrarToast("⚠️ Debes rellenar Nombre y Corte para continuar.", 'danger');
      return; 
    }
    
    // 2. MOSTRAR ALERTA
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Estás seguro de que quieres añadir la guitarra **${this.nuevaGuitarra.nombre}**?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Adición cancelada por el usuario');
            this.mostrarToast('❌ Adición cancelada.', 'medium');
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm', // <--- ROL CLAVE PARA SABER QUÉ SE PULSÓ
        },
      ],
    });
    
    await alert.present();

    // 3. ESPERAR RESULTADO
    const { role } = await alert.onDidDismiss();

    // 4. EJECUTAR SI ES ACEPTAR
    if (role === 'confirm') {
      this._ejecutarAdicion(); // <--- Llamada a la función que SÍ añade la guitarra
    }
}

  // --- Métodos para Toast y Alert ---
  async mostrarToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, 
      position: 'bottom', 
      color: color, 
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
}

  private _ejecutarAdicion() {

    const nombreGuitarra = this.nuevaGuitarra.nombre; // Guardamos el nombre antes de resetear

    this.guitarraService.anadirGuitarra(this.nuevaGuitarra);

    // resetear
    this.nuevaGuitarra = {
      id: 0,
      imagen: "",
      nombre: "",
      corte: "",
      anio: 0,
      enProduccion: false
    };

    // Llamar al Toast de éxito
    this.mostrarToast(`✅ Guitarra "${nombreGuitarra}" añadida con éxito.`);
  }

  // 2. Obtenemos la referencia al elemento #profileCard del HTML
  @ViewChild('profileCard', { read: ElementRef }) profileCard!: ElementRef;
  private animacion!: Animation;

  

  // 4. Este método se ejecuta cuando la vista ya está lista
  ngAfterViewInit() {
    // 5. Creamos la animación
    this.animacion = this.animationCtrl
      .create()
      .addElement(this.profileCard.nativeElement) // El elemento a animar
      .duration(800) // Duración de 800ms
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)') // Mover de -100px a 0px en el eje X
      .fromTo('opacity', '0', '1'); // Cambiar opacidad de 0 a 1 (fundido)
    
    // 6. Ejecutamos la animación
    this.animacion.play();
  }


}