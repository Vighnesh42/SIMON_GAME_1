$(document).ready(function() {
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var started = false;
    var level = 0;
    var leaderboard = [];

    $(document).keypress(function() {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

    $(".btn").click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success");
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            console.log("Wrong!!");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over! Press any key to start!");
            if (level > 0 && (leaderboard.length < 5 || level > leaderboard[4].level)) {
                var name = prompt("Congratulations! You made it to the leaderboard! Enter your name:");
                if (name !== null && name !== "") { // Check if the name is provided
                    leaderboard.push({ name: name, level: level }); // Add entry to leaderboard
                    leaderboard.sort((a, b) => b.level - a.level);
                    if (leaderboard.length > 5) leaderboard.pop();
                    updateLeaderboard();
                }
            }
            startOver();
        }
    }

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }

    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 100);
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

    function updateLeaderboard() {
        $("#leaderboard-list").empty();
        leaderboard.forEach(function(item, index) {
            $("#leaderboard-list").append("<li>" + item.name + " - Level " + item.level + "</li>");
        });
    }
});
