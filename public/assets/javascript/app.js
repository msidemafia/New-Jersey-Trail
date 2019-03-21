// global Variables
var timer = 300;
var cash = 200
var timeFactor = 3;
var food = 100;
var water = 100;
var gas = 100;
var tires = 1;
var distance = 240;
var momentTimer;
var eventTracker = 0;
var nextLocation = 40;
var intervalId;
var locationTracker = 0;
var userSelect;


function Location(place, route, ableToPurchase, event, type) {
    this.place = place;
    this.route = route;
    this.ableToPurchase = ableToPurchase;
    this.event = event;
    this.type = type;
}

var locations =
{
    1: new Location("Patterson", 1, "N", "Global", "Urban"),
    2: new Location("Newark", 1, "Y", "Global", "Highway"),
    3: new Location("Asbury Park", 1, "Y", "Specific", "Rural"),
    4: new Location("Toms River", 1, "Y", "Global", "Rural"),
    5: new Location("PNC Bank Arts Center", 1, "Y", "Specific", "Rural"),
    6: new Location("Atlantic City", 1, "Y", "Specific", "Urban"),
    7: new Location("Ocean City", 1, "N", "Global", "Rural")
};

var locationsArray = Object.values(locations)

var eventsArray = [
    {
        event: "Driving through some local streets, you hit a pothole (of course) and pop your tire. What do you do?",
        choices: ["Replace your own tire", "Call AAA", "Ugly Cry"],
        responses: ["You replace your own tire and lose 5 minutes.","You have to call AAA and lose 30 minutes.", "You decide to cry on the side of the road. An hour later, someone's stopped and helped you on yor way again."],
        name: "checkTire"
    },
    {
        event: "In the distance you see a hitchhiker. Sure, you know its illegal in NJ, but someone to ride with might be fun! What do you do?",
        choices: ["Keep going", "Let them in", "Take them to breakfast!"],
        responses: ["Wave as you drive by!", "Their stop is on your way! Way to make a new friend!","They're insane and pull a gun on you, threatening to take your car and cash - but decide to dive out the speeding car at the last second for some reason. You lose an hour but at least you're alive!"],
        name: "hitchhiker"
    },
    {
        event: "As you drive down the highway, you run into a ton of shore traffic! What do you do now?",
        choices: ["Stay the course", "Take a detour", "Stop and get some food, and hope the traffic clears!"],
        responses: ["Traffic cleared up! No time lost!","Detour took you way out of the way. Lost 30 minutes.", "You knew that was going to go poorly for you, right? Another hour shot. Womp womp"],
        name: "traffic"
    },
    {
        event: "You need to stop at a rest stop. Do you:",
        choices: ["Go to Dunkin'", "Go to Cinnabon", "Go to Starbucks"],
        responses: ["Short line, because everyone knows America runs on Dunkin'. Only took 5 minutes!","Got the bun in record time, but obviously ate it while it was hot. You lost another 30, but TOTALLY worth it.", "That's what you get trying to purchase designer coffee."] ,
        name: "speeding"
    },
    {
        event: "Driving through the streets of the city, you get swarmed by a horde of gang members who stop your car and demand you give them $100. Do you:",
        choices: ["Pay the toll", "Try to reason with them.","Attempt to speed away"],
        responses: ["Cool. Move along - they let you by.", "You manage to escape! Well done! Pretty risky...", "Great idea, genius. They give chase and it takes you a while to lose them."],
        name: "gang"
    },
    {
        event: "You get within Cape May early, and decide to stop at Ocean City for some taffy. Yum! Do you:",
        choices: ["Buy taffy for the wedding present!", "Buy all the taffy you can!!!!", "EAT ALL THE TAFFY!"], 
        responses: ["That's a lovely present. Well done.","TAFFY!!!!!!","TAFFY!!!!!!"],
        name: "taffy"
    }
]

$(document).ready(function () {

    // Pre-game Logic
    function initializePage() {
        $("#randomEvent").hide();
        $("#info-page").hide();
        $("#storeFront").hide();
        $("#gamePlay").hide();
        $("#options").hide();
    };

    initializePage();

    //Carousel of images for front page
    $('.carousel').carousel({
        interval: 3000
    });

    // More pre-game page logic
    $("#start-button").on("click", function () {
  
        $("#welcome-page").hide();
        $("#info-page").show();
    });

    $("#startGame-button").on("click", function () {
        $("#info-page").hide();
        $("#gamePlay").show();
        postInventory();
        getInventory();
        travel();
        $(".timer").show();
        intervalId = setInterval(travel, 1300);
    });

    function travel() {
        if (timer >= 60) {
            momentTimer = moment.utc(timer * 60000).format("hh:mm:ss");
        }
        else if (timer < 60) {
            momentTimer = moment.utc(timer * 60000).format("mm:ss");
        }
        $(".gameImage").html("<img src='/assets/images/driving-cat.gif' id='game-image'>");
        timer -= 1;
        timeFactor -= 1;
        $(".timer").text(momentTimer);

        $("#food-remaining").text(food);
        $("#water-remaining").text(water);
        $("#gas-remaining").text(gas);
        $("#tires-remaining").text(tires);
        $("#cash-remaining").text("$" + cash);
        $(".distanceLeft").text("Distance Remaining: " + distance + " miles");
        $(".eventTrigger").text("Distance to Next Location: " + nextLocation + " miles");


        if (timeFactor == 0 && nextLocation > 0) {
            nextLocation -= 20;
            distance -= 20;
            food -= 1;
            water -= 1;
            gas -= 2;

            $("#food-remaining").text(food);
            $("#water-remaining").text(water);
            $("#gas-remaining").text(gas);
            $("#tires-remaining").text(tires);
            $("#cash-remaining").text("$" + cash);
            $("#distance-remaining").text("Distance Remaining: " + distance + " miles");
            timeFactor = 3;
        }

        else if (nextLocation ==  0 && distance > 0) {

            clearInterval(intervalId);
            populateModal();
            
        }

        else if (distance == 0) {
            
            console.log("distance = 0");
            timeFactor = -1;
            clearInterval(intervalId);
            nextLocation = 0;
            gameWin();
            console.log(nextLocation);
        }

        else if (timer <= 0) {
            timeFactor = -1;
            clearInterval(intervalId);
            nextLocation = 0;
            gameEnd();
        }

    }


    function populateModal() {
        nextLocation = 40;
        var text = eventsArray[eventTracker].event;
        $("#modalBtnDiv").empty();
        $("#modalText").empty();
        $("#eventsModal").modal('show');
        $("#modalText").append(text)
        for (var i = 0; i < eventsArray[eventTracker].choices.length; i++) {

            var choiceBtn = $("<button>")
                .addClass("choice-button btn ")
                .attr("data-choice", eventsArray[eventTracker].choices[i])
                .attr("data-response", eventsArray[eventTracker].responses[i])
                .attr("data-dismiss", "modal")
                .text(eventsArray[eventTracker].choices[i]);

            $("#modalBtnDiv").append(choiceBtn);
        }
        // dynamically load responses after clicking choiceBtn
        $(".choice-button").on('click', function () {
            var responseText = $(this).attr("data-response");

            $("#modalBtnDiv").empty();
            $("#modalText").empty();
            $("#eventsModal").modal('show');
            $("#modalText").append(responseText)
        })
    };
    
    function passThroughChoice() {
            clearInterval(intervalId);
            var userSelect = $(this).attr("data-choice");
            console.log(userSelect);
            
            if (userSelect === eventsArray[eventTracker].choices[0]) {
                console.log("choice 1 selected");
                $("#eventsModal2").modal('show');
                $("#response").append(eventsArray[eventTracker].responses[0]);
                timer -= 5;
                // nextLocation = 40;
                intervalId = setInterval(travel, 1300);
                eventTracker++;

                if (userSelect === eventsArray[0].choices[0]) {
                    tires -= 1;
                }

                if (userSelect === eventsArray[3].choices[0]) {
                    cash -= 5;
                }

                if (userSelect === eventsArray[4].choices[0]) {
                    cash -= 100;
                }
            }
            else if (userSelect === eventsArray[eventTracker].choices[1]) {
                console.log("choice 2 selected");
                $("#response").text(eventsArray[eventTracker].responses[1]);
                timer -= 30;
                // nextLocation = 40;
                intervalId = setInterval(travel, 1300);
                eventTracker++;

                if (userSelect === eventsArray[3].choices[1]) {
                    cash -= 5;
                }
            }
            else if (userSelect === eventsArray[eventTracker].choices[2]) {
                console.log("choice 3 selected");
                $("#response").text(eventsArray[eventTracker].responses[2]);
                timer -= 60;
                // nextLocation = 40;
                intervalId = setInterval(travel, 1300);
                eventTracker++;

                if (userSelect === eventsArray[2].choices[2]) {
                    cash -= 10;
                }

                if (userSelect === eventsArray[3].choices[2]) {
                    cash -= 15;
                }
            }
    }

        function gameEnd() {
            $(".distanceLeft").text("Distance Remaining: " + 0 + " miles");
            $(".eventTrigger").text("Distance to Next Location: " + 0 + " miles");
            $(".timer").text(0);
            $(".gameImage").html("<img src='/assets/images/you-lose.gif' id='losing-image'>");
            postInventory();
        }

        function gameWin() {
            nextLocation = 0;
            $(".gameImage").html("<img src='/assets/images/you-win.webp' id='winning-image'>");
            postInventory();
        }

$(document).on("click",".choice-button", passThroughChoice);
})