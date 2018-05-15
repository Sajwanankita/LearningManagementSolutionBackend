"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => {
    db_1.subject.findAll()
        .then((subjects) => {
        res.status(200).send(subjects);
    }).catch(error => {
        res.send(400).send({
            error: "could not find subjects"
        });
    });
});
route.get('/:id', (req, res) => {
    db_1.subject.findAll({ where: {
            id: req.params.id
        } })
        .then((subject) => {
        res.status(200).send(subject);
    }).catch(error => {
        res.send(400).send({
            error: "could not find subject"
        });
    });
});
route.get('/:id/teachers', (req, res) => {
    db_1.lecture.findAll({ where: {
            subjectId: req.params.id
        },
        include: [{
                model: db_1.teacher
            }] })
        .then((batch) => {
        res.status(200).send(batch);
    }).catch(error => {
        res.send(400).send({
            error: "could not find teacher"
        });
    });
});
route.post('/', (req, res) => {
    db_1.subject.create({
        name: req.body.name,
    }).then((subject) => {
        res.send(subject);
    }).catch((err) => res.send("error creating subject"));
});
route.put("/:id", (req, res) => {
});
exports.subjectRoute = route;
//exports = module.exports = route
