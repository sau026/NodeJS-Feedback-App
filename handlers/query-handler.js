const CONSTANTS = require('./../constants');
const { ObjectId } = require('mongodb');

/**
 * QueryHandler class for executing MongoDB queries
 * @class
 */
class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
	}

    /**
	 * Responsible for getting the user's details from the database based on email
	 * @param {String} email
	 * @returns {Promise} userdetails
	 */
	getAllFeedback(){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
                DB.collection(CONSTANTS.MONGODB_QUESTION_COLLECTION_NAME).aggregate([
					{
						$group: { 
							'_id': '$feedback_type',
							questions: { $push: "$$ROOT" } 
						}
					},
					{
						$project : {
							"questions" : true,
							'_id': false,
							'type': '$_id'
						}
					}
				]).toArray( (error, result) => {
					DB.close();
					if( error ){
						reject(error);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}	
		});
    }

    /**
	 * Responsible for registering the user into database
	 * @param {Object} email, password
	 * @returns {Promise} Object
	 */
    checkFeedback(username){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_FEEDBACK_COLLECTION_NAME).find({
					"username": username
				}).count( (err, result) =>{
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}

    submitFeedback(data){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection(CONSTANTS.MONGODB_FEEDBACK_COLLECTION_NAME).insertOne(data, async (err, result) =>{
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result.insertedId);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}
}


/**
 * Module for executing MongoDB queries
 * @module QueryHandler
 * @type {class}
 */
module.exports = new QueryHandler();