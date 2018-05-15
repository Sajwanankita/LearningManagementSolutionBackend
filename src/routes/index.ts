import { Router, Request, Response } from 'express';
const route: Router = Router();
//const route= require('express').Router()
import {batchRoute} from '../routes/batch';
import {studentRoute} from '../routes/student';
import {lectureRoute} from '../routes/lecture';
import {teacherRoute} from '../routes/teacher';
import {courseRoute} from '../routes/course';
import {subjectRoute} from '../routes/subject';

route.use('/batches',batchRoute)
route.use('/students',studentRoute)
route.use('/lectures',lectureRoute)
route.use('/teachers',teacherRoute)
route.use('/subjects',subjectRoute)
route.use('/courses',courseRoute)

export default route;
// module.exports=    route
