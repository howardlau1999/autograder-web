import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LoginPageModule } from '../login-page.module';
import { GithubLoginComponent } from './github-login.component';

describe('GithubLoginComponent', () => {
  let component: GithubLoginComponent;
  let fixture: ComponentFixture<GithubLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(GithubLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
