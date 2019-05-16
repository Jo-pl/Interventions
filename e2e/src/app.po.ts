import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme') as Promise<any>;
  }

  getTitleText() {
    return element(by.id('titlePage')).getText() as Promise<string>;
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    //element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();
    element(by.id('typeproblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('NotifiezMoiId')).get(0).click();
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');     
  }

  setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeproblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('NotifiezMoiId')).get(2).click();
    element(by.id('telephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

   setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('prenomId')).sendKeys('tonprenom');
    element(by.id('nomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('typeproblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('NotifiezMoiId')).get(1).click();
    element(by.id('courrielId')).sendKeys('aa@bbb.com');
    element(by.id('courrielConfirmationId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

    setZoneDescriptionProblemeCaracteresInsuffisants(): void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('X');
  }

  setZoneDescriptionProblemeCaracteresSuffisants() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }

  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }   

  obtenirClasseZoneNomProbleme()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 
  
}
