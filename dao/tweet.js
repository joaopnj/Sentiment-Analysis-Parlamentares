module.exports = (app) => {
    var Tweet             = app.models.tweet;
    
    var TweetDao = { 
        saveTweet : (tweet, sentimento) => {
            Tweet.findOne( {"texto" : tweet.texto}, (err, dados) => {
                if(err) console.log(err);
                if(dados || !dados.sentimento ){ dados.sentimento = sentimento; }
                return dados || dados.sentimento ? dados.save( (err) => { console.log(err); }) : console.log("Tweet já possui analise ou não existe");
            });
        }
    }

    return TweetDao;
}