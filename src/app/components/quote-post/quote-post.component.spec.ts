import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePostComponent } from './quote-post.component';

describe('QuotePostComponent', () => {
  let component: QuotePostComponent;
  let fixture: ComponentFixture<QuotePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
