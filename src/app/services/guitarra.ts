import { Injectable } from '@angular/core';
import { Guitarra } from '../interfaces/guitarra';
import { SettingsService } from './settings.service'; // Importamos SettingsService
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { firstValueFrom } from 'rxjs';             // Importar utilidad para Promesas
import { environment } from 'src/environments/environment'; // Importamos el entorno


@Injectable({
  providedIn: 'root'
})
export class GuitarraService {
  // Definimos la URL base de nuestra API (OJO: puerto 3000 por defecto de JSON Server)
  // Asegúrate de que '/guitarras' coincide con la colección en tu db.json
  private _url = `${environment.apiUrl}/guitarras`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las guitarras del servidor (GET /guitarras)
   */
  async getGuitarras(): Promise<Guitarra[]> {
    // Hacemos la petición GET a la URL.
    // Usamos el genérico <Guitarra[]> para decirle a TypeScript que esperamos un array de Guitarras.
    // firstValueFrom convierte el Observable en una Promesa.
    return firstValueFrom(this.http.get<Guitarra[]>(this._url));
  }

  /**
   * Obtiene una guitarra por su ID (GET /guitarras/ID)
   */
  async getGuitarraPorId(id: string | number): Promise<Guitarra> {
    // Construimos la URL específica (ej: http://localhost:3000/guitarras/1)
    const urlEspecifica = `${this._url}/${id}`;
    return firstValueFrom(this.http.get<Guitarra>(urlEspecifica));
  }

  /**
   * POST: Añade una nueva guitarra al servidor
   */
  async anadirGuitarra(guitarra : any): Promise<Guitarra> {
    // 1. Eliminamos el ID temporal (0) antes de enviar
    //    Creamos una copia del objeto sin el campo 'id' para que JSON Server lo genere limpio.
    const { id, ...guitarraSinId } = guitarra;

    // 2. Hacemos la petición POST enviando el objeto limpio
    // Parámetros: URL de la colección y el objeto a crear (body).
    return firstValueFrom(
      this.http.post<Guitarra>(this._url, guitarraSinId)
    );
  }

  /**
   * Actualiza una guitarra existente (PUT /guitarras/ID)
   * Se envía el objeto completo con los cambios ya aplicados.
   */
  async updateGuitarra(guitarra: Guitarra): Promise<Guitarra> {
    // Construimos la URL específica con el ID de la guitarra
    const urlEspecifica = `${this._url}/${guitarra.id}`;

    // Hacemos la petición PUT enviando el objeto modificado
    return firstValueFrom(
      this.http.put<Guitarra>(urlEspecifica, guitarra)
    );
  }


  /**
   * Elimina una guitarra por su ID (DELETE /guitarras/ID)
   */
  async deleteGuitarra(id: string | number): Promise<void> {
    const urlEspecifica = `${this._url}/${id}`;

    // Hacemos la petición DELETE. No enviamos body.
    // firstValueFrom convierte el Observable en Promesa.
    return firstValueFrom(
      this.http.delete<void>(urlEspecifica)
    );  
  }
}