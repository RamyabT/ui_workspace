import OktaAuth from "@okta/okta-auth-js";
import { environment } from 'src/environments/environment';

export const oktaAuth = new OktaAuth(environment.okta?.oidc);