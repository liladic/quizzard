$(document).ready(function(){
	//fades in the start page
    $(".fadeIn").delay('500').fadeIn("slow");

    //fades out on the click of the button and starts quizz
    $('#startQuizz').click(function(){
    	$(".fadeOut").fadeOut("slow"); //fade out the start page with fadeout class

    	//get local json with questions
    	$.getJSON("http://localhost/quizzard/assets/questions.json", function(data){
    		const questionsData = data;
    		//console.log(questionsData);

    		 //take a random question out of data
            const randomQuestion = questionsData[Math.round(Math.random()*questionsData.length-1)];
            let points = 0;
            //console.log(randomQuestion);

    		const answersArr = []; //save answers as objects, containing question id and answer id for answer comparison
    		//or immediately compare answer id with questions correct value, add a point and turn text green/yellow,
    		//depending if the answer is correct or not

    		//acces form through variable and set display: none
    		const questionForm = $("#questionForm");
    		questionForm.css("display", "none");

    		//create paragraph that will contain a question and append it to form
    		const questionParagraph = $("<p></p>");
            const nextButton = $("<button>Next</button>");
    		questionForm.append(questionParagraph);

    		//save question to paragraph
            questionParagraph.html(randomQuestion.question);

         	//show the question form
            questionForm.delay('600').fadeIn('slow');
          
          	//print out answers from the random question
            randomQuestion.answers.forEach(answer => {
                console.log(answer);
                questionForm.append("<input type='radio' id='" + answer.id 
                    + "' name='answer' value='" + answer.value 
                    + "'><label for='" + answer.value + "'>" 
                    + answer.value + "</label><br>");
            });

            questionForm.append(nextButton);

            //check selection with click on the next button
            nextButton.click(function() {
                event.preventDefault(); 
                let anyChecked = false; //prevent continue if none is selected
	            $('input').each(function() {
				    if ($(this).is(':checked')) {
                        if(this.id == randomQuestion.correct) {
                            points++;
                            console.log(`Correct! You have ${points} points.`);
                            anyChecked = true;
                        } else {
                            console.log(`Wrong answer! The correct answer is ${randomQuestion.correct}.`);
                            anyChecked = true;
                        }
                    }
				});
                if (!anyChecked) {
                    alert('Please select your answer!');
                } else {} //repeat the process, hide question and load new question
            });
            

        }).fail(function(){
            console.log("An error has occurred.");
    	});
 	});
}); //end of document ready




