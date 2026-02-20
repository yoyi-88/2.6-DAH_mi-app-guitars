import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  // Guardaremos la foto aquí para mostrarla
  public foto: string | undefined;

  constructor() { }

  public async addNewToGallery() {
    // 1. Llamamos a la API nativa
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // Queremos la ruta del archivo
      source: CameraSource.Camera,      // Queremos abrir la cámara (no la galería)
      quality: 100                      // Calidad máxima (0-100)
    });

    // 2. Guardamos la ruta en nuestra variable
    // webPath es una URL especial que funciona tanto en web como en móvil para previsualizar
    this.foto = capturedPhoto.webPath;
  }
}