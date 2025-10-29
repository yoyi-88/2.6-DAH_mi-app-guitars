import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonItem, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { Lista } from 'src/app/interfaces/lista';

@Component({
  selector: 'app-guitarra-item',
  standalone: true,
  imports: [IonImg, CommonModule, IonCard, IonItem, IonLabel, IonButton],
  templateUrl: './guitarra-item.component.html',
  styleUrls: ['./guitarra-item.component.scss']
})
export class GuitarraItemComponent {
  @Input() guitarra?: Lista; 

  mostrarDetalles() {
    console.log('Detalles de guitarra:', this.guitarra);
  }
}
