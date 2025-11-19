import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonItem, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { Guitarra } from 'src/app/interfaces/guitarra';

@Component({
  selector: 'app-guitarra-item',
  standalone: true,
  imports: [IonImg, CommonModule, IonCard, IonItem, IonLabel, IonButton],
  templateUrl: './guitarra-item.component.html',
  styleUrls: ['./guitarra-item.component.scss']
})
export class GuitarraItemComponent {
  @Input() guitarra?: Guitarra; 

  mostrarDetalles() {
    console.log('Detalles de guitarra:', this.guitarra);
  }
}
