import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { longeurMinimum } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './probleme';
import { courrielValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm:FormGroup;
  typeProblemes:ITypeProbleme[];
  errorMessage:string;
  constructor(private fb:FormBuilder,private problemes:TypeproblemeService) { }

  ngOnInit() {

    this.problemeForm=this.fb.group({

      prenom:['',[Validators.required, longeurMinimum.longueurMinimum(3)]],
      nom:['',[Validators.required, Validators.maxLength(50)]],
      typeprobleme:['',[Validators.required]],
      typeNotification:[' '],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true},[Validators.required]],
        },[courrielValidator.courrielConfirmation]),
       telephone: [{value: '', disabled: true}]
    });

    this.problemes.obtenirProblemes()
    .subscribe(cat => this.typeProblemes = cat,
               error => this.errorMessage = <any>error);  
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
}
