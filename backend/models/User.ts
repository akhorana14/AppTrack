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
    /**
     * 
     * Last time email was scraped - in seconds since epoch (1/1/1970) - use Math.round(date.getTime() / 1000) to get current time in seconds
     **/
    @Column({ nullable: true })
    lastEmailRefreshTime?: number;
    //boolean variable to determine if the user deactivated the account
    @Column({ nullable: true })
    accountDeactivated?: boolean;
    // How long ago when an application is marked stale - in seconds
    @Column({ nullable: true })
    staleTime?: number;

    /**
     * Determines whether AppTrack should scrape this user's email or not (set upon registration / and also in settings).
     */
    @Column({ default: false })
    scrape?: boolean;
}
