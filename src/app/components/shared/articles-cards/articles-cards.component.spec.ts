import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesCardsComponent } from './articles-cards.component';

describe('ArticlesCardsComponent', () => {
  let component: ArticlesCardsComponent;
  let fixture: ComponentFixture<ArticlesCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
