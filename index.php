
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Quizzard</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="assets/script.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="assets/style.css">
</head>
<body>
	<div class="container">


		<div class="center">
			<h1 class="fadeIn fadeOut">Test your knowledge with Quizzard</h1>
			<button class="fadeIn fadeOut" id="startQuizz">START QUIZZ</button>
			<form id="questionForm">
			</form>
		</div>
		<div class="center" id="noAnswerSelected">
			<p>Please select your answer!</p>
			<button>Close</button>
		</div>


	</div>
</body>
</html>