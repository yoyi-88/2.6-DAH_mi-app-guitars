import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonBadge, IonList, IonItem, IonLabel, AlertController, ToastController, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { GuitarraService } from 'src/app/services/guitarra';
import {Guitarra} from 'src/app/interfaces/guitarra';
import { SettingsService } from 'src/app/services/settings.service'; 
import { of, take } from 'rxjs';

@Component({
  selector: 'app-ver-detalles-guitarra',
  templateUrl: './ver-detalles-guitarra.page.html',
  styleUrls: ['./ver-detalles-guitarra.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonBadge, IonBackButton, IonButtons, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonInput],
})
export class VerDetallesGuitarraPage implements OnInit {

  guitarra: Guitarra | undefined;

  guitarraId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute, // Inyectar ActivatedRoute
    private guitarraService  : GuitarraService,        // Inyectar nuestro servicio de tareas
    private router: Router,
    private alertController: AlertController, // Para la Mejora 4 (Confirmación)
    private toastController: ToastController, // Para la Mejora 5 (Error)
    private settingsService: SettingsService    
   ) {}

  async ngOnInit() {
  // Obtener el ID de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // Convertir a número si existe, o null
    this.guitarraId = id; 

    if (this.guitarraId) {
      try {
        // Esperamos la respuesta del servidor
        this.guitarra = await this.guitarraService.getGuitarraPorId(this.guitarraId);
      } catch (error) {
        console.error('Tarea no encontrada', error);
      }
    }

    if (this.guitarraId !== null) {
      // Usar el ID para buscar la guitarra
      this.guitarra = await this.guitarraService.getGuitarraPorId(this.guitarraId);
      
      // Mejora 5 (Manejo de Errores)
      if (!this.guitarra) {
        this.mostrarErrorYRedirigir();
      }
    } else {
       // Si no hay ID en la URL, también es un error
       this.mostrarErrorYRedirigir();
    }
  }

  // Mejora 5: Función para mostrar el Toast y redirigir
  async mostrarErrorYRedirigir() {
    // Si la guitarra ya está definida, salimos para evitar ejecutar dos veces
    if (this.guitarra) return; 
    
    const toast = await this.toastController.create({
      message: 'Guitarra no encontrada. Redirigiendo a la lista.',
      duration: 3000,
      color: 'danger'
    });
    await toast.present();
    
    // Redirección a la lista principal (/home o donde estén listadas las guitarras)
    this.router.navigate(['/home']);
  }
  
  // Mejora 4: Mostrar la Alerta de Confirmación
  async confirmarYEliminar() {
    // Nos aseguramos de que haya una guitarra para borrar
    if (!this.guitarra) {
        this.mostrarErrorYRedirigir(); // O manejar el error de otra forma
        return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que quieres eliminar la guitarra: ${this.guitarra.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            // Si el usuario acepta, llamamos a la función de borrado y redirección
            this.ejecutarBorradoYRedireccion();
          }
        }
      ]
    });

    await alert.present();
  }

  // Mejora 2: Borrar y Redirigir
  async ejecutarBorradoYRedireccion() {
    if (this.guitarraId === null) return; 

    // **Lógica de Borrado Real**
    // Llama al método de borrado de tu servicio (debes implementarlo en GuitarraService)
    this.guitarraService.deleteGuitarra(this.guitarraId); 
    
    // Redirigir al usuario de vuelta a la lista (/home)
    await this.router.navigate(['/home']);
    
    // (Opcional) Mostrar un toast de éxito después de la redirección
    const toast = await this.toastController.create({
      message: `La guitarra #${this.guitarraId} ha sido eliminada.`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  alternarEstado() {
    if (this.guitarra) {
      // Invertimos el valor booleano
      this.guitarra.enProduccion = !this.guitarra.enProduccion;
      
      // Opcional: Si quieres que se guarde en el servidor inmediatamente al hacer clic:
      // this.guardarCambios(); 
    }
  }

  async guardarCambios() {
  if (!this.guitarra) return;

  try {
    await this.guitarraService.updateGuitarra(this.guitarra);
    const toast = await this.toastController.create({
      message: 'Cambios guardados con éxito',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  } catch (error) {
    console.error('Error al actualizar:', error);
  }
}
}





