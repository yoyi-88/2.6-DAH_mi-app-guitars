import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonItem, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { Guitarra } from 'src/app/interfaces/guitarra';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-guitarra-item',
  standalone: true,
  imports: [IonImg, CommonModule, IonCard, IonItem, IonLabel, IonButton, RouterLink],
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
}
