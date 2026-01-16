import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importamos estas utilidades
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

// IMPORTANTE: Importamos el proveedor HTTP
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // IMPORTANTE: Habilitamos el cliente HTTP aquí
    provideHttpClient(),

    // 2. Configuramos Ionic Storage
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: 'mi-app-guitar', // Nombre de la base de datos 
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] // Orden de preferencia
      })
    ),
  ],
});
