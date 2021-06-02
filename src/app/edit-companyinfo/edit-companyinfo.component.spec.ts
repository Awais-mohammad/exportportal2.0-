import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyinfoComponent } from './edit-companyinfo.component';

describe('EditCompanyinfoComponent', () => {
  let component: EditCompanyinfoComponent;
  let fixture: ComponentFixture<EditCompanyinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
