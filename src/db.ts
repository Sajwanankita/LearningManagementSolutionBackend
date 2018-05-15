import Sequelize from 'sequelize';
const db = new Sequelize('ngrwsdb', 'ngrusr', 'ngrpass', {
    host: "localhost",
    dialect: "mysql"
})
import { Course, Batch, Student, Teacher, Subject, Lecture } from "./Model/model"

export const course = db.define<Course, any>('course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const batch = db.define<Batch, any>('batch', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const student = db.define<Student, any>('student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const subject = db.define<Subject, any>('subject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const lecture = db.define<Teacher, any>('lecture', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const studentbatch = db.define("studentBatch", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

export const teacher = db.define<Teacher, any>('teacher', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})




course.hasMany(batch)
batch.belongsTo(course)

course.hasMany(subject)
subject.belongsTo(course)

subject.hasMany(teacher)
teacher.belongsTo(subject)

batch.hasMany(lecture)
lecture.belongsTo(batch)

lecture.belongsTo(subject)
lecture.belongsTo(teacher)
lecture.belongsTo(course)

batch.belongsToMany(student, { through: studentbatch })
student.belongsToMany(batch, { through: studentbatch })
studentbatch.belongsTo(batch)
studentbatch.belongsTo(student)

db.sync({alter:true})
    .then(() => console.log("db has been synced"))
    .catch(error => {
        console.log(error)
    })

