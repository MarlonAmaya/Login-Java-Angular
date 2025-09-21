import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadVC } from './load-vc';

describe('LoadVC', () => {
  let component: LoadVC;
  let fixture: ComponentFixture<LoadVC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadVC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadVC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
