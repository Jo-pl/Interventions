import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProblemeComponent } from './probleme/probleme.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProblemeComponent
      ],
    }).compileComponents();
  }));

 // it('should create the app', () => {
 //   const fixture = TestBed.createComponent(AppComponent);
 //   const app = fixture.debugElement.componentInstance;
 //   expect(app).toBeTruthy();
 // });
//
 // it(`should have as title 'Interventions'`, () => {
 //   const fixture = TestBed.createComponent(AppComponent);
 //   const app = fixture.debugElement.componentInstance;
 //   expect(app.title).toEqual('Interventions');
  //});

 // it('should render title in a h1 tag', () => {
 //   const fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  const compiled = fixture.debugElement.nativeElement;
  //  expect(compiled.querySelector('h1').textContent).toContain('Welcome to Interventions!');
  //});
});
