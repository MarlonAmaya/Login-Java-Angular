import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vc } from './vc';

describe('Vc', () => {
  let component: Vc;
  let fixture: ComponentFixture<Vc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
