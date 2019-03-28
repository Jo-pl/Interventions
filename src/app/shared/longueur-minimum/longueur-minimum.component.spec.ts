import { longeurMinimum } from "./longueur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('longueur zone Validator',()=>{
    it('valeur invalide 1 pour la plage en dessous de 2 ou vide',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'aaaa'};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeDefined();});

    it('une chaîne avec 10 espaces est invalide ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'          '};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeDefined();});

    it('une phrase avec des mots est valide ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'Vive angular'};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeNull();});

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'   je le veux   '};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeNull();});

    it('une phrase avec 1 espace et 2 caractères est invalide. ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:' xx'};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeDefined();});

    it('une phrase avec 2 espaces et 1 caractère est invalide   ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'  x'};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeDefined();});

    it('une phrase avec 3 espaces et 3 caractères est valide  ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'  xxx '};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeNull();});

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide   ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:'     xxx     '};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeNull();});

    it('une chaîne nulle est invalide    ',()=>{ 
        //preparer une variable pour manipuler le validateur
        let validator=longeurMinimum.longueurMinimum(3);
        let valeurControle={value:null};
        //faire lappel du validateur
        let result=validator(valeurControle as AbstractControl);
        //comparer le resultat obtenu avec celui prevu
        expect(result).toBeDefined();});
});