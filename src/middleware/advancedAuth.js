import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
	audience: 'https://winc-bnb-api',
	issuerBaseURL: 'https://dev-t2wyolh2lwnsfknw.us.auth0.com/',
});
export default checkJwt;
