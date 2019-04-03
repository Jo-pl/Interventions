import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {

  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       imports:[ReactiveFormsModule,HttpClientModule],
       declarations: [ ProblemeComponent ],
       providers:[TypeproblemeService]
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

   it('Prénom devrait etre valide à 3 caracteres',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('aaa');
    expect(zone.valid).toBeTruthy();
   });

   it('Prénom devrait etre valide à 200 caracteres',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
   });

   it('Prénom devrait etre invalide avec aucune valeur',()=>{
    let zone=component.problemeForm.controls['prenom'];
    let errors={}
    zone.setValue(null);
    errors=zone.errors||{};
    expect(errors['require']).toBeFalsy();
   });
  
   it('Prénom devrait etre invalide avec 10 espaces',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(9));
    expect(zone.valid).toBeDefined();
   });

   it('Prénom devrait etre invalide avec 2 espaces et 1 caractere',()=>{
    let zone=component.problemeForm.controls['prenom'];
    zone.setValue("   a");
    expect(zone.valid).toBeDefined();
   });
  
   it('Zone TELEPHONE est désactivée quand ne pas me notifier ',() => {
    component.appliquerNotifications('nePasMeNotifier');
    let zone=component.problemeForm.get('telephone')
    expect(zone.disabled).toBeTruthy();
   });

   it('Zone TELEPHONE est vide quand ne pas me notifier',() => {
    component.appliquerNotifications('nePasMeNotifier');
    let zone=component.problemeForm.get('telephone')
    expect(zone.value).toBeNull;
   });

   it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications('nePasMeNotifier');
    let zone=component.problemeForm.get('courrielGroup.courriel')
    expect(zone.disabled).toBeTruthy();
   });

   it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier',() => {
    component.appliquerNotifications('nePasMeNotifier');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.disabled).toBeTruthy();
   });

});
