import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ver-detalles-guitarra',
  templateUrl: './ver-detalles-guitarra.page.html',
  styleUrls: ['./ver-detalles-guitarra.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VerDetallesGuitarraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
