import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelonComponent } from './echelon.component';

describe('EchelonComponent', () => {
  let component: EchelonComponent;
  let fixture: ComponentFixture<EchelonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchelonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchelonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
