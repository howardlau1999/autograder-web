import {NgModule} from '@angular/core';
import {NgHcaptchaModule} from "ng-hcaptcha";
import {environment} from "../../../environments/environment";


@NgModule({
  imports: [
    NgHcaptchaModule.forRoot({
      siteKey: environment.hcaptchaSiteKey,
    }),
  ],
  exports: [NgHcaptchaModule],
})
export class HcaptchaModule {
}
