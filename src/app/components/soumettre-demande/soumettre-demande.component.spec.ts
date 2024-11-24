import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoumettreDemandeComponent } from './soumettre-demande.component';

describe('SoumettreDemandeComponent', () => {
  let component: SoumettreDemandeComponent;
  let fixture: ComponentFixture<SoumettreDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoumettreDemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoumettreDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
