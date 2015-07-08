/**
 * ResponseController
 *
 * @description :: Server-side logic for managing Responses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create:function(req,res){
		console.log(req.allParams())
		Response.create(req.allParams())
				.exec(function(error,response){
					res.json({errors:error,response:response});
				})
	}
};

