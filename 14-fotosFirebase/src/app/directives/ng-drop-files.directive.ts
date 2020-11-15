import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Directive, 
          EventEmitter, 
          ElementRef, 
          HostListener,
          Input,
          Output 
} from '@angular/core';
import { FileItem } from '../models/file-items';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];

  @Output() ratonSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public elNombreDelMetodo( event: any){
      this.ratonSobre.emit(true);
      this._prevenirYDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDregLeave( event: any){
      this.ratonSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any){

    
    const transferencia = this._getTransperencia(event);
    
    if(!transferencia){
      return;
    }

    this._extraerArchivos( transferencia.files);

    this._prevenirYDetener(event);
    this.ratonSobre.emit(false);

  }


  private _getTransperencia( event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTranfer;
  }

  private _extraerArchivos( archivosLista: FileList ){
    // console.log(archivosLista);

    for( const propiedad in Object.getOwnPropertyNames('archivosLista') ){
      const archivoTem = archivosLista[propiedad];
      
      if(this._archivoPuedeSerCargado(archivoTem)){
        const nuevoArchivo = new FileItem(archivoTem)
        console.log(nuevoArchivo);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

  //Validaciones
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if( !this._archivoYaFueDroppeado( archivo.name ) && this._esImagen( archivo.type)){
      return true;
    }
    return false;
  }

  private _prevenirYDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDroppeado( nombreArchivo:string ): boolean{
    console.log( this.archivos);
    for( const archivo of this.archivos ){
      console.log(archivo.nombre);
      if( archivo.nombre === nombreArchivo){
        console.log("el archivo "+ nombreArchivo + " ya existe")
        return true;
      }
    }
    return false
  }
  
  private _esImagen( tipoArchivo: string): boolean{
    return (tipoArchivo === "" || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }
}
