import { Component } from '@angular/core';
import { Share } from '../../service/share';

@Component({
  selector: 'app-load-vc',
  imports: [],
  templateUrl: './load-vc.html',
  styleUrl: './load-vc.css'
})
export class LoadVC {

  constructor(private share: Share){}

  VcFile: any;

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;

    if(!input.files?.length){
      alert("Ningún archivo ha sido seleccionado");
      return
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try{
        this.VcFile = JSON.parse(reader.result as string);
      } catch (e){
        alert("Error al leer el archivo!");
      }
    }

    reader.readAsText(file);

    this.share.setData(this.VcFile);
  }
}
