/**
* Quiz.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title:{
			type:'string',
			required:true
		},
		status:{
			type:'boolean',
			defaultsTo:true
		},
		/*owner:{
			type:'integer',
			defaultsTo:1
		},	*/	
		question:{
			collection:'question',
			via:'quiz'
		}
	}
};

