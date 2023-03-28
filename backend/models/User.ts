import googleauth from 'passport-google-oauth';
import { Auth } from 'googleapis';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class User implements googleauth.Profile {
    /* Google Profile - Inherited from googleauth.Profile */
    @PrimaryColumn()
    id: string;
    displayName: string;
    username?: string | undefined;
    name?: { familyName: string; givenName: string; middleName?: string | undefined; } | undefined;
    emails?: { value: string; type?: string | undefined; }[] | undefined;
    photos?: { value: string; }[] | undefined;
    gender: string;
    _raw: string;
    _json: any;
    provider: string;

    /* AppTrack Profile */
    tokens?: Auth.Credentials;
    //last time email was scraped - in seconds since epoch (1/1/1970)
    @Column({ nullable: true })
    lastEmailRefreshTime?: number;
}
