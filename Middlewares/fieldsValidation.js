// validando token //   
const validationToken = (req, res, next) => {
    const TOKEN_LENGTH = 16;
    // const token = req.headers.authorization;
    const TOKEN = '7mqaVRXJSp886CGr';
    const { authorization } = req.headers;
    if (!authorization) {
 return res.status(401).json({
        message: 'Token não encontrado',
    }); 
}
    if (authorization !== TOKEN || authorization.length !== TOKEN_LENGTH) {
        return res.status(401).json({
            message: 'Token inválido',
        });
    }
   return next();
};

// Validação do email //
const validationEmail = (req, res, next) => {
    // validação de email feita com regex, referencias: 
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f
    const REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const { email } = req.body;
    
    if (!email || email === '') {
        return res.status(400).json({
            message: 'O campo "email" é obrigatório',
        });
    }
    
    if (!REGEX.test(email)) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }
    next();
};

// Validação da senha //
const validationPassword = (req, res, next) => {
    const { password } = req.body;
    const PASSWORD_LENGTH = 6;

    if (!password) {
 res.status(400).json({
        message: 'O campo "password" é obrigatório',
    }); 
}
    if (password.length < PASSWORD_LENGTH) {
 res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
}
    next();
};

// Validação do nome //
const validationName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
        });
    }
    if (name.length < 3) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    next();
};
// Validação da idade //
const validationAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age === '') {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        });
    }
    if (age < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }

    next();
};

const validationTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || talk === '') {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    const { watchedAt, rate } = talk;
    if (!watchedAt || rate === '') {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    next();
};

const validationDate = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    // const regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g;
    if (!regexDate.test(watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const validationRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (rate < 1 || rate > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
    if (!rate || rate === '') {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    next();
};
 
module.exports = {
    validationEmail,
    validationPassword,
    validationName,
    validationAge,
    validationToken,
    validationTalk,
    validationDate,
    validationRate,
};