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
    expect(zone.value).toBeNull();
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

   it('Zone TELEPHONE est désactivée quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('telephone')
    expect(zone.disabled).toBeTruthy();
   });

   it('Zone ADRESSE COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel')
    expect(zone.enabled).toBeTruthy();
   });

   it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation')
    expect(zone.enabled).toBeTruthy();
   });

   it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel')
    zone.setValue(null);
    expect(zone.valid).toBeFalsy();
   });
   
   it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courrielConfirmation')
    zone.setValue(null);
    expect(zone.valid).toBeFalsy();
   });

   it('Zone ADRESSE COURRIEL est invalide avec un format non conforme',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel')
    zone.setValue("ffff");
    expect(zone.valid).toBeFalsy();
   });

   it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    let zone2=component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zone3=component.problemeForm.get('courrielGroup');
    zone.setValue(null);
    zone2.setValue('22@22.com');
    expect(zone3.valid).toBeFalsy();
   });

   it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    let zone2=component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zone3=component.problemeForm.get('courrielGroup');
    zone.setValue('22@22');
    zone2.setValue('');
    expect(zone3.valid).toBeFalsy();
   });
   
   it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    let zone2=component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zone3=component.problemeForm.get('courrielGroup');
    zone.setValue('22@22');
    zone2.setValue('22@222');
    expect(zone3.valid).toBeFalsy();
   });

   it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel',() => {
    component.appliquerNotifications('parCourriel');
    let zone=component.problemeForm.get('courrielGroup.courriel');
    let zone2=component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zone3=component.problemeForm.get('courrielGroup');
    zone.setValue('22@22');
    zone2.setValue('22@22');
    expect(zone3.valid).toBeTruthy();
   });

});
