"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => {
    db_1.teacher.findAll()
        .then((teachers) => {
        res.status(200).send(teachers);
    }).catch(error => {
        res.send(400).send({
            error: "could not find teachers"
        });
    });
});
route.get('/:id', (req, res) => {
    db_1.teacher.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((teacher) => {
        res.status(200).send(teacher);
    }).catch(error => {
        res.send(400).send({
            error: "could not find teacher"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    db_1.lecture.findAll({
        where: {
            teacherId: req.params.id
        },
        include: [{
                model: db_1.batch
            }]
    })
        .then((batch) => {
        res.status(200).send(batch);
    }).catch(error => {
        res.send(400).send({
            error: "could not find teacher"
        });
    });
});
route.post('/', (req, res) => {
    if (!req.body.name) {
        res.send({
            error: 'Please enter the teacher name'
        });
    }
    else {
        let subjectId = req.body.subjectId;
        db_1.subject.findOne({
            where: {
                id: subjectId
            },
            attributes: ['id', 'name']
        }).then((subject) => {
            if (!subject) {
                res.status(404).send({
                    error: 'Could not find subject with id: ' + subjectId
                });
            }
            else {
                db_1.teacher.create({
                    name: req.body.name
                }).then((teacher) => {
                    teacher.setSubject(subject, { save: false });
                    teacher.save();
                    res.send(teacher);
                }).catch((err) => {
                    res.send({
                        error: 'Error while creating teacher'
                    });
                });
            }
        }).catch((err) => {
            res.status(500).send({
                error: 'Could not find subject'
            });
        });
    }
});
route.put("/:id", (req, res) => {
    let subjectId = req.body.subjectId;
    if (!subjectId) {
        res.send({
            error: 'Please select the subject'
        });
    }
    else {
        db_1.subject.findOne({
            where: {
                id: subjectId
            }
        }).then((subject) => {
            if (!subject) {
                res.status(404).send({
                    error: 'Could not find subject with id: ' + subjectId
                });
            }
            else {
                db_1.teacher.update({
                    name: req.body.name
                }, {
                    where: {
                        id: req.params.id
                    }
                }).then((teacher) => {
                    teacher.set("subjectId", subjectId);
                    teacher.save();
                    res.send(teacher);
                }).catch((err) => {
                    res.send({
                        error: 'Error while creating teacher'
                    });
                });
            }
        }).catch((err) => {
            res.status(500).send({
                error: 'Could not find subject'
            });
        });
    }
});
route.delete("/:id", (req, res) => {
    let teacherId = req.params.id;
    db_1.teacher.destroy({
        where: {
            id: teacherId
        }
    }).then(teacher => res.send("teacher with id : " + teacherId + "  deleted"));
});
exports.teacherRoute = route;
//exports = module.exports = route
