import jwt, { decode } from 'jsonwebtoken';

const auth = async(req, res, next) =>{ //next - uradi nesto i predji na sledecu stvar
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //ako je length manji od 500, to znaci da je nas custom token, ako je ==500, to je google auth

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test') //secret, mora da bude isti kao u controlleru
            
            req.userId = docodedData?.id;
        }else {
            decodedData = jwt.decode(token);

            req.userId = docodedData?.sub; //google id za razlikovanje korisnika
        }

        next(); //uradi sledecu stvar (controller), nakon sto je izvrsena autorizacija

    } catch (error) {
        console.log(error);
    }

    export default auth;
}