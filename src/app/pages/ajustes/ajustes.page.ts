import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonButtons, IonBackButton, IonToggle, IonInput, IonNote, IonCard, IonImg, IonFabButton, IonFab, IonIcon, IonButton, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { PhotoService } from '../../services/photo';
import { LocationService } from 'src/app/services/location';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCardContent, IonButton, IonIcon, IonFab, IonFabButton, IonImg, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, 
    IonButtons, IonBackButton, 
    IonList, IonListHeader, IonItem, IonLabel, IonToggle, 
    FormsModule, IonInput, IonNote, CommonModule]
})
export class AjustesPage implements OnInit {

  modoOscuro: boolean = false; // Valor por defecto
  nombreUsuario: string = '';

  constructor(private settingsService: SettingsService,
    public photoService: PhotoService,
    public locationService: LocationService
  ) { }

  // ¡IMPORTANTE! Añadimos 'async' para poder usar 'await' dentro
  async ngOnInit() {
    // Al entrar, cargamos el valor guardado
    // Si no existe (es la primera vez), settingsService.get devuelve null, 
    // así que usamos '|| false' para que sea false por defecto.
    this.modoOscuro = await this.settingsService.get('modo_oscuro') || false;
    
    // Aplicamos el tema inmediatamente al entrar por si acaso
    this.aplicarTema(this.modoOscuro);

    // Cargar el Nombre
    this.nombreUsuario = await this.settingsService.get('nombre_usuario') || ''; 
  }

  // También debe ser async porque settingsService.set devuelve una promesa
  async cambiarModoOscuro() {
    // 1. Guardamos el nuevo valor en la base de datos
    await this.settingsService.set('modo_oscuro', this.modoOscuro);
    
    // 2. Aplicamos el cambio visualmente
    this.aplicarTema(this.modoOscuro);
  }

  async guardarNombre() {
    //  Guardar el Nombre
    await this.settingsService.set('nombre_usuario', this.nombreUsuario); 
  }

  aplicarTema(esOscuro: boolean) {
    // Añadimos o quitamos la clase 'dark' al body del documento
    // Esto activa los estilos que definiremos en variables.scss
    document.body.classList.toggle('dark', esOscuro);
  }

  addPhoto() {
    this.photoService.addNewToGallery();
  }

  async obtenerGPS() {
  try {
    await this.locationService.obtenerPosicionActual();
  } catch (error) {
    console.log("El usuario denegó el permiso o el GPS está apagado");
  }
}
}
