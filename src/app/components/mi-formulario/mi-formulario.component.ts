import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mi-formulario',
  templateUrl: './mi-formulario.component.html',
  styles: [
    `
     .ng-invalid .ng-touched:not(form){
       border:1px solid red;
     }
     form{
       box-shadow:5px 5px 10px 10px #A6C6F3
     }

    `
  ]

})
export class MiFormularioComponent  {

  //formulario Reactivo se referencia en el html con [formGroup]="formulario2"
  formulario:FormGroup;


//array para los radios
 sexo:string[]=["hombre","mujer"];

//array para el select
 paises:string[]=["Cuba","España","Venezuela","Mexico","Argentina","El Salvador"];

 //para mostrar y ocultar la contraseña
show:boolean=false;

//variable que va recoger el valor de un input con un [(ngModel)]
hobbie:string="";
//array que se va ir rellenando con los valores que va obteniendo la variable hobbbie
hobbiesIntroducidos:string[]=[];



  constructor() {

    this.formulario=new FormGroup({
          //se establecen las validaciones para el name (se referencia en el html con formControlName)
          'name':new FormControl('',[Validators.required,
                                    Validators.pattern("^([ \u00c0-\u01ffa-zA-Z'\-])+$"),
                                    Validators.minLength(3)]),

      //se establecen las validaciones para el apellido (se referencia en el html con formControlName)
          'apellido':new FormControl('',[Validators.required,
                                    Validators.pattern("^([ \u00c0-\u01ffa-zA-Z'\-])+$"),
                                    Validators.minLength(3),
                                    this.noReyes]),

     //se establecen las validaciones para el correo (se referencia en el html con formControlName)
     //para que el pattern funcione hay que hacerlo en el html
     'email':new FormControl('',[Validators.required,
                                 Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),

    //se establecen las validaciones para el telefono (se referencia en el html con formControlName
    //para que el pattern funcione hay que hacerlo en el html
      'telefono':new FormControl('',[Validators.required,
                                  ]),
      'sexo':new FormControl(this.sexo,[Validators.required
                                        ]),
       'paises':new FormControl(this.paises),
       'password1':new FormControl('',[Validators.required,
                                      ]),
       'password2':new FormControl('',Validators.required),

       'condiciones':new FormControl('',[Validators.required, this.aceptoCondiciones]),

       'hobbies': new FormControl(),

    })


/*se añaden a validaciones a password2 */
      this.formulario.controls['password2'].setValidators([
        Validators.required,
        //asi se añade la validacion que hemos hecho en la funcion
        this.noIgualPassword.bind(this.formulario)
      ])
 }

//Para eliminar el hoobie deseado
   eliminaHobbie(idx:number){
        if( idx !==-1){
        //eliminamos el indice del array
          this.hobbiesIntroducidos.splice( idx , 1)
        }
   }

//se va introduciendo en este array el valor que tiene this.hobbie
muestraHobbie(){
  this.hobbiesIntroducidos.push(this.hobbie)
  this.hobbie = "";
}

/*si no estan aceptadas las condiciones la funcion sera true
y se utilizara en las validaciones*/
aceptoCondiciones(control:FormControl){
   if(!control.value){
     return {
       aceptoCondiciones:true
     }
   }
   return null
}


//funcion para que el apellido no pueda ser reyes
noReyes(control: FormControl){
   if(control.value.toLowerCase()==='reyes') {
      return{
        noReyes:true
      }
   }
   return null
}

//funcion que compara las contraseñas
noIgualPassword(control: FormControl){
  /*esta variable se utiliza dentro de la funcion para acceder
  al valor de la password1*/
  let formula:any=this
  if(control.value !== formula.controls['password1'].value){
    return{
      noIgualPassword: true
    }
  }
  return null
}


//para mostrar y ocultar la contraseña
showPassword(){
  this.show = !this.show

}

 guardar(){

  console.log(this.formulario)

}



 }
