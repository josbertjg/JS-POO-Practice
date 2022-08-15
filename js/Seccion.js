//-------OBJETIVO 2----------
class Seccion{
    constructor(numero,curso){
        this.numero=numero;
        this.curso=curso;
        this.alumnos=[];
    }
    calcularPromedio(){
        if(this.alumnos.length == 0)
            return 0
        else{
            let promA=0,prom=0;
            for(let i=0;i<this.alumnos.length;i++){
                promA=0;
                for(let j=0;j<4;j++)
                    promA += parseInt(this.alumnos[i].notas[j]);
                promA/=4
                prom+=promA;
            }
            return (prom/this.alumnos.length).toFixed(2);
        }
    }
}