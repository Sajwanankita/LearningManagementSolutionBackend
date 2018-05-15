"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => {
    db_1.batch.findAll()
        .then((batches) => {
        res.status(200).send(batches);
    }).catch(error => {
        res.send(400).send({
            error: "could not find batches"
        });
    });
});
route.get('/:id', (req, res) => {
    db_1.batch.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((batch) => {
        res.status(200).send(batch);
    }).catch(error => {
        res.send(400).send({
            error: "could not find batch"
        });
    });
});
route.post('/', (req, res) => {
    db_1.batch.create({
        name: req.body.name,
    }).then((batch) => {
        res.send(batch);
    }).catch((err) => res.send("error creating batch"));
});
exports.batchRoute = route;
//exports = module.exports = route
