/// <reference types="sequelize" />
import Sequelize from 'sequelize';
import { Course, Batch, Student, Teacher, Subject } from "./Model/model";
export declare const course: Sequelize.Model<Course, any>;
export declare const batch: Sequelize.Model<Batch, any>;
export declare const student: Sequelize.Model<Student, any>;
export declare const subject: Sequelize.Model<Subject, any>;
export declare const lecture: Sequelize.Model<Teacher, any>;
export declare const studentbatch: Sequelize.Model<{}, {}>;
export declare const teacher: Sequelize.Model<Teacher, any>;
