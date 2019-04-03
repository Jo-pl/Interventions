import{ValidatorFn, AbstractControl} from "@angular/forms";

export class longeurMaximum{
    static longueurMaximum(longueur:number):ValidatorFn{
        //null=succes sinon une cle valeur json
        return(valeurControle: AbstractControl):{[key:string]:boolean}|null=>{
            if(valeurControle.value  && valeurControle.value.trim().length>=longueur){
                return null;
            }else {
                return{'nbreCaracteresInsuffisants':true};
            }
        };   
    }
}