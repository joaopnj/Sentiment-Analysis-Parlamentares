module.exports = (app) => {
    var bayes             = require('bayes');
    var Congressista      = app.models.congressistas;
    var Tweet             = app.models.tweet;
    var Dao               = app.dao.tweet;
    
    var SentimentalService = { 
        analysis : () => {
            var classifier = bayes();

            classifier.learn("Ótimo, ótimo, Otimo, otimo. Bom, bom. Espetacular, espetacular. Boa, boa. Incrível, incrível, Incrivel, incrivel. Iniciativa iniciativa", "positivo");
            classifier.learn("Péssimo, péssimo, Pessimo, pessimo. Merda, merda. Horrível. Bosta, Lixo lixo, Fascista. Odeio, odeio. Porco, Cachorro", "negativo");

            Tweet.find( (err, data) => {
                for (var i = 0; i < data.length; i++) {
                    Dao.saveTweet(data[i], classifier.categorize(data[i]));
                }
            });
        }
    }

    return SentimentalService;
}
