import { Router, Request, Response } from 'express';
const route: Router = Router();
import { teacher, batch, lecture, subject } from "../db";

route.get('/', (req: Request, res: Response) => {
    teacher.findAll()
        .then((teachers: any) => {
            res.status(200).send(teachers)
        }).catch(error => {
            res.send(400).send({
                error: "could not find teachers"
            })
        })
})


route.get('/:id', (req: Request, res: Response) => {
    teacher.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((teacher: any) => {
            res.status(200).send(teacher)
        }).catch(error => {
            res.send(400).send({
                error: "could not find teacher"
            })
        })
})

route.get('/:id/batches', (req: Request, res: Response) => {
    lecture.findAll({
        where: {
            teacherId: req.params.id
        },
        include: [{
            model: batch
        }]
    })
        .then((batch: any) => {
            res.status(200).send(batch)
        }).catch(error => {
            res.send(400).send({
                error: "could not find teacher"
            })
        })
})

route.post('/', (req: Request, res: Response) => {
    if (!req.body.name) {
        res.send({
            error: 'Please enter the teacher name'
        });
    } else {
        let subjectId = req.body.subjectId;
        subject.findOne({
            where: {
                id: subjectId
            },
            attributes: ['id', 'name']
        }).then((subject: any) => {
            if (!subject) {
                res.status(404).send({
                    error: 'Could not find subject with id: ' + subjectId
                });
            } else {
                teacher.create({
                    name: req.body.name
                }).then((teacher: any) => {
                    teacher.setSubject(subject, { save: false });
                    teacher.save();
                    res.send(teacher);
                }).catch((err: Error) => {
                    res.send({
                        error: 'Error while creating teacher'
                    });
                });
            }
        }).catch((err: Error) => {
            res.status(500).send({
                error: 'Could not find subject'
            });
        });
    }
});


route.put("/:id", (req: Request, res: Response) => {
    let subjectId = req.body.subjectId;
    if (!subjectId) {
        res.send({
            error: 'Please select the subject'
        });
    } else {
        subject.findOne({
            where: {
                id: subjectId
            }
        }).then((subject: any) => {
            if (!subject) {
                res.status(404).send({
                    error: 'Could not find subject with id: ' + subjectId
                });
            } else {
                teacher.update({
                    name: req.body.name
                }, {
                        where: {
                            id: req.params.id
                        }
                    }).then((teacher: any) => {
                        teacher.set("subjectId", subjectId);
                        teacher.save();
                        res.send(teacher);
                    }).catch((err: Error) => {
                        res.send({
                            error: 'Error while creating teacher'
                        });
                    });
            }
        }).catch((err: Error) => {
            res.status(500).send({
                error: 'Could not find subject'
            });
        });
    }
});

route.delete("/:id", (req: Request, res: Response) => {
    let teacherId=req.params.id
    teacher.destroy({
        where: {
           id: teacherId
        }
    }).then(teacher=>res.send("teacher with id : "+ teacherId + "  deleted"))
})
export const teacherRoute: Router = route;
//exports = module.exports = route