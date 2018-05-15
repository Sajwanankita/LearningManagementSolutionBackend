"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => {
    db_1.course.findAll()
        .then((course) => {
        res.status(200).send(course);
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.post('/', (req, res) => {
    if (!req.body.name) {
        res.send("Please mention the name of the course");
    }
    else {
        db_1.course.create({
            name: req.body.name,
        }).then((course) => {
            res.send(course);
        }).catch((err) => res.send("error in creating course"));
    }
});
route.get('/:id', (req, res) => {
    db_1.course.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((course) => {
        res.status(200).send(course);
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.put('/:id', (req, res) => {
    if (!req.body.name) {
        res.send("Please mention the name of the course");
    }
    else {
        db_1.course.update({
            name: req.body.name,
        }, {
            where: {
                id: req.params.id
            }
        }).then(course => res.send(course));
    }
});
route.delete('/:id', (req, res) => {
    let courseId = req.params.id;
    db_1.course.destroy({
        where: {
            id: courseId
        }
    }).then(teacher => res.send("teacher with id : " + courseId + "  deleted"));
});
route.get('/:id/batches', (req, res) => {
    db_1.batch.findAll({
        where: {
            courseId: req.params.id
        }
    })
        .then((course) => {
        res.status(200).send(course);
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.post('/:id/batches', (req, res) => {
    if (!req.body.name) {
        res.send({
            error: 'Please enter the batch name'
        });
    }
    else {
        let courseId = req.params.id;
        db_1.course.findOne({
            where: {
                id: courseId
            },
        }).then((course) => {
            if (!course) {
                res.status(404).send({
                    error: 'Could not find course with id: ' + courseId
                });
            }
            else {
                db_1.batch.create({
                    name: req.body.name
                }).then((batch) => {
                    batch.setCourse(course, { save: false });
                    batch.save();
                    res.send(batch);
                }).catch((err) => {
                    res.send({
                        error: 'Error while creating batch'
                    });
                });
            }
        }).catch((err) => {
            res.status(500).send({
                error: 'Could not find course'
            });
        });
    }
});
route.get('/:courseId/batches/:batchId', (req, res) => {
    db_1.batch.findOne({
        where: {
            courseId: req.params.courseId,
            id: req.params.batchId
        }
    })
        .then((course) => {
        res.status(200).send(course);
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.get('/:courseId/batches/:batchId/lectures', (req, res) => {
    db_1.lecture.findAll({
        where: {
            batchId: req.params.batchId
        }
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    }).catch(error => {
        res.send(400).send({
            error: "could not find lectures"
        });
    });
});
route.post('/:courseId/batches/:batchId/lectures', (req, res) => {
    if (!req.body.name) {
        res.send({
            error: 'Please enter the lecture name'
        });
    }
    else {
        let subjectId = req.body.subjectId;
        let teacherId = req.body.teacherId;
        let batchId = req.params.batchId;
        db_1.subject.findOne({
            where: {
                id: subjectId
            },
        }).then((subject) => {
            if (!subject) {
                res.status(404).send({
                    error: 'Could not find subject with id: ' + subjectId
                });
            }
            else {
                db_1.teacher.findOne({
                    where: {
                        id: teacherId
                    },
                }).then(teacher => {
                    if (!teacher) {
                        res.status(404).send({
                            error: 'Could not find teacher with id: ' + teacherId
                        });
                    }
                    else {
                        db_1.lecture.create({
                            name: req.body.name,
                            subjectId: subjectId,
                            batchId: batchId
                        }).then((lecture) => {
                            lecture.setSubject(subject, { save: false });
                            lecture.setTeacher(teacher, { save: false });
                            lecture.save();
                            res.send(lecture);
                        }).catch((err) => {
                            res.send({
                                error: 'Error while creating lecture'
                            });
                        });
                    }
                }).catch((err) => {
                    res.status(500).send({
                        error: 'Could not find teacher'
                    });
                });
            }
        });
    }
});
route.get('/:courseId/batches/:batchId/lectures/:lectureId', (req, res) => {
    db_1.batch.findOne({ where: { id: req.params.batchId } }).then(batch => {
        if (!batch) {
            res.send("Batch is not found");
        }
        else {
            db_1.lecture.findAll({
                where: {
                    batchId: req.params.batchId,
                    id: req.params.lectureId
                }
            })
                .then((lecture) => {
                res.status(200).send(lecture);
            }).catch(error => {
                res.send(400).send({
                    error: "could not find lectures"
                });
            });
        }
    });
});
route.delete('/:courseId/batches/:batchId/lectures/:lectureId', (req, res) => {
    let batchId = req.params.batchId;
    let lectureId = req.params.lectureId;
    db_1.lecture.destroy({
        where: {
            id: lectureId,
            batchId: batchId
        }
    }).then(teacher => res.send("teacher with lecture id : " + lectureId + " and batch Id : " + batchId + "  deleted"));
});
route.get('/:courseId/batches/:batchId/students', (req, res) => {
    db_1.lecture.findAll({
        where: {
            batchId: req.params.batchId,
            id: req.params.lectureId
        }
    })
        .then((lecture) => {
        res.status(200).send(lecture);
    }).catch(error => {
        res.send(400).send({
            error: "could not find lectures"
        });
    });
});
exports.courseRoute = route;
//exports = module.exports = route
