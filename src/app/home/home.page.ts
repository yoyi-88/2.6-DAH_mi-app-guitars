import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  IonInput, IonToggle, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonItem, IonLabel, IonGrid, IonRow, IonCol,
  IonButton, IonButtons, IonImg, IonCardHeader, IonCardTitle, IonCardContent, ToastController, AlertController, IonSkeletonText, IonCheckbox, AnimationController, Animation, IonIcon
} from '@ionic/angular/standalone';
import { Injectable } from '@angular/core';
import { Guitarra } from '../interfaces/guitarra'; // Nuestra interfaz de datos
import { ListItemComponent } from '../components/list-item/list-item.component'; // El componente hijo
import { CommonModule } from '@angular/common'; // Módulo necesario para usar *ngIf y *ngFor
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

// Import de nuevo componente app-header
import { AppHeaderComponent } from 'src/app/components/app-header/app-header.component';
import { GuitarraItemComponent } from "../components/guitarra-item/guitarra-item.component";
import { GuitarraService } from '../services/guitarra';
import { SettingsService } from '../services/settings.service';

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
  saludo: string = 'Hola';

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    // 3. Inyectamos el AnimationController
    private animationCtrl: AnimationController,
    private guitarraService: GuitarraService,
    private router: Router,
    private settingsService: SettingsService


  ) { // Simulamos una carga de datos de 2 segundos


  }

  

  public nuevaGuitarra: Guitarra = {
    id: 0, // Daremos un ID real al añadirla
    imagen: "", // Enlazaremos esto al input
    nombre: "",
    corte: "",
    anio: 0,
    enProduccion: false
  };

  
  

  // Usamos ionViewWillEnter en lugar de ngOnInit
  async ionViewWillEnter() {
    await this.cargarDatos();

    
  }

  async cargarGuitarras() {
    try {
      // Ahora debemos esperar (await) a que lleguen los datos del servidor
      this.listaDeGuitarras = await this.guitarraService.getGuitarras();
    } catch (error) {
      this.mostrarToast('Error al conectar con el servidor', 'danger');
      // Aquí podríamos mostrar un Toast indicando el error
    }
  }


  async cargarDatos() {
    this.cargando = true; // Activar el spinner
    
    // 1. Cargar datos de personalización
    await this.cargarSaludo();
    
    // 2. Cargar guitarras (USANDO AWAIT para obtener el valor del Promise)
    await this.cargarGuitarras(); 

    // 3. Simular la duración mínima de carga (para UX)
    await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 segundos

    this.cargando = false; // Desactivar el spinner
  }

  private async _ejecutarAdicion() {

    try {
      await this.guitarraService.anadirGuitarra(this.nuevaGuitarra);
      this.mostrarToast(`✅ "${this.nuevaGuitarra.nombre}" guardada en el servidor.`);
      
      // Reset y recarga
      this.nuevaGuitarra = { id: 0, imagen: "", nombre: "", corte: "", anio: 0, enProduccion: false };
      await this.cargarGuitarras();
    } catch (error) {
      this.mostrarToast('Error al guardar en el servidor', 'danger');
    }
  }

  

  async cargarSaludo() {
    await this.settingsService.init();
    const nombre = await this.settingsService.get('nombre_usuario');

    if (nombre && nombre.trim() !== '') {
      this.saludo = `Hola, ${nombre}`;
    } else {
      this.saludo = 'Bienvenido/a';
    }
  }



  navegarAAbout() {
    console.log("Realizando operaciones previas...");

    // Aquí iría tu lógica (ej: guardar datos, validar...)

    console.log("Navegando a la página About...");

    // 3. Usamos el método .navigate()
    // Acepta un array con los fragmentos de la ruta
    this.router.navigate(['/about']);
  }

  navegarASettings() {
    console.log("Realizando operaciones previas...");

    // Aquí iría tu lógica (ej: guardar datos, validar...)

    console.log("Navegando a la página About...");

    // 3. Usamos el método .navigate()
    // Acepta un array con los fragmentos de la ruta
    this.router.navigate(['/ajustes']);
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

    if (this.nuevaGuitarra.imagen.trim().length === 0) {
      this.nuevaGuitarra.imagen = 'https://i0.wp.com/cms.babbel.news/wp-content/uploads/2022/06/Spanish_UpsideDown_Punctuation.png?resize=830%2C467';
    }

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