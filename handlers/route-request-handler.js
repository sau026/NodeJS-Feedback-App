const CONSTANTS = require('./../constants');
const RouteResponseHandler = require('./../handlers/response-handler');
const queryHandler = require('./query-handler');

/**
 * RouteHandler class for handling the HTTP routes
 * @class
 */
class RouteHandler{

	async getFeedbackData(request, response){
		try {
			const result = await queryHandler.getAllFeedback();
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
				statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
				isOkay: true,
				message: CONSTANTS.AD_SLOTS_FETCHED,
				response: result,
			});
							
		} catch (error) {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.SERVER_ERROR_MESSAGE,
				response: null,
			});
		}
	}

	/**
	 * Responsible for fetching bid for the Ads SLots
	 * @param {expressRequestObject} request
	 * @param {expressResponseObject} response
	 */
	async checkFeedback(request, response){
		const username = request.params.username;
		if(username === '' || username === null) {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.AD_SLOT_ID_MISSING,
				response: null,
			});
		} else {		
			try {
				const result = await queryHandler.checkFeedback(username);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.AD_SLOTS_FETCHED,
					response: {
						feedback_exist: result > 0
					} ,
				});
								
			} catch (error) {
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
					statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
					isOkay: false,
					message: CONSTANTS.SERVER_ERROR_MESSAGE,
					response: null,
				});
			}
		}
	}
	
	/**
	 * Responsible for fetching bid for the Ads SLots
	 * @param {expressRequestObject} request
	 * @param {expressResponseObject} response
	 */
	async submitFeedback(request, response){
		const username = request.body.username;
		const questions = request.body.questions;
		const stopSurvey = request.body.stopSurvey;

		if(username === '' || username === null) {
			RouteResponseHandler.sendResponse(request, response, {
				statusCode: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_CODE,
				statusText: CONSTANTS.SERVER_REQUEST_ERROR_HTTP_TEXT,
				isOkay: false,
				message: CONSTANTS.AD_SLOT_ID_MISSING,
				response: null,
			});
		} else {		
			try {
				const data = {
					username,
					success_status: questions !== '' && questions !== undefined && questions.length > 0,
					stop_survey: stopSurvey !== '' && stopSurvey !== undefined,
					questions
				}
				await queryHandler.submitFeedback(data);
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_OK_HTTP_CODE,
					statusText: CONSTANTS.SERVER_OK_HTTP_TEXT,
					isOkay: true,
					message: CONSTANTS.AD_SLOTS_FETCHED,
					response: {
						feedback_saved: true
					}
				});
								
			} catch (error) {
				console.log(error)
				RouteResponseHandler.sendResponse(request, response, {
					statusCode: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE,
					statusText: CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_TEXT,
					isOkay: false,
					message: CONSTANTS.SERVER_ERROR_MESSAGE,
					response: {
						feedback_saved: false
					}
				});
			}
		}
	}
	
	// routeNotFoundHandler(request, response){
	// 	RouteResponseHandler.renderWelcomePage(request, response);
	// }

	routeNotFoundHandler(request, response){
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error : true,
			message : CONSTANTS.ROUTE_NOT_FOUND
		});
	}
}


/**
 * Module for handling the HTTP routes
 * @module RouteHandler
 * @type {class}
 */
module.exports = new RouteHandler();
