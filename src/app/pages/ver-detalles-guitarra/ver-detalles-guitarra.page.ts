import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonBadge, IonList, IonItem, IonLabel, AlertController, ToastController, IonButton, IonIcon, IonInput, LoadingController } from '@ionic/angular/standalone';
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
    private settingsService: SettingsService,
    private loadingController: LoadingController 
   ) {}

  async ngOnInit() {
  // Obtener el ID de la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // Convertir a número si existe, o null
    this.guitarraId = id; 

    if (this.guitarraId) {
      try {
        this.guitarra = await this.guitarraService.getGuitarraPorId(this.guitarraId);
        
        // Si el servidor responde pero el objeto está vacío/null
        if (!this.guitarra) {
          this.mostrarErrorYRedirigir();
        }
      } catch (error) {
        // Si el servidor da error (ej: 404 o conexión perdida)
        this.mostrarErrorYRedirigir();
      }
    } else {
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

    // 1. Crear y mostrar el Loading para bloquear la pantalla
    const loading = await this.loadingController.create({
      message: 'Eliminando guitarra del servidor...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Es vital el 'await' para que el loading espere a la respuesta HTTP
      await this.guitarraService.deleteGuitarra(this.guitarraId);

      // Si tiene éxito, cerramos el loading y mostramos Toast positivo
      await loading.dismiss();
      
      this.mostrarToast(`La guitarra "${this.guitarra?.nombre}" ha sido eliminada.`, 'success');

      // 4. Redirigir al usuario de vuelta a la lista
      await this.router.navigate(['/home']);

    } catch(error) {
      await loading.dismiss(); // IMPORTANTE: Cerrar siempre el loading aunque falle
      
      console.error('Error al borrar:', error); // Log interno para desarrollo
      this.mostrarError('No se pudo eliminar la guitarra. Compruebe su conexión al servidor.');

    } 
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

    const loading = await this.loadingController.create({ message: 'Actualizando datos...' });
    await loading.present();

    try {
      await this.guitarraService.updateGuitarra(this.guitarra);
      this.mostrarToast('Guitarra añadida correctamente');
    } catch (error) {
      this.mostrarError('Error al añadir la guitarra. Inténtelo de nuevo más tarde');
    } finally {
      await this.router.navigate(['/home']);
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

  // Método auxiliar para mostrar errores
  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger',
      icon: 'alert-circle-outline'
    });
    toast.present();
  }
}





