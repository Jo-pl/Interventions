import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { longeurMinimum } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './probleme';

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
    });

    this.problemes.obtenirProblemes()
    .subscribe(cat => this.typeProblemes = cat,
               error => this.errorMessage = <any>error);  
  }

}
