$(document).ready(function(){

    let questions = null;
    let points = 0;
    let index = 0;
    const questionForm = $("#questionForm"); //save form to variable
    const questionParagraph = $("<p></p>"); //create paragraph that will contain a question
    questionForm.append(questionParagraph); //append paragraph to form
    const nextButton = $("<button id='next'>Next</button>");

    //fades in the start page
    $(".fadeIn").delay('500').fadeIn("slow");

    //fades out on the click of the button and starts quizz
    $('#startQuizz').click(function(){
        $(".fadeOut").fadeOut("slow"); //fade out the start page with fadeout class
        $(".fadeOut").promise().done(function(){ //start when fadeout finished
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
        console.log(questions[index]);

        //print out answers
        questions[index].answers.forEach(answer => {
            //console.log(answer);
            questionForm.append("<div class='answer'><input type='radio' id='" + answer.id 
                + "' name='answer' value='" + answer.value 
                + "'><label for='" + answer.value + "'>" 
                + answer.value + "</label></div>");
        });
        questionForm.append(nextButton); //append button after answers
        questionForm.fadeIn('slow'); //show the question form
    }

    function endGame() {
        if(points === 1) {
            $(".center").append("<h2>END OF GAME</h2><p>You have " + points + " point.</p><button id='playAgain'>Play again</button>");
        } else {
            $(".center").append("<h2>END OF GAME</h2><p>You have " + points + " points.</p><button id='playAgain'>Play again</button>");
        }
        $("#playAgain").click(function() {
            points = 0;
            index = 0;
            $(".center").children().fadeOut();
            loadQuestion();
        });
    }



        //handle click on next button
        //////////////////////////////////////////////////////////////////

        //check selection with click on the next button
        nextButton.click(function() {
            event.preventDefault(); 
            let anyChecked = false; //prevent continue if none is selected
            $('input').each(function() {
                if ($(this).is(':checked')) {
                    if(this.id == questions[index].correct) {
                        points++;
                        console.log(`Correct! You have ${points} points.`);
                        anyChecked = true;
                        index++;
                        questionForm.fadeOut();
                        if(index >=2) {
                            endGame();
                        } else {
                            loadQuestion();

                        }
                    } else {
                        console.log(`Wrong answer! The correct answer is ${questions[index].correct}.`);
                        anyChecked = true;
                        index++;
                        questionForm.fadeOut();
                        if(index >=2) {
                            endGame();
                        } else {
                            loadQuestion();

                        }
                    }
                }
            });

            //handle no selected answer
            if (!anyChecked) {
                console.log('no answer selected');
                $('#noAnswerSelected').css('display', 'block'); //if no answer is selected, show alert
                $('#noAnswerSelected').click(function() { //closing alert
                    $('#noAnswerSelected').css('display', 'none');
                });
            }
        });
        /////////////////////////////////////////////////////////////////
    
});