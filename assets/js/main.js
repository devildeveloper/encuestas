angular.module('Encuesta',['ngSails'])
	.config(['$sailsProvider', function ($sailsProvider) {
    	$sailsProvider.url = 'http://localhost:1337';
	}])
	.controller('quizController',quizcontroller)
	.controller('questionController',questionController)


function quizcontroller($scope,$sails){
	$scope.encuestas = {
		show:true,
		data:[],
		modificar:false,
		quizToken : {},
		preguntas:{
			response:'',
			data:[]
		}
	};
	$scope.my_quizes=function(){
		$sails.get('/my/quizes')
			.success(function(data, status, headers, jwr){
				$scope.encuestas.data = data.quizes;
			})
			.error(function(data, status, headers, jwr){
				console.error(data)
			})	
	};
	$scope.deleteQuiz=function(idQuiz){
		$sails.get('/quizes/delete/'+idQuiz)
				.success(function(data, status, headers, jwr){
					$scope.my_quizes();
				})
				.error(function(data, status, headers, jwr){
					console.error(data);
				})
	};
	$scope.createquiz=function(title){
		console.log(title)
		$sails.post('/quizes/create',{quiz:title})
				.success(function(data, status, headers, jwr){
					$scope.my_quizes();
					$scope.title=''
				})
				.error(function(data, status, headers, jwr){
					console.error(data);
				})
	},
	$scope.search=function(title){
		console.log(title)
		$sails.get('/quizes/find/'+title)
				.success(function(data, status, headers, jwr){
					console.log(data)
					$scope.encuestas.data=data.quizes;
					$scope.toSearch=''
				})
				.error(function(data, status, headers, jwr){
					console.error(data);
				})
	},
	/*$scope.updatequestion=function(question){
		console.log(question)
		$sails.post('/question/update',{question:question})
			.success(function(data, status, headers, jwr){
				//console.log(data)
				console.log(status)
			})
			.error(function(data, status, headers, jwr){
				console.error(data);
				console.log(status);
			})
	},*/
	$scope.showUpdateQuiz=function(quiz){
		$scope.encuestas.modificar=true;
		$scope.encuestas.quizToken=quiz;
		$sails.post('/question/quiz',{idQuiz:quiz.id})
				.success(function(data, status, headers, jwr){
					if(data.questions.length){
						$scope.encuestas.preguntas.response='Se a encontrado ' + data.questions.length + ' pregunta(s)';
						$scope.encuestas.preguntas.data=data.questions;
					}else{
						$scope.encuestas.preguntas.response='No se han encontrado preguntas'
						$scope.encuestas.preguntas.data=[];
					}
				})
				.error(function(data, status, headers, jwr){
					console.error(data);
				})
	},
	$scope.deleteQuestion=function(question){
		$sails.get('/question/delete/'+question.id)
				.success(function(data, status, headers, jwr){
					$scope.showUpdateQuiz($scope.encuestas.quizToken);
				})
				.error(function(data, status, headers, jwr){
					alert('no se ha podido eliminar esta pregunta')
					console.log(data)
					console.log(status)
				})
	},
	$scope.createquestion=function(questionTitle){
		var data ={
			idQuiz : $scope.encuestas.quizToken.id,
			title : questionTitle
		}
		$sails.post('/question/create',{question:data})
				.success(function(data, status, headers, jwr){
					$scope.showUpdateQuiz($scope.encuestas.quizToken);
				})
				.error(function(data, status, headers, jwr){
					alert('no se ha podido crear esta pregunta')
					console.log(data)
					console.log(status)					
				})
	}
	//calling 
	$scope.my_quizes();
}
function questionController($scope,$sails){
	//action="/quiz/response" method="POST" 
	$scope.form={};
	$scope.quizId ;
	$scope.responsequiz=function(form){
		var keys = Object.keys(form);
		var responses = [] ;
		var data = {};
		keys.forEach(function(item){
			responses.push({
				id:item,
				response:form[item]
			})
		});
		data.idQuiz = document.getElementById('quizId').value;
		data.responses = responses ;
		console.log(data)
		$sails.post('/quiz/response',data)
			.success(function(data, status, headers, jwr){
				console.log(data)
			})
			.error(function(data, status, headers, jwr){
				alert('no se ha podido crear esta pregunta')
				console.log(data)
				console.log(status)					
			})			
	}

}