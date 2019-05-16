import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { longeurMinimum } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';
import { courrielValidator } from '../shared/email-matcher/email-matcher.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemeProblemes: ITypeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder, private typeProbleme: TypeproblemeService, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required, longeurMinimum.longueurMinimum(3)]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noTypeProbleme: ['', Validators.required],
      notification: ['nePasMeNotifier'],
      courrielGroup:this.fb.group({
        courriel: [{value:'', disabled:true}, [Validators.required]],
        courrielConfirmation: [{value:'', disabled:true}, [Validators.required]],
      }, [courrielValidator.courrielConfirmation()]),
      telephone: [{value:'', disabled:true}],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true} ,
    });

    this.typeProbleme.obtenirProblemes()
    .subscribe(cat => this.typeProblemeProblemes = cat,
               error => this.errorMessage = <any>error);  
    
    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  }

   //COPY PASTA
   appliquerNotifications(typeNotification: string): void {
    const  courrielGroupControl = this.problemeForm.get('courrielGroup');
    const  courrielControl=this.problemeForm.get('courrielGroup.courriel')
    const  courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const  telephoneControl = this.problemeForm.get('telephone');      

    // Tous remettre à zéro
    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();    
    courrielGroupControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  
    
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (typeNotification === 'nePasMeNotifier')
    {
      courrielConfirmationControl.setValue(null);
      courrielConfirmationControl.disable();
      telephoneControl.setValue(null);
      telephoneControl.disable();
      courrielControl.setValue("");
      courrielControl.disable(); 
   
    }else if(typeNotification === 'parCourriel'){
      
      courrielGroupControl.setValidators([courrielValidator.courrielConfirmation()]);
      courrielGroupControl.enable();
      courrielConfirmationControl.setValidators([Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]);
      courrielControl.setValidators([Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]);
      courrielConfirmationControl.enable();
      courrielControl.enable();
      telephoneControl.setValue(null);
      telephoneControl.disable();

    }else if(typeNotification === 'parMessagetexte'){

      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required,Validators.pattern("[0-9]+"),Validators.minLength(10),Validators.maxLength(10)]);
      courrielConfirmationControl.setValue(null);
      courrielConfirmationControl.disable();
      courrielControl.setValue(null);
      courrielControl.disable();

    }

    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity(); 

  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.probleme = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.probleme.courriel =  this.problemeForm.get('courrielGroup.courriel').value;
         this.probleme.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;      
         this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } 
  }
  
  onSaveComplete(): void {
    //this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée.  Nous vous remercions.';
    this.ngOnInit();
  }
}
