import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoTextComponent } from './seo-text.component';

describe('SeoTextComponent', () => {
  let component: SeoTextComponent;
  let fixture: ComponentFixture<SeoTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeoTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeoTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
