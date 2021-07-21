import jwt from 'jsonwebtoken';

function auth(req,res,next){     
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){        
        jwt.verify(authToken,process.env.JWT_SECRET,(err,data) => {            
            if(err){
                return res.status(401).json({message: 'Token inválido'});
            }else {
                res.status(200);
                next();
            }
        });
    }else {
        return res.status(401).json({message: 'Token inválido'});
    }
}

export default auth;