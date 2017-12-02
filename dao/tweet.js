module.exports = (app) => {
    var Tweet             = app.models.tweet;
    var Congressistas     = app.models.congressistas;
    
    var TweetDao = { 
        saveTweet : (tweet, sentimento) => {
            Tweet.findOne( {"texto" : tweet.texto}, (err, dados) => {
                if(err) console.log(err);
                if(dados || !dados.sentimento ){ dados.sentimento = sentimento; }
                return dados || dados.sentimento ? dados.save( (err) => { console.log(err); }) : console.log("Tweet já possui analise ou não existe");
            });
        },

        saveCongressistas : (congressista) => {
            Congressistas.findOne( {"nome" : congressista.nome}, (err, dados) => {
                if(err) console.log(err);
                if(dados){ dados.pontuacao = congressista.pontuacao; }
                return dados || dados.pontuacao ? dados.save( (err) => { console.log(err); }) : console.log("Dados nulos");
            });
        }
        
    }

    return TweetDao;
}