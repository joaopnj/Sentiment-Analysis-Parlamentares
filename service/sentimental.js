module.exports = (app) => {
    var classifier        = require('classifier');
    var Congressista      = app.models.congressistas;
    var Tweet             = app.models.tweet;
    var Dao               = app.dao.tweet;
    
    var SentimentalService = { 
        analysis : () => {
            var bayes = new classifier.Bayesian();

            bayes.train('Péssimo, péssimo, Pessimo, pessimo. Pessima, pessima' , 'negativo');
            bayes.train('Horrível.PALHAÇO, palhaço, gays, atirar, piada,Foram PIADA, Piada, Bosta, Lixo lixo, ingratidão, Fascista,Circo. fascista. Odeio, odeio. Homofóbicas, homofóbicas, homofóbicos, Homofobicos , homofobicos,', 'negativo');
            bayes.train('Ótimo, ótimo, Otimo, otimo. Bom, bom. Espetacular, espetacular. Boa, respeito, gratidão, boa.','positivo');
            bayes.train('Incrível, incrível, Incrivel, incrivel. Iniciativa, iniciativa. Excelente, excelente', 'positivo');

            Tweet.find( (err, data) => {
                for (var i = 0; i < data.length; i++) {
                    Dao.saveTweet(data[i], bayes.classify(data[i].texto));
                }
            });
        }
    }

    return SentimentalService;
}
