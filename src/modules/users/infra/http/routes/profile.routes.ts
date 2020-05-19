import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const userProfileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', userProfileController.show);
profileRouter.put('/', userProfileController.update);

export default profileRouter;
