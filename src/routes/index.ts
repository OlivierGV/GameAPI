import { Router } from 'express';

import Paths from '../common/Paths';
import UserRoutes from './JeuRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.GetBy, UserRoutes.getBy);
userRouter.get(Paths.Users.GetRating, UserRoutes.getRating);
userRouter.get(Paths.Users.GetAll, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


// **** Export default **** //

export default apiRouter;
