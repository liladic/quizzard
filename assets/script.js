$(document).ready(function(){


    //global variables
    let questions = null;
    let randomIndex = null;
    let points = 0;
    let index = 0;
    const numOfQuestions = 5; //set number of questions to play with, max is the json.length
    const questionForm = $("#questionForm"); //save form to variable
    const questionParagraph = $("<p></p>"); //create paragraph that will contain a question
    questionForm.append(questionParagraph); //append paragraph to form
    const nextButton = $("<button id='next'>Next</button>");

    //fades in the start page
    $(".fadeIn").fadeIn();

    //fades out the start page and starts game
    $('#startQuizz').click(function(){
        $(".fadeOut").fadeOut("slow").promise().done(function(){ //start when fadeout finished
            startGame();
        });
    });

    //fetch json questions
    function startGame() {
        $.getJSON("https://liladic.000webhostapp.com/projects/quizzard/assets/questions.json", function(data){
        //$.getJSON("http://localhost/quizzard/assets/questions.json", function(data){
            questions = data;
            loadQuestion();
        }).fail(function(){
            console.log("An error in fetching json data has occurred.");
        });
    }

    //load question
    function loadQuestion() {
        questionForm.css("display", "none"); //hide form for fadeIn to work
        $(".answer").remove();
        console.log('question loaded');
        console.log(questions.length);
        randomIndex = Math.floor(Math.random()*questions.length);
        questionParagraph.html((index+1) + ". " + questions[randomIndex].question); //save question to paragraph
        console.log(questions[randomIndex]);

        //print out answers
        questions[randomIndex].answers.forEach(answer => {
            console.log(answer);
            questionForm.append("<div class='answer'><input type='radio' id='" + answer.id 
                + "' name='answer' value='" + answer.value 
                + "'><label for='" + answer.value + "'>" 
                + answer.value + "</label></div>");
        });
        questionForm.append(nextButton).fadeIn('slow'); //show the question form
    }


    function endGame() {
        $("#result").remove();
        if(points/numOfQuestions < .5) {
            $(".center").append("<div id='result'><h2>END OF GAME</h2><p>You have " + points + " out of " + numOfQuestions +" points. Try again, you can do better.</p><button id='playAgain'>Play again</button></div>");
        } else if (points/numOfQuestions >= .5 && points/numOfQuestions < 1) {
            $(".center").append("<div id='result'><h2>END OF GAME</h2><p>Good job! You have " + points + " out of " + numOfQuestions + " points.</p><button id='playAgain'>Play again</button></div>");
        } else if (points === numOfQuestions) {
            $(".center").append("<div id='result'><h2>END OF GAME</h2><p>Great job! You have " + points + " out of " + numOfQuestions + " points. Well done!</p><button id='playAgain'>Play again</button></div>");
        }
        
        $("#result").fadeIn();
        $("#playAgain").click(function() {
            points = 0;
            index = 0;
            $("#result").fadeOut().promise().done(function(event) {
                //console.log(event);
                startGame();
            });
        });
    }


    //handle click on next button
    nextButton.click(function() {
        event.preventDefault(); 
        let anyChecked = false; //for preventing continue if none is selected
        $('input').each(function() { //check if any is selected
            if ($(this).is(':checked')) {
                anyChecked = true; //enables to continue to next question

                if(this.id == questions[randomIndex].correct) { //handling right and wrong answers and num of points
                    index++; //change index of the question
                    points++; //add point
                    console.log(`Correct! You have ${points} points.`);
                    console.log(questions.splice(randomIndex,1));
                    questionForm.fadeOut().promise().done(function(){
                        if(index < numOfQuestions) {
                            loadQuestion();
                        } else {
                            endGame();
                        }
                    });

                } else {
                    console.log(`Wrong answer! The correct answer is ${questions[index].correct}. You have ${points} points.`);
                    index++; //change index to another question
                    console.log(questions.splice(randomIndex,1));
                    questionForm.fadeOut().promise().done(function() {
                        if(index < numOfQuestions) {
                            loadQuestion();
                        } else {
                            endGame();
                        }
                    });
                };
            };
        });
        //show alert if no answer is selected
        if (!anyChecked) {
            console.log('no answer selected');
            $('#noAnswerSelected').css('display', 'block'); //if no answer is selected, show alert
            $('#noAnswerSelected').click(function() { //closing alert
                $('#noAnswerSelected').css('display', 'none');
            });
        }
    });    
});