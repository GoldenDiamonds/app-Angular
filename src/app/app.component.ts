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
      // Crear un Blob a partir del canvas
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'captura.png';
          
           // Crear un evento de clic
           const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });

          // Añadir el enlace al DOM y disparar el evento
          document.body.appendChild(a);
          a.dispatchEvent(event); // Usar dispatchEvent en lugar de click()
          document.body.removeChild(a); // Limpiar el DOM
          
          // Liberar el objeto URL
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }).catch(error => {
      console.error('Error al capturar el área:', error);
    });
  }
}