/**
 * QuizController
 *
 * @description :: Server-side logic for managing quizzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodeValidator= require('node-validator')
module.exports = {
	getAll:function(req,res){
		Quiz.find({status:true})
			.exec(function(err,quizes){
				res.json({error:err,quizes:quizes});
			})
	},
	create:function(req,res){
		var check = nodeValidator.isString()
		nodeValidator.run(check,req.param('quiz'),function(errorCount,errors){
			if(errorCount === 0){
				Quiz.create({title:req.param('quiz')})
					.exec(function(err,quiz){
						res.json({errors:err,created:quiz});
					})				
			}else{
				res.json({errors:errors,created:null})
			}
		})
	},
	delete:function(req,res){
		var check = nodeValidator.isNumber();
		nodeValidator.run(check,req.params.idQuiz,function(errorCount,errors){
			if(errorCount === 0){
				Quiz.update({id:req.params.idQuiz},{status:false})
					.exec(function(err,quiz){
						res.json({errors:err,deleted:quiz});
					})
			}else{
				res.json({errors:errors,deleted:null});
			}

		})
	},
	search:function(req,res){
		//console.log(req.params.titleQuiz)
		var check = nodeValidator.isString();
		nodeValidator.run(check,req.params.titleQuiz,function(errorCount,errors){
			if(errorCount === 0 ){
				Quiz.find({title:{'contains':req.params.titleQuiz}})
					.exec(function(error,quizes){
						res.json({errors:error,quizes:quizes});
					})
			}else{
				res.json({errors:errors,quizes:null});
			}
		});
	},
	render:function(req,res){
		var idQuiz = req.params.idQuiz;
		Quiz.findOne({id:idQuiz})
			.populate('question')
			.exec(function(error,questions){
				console.log(questions)
				if(error) res.send('ha ocurrido un error'+ error)

				if(questions.question.length){
					res.view('question',{questions:questions});
				}else{
					res.send('no hay preguntas para esta encuesta')
				}
				
			})
	}	
};

