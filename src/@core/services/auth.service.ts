import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private clientId = '789891999972-koda4p7gmgbhbhi1cc1fcap9euh3k47h.apps.googleusercontent.com';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.initGoogleAuth();
    }

    async initGoogleAuth() {
        if(isPlatformBrowser(this.platformId)) {
            const { loadGapiInsideDOM, gapi } = await import('gapi-script');
            await loadGapiInsideDOM();
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: this.clientId
                })
            })
        }
    }

    async signInWithGoogle () {
        if(isPlatformBrowser(this.platformId)) {
            const { gapi } = await import("gapi-script");

            const auth2 = gapi.auth2.getAuthInstance();
            const googleUser  = await auth2.signIn();
            const id_token = googleUser.getAuthResponse().id_token;
    
            // Send the token back for verification
            return id_token
        }
    }
}