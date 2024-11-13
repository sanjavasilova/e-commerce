import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubcategoriesOfCategoryComponent } from './show-subcategories-of-category.component';

describe('ShowSubcategoriesOfCategoryComponent', () => {
  let component: ShowSubcategoriesOfCategoryComponent;
  let fixture: ComponentFixture<ShowSubcategoriesOfCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSubcategoriesOfCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSubcategoriesOfCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
