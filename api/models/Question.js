/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		title:{
			type:'string',
			required:true,
			unique:true
		},
		order:{
			type:'integer'
			//required:true
		},		
		status:{
			type:'boolean',
			defaultsTo:1
		},			
		quiz:{
			model:'quiz'
		}/*,
		responses:{
			collection:'response',
			via:'question'
		}*/
	}
};

