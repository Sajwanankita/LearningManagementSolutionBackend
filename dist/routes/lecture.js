"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => {
    db_1.lecture.findAll()
        .then((lectures) => {
        res.status(200).send(lectures);
    }).catch(error => {
        res.send(400).send({
            error: "could not find lectures"
        });
    });
});
route.get('/:id', (req, res) => {
    db_1.lecture.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((lecture) => {
        res.status(200).send(lecture);
    }).catch(error => {
        res.send(400).send({
            error: "could not find lecture"
        });
    });
});
route.post('/', (req, res) => {
    db_1.lecture.create({
        name: req.body.name,
    }).then((lecture) => {
        res.send(lecture);
    }).catch((err) => res.send("error creating lecture"));
});
route.put("/:id", (req, res) => {
});
exports.lectureRoute = route;
//exports = module.exports = route
