import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import html2canvas from 'html2canvas-pro';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-Angular';
  @ViewChild('capturaArea') capturaArea!: ElementRef;
  capturar() {
    html2canvas(this.capturaArea.nativeElement).then(canvas => {
      // Crear un enlace para descargar la imagen
      const imgData = canvas.toDataURL('image/png');

      // Crear un enlace para descargar la imagen
      const a = document.createElement('a');
      a.href = imgData;
      // Simular un clic en el enlace
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // Limpiar el DOM
    }).catch(error => {
      console.error('Error al capturar el área:', error);
    });
  }
}