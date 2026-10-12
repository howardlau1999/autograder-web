import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { Either, right } from 'fp-ts/Either';
import { Subject } from 'rxjs';

import { ApiService } from '../../api/api.service';
import { RequestSignUpTokenResponse } from '../../api/proto/api_pb';
import { ErrorService, FormError } from '../../service/error.service';
import { UserService } from '../../service/user.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let response$: Subject<Either<FormError, RequestSignUpTokenResponse>>;
  const requestCode = vi.fn<UserService['requestSignUpToken']>();
  const showSnackBar = vi.fn();
  const success = () => right(new RequestSignUpTokenResponse());

  beforeEach(async () => {
    response$ = new Subject();
    requestCode.mockReset().mockReturnValue(response$);
    showSnackBar.mockReset();
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        provideRouter([]),
        { provide: ApiService, useValue: {} },
        { provide: MatSnackBar, useValue: { open: showSnackBar } },
        { provide: ErrorService, useValue: { handleFormError: () => vi.fn() } },
        {
          provide: UserService,
          useValue: { hcaptchaSiteKey: '', requestSignUpToken: requestCode },
        },
      ],
    })
      .overrideTemplate(SignUpComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.signUpForm.patchValue({ username: 'student', email: 'student@example.com' });
    fixture.detectChanges();
    vi.useFakeTimers();
  });

  afterEach(() => {
    fixture.destroy();
    vi.useRealTimers();
  });

  it('expires the countdown after 60 seconds', () => {
    component.onVerify('captcha');
    response$.next(success());
    expect(component.requestCodeCounter).toBe(60);
    vi.advanceTimersByTime(1000);
    expect(component.requestCodeCounter).toBe(59);
    vi.advanceTimersByTime(59000);
    expect(component.requestCodeCounter).toBe(0);
    expect(component.counterSub).toBeUndefined();
    vi.advanceTimersByTime(5000);
    expect(component.requestCodeCounter).toBe(0);
  });

  it('stops an active countdown when the component is destroyed', () => {
    component.onVerify('captcha');
    response$.next(success());
    vi.advanceTimersByTime(5000);
    const counter = component.counterSub;
    fixture.destroy();
    expect(counter?.closed).toBe(true);
    vi.advanceTimersByTime(60000);
    expect(component.requestCodeCounter).toBe(55);
  });

  it('cancels a pending request so a late response cannot start a countdown', () => {
    component.onVerify('captcha');
    expect(response$.observed).toBe(true);
    fixture.destroy();
    expect(response$.observed).toBe(false);
    response$.next(success());
    vi.advanceTimersByTime(1000);
    expect(component.requestCodeCounter).toBe(0);
    expect(component.counterSub).toBeUndefined();
    expect(showSnackBar).not.toHaveBeenCalled();
  });

  it('ignores the response from a superseded verification request', () => {
    component.onVerify('first-captcha');
    const latestResponse$ = new Subject<Either<FormError, RequestSignUpTokenResponse>>();
    requestCode.mockReturnValue(latestResponse$);
    component.onVerify('second-captcha');
    expect(response$.observed).toBe(false);
    response$.next(success());
    expect(component.requestCodeCounter).toBe(0);
    latestResponse$.next(success());
    expect(component.requestCodeCounter).toBe(60);
    expect(showSnackBar).toHaveBeenCalledTimes(1);
  });

  it('replaces an existing countdown after another successful request', () => {
    component.onVerify('first-captcha');
    response$.next(success());
    vi.advanceTimersByTime(5000);
    const previousCounter = component.counterSub;
    component.onVerify('second-captcha');
    response$.next(success());
    expect(previousCounter?.closed).toBe(true);
    expect(component.requestCodeCounter).toBe(60);
    vi.advanceTimersByTime(1000);
    expect(component.requestCodeCounter).toBe(59);
    vi.advanceTimersByTime(59000);
    expect(component.requestCodeCounter).toBe(0);
  });
});
