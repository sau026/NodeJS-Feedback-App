
const routeHandler = require('./../handlers/route-request-handler');

class Routes{

	constructor(app){
		/**
		 * Getting the instance of the express Object.
		 */
		this.app = app;
	}

	/**
	 * Registering the routes.
	 */
	appRoutes(){
		this.app.get('/getFeedbackData', routeHandler.getFeedbackData);
		this.app.get('/checkFeedback/:username', routeHandler.checkFeedback);
		this.app.post('/submitFeedback', routeHandler.submitFeedback);
		/**
		 * Handling 404 Route
		 */
		this.app.get('*', routeHandler.routeNotFoundHandler);		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;