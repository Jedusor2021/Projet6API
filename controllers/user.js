const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../Models/user');


//crypter le mot de passe et enregistré l'utilisateur dans labase de données
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: req.body.email,
            passeword: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'utilisateur créé'}))
            .catch(error => res.statuts(400).json({error}));
    })
    .catch(error => res.statuts(500).json({error}));
    
};

exports.login = (res, req, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'utilisateurnon trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user.userId,
                        token: jwt.sign(
                            { userId: user.userId },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error }));
        })
        .catch(error => res.status(500).json({error}));
};
