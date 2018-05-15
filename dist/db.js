"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db = new sequelize_1.default('ngrwsdb', 'ngrusr', 'ngrpass', {
    host: "localhost",
    dialect: "mysql"
});
exports.course = db.define('course', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.batch = db.define('batch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.student = db.define('student', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.subject = db.define('subject', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.lecture = db.define('lecture', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.studentbatch = db.define("studentBatch", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.teacher = db.define('teacher', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.lecture.belongsTo(exports.course);
exports.course.hasMany(exports.batch);
exports.batch.belongsTo(exports.course);
exports.course.hasMany(exports.subject);
exports.subject.belongsTo(exports.course);
exports.subject.hasMany(exports.teacher);
exports.teacher.belongsTo(exports.subject);
exports.batch.hasMany(exports.lecture);
exports.lecture.belongsTo(exports.batch);
exports.lecture.belongsTo(exports.subject);
exports.lecture.belongsTo(exports.teacher);
exports.batch.belongsToMany(exports.student, { through: exports.studentbatch });
exports.student.belongsToMany(exports.batch, { through: exports.studentbatch });
exports.studentbatch.belongsTo(exports.batch);
exports.studentbatch.belongsTo(exports.student);
db.sync({ alter: true })
    .then(() => console.log("db has been synced"))
    .catch(error => {
    console.log(error);
});
