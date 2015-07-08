/**
* Response.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		/*type:{
			type:'string',
			enum:['multiple','oneresponse','text'],
			required:true
		},	  
		text_response:{
			type:'string'
		},
		oneresponse:{
			type:'array'
		},
		multiple:{
			type:'array'
		},
		question:{
			model:'question'
		}*/
		idQuiz:{
			type:'string'
		},
		response:{
			type:'string'
		}
	}
};

