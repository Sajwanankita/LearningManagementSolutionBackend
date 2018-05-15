"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => {
    db_1.student.findAll()
        .then((student) => {
        res.status(200).send(student);
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.post('/', (req, res) => {
    db_1.student.create({
        name: req.body.name,
    }).then((student) => {
        res.send(student);
    }).catch((err) => res.send("error creating user"));
});
route.get('/:id', (req, res) => {
    db_1.student.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((student) => {
        res.status(200).send(student);
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.post('/:id/batches', (req, res) => {
    let studentId = req.params.id;
    let batchId = req.body.batchId;
    db_1.student.findOne({
        where: {
            id: studentId
        },
        include: [{
                model: db_1.batch
            }]
    })
        .then((student) => {
        if (!student) {
            res.status(404).send("student with id : " + studentId + " doesnot exists");
        }
        else {
            db_1.batch.findOne({
                where: {
                    id: batchId
                }
            }).then(batch => {
                if (!batch) {
                    res.status(404).send("Batch with id : " + batchId + " doesnot exist");
                }
                else {
                    db_1.studentbatch.create({
                        studentId: studentId
                    }).then((studentBatch) => {
                        studentBatch.setBatch(batch, { save: false });
                        studentBatch.save();
                        res.send(db_1.studentbatch);
                    });
                }
            });
        }
    }).catch(error => {
        res.send(500).send({
            error: "Server Error"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    let studentId = req.params.id;
    db_1.studentbatch.findAll({
        where: {
            studentId: studentId
        }, include: [{
                model: db_1.batch
            }]
    })
        .then((studentbatch) => {
        if (!studentbatch) {
            res.status(404).send("student with id : " + studentId + " doesnot exists");
        }
        else {
            res.send(studentbatch);
        }
    }).catch(error => {
        res.send(400).send({
            error: "could not find courses"
        });
    });
});
route.put('/:id', (req, res) => {
    if (!req.body.name) {
        res.send("Please mention the name of the student");
    }
    else {
        db_1.student.update({
            name: req.body.name,
        }, {
            where: {
                id: req.params.id
            }
        }).then(student => res.send(student));
    }
});
route.delete('/:id', (req, res) => {
    let studentId = req.params.id;
    db_1.student.destroy({
        where: {
            id: studentId
        }
    }).then(student => res.send("teacher with id : " + studentId + "  deleted"));
});
exports.studentRoute = route;
//exports = module.exports = route
