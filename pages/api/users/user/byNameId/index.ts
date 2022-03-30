// import byUserNameIdAPIRouteHandler from '@nextAPIs/routes/users';

// export default byUserNameIdAPIRouteHandler;
import nextConnect from '@coreLib/nextConnect';
import usersController from '@nextAPIs/controllers/users';

const byUserNameIdAPIRouteHandler = nextConnect().get(
	usersController.user.byNameId.get
);

export default byUserNameIdAPIRouteHandler;
