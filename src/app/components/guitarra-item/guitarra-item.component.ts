import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonItem, IonLabel, IonButton, IonImg, IonIcon, IonButtons, IonCol, IonGrid,IonRow, IonThumbnail, IonNote } from '@ionic/angular/standalone';
import { Guitarra } from 'src/app/interfaces/guitarra';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-guitarra-item',
  standalone: true,
  imports: [IonImg, CommonModule, IonCard, IonItem, IonLabel, IonButton, RouterLink, IonIcon, IonButtons, IonCol, IonGrid,IonRow, IonThumbnail, IonNote],
  templateUrl: './guitarra-item.component.html',
  styleUrls: ['./guitarra-item.component.scss']
})
export class GuitarraItemComponent {
  @Input() guitarra?: Guitarra; 
  constructor(private router: Router) {}
  mostrarDetalles() {
    if (this.guitarra) {
      this.router.navigate(['/ver-detalles-guitarra', this.guitarra.id]);
    }
  }

  verEnMapa(event: Event) {
  event.stopPropagation();
  if (this.guitarra?.lat && this.guitarra?.lng) {
    const lat = this.guitarra.lat;
    const lng = this.guitarra.lng;
    const label = encodeURIComponent(this.guitarra.nombre);
    
    // Esta URL es mejor: pone un pin con el nombre de la guitarra en el mapa
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    
    window.open(url, '_system');
  }
}
}
