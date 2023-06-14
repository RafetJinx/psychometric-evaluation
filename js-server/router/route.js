import { Router } from "express";

/** import controllers */
import * as controller from '../controllers/controller.js'


const router = Router();

/** Questions Routes Api*/
router.route('/questions')
    .get(controller.getQuestions) /** GET Request */
    .post(controller.insertQuestions) /** POST Request */
    .delete(controller.dropQuestions); /** DELETE Request */


router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.dropResult);

export default router;