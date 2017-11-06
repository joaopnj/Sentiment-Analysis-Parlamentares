module.exports = (app) => {
    var Tweet             = app.models.tweet;
    
    var TweetDao = { 
        saveTweet : (tweet, sentimento) => {
            Tweet.findOne( {"texto" : tweet.texto}, (err, dados) => {
                if(err) console.log(err);
                if(dados){ dados.sentimento = sentimento; }
                return dados ? dados.save( (err) => { console.log(err); }) : console.log("Tweet não existente");
            });
        }
    }

    return TweetDao;
}