/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var nodeValidator= require('node-validator')
module.exports = {
	questionInQuiz:function(req,res){
		//console.log(req.param('idQuiz'))
		var check = nodeValidator.isNumber();
		nodeValidator.run(check,req.param('idQuiz'),function(errorCount,errors){
			if(errorCount === 0 ){
				Question.find({quiz:req.param('idQuiz')})
					.sort('order ASC')
					.exec(function(error,questions){
						res.json({errors:error,questions:questions});
					})
			}else{
				res.json({errors:errors,questions:null});
			}
		});		
	},
	/*update:function(req,res){
		var check = nodeValidator.isObject()
				.withRequired('quiz',nodeValidator.isNumber())
				.withRequired('title',nodeValidator.isString())
				.withRequired('order',nodeValidator.isNumber())
				.withRequired('type',nodeValidator.isString())
				.withOptional('status')
				.withOptional('createdAt')
				.withOptional('updatedAt')
				.withRequired('id',nodeValidator.isNumber())
		nodeValidator.run(check,req.param('question'),function(errorCount,errors){
			if(errorCount === 0){
				Question.update({id:req.param('question').id},{order:req.param('question').order})
						.exec(function(err,question){
							res.json({erros:err,question:question});
						})
			}else{
				res.json({errors:errors,questions:null});
			}
		})
	},*/
	deleteQuestion:function(req,res){
		console.log(req.params.idQuestion)
		Question.destroy({id:req.params.idQuestion})
				.exec(function(error,obj){
					res.json({error:error});
				})
	},
	createQuestion:function(req,res){
		Question.create({title:req.param('question').title,quiz:req.param('question').idQuiz})
				.exec(function(error,question){
					res.json({error:error,question:question});
				})
	},
	response:function(req,res){
		res.send(req.allParams());
	},
	results:function(req,res){
		Response.find({idQuiz:req.params.idQuiz})
				.exec(function(error,responses){
					res.send({error:error,responses:responses})
				})
	}
};

