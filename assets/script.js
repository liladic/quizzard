$(document).ready(function(){

    let questions = null;
    let points = 0;
    let index = 0;
    const questionForm = $("#questionForm"); //save form to variable
    const questionParagraph = $("<p></p>"); //create paragraph that will contain a question
    questionForm.append(questionParagraph); //append paragraph to form
    const nextButton = $("<button id='next'>Next</button>");

    //fades in the start page
    $(".fadeIn").fadeIn();

    //fades out on the click of the button and starts quizz
    $('#startQuizz').click(function(){
        $(".fadeOut").fadeOut("slow").promise().done(function(){ //start when fadeout finished
            $.getJSON("http://localhost/quizzard/assets/questions.json", function(data){
                questions = data;
                loadQuestion();
            }).fail(function(){
                console.log("An error in fetching json data has occurred.");
            });
        });
    });

    function loadQuestion() {
        questionForm.css("display", "none"); //hide form for fadeIn to work
        $(".answer").remove();
        questionParagraph.html(questions[index].question); //save question to paragraph
        //console.log(questions[index]);

        //print out answers
        questions[index].answers.forEach(answer => {
            //console.log(answer);
            questionForm.append("<div class='answer'><input type='radio' id='" + answer.id 
                + "' name='answer' value='" + answer.value 
                + "'><label for='" + answer.value + "'>" 
                + answer.value + "</label></div>");
        });
        questionForm.append(nextButton).fadeIn('slow'); //show the question form
    }

    function endGame() {
        if(points === 1) {
            $("#result").remove();
            $(".center").append("<div id='result'><h2>END OF GAME</h2><p>You have " + points + " point.</p><button id='playAgain'>Play again</button></div>");
            $("#result").fadeIn();
        } else {
            $("#result").remove();
            $(".center").append("<div id='result'><h2>END OF GAME</h2><p>You have " + points + " points.</p><button id='playAgain'>Play again</button></div>");
            $("#result").fadeIn();
        }
        $("#playAgain").click(function() {
            points = 0;
            index = 0;
            $("#result").fadeOut().promise().done(function(event) {
                //console.log(event);
                loadQuestion();
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

                    if(this.id == questions[index].correct) { //handling right and wrong answers and num of points
                        index++; //change index to another question
                        points++; //add point
                        //console.log(`Correct! You have ${points} points.`);
                        questionForm.fadeOut().promise().done(function(){
                            if(index >=10) { //end when reach last question, 30 questions currently avaliable
                                endGame();
                            } else {
                                loadQuestion(); //loads another question
                            }
                        });

                    } else {
                        //console.log(`Wrong answer! The correct answer is ${questions[index].correct}. You have ${points} points.`);
                        index++; //change to another question
                        questionForm.fadeOut().promise().done(function() {
                            if(index >=10) {
                                endGame();
                            } else {
                                loadQuestion();
                            }
                        });
                    };
                };
            });

            //handle when no selected answer
            if (!anyChecked) {
                console.log('no answer selected');
                $('#noAnswerSelected').css('display', 'block'); //if no answer is selected, show alert
                $('#noAnswerSelected').click(function() { //closing alert
                    $('#noAnswerSelected').css('display', 'none');
                });
            }
        });    
});