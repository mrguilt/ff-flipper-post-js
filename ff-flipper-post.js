// ff-flipper.post.js
// Take a file full of accounts to recommend to follow on Twitter, shuffle them around, and 
// post them to twitter in appropriately-sized chunks.
// Created 2020-04-23

var fs = require('fs'); //for File I/O
var dadata=fs.readFileSync('/Users/chbarr/follow-friday.txt').toString(); //read all the data

var testit=0; //in test mode?
var tweetlength=240; //How long is a tweet?

//Set up the tweet
var Twitter = require('twitter');

var conffile = require('os').homedir() + "/.twitauth.json";
const rawdata = fs.readFileSync(conffile);
var twitauth = JSON.parse(rawdata);

var client = new Twitter(twitauth);

//the program itself
var dalines = dadata.split("\n"); //split into lines
var count=0;
while(count<dalines.length) {   //go through each line
    dastuff=dalines[count].split(" ");  //split the line into elements
    tag=dastuff[0]; //first element is the tag itself
    var tweetlinebase="#followfriday "+tag; //The base is "#followfriday" and the tag
    if(tag!="") {   //Sometimes it detected extra carriage returns. Skip those. 
        var count2=1;   //Inner loop
        var dastuff2=[...dastuff];  //copy the accounts to follow to the array to shuffle. May not be needed.
        while(count2<dastuff2.length) { //Go through the remaining items.
            var firstnum = Math.round((Math.random() * (dastuff2.length-2))+1); //Pick the first element to swap
            var secondnum = Math.round((Math.random() * (dastuff2.length-2))+1);    //pick the second element to swap
            var holdingspot=dastuff2[secondnum];    //put the second element in a holding spot
            dastuff2[secondnum]=dastuff2[firstnum];  //assign first element to the second
            dastuff2[firstnum]=holdingspot;  //assign the second (from holding) to the first. 
            count2++;
        }
        count2=1;   //New Inner Loop
        var tweetline=tweetlinebase;    //Start what the tweetline will be
        while(count2<dastuff2.length) {
            if((tweetline.length+dastuff2[count2].length+1)<=tweetlength) {  //will adding the next element make the tweet too long?
                tweetline+=" "; //add a space
                tweetline+=dastuff2[count2]; //add the element
            } else {    //going to be too long? tweet and start the next one
                tweettheline(tweetline);    //tweet
                tweetline=tweetlinebase+" "+dastuff2[count2]; //start the next line
            }
            count2++;
        }
        tweettheline(tweetline);    //all done with that tag? tweet what's left.
    }
    count++;
}

function tweettheline(outline) {    //output function. First, so I can test just to the screen. Second, if twitter needs multiple lines.
    if(testit==1) {
        console.log(outline.length,"=",outline); //if a test, just print to the screen with the length
    } else {
        //Tweet it out.
        console.log("."); //my piped script never told me anything was happening. Bugged me. 
        client.post('statuses/update', { status: outline }, function (error, tweet, response) {
            if (error) throw error;
        });
    }
}
