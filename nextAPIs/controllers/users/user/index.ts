import userByIdController from './byId';
import userNameIdController from './byNameId';

const userController = {
	byNameId: userNameIdController,
	byId: userByIdController,
};

export default userController;
