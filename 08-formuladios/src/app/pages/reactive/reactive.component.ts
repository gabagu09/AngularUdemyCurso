import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';

//services
import { ValidadoresService } from '../../services/validadores.service'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;

  constructor( private fb: FormBuilder,
                private validadaciones: ValidadoresService) { 
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get apellidoNoValido(){
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }
  get correoNoValido(){
    return this.formulario.get('correo').invalid && this.formulario.get('correo').touched;
  }

  get usuarioNoValido(){
    return this.formulario.get('usuario').invalid && this.formulario.get('usuario').touched;
  }

  get departamentoNoValido(){
    return this.formulario.get('direccion.departamento').invalid && this.formulario.get('direccion.departamento').touched;
  }
  get ciudadNoValido(){
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched;
  }
  get pasatiempos(){
    return this.formulario.get('pasatiempos') as FormArray;
  }
  get password1NoValido(){
    return this.formulario.get('password1').invalid && this.formulario.get('password1').touched;
  }
  get password2NoValido(){
    const pass1 =this.formulario.get('password1').value;
    const pass2 =this.formulario.get('password2').value;
    return ( pass1 === pass2) ? false : true;
  }
  crearFormulario(){
    this.formulario = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(5)] ],//nombre: ['valorDefault', validaciones sincronas, validaciones asincronas ]
      apellido:['', [Validators.required, this.validadaciones.noVilla ]],
      correo:  ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', ,this.validadaciones.existeUsuario],
      password1:['', [Validators.required]],
      password2:['', [Validators.required]],
      direccion: this.fb.group({
        departamento:['', Validators.required],
        ciudad:['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: [
        this.validadaciones.passwordsIguales('password1','password2')
      ]
    });
  }

  crearListeners(){
    // this.formulario.valueChanges.subscribe( valor =>{
    //   console.log(valor);
    // });
    // this.formulario.statusChanges.subscribe( valor =>{
    //     console.log(valor);
    // })
    this.formulario.get('nombre').valueChanges.subscribe( valor =>{
        console.log(valor);
    })
  }

  cargarDataAlFormulario(){
    //this.formulario.setValue({
    this.formulario.reset({ 
      nombre: "Ricardo",
      apellido: "Suarez",
      correo: "elrichi@yayho.com",
      password1:"123",
      password2:"123",
      direccion: {
        departamento: "Florida",
        ciudad: "Casupa"
      }
  
    });

    //['Comer', 'Dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor)));

  }

  agregarPasatiempo(){
  //  this.pasatiempos.push( this.fb.control('nuevo elemento', Validators.required));
    this.pasatiempos.push( this.fb.control(''));  
  }
  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.formulario);
    if( this.formulario.invalid){
      return Object.values( this.formulario.controls ).forEach( control => {
  
        if (control instanceof FormGroup){
          Object.values( control.controls ).forEach( control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
    //Porteo informacion

    this.formulario.reset();//reseteo el form una vez posteada la info
  }
}
