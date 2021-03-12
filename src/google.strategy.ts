import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '563423076707-cu1idpnpd4ec99u763ukgmrpjjc5sl95.apps.googleusercontent.com',
            clientSecret: 'VZcfgyv6dZoJ4HF0OH_E8SIr',
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done:VerifyCallback): Promise<any>{
        const {name, emails, photos} = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user)
    }
}