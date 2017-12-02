module.exports = (app) => {
    const classifier            = require('classifier');
    const Congressista          = app.models.congressistas;
    const Tweet                 = app.models.tweet;
    const Dao                   = app.dao.tweet;
    const BadWordsAndSentences  = 'Péssimo, péssimo, Pessimo, pessimo. Pessima, pessima, prisão, ladrão, Horrível, PALHAÇO, afastamento palhaço, gays, atirar,Mal caráter, piada,Foram PIADA, Piada, Bosta, Lixo lixo, ingratidão, Fascista,Circo. fascista. Odeio, odeio. Homofóbicas, homofóbicas, homofóbicos, Homofobicos , homofobicos';
    const GoodWordsAndSentences = 'Incrível, incrível, Incrivel, incrivel. Iniciativa, iniciativa. Excelente, excelente, boa indole, bom carater, Ótimo, ótimo, Otimo, otimo. Bom, bom. Espetacular, espetacular. Boa, respeito, gratidão, boa.';
    
    var SentimentalService = { 
        analysis : () => {
            var bayes = new classifier.Bayesian();

            bayes.train(BadWordsAndSentences , 'negativo');
            bayes.train(GoodWordsAndSentences, 'positivo');

            Tweet.find( (err, data) => {
                console.log(data.length);
                for (var i = 0; i < data.length; i++) {
                    Dao.saveTweet(data[i], bayes.classify(data[i].texto));
                }
            });
        },

        rankCongressista: (req,res) => {
            Congressista.find( (err, congressista) => {
                if (err) console.log(err);
                for (let i = 0; i < congressista.length; i++) {
                    console.log('Congressista: '+congressista[i].nome);
                    Tweet.find({ 'congressista' : congressista[i].nome }, (err, tweet) => {
                        var rank = 0
                        if(tweet.length > 0){
                            if (err) console.log(err);
                            console.log("Lista de Tweets: ",tweet);
                            var totalTweets = tweet.length;
                            console.log("Total de Tweets: "+totalTweets);
                            var count = 0;
                            
                            for (let i = 0; i < tweet.length; i++) {
                                if(tweet[i].sentimento == 'positivo')  {
                                    count++;
                                }
                                    
                            }
                            var rank = count/tweet.length;
                            congressista[i].pontuacao = rank;
                            
                            var numeroTweets = tweet.length;
                            
                            console.log('Rank: '+rank);
                            
                            congressista[i].pontuacao    = rank;
                            congressista[i].numeroTweets = numeroTweets;

                        }
                        else{
                            congressista[i].pontuacao = null;
                        }
                        
                        Dao.saveCongressistas(congressista[i]);

                    });
                }   
            });
			
        }
        
    }

    return SentimentalService;
}
