const express = require('express');
const router = express.Router();
const Twit = require('twit');
const config = require('./config.js');
const twit = new Twit(config);

router.get('/', (req, res, err) => {
  twit.get('account/verify_credentials', { skip_status: true })
    .catch(function (err) {
      console.log('caught error', err.stack)
    })
    .then(function (response) {
      return twit.get('statuses/user_timeline', { screen_name: "camobrien1", count: 5 }, function (err, data, response) {

        if (err) {
          return next(err)
        }

        let tweets = data;

        // array for text

        let tweetsArray = []
        for (let i = 0; i < tweets.length; i++) {
          tweetsArray.push(tweets[i].text)
        };

        req.tweets1 = tweetsArray[0];
        req.tweets2 = tweetsArray[1];
        req.tweets3 = tweetsArray[2];
        req.tweets4 = tweetsArray[3];
        req.tweets5 = tweetsArray[4];

        // retweets

        let retweetsArray = []
        for (let i = 0; i < tweets.length; i++) {
          retweetsArray.push(tweets[i].retweet_count)
        };

        req.retweets1 = retweetsArray[0];
        req.retweets2 = retweetsArray[1];
        req.retweets3 = retweetsArray[2];
        req.retweets4 = retweetsArray[3];
        req.retweets5 = retweetsArray[4];

        // favorites

        let favoritesArray = []
        for (let i = 0; i < tweets.length; i++) {
          favoritesArray.push(tweets[i].favorite_count)
        };

        req.favCount1 = favoritesArray[0];
        req.favCount2 = favoritesArray[1];
        req.favCount3 = favoritesArray[2];
        req.favCount4 = favoritesArray[3];
        req.favCount5 = favoritesArray[4];

        // tweet time

        let timesArray = []
        for (let i = 0; i < tweets.length; i++) {
          timesArray.push(tweets[i].created_at)
        };

        req.time1 = timesArray[0];
        req.time2 = timesArray[1];
        req.time3 = timesArray[2];
        req.time4 = timesArray[3];
        req.time5 = timesArray[4];

        // user information

        req.userName = tweets[0].user.screen_name;
        req.name = tweets[0].user.name;
        req.profileImage = tweets[0].user.profile_image_url;
        req.userCount = tweets[0].user.friends_count;
      })
      .then(function (response) {
        return twit.get('friends/list', { screen_name: "camobrien1", count: 5 }, function (err, data, response) {

          if (err) {
            return next(err)
          }
          let follows = data.users;
          let followsArray = []

          for (let i = 0; i < follows.length; i++) {
            followsArray.push(follows[i].name)
          };

          req.names1 = followsArray[0];
          req.names2 = followsArray[1];
          req.names3 = followsArray[2];
          req.names4 = followsArray[3];
          req.names5 = followsArray[4];

          // user profile pic array

          let followsProfilePictureArray = []
          for (let i = 0; i < follows.length; i++) {
            followsProfilePictureArray.push(follows[i].profile_image_url)
          };

          req.profilePicture1 = followsProfilePictureArray[0];
          req.profilePicture2 = followsProfilePictureArray[1];
          req.profilePicture3 = followsProfilePictureArray[2];
          req.profilePicture4 = followsProfilePictureArray[3];
          req.profilePicture5 = followsProfilePictureArray[4];

          // user name array

          let followsNameArray = []
          for (let i = 0; i < follows.length; i++) {
            followsNameArray.push(follows[i].screen_name)
          };

          req.screenName1 = followsNameArray[0];
          req.screenName2 = followsNameArray[1];
          req.screenName3 = followsNameArray[2];
          req.screenName4 = followsNameArray[3];
          req.screenName5 = followsNameArray[4];
        });
      })
      .then(function (response) {
      return twit.get('direct_messages', { count: 5 }, function (err, data, response) {

        if (err) {
          return next(err)
        }

        // direct message array

        let messages = data;

        // array to store direct messages

        let fiveMessages = []
        for (let i = 0; i < messages.length; i++) {
          fiveMessages.push(messages[i].text)
        };

        req.messages1 = fiveMessages[0];
        req.messages2 = fiveMessages[1];
        req.messages3 = fiveMessages[2];
        req.messages4 = fiveMessages[3];
        req.messages5 = fiveMessages[4];

        let directMessagePictureArray = []
        for (let i = 0; i < messages.length; i++) {
          directMessagePictureArray.push(messages[i].sender.profile_image_url)
        };

        req.directMessagePictureArray1 = directMessagePictureArray[0];
        req.directMessagePictureArray2 = directMessagePictureArray[1];
        req.directMessagePictureArray3 = directMessagePictureArray[2];
        req.directMessagePictureArray4 = directMessagePictureArray[3];
        req.directMessagePictureArray5 = directMessagePictureArray[4];

        req.userNameMess = messages[0].sender.name;

        // time

        let directMessageTimesArray = []
        for (let i = 0; i < messages.length; i++) {
          directMessageTimesArray.push(messages[i].created_at)
        };

        req.directMessageTimesArray1 = directMessageTimesArray[0];
        req.directMessageTimesArray2 = directMessageTimesArray[1];
        req.directMessageTimesArray3 = directMessageTimesArray[2];
        req.directMessageTimesArray4 = directMessageTimesArray[3];
        req.directMessageTimesArray5 = directMessageTimesArray[4];
        });

    })
    .then((response) => {
      res.render("index", {
        follows1: req.names1,
        follows2: req.names2,
        follows3: req.names3,
        follows4: req.names4,
        follows5: req.names5,
        profilePicture1: req.profilePicture1,
        profilePicture2: req.profilePicture2,
        profilePicture3: req.profilePicture3,
        profilePicture4: req.profilePicture4,
        profilePicture5: req.profilePicture5,
        screenName1: req.screenName1,
        screenName2: req.screenName2,
        screenName3: req.screenName3,
        screenName4: req.screenName4,
        screenName5: req.screenName5,
        tweets1: req.tweets1,
        tweets2: req.tweets2,
        tweets3: req.tweets3,
        tweets4: req.tweets4,
        tweets5: req.tweets5,
        retweets1: req.retweets1,
        retweets2: req.retweets2,
        retweets3: req.retweets3,
        retweets4: req.retweets4,
        retweets5: req.retweets5,
        favCount1: req.favCount1,
        favCount2: req.favCount2,
        favCount3: req.favCount3,
        favCount4: req.favCount4,
        favCount5: req.favCount5,
        time1: req.time1,
        time2: req.time2,
        time3: req.time3,
        time4: req.time4,
        time5: req.time5,
        userName: req.userName,
        name: req.name,
        profileImage: req.profileImage,
        userCount: req.userCount,
        messages1: req.messages1,
        messages2: req.messages2,
        messages3: req.messages3,
        messages4: req.messages4,
        messages5: req.messages5,
        directMessagePictureArray1: req.directMessagePictureArray1,
        directMessagePictureArray2: req.directMessagePictureArray2,
        directMessagePictureArray3: req.directMessagePictureArray3,
        directMessagePictureArray4: req.directMessagePictureArray4,
        directMessagePictureArray5: req.directMessagePictureArray5,
        userNameMess: req.userNameMess,
        messageTime1: req.directMessageTimesArray1,
        messageTime2: req.directMessageTimesArray2,
        messageTime3: req.directMessageTimesArray3,
        messageTime4: req.directMessageTimesArray4,
        messageTime5: req.directMessageTimesArray5,
      })
    })
  });
});
module.exports = router;
