import nextConnect from '@coreLib/nextConnect';
import authController from '@nextAPIs/controllers/auth';

const authAPIRouteHandler = nextConnect();

authAPIRouteHandler.post(authController.signIn);

export default authAPIRouteHandler;
