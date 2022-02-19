import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubBindComponent } from './github-bind.component';

describe('GithubBindComponent', () => {
  let component: GithubBindComponent;
  let fixture: ComponentFixture<GithubBindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubBindComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
