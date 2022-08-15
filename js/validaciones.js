// VALIDACIONES DE INPUTS
//RESTRINGIENDO LETRAS
function soloNumeros(evento){
    let letra = evento.key;
    regExp= /[0-9]/;
    if(evento.keyCode == 13 || evento.keyCode == 8 || evento.keyCode == 9)
        return true;
    else
        return regExp.test(letra);
}
//RESTRINGIENDO NUMEROS
function soloLetras(evento){
    let letra = evento.key;
    regExp= /^[A-Za-z]+$/;
    if(evento.keyCode == 13 || evento.keyCode == 8 || evento.keyCode == 9)
        return true;
    else
        return regExp.test(letra);
}
//VALIDANDO CORREO ELECTRONICO
function validarCorreo(correo,expReg){
    if(expReg==undefined) expReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (expReg.test(correo))
}
//VALIDANDO QUE EL NUMERO DADO POR PARAMETRO ESTE DENTRO DE UNA CANTIDAD DETERMINADA
function validarCantidad(num,limite,base){
    if (base == undefined) base = 0;
    return ((num >= base) && (num <= limite))
}
//VALIDANDO QUE LA CADENA PASADA POR PARAMETRO TENGA UNA CANTIDAD DETERMINADA DE CARACTERES
function validarLength(texto,base){
    return (texto.trim().length >= base)
}