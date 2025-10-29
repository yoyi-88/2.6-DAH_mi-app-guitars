import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {}
