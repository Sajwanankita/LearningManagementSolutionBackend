import { Router, Request, Response } from 'express';
const route: Router = Router();
import { student, studentbatch, batch } from "../db";

route.get('/', (req: Request, res: Response) => {
    student.findAll()
        .then((student: any) => {
            res.status(200).send(student)
        }).catch(error => {
            res.send(400).send({
                error: "could not find courses"
            })
        })
})

route.post('/', (req: Request, res: Response) => {
    student.create({
        name: req.body.name,
    }).then((student) => {
        res.send(student)
    }).catch((err) => res.send("error creating user"))
})

route.get('/:id', (req: Request, res: Response) => {
    student.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((student: any) => {
            res.status(200).send(student)
        }).catch(error => {
            res.send(400).send({
                error: "could not find courses"
            })
        })
})

route.post('/:id/batches', (req: Request, res: Response) => {
    let studentId = req.params.id
    let batchId = req.body.batchId;

    student.findOne({
        where: {
            id: studentId
        },
        include: [{
            model: batch
        }]
    })
        .then((student: any) => {
            if (!student) {
                res.status(404).send("student with id : " + studentId + " doesnot exists")
            }
            else {
                batch.findOne({
                    where: {
                        id: batchId
                    }
                }).then(batch => {
                    if (!batch) {
                        res.status(404).send("Batch with id : " + batchId + " doesnot exist")
                    } else {
                        studentbatch.create({
                            studentId: studentId
                        }).then((studentBatch: any) => {
                            studentBatch.setBatch(batch, { save: false })
                            studentBatch.save();
                            res.send(studentbatch)
                        })
                    }
                })

            }
        }).catch(error => {
            res.send(500).send({
                error: "Server Error"
            })
        })
})

route.get('/:id/batches', (req: Request, res: Response) => {
    let studentId = req.params.id

    studentbatch.findAll({
        where: {
            studentId: studentId
        }, include: [{
            model: batch
        }]
    })
        .then((studentbatch: any) => {
            if (!studentbatch) {
                res.status(404).send("student with id : " + studentId + " doesnot exists")
            } else {
                res.send(studentbatch)
            }

        }).catch(error => {
            res.send(400).send({
                error: "could not find courses"
            })
        })
})



route.put('/:id', (req, res) => {
    if (!req.body.name) {
        res.send("Please mention the name of the student")
    } else {
        student.update({
            name: req.body.name,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(student => res.send(student))
    }
})

route.delete('/:id', (req, res) => {
    let studentId = req.params.id
    student.destroy({
        where: {
            id: studentId
        }
    }).then(student => res.send("teacher with id : " + studentId + "  deleted"))
})


export const studentRoute: Router = route;
//exports = module.exports = route