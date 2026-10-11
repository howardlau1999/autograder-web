import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LoginPageModule } from '../../login-page/login-page.module';
import { GithubBindComponent } from './github-bind.component';

describe('GithubBindComponent', () => {
  let component: GithubBindComponent;
  let fixture: ComponentFixture<GithubBindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(GithubBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
