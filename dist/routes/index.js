"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
//const route= require('express').Router()
const batch_1 = require("../routes/batch");
const student_1 = require("../routes/student");
const lecture_1 = require("../routes/lecture");
const teacher_1 = require("../routes/teacher");
const course_1 = require("../routes/course");
const subject_1 = require("../routes/subject");
route.use('/batches', batch_1.batchRoute);
route.use('/students', student_1.studentRoute);
route.use('/lectures', lecture_1.lectureRoute);
route.use('/teachers', teacher_1.teacherRoute);
route.use('/subjects', subject_1.subjectRoute);
route.use('/courses', course_1.courseRoute);
exports.default = route;
// module.exports=    route
