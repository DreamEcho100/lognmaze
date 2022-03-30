import nextConnect from '@coreLib/nextConnect';
import usersController from '@nextAPIs/controllers/users';

const byUserIdAPIRouteHandler = nextConnect().put(
	usersController.user.byId.update
);

export default byUserIdAPIRouteHandler;
