//AL DAR CLICK EN INICIAR SESION, VALIDAR QUE EL BOTON DE TERMIANR DESAPAREZCA Y QUE EL FORMULARIO DE LA SECCION APAREZCA
//VALIDANDO QUE LA NOTA ESTE DENTRO DEL RANGO
function validarNota(nota){
    if(!validarCantidad(nota.value,100)){
        actModal("¡Ups!","La nota debe ser menor a 100 o mayor o igual a 0")
        nota.value="";
        nota.focus();
    }
}
//--------OBJETIVO 1 DESAFIO 1---------
function Alumno(nombre,cedula){
    this.nombre = nombre;
    this.cedula = cedula;
    this.notas = [];
}

//-----BUSCANDO LA CEDULA EN EL OBJETO JASON-----
function buscarCedula(cedula){
    for(let i=0;i<baseAlumnos.length;i++){
        if (cedula == baseAlumnos[i].cedula)
            return baseAlumnos[i].nombre;
    }
}

//RELLENANDO LA TABLA
function rellenarTabla(objeto,tabla,index){
    //ANEXANDO LAS FILAS Y CELDAS A LA TABLA
    let nuevaFila = tabla.insertRow(-1)
    for (let i = 0; i < 9; i++) {
        let nuevaCelda = nuevaFila.insertCell(-1)
    }
    //ANEXANDO LOS VALORES
    nuevaFila.cells[0].innerText = tabla.rows.length - 1;
    nuevaFila.cells[1].innerText = objeto.alumnos[index].nombre.toUpperCase();
    nuevaFila.cells[2].innerText = objeto.alumnos[index].cedula;
    nuevaFila.cells[3].innerText = objeto.numero;
    nuevaFila.cells[4].innerText = objeto.alumnos[index].notas[0];
    nuevaFila.cells[5].innerText = objeto.alumnos[index].notas[1];
    nuevaFila.cells[6].innerText = objeto.alumnos[index].notas[2];
    nuevaFila.cells[7].innerText = objeto.alumnos[index].notas[3];
    $(nuevaFila.cells[8]).html("<button class='btnEliminar btn btn-danger'>Eliminar</button>")
    //EVENTO DEL BOTON ELIMINAR DE LA TABLA
    $(".btnEliminar").click(function(event){
        p=event.target.parentNode;
        objSeccion.alumnos.splice(p.parentNode.rowIndex-1,1);
        localStorage.setItem("seccion",JSON.stringify(objSeccion));
        $(p.parentNode).remove();
        ("#promedio").text("Promedio de la Seccion: "+objSeccion.calcularPromedio());
    });
}

//ACTIVANDO EL MODAL DE MENSAJES
function actModal(titulo,mensaje){
    document.getElementById("modalMensajes").click();
    $("#headerMensajes").text(titulo);
    $("#bodyMensajes").html(`<h5><b>${mensaje}<b><h5>`);
}

//CREANDO LA VARIABLE GLOBAL DEL OBJETO SECCION
let objSeccion;
let objUsuario;
$(document).ready(function(){
    //OCULTANDO EL MODAL DE MENSAJES
    $("#modalMensajes").hide();
    //**************DIV LOGIN*****************
    //VERIFICANDO SI EL USUARIO ESTA REGISTRADO PARA MOSTRAR LA RESPECTIVA INFORMACION
    if(Cookies.get("usuario")!=undefined){
        $("#login").hide();
        $("#datos").show();
        try{
            objUsuario=JSON.parse(Cookies.get("usuario"));
        }catch(e){
            console.log(e)
        }
        $("#infoUsuario").text(objUsuario.usuario);
        $("#infoClave").text(objUsuario.clave);
        $("#infoNombre").text(objUsuario.nombre)
        $("#header-usuario").show();
        $("#autenticate").text("¡BIENVENIDO!");
    }else{
        $("#datos").hide();
        $("#header-usuario").hide();
        $("#login").show();
        $("#autenticate").text("¡AUTENTÍCATE!");
    }
    //BOTON DE LOGIN
    $("[name='btnLogin']").click(function (){
        if(!validarLength($("#usuario").val(),1) || !validarLength($("#clave").val(),1)){
            actModal("¡Ups","Los campos de usuario y contraseña no deben estar vacios.")
            $("#usuario").val("");
            $("#usuario").focus();
            $("#clave").val("");
        }else{
            for(let i=0;i<usuarios.length;i++){
                if($("#usuario").val()==usuarios[i].usuario && $("#clave").val() == usuarios[i].clave){
                    $("#login").hide();
                    $("#terminar").hide();
                    $("#datos").show();
                    $("#input-seccion").val("");
                    $("#materia").val("");
                    $("#container-seccion").show();
                    $("#form-alumnos").hide();
                    $("#tabla").hide();
                    $("#promedio").hide();
                    objUsuario = usuarios[i];
                    $("#infoUsuario").text(objUsuario.usuario);
                    $("#infoClave").text(objUsuario.clave);
                    $("#infoNombre").text(objUsuario.nombre)
                    $("#header-usuario").show();
                    $("#autenticate").text("¡BIENVENIDO!");
                    $("#mensajes").hide();
                    Cookies.set("usuario",JSON.stringify(objUsuario));
                    break;
                }
            }
            if(objUsuario == undefined){
                actModal("¡Ups!","¡Usuario o Contraseña incorrectos!")
                $("#usuario").val("");
                $("#usuario").focus();
                $("#clave").val("");
            }
        }
    });
    //BOTON DE CERRAR SESION
    $("#cerrarSesion").click(function(){
        //VACIANDO LA TABLA
        if(objSeccion!=undefined)
            for(let i=1;i<=objSeccion.alumnos.length;i++)
                document.getElementById("tabla").deleteRow(-1);
        Cookies.remove("usuario");
        localStorage.removeItem("seccion");
        $("#datos").hide();
        $("#header-usuario").hide();
        $("#login").show();
        $("#autenticate").text("¡AUTENTÍCATE!");
        $("#usuario").val("");
        $("#clave").val("");
        $("#input-seccion").val("");
        $("#materia").val("");
    });
    //MODAL DE LOGIN
    $("#jsonModal").click(function (){
        $("#jsonUsuarios").text("");
        $("#jsonAlumnos").text("");
        for(let i=0;i<usuarios.length;i++){
            //USUARIOS
            $("#jsonUsuarios").append(`<h5>Nro <b>${i+1}:</h5>`)
            $("#jsonUsuarios").append(`<h6>-Nombre: <b>${usuarios[i].nombre}</b></h6>`)
            $("#jsonUsuarios").append(`<h6>-Usuario: <b>${usuarios[i].usuario}</b></h6>`)
            $("#jsonUsuarios").append(`<h6>-Contraseña: <b>${usuarios[i].clave}</b></h6>`)
            //ALUMNOS
            $("#jsonAlumnos").append(`<h5>Nro <b>${i+1}:</h5>`)
            $("#jsonAlumnos").append(`<h6>-Nombre: <b>${baseAlumnos[i].nombre}</b></h6>`)
            $("#jsonAlumnos").append(`<h6>-Usuario: <b>${baseAlumnos[i].cedula}</b></h6>`)
        }
        
    })

    //**************DIV DATOS*****************
    // REVISANDO LA COOKIE CUANDO CARGA LA PAGINA
    let tabla = document.getElementById("tabla");
    if(localStorage.getItem('seccion')!=undefined){
        $("#container-seccion").hide();
        $("#datos form").show();
        $("#terminar").show();
        $("#infoUsuario").text(objUsuario.usuario);
        $("#infoClave").text(objUsuario.clave);
        $("#infoNombre").text(objUsuario.nombre)
        $("#header-usuario").show();
        $("#autenticate").text("¡BIENVENIDO!");
        //OBTENIENDO EL STRING DEL COOKIE EN FORMA DE OBJETO
        let local;
        try{
            local = JSON.parse(localStorage.getItem('seccion'))
        }catch(e){
            console.log(e);
        }
        //INSTANCIANDO LA CLASE SECCION CON LOS DATOS DE LA COOKIE
        objSeccion=new Seccion(local.numero,local.curso);
        for(i=0;i<local.alumnos.length;i++)
            objSeccion.alumnos.push(local.alumnos[i]);
        
        //MOSTRANDO EL PROMEDIO CON LOS VALORES DE LA CLASE INSTANCIADA
        if(objSeccion.alumnos.length>0){
            $("#promedio").show();
            $("#tabla").show();
            $("#promedio").text("Promedio de la Seccion: "+objSeccion.calcularPromedio())
        }else{
            $("#promedio").hide();
            $("#tabla").hide();
        }
        //CREANDO AGREGANDO Y DANDO VALORES A LOS ELEMENTOS CREADOS USANDO EL OBJETO SECCION
        $("#mensajes").append(`<h1>Seccion: ${objSeccion.numero}</h1>`);
        $("#mensajes").append(`<h1>Materia: ${objSeccion.curso}</h1>`)
        for(let i=0;i<objSeccion.alumnos.length;i++)
            rellenarTabla(objSeccion,tabla,i);
    }else{
        form.style.display="none";
        $("#promedio").hide();
        $("#tabla").hide();
        $("#terminar").hide();
        $("#mensajes").hide();
    }
    //VALIDANDO INPUT DE SECCION
    $("#input-seccion").keydown((event)=>soloNumeros(event))
    //VALIDANDO LOS INPUTS DE NOTAS
    //NOTA 1
    $("[name='nota']").on({
            'keydown' : function (event){
                if(event.keyCode == 13){
                    validarNota(form.nota);
                }else
                    return soloNumeros(event);
            },
            'blur' : ()=> validarNota(form.nota)
    });
    //NOTA 2
    $("[name='nota2']").on({
        'keydown' : function (event){
            if(event.keyCode == 13){
                validarNota(form.nota2);
            }else
                return soloNumeros(event);
        },
        'blur' : ()=> validarNota(form.nota2)
});
    //NOTA 3
    $("[name='nota3']").on({
        'keydown' : function (event){
            if(event.keyCode == 13){
                validarNota(form.nota3);
            }else
                return soloNumeros(event);
        },
        'blur' : ()=> validarNota(form.nota3)
});
    //NOTA 4
    $("[name='nota4']").on({
        'keydown' : function (event){
            if(event.keyCode == 13){
                validarNota(form.nota4);
            }else
                return soloNumeros(event);
        },
        'blur' : ()=> validarNota(form.nota4)
});
    //EVENTO DEL CLICK EN EL BOTON PARA AGREGAR SECCION
    $("#btnSeccion").click(function(){
        if(!validarLength($("#input-seccion").val(),1) ||!validarLength($("#materia").val(),1))
            actModal("¡Ups!","¡Los campos de la seccion y la materia no deben estar vacíos!")
        else {
            //INSTANCIANDO UN OBJETO SECCION
            let seccion = new Seccion($("#input-seccion").val(),$("#materia").val())
            //GUARDANDO EL OBJETO SECCION EN UNA VARIABLE GLOBAL
            objSeccion = seccion;
            //GUARDANDO EL OBJETO EN LA COOKIE
            let local = JSON.stringify(seccion)
            localStorage.setItem('seccion', local)
            //CREANDO AGREGANDO Y DANDO VALORES A LOS ELEMENTOS CREADOS USANDO EL OBJETO SECCION
            $("#mensajes").html(`<h1>Seccion: ${objSeccion.numero}</h1>`);
            $("#mensajes").append(`<h1>Materia: ${objSeccion.curso}</h1>`);
            //MOSTRANDO EL PROMEDIO Y EL FORMULARIO
            $("#container-seccion").hide();
            $("#promedio").hide();
            $("#mensajes").show();
            $("#terminar").show();
            $("[name='form']").show();
            $("#mensajes").show();
        }
    });
    //BUSCANDO LA CEDULA CUANDO EL USUARIO PRESIONA ENTER
    $("[name='cedula']").on({
        'keydown' : function (event){
            if(event.keyCode == 13){
                let cedula = buscarCedula(form.cedula.value);
                if(cedula==undefined){
                    actModal("¡Ups!","¡La cedula no fue encontrada!");
                    form.cedula.value="";
                }else form.nombre.value=cedula;
            }
            return soloNumeros(event)
        },
        'blur' : ()=>{
            if(validarLength(form.cedula.value,1)){
                let cedula = buscarCedula(form.cedula.value);
                if(cedula==undefined){
                    actModal("¡Ups!","¡La Cedula no fue encontrada!");
                    form.cedula.value="";
                    form.cedula.focus();
                }else form.nombre.value=cedula;
            }
        }
});
    //EVENTO ONCLICK DEL BOTON TERMINAR
    $("#terminar").click(function(){
        //VACIANDO LA TABLA
        if(objSeccion!=undefined)
            for(let i=1;i<=objSeccion.alumnos.length;i++)
                document.getElementById("tabla").deleteRow(-1);

        localStorage.removeItem('seccion');
        $("#mensajes").hide();
        $("[name='form']").hide();
        $("#tabla").hide();
        $("#promedio").hide();
        $("#terminar").hide();
        $("#materia").val("");
        $("#input-seccion").val("");
        $("#container-seccion").show();
    });

    //REALIZANDO LAS VALIDACIONES DE LOS INPUTS
    form.nombre.onkeydown = (event)=> soloLetras(event)

    //BOTON PARA REGISTRAR ALUMNO
    form.btnRegistrar.onclick=function (){
        if(!validarLength(form.nombre.value,1)||!validarLength(form.cedula.value,1)||!validarLength(form.nota.value,1)||!validarLength(form.nota2.value,1)||!validarLength(form.nota3.value,1)||!validarLength(form.nota4.value,1))
        actModal("¡Ups!","Ninguno de los campos (Nombre,Cedula,Nota) deben estar vacíos.");
        else{
            let alumno = new Alumno($("[name='nombre']").val(),$("[name='cedula']").val());
            //INGRESANDO LAS NOTAS AL ARREGLO DE NOTAS DEL OBJETO ALUMNO
            alumno.notas.push(form.nota.value);
            alumno.notas.push(form.nota2.value);
            alumno.notas.push(form.nota3.value);
            alumno.notas.push(form.nota4.value);
            //AGREGANDO EL ALUMNO CREADO EN EL ARREGLO DE ALUMNOS DE LA SECCION
            objSeccion.alumnos.push(alumno)
            //GUARDANDO EL OBJETO EN LAS COOKIES
            let local=JSON.stringify(objSeccion)
            localStorage.setItem('seccion',local)
            //RELLENANDO LA TABLA
            rellenarTabla(objSeccion,tabla,objSeccion.alumnos.length-1);
            //HACIENDO LA TABLA VISIBLE
            $("#tabla").show();
            $("#terminar").show();
            $("#promedio").show();
            //REINICIANDO LOS INPUTS
            form.nombre.value="";
            form.cedula.value="";
            form.nota.value="";
            form.nota2.value="";
            form.nota3.value="";
            form.nota4.value="";
            //ACTUALIZANDO EL PROMEDIO DE LA SECCION
            $("#promedio").text("Promedio de la Seccion: "+objSeccion.calcularPromedio())
            $("[name='cedula']").focus()
        }
    }
});