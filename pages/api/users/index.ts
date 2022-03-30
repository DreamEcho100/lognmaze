// import usersAPIRouteHandler from '@nextAPIs/routes/users';

// export default usersAPIRouteHandler;
import nextConnect from '@coreLib/nextConnect';
import usersController from '@nextAPIs/controllers/users';

const usersAPIRouteHandler = nextConnect().get(usersController.get);

export default usersAPIRouteHandler;
