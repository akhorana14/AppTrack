import googleauth from 'passport-google-oauth';
import { Auth } from 'googleapis';

export default class AppTrackUserProfile implements googleauth.Profile {
    /* Google Profile - Inherited from googleauth.Profile */
    gender: string;
    _raw: string;
    _json: any;
    provider: string;
    id: string;
    displayName: string;
    username?: string | undefined;
    name?: { familyName: string; givenName: string; middleName?: string | undefined; } | undefined;
    emails?: { value: string; type?: string | undefined; }[] | undefined;
    photos?: { value: string; }[] | undefined;

    /* AppTrack Profile */
    tokens?: Auth.Credentials;
}
