import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RUsuariosService } from 'src/app/services/r-usuarios.service';
import { UsuarioC } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-r-usuario',
  templateUrl: './r-usuario.component.html',
  styleUrls: ['./r-usuario.component.css']
})
export class RUsuarioComponent implements OnInit {
  public errorUsuario=false;
  public errorMessage='';
  public formularioRegistroUsuario: FormGroup;
  constructor(
    private usuarioService: RUsuariosService,
  ) { }

  ngOnInit() {
    this.formularioRegistroUsuario= new FormGroup({
      nombre: new FormControl('',Validators.required),
      contrasena: new FormControl('',Validators.required),
      rol: new FormControl('',Validators.required)
    });
  }
  altaUsuario(){
    if(!this.formularioRegistroUsuario.controls.nombre.errors && !this.formularioRegistroUsuario.controls.contrasena.errors &&
      !this.formularioRegistroUsuario.controls.rol.value.errors){
        let usuario: UsuarioC={
          nombre:this.formularioRegistroUsuario.controls.nombre.value,
          contrasena:this.formularioRegistroUsuario.controls.contrasena.value,
          rol:this.formularioRegistroUsuario.controls.rol.value
        }
        this.usuarioService.crearUsuarios(usuario).subscribe((data:any)=>{
          if(data.message==='Usuario dado de alta correctamente!'){
            alert('Usuario dado de alta correctamente!');
          }else{
            this.errorUsuario=true;
            this.errorMessage=data.message;
          }
        },(error)=>{
          this.errorUsuario=true;
          this.errorMessage=error.message;
        });
      }else{
        this.errorUsuario=true;
        this.errorMessage='Para crear deben de estar todos los campos rellenos';
      }
  }
}