# Follow Friday Flipper and Post, in JavaScript

## Purpose

I have a series of tweets I do every friday, as part of #followfriday. I sepearte them by category (#Cincinnati, #cycling, etc.), and share all the accounts I feel are relevant. As that list grew, it got broken up over several tweets, to stay under the 140-character limit that was in effect at the time.

What I noticed was that, as the folks I was recommending to follow retweeted the tweet mentioning them, they were not retweeting the other tweets in their category. So, followers from an account from my first #cincinnati wouldn't see the accounts mentioned in the second.

So, I wrote a script that would take the accounts, shuffle them, then output them in a series of appropriately sized tweets. Hopefully, each week the lines were different. 

Originally, I wrote this in perl, but moved it to JavaScript on Node.js. 

## Inputs and Outputs

The input is a file called `follow-friday.txt`. In it are lines that start with the hashtag category, then each account:

`#category @account1 @account2 @account3...`

An example from my #cincinnati category:

`#cincinnati @SWOhioAir @HamCoRecycling @CinPubServices  @CincySymphony @HamCoHealth @cinastro @wlwt @WNKU @cincyrec @CincyParks @cincylibrary @CincyMuseum @cincinnatimetro  @wassonway @cincymakerfaire @cincyartmuseum @CincyRedBike @MetrobotCAC @VoteHamCoBOE @TriStateTrails @CB_Connector @radioartifact @INHAILERradio @SantaMariaCincy`

The output would be multiple lines to tweet, like this:

```
#ff #cincinnati @SWOhioAir @TriStateTrails @CinPubServices @cinastro @WNKU @CincyMuseum @HamCoRecycling @HamCoHealth @cincylibrary @CincyParks @wlwt @cincyartmuseum @cincyrec @cincinnatimetro @INHAILERradio @CB_Connector @CincyRedBike @cincymakerfaire @VoteHamCoBOE @wassonway
#ff #cincinnati @SantaMariaCincy @radioartifact @CincySymphony @MetrobotCAC
```

Each line has a maximum of 240 characters (the current twitter limit), and the accounts are in random order. 

## Files

|File|Description|
|----|-----------|
|'ff-flipper-post.js'|The JavaScript program that will read the file of tweets, randomize and resize them, and post them.|
|'conf.twitauth.json'|The keys needed to post tweets. This should be in your home directory, and names `.twitauth.json`.|
|'follow-friday.txt|The file with all the categories and accounts.|

