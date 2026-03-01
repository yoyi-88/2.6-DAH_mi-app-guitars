import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  // Guardaremos la foto aquí para mostrarla
  public foto: string | undefined;

  constructor() { }

  // En photo.service.ts
  async addNewToGallery(): Promise<string | undefined> { // 👈 Cambiamos el tipo de retorno
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    if (capturedPhoto.webPath) {
      return capturedPhoto.webPath; // 👈 DEVOLVEMOS el valor
    }
    return undefined;
  }
}