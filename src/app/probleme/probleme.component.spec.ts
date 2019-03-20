import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {

  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       imports:[ReactiveFormsModule],
       declarations: [ ProblemeComponent ]
     })
     .compileComponents();
   }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProblemeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

     it('should create', () => {
       expect(component).toBeTruthy();
     });

  it('Prénom devrait etre invalide à 2 caracteres', () => {
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('aa');
    expect(zone.valid).toBeFalsy();
   });

   it('Prénom devrait etre valide à 3 caracteres'),()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('aaa');
    expect(zone.valid).toBeTruthy();
   }


});
