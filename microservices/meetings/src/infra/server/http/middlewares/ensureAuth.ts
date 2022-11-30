import {Request, Response, NextFunction} from 'express'
import Token from 'keycloak-connect/middleware/auth-utils/token';
import Signature from 'keycloak-connect/middleware/auth-utils/signature';


export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers
    
    if(!headers.authorization) {
        res.status(400).json({success: false, message: "Missing authorization token"})
    }
    
    console.log({ HeadersAuthorization: headers.authorization })

    const tokenRaw = headers.authorization.split(" ")[1]
    
    console.log({ tokenRaw })

    const kcConfig = {
        issuer: "https://lemur-17.cloud-iam.com/auth/realms/meetup-clone",
        publicCertificate: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArMryxKjmLTpsHIiF6cvSS5gTVwSW5SrtyCrIgCZqV8uhhAZ8DRIc34paDN0O2SQCZOx2PveZdqX7Ip3S/fQdl9HEWqRiB0zHfQzBHJ0Zn71RxJ3fzVXg1syXoMxvoaieA5R0g2DwCDYGcsNdiLm7KKD4lLsaZHO5GR9JWFzpgJg3UlYOBJ1sOzVKj7t+Tf7Nk3ooe9zr7tJtbzvO+rzce6VqkjlEuSrksM0Nn1ikR+7GgkOK10Rh/SCTL72BYgOQe9lv+mDuip6fPYnt4fFt03GNHamLm1AmukKj1cVG5D2YwibVTVd+445E9GGSDxyfdQdEFkXkCEqmkh3HjoFRPQIDAQAB",
        clientId: "meetup-auth-client",
    }

    const token = new Token(tokenRaw, kcConfig.clientId)
    const signature = new Signature({
        realmUrl: kcConfig.issuer,
        publicKey: kcConfig.publicCertificate,
        minTimeBetweenJwksRequests: 0
    })
    
    console.log({token, signature})

    try {
        signature.verify(token, null).then(token => {
            (req as any).user = token
            console.log({tokenRes: token})
            next()
        }).catch((err) => {
            console.error(err)
            res.status(401).json({success: false, message: "Unauthorized"})
        })
    } catch(err) {
        console.error(err)
        res.status(400).json({success: false, message: "Somethin went wrong"})
    }
}