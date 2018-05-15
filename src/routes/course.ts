import { Router, Request, Response } from 'express';
const route: Router = Router();
import { course, batch, subject, lecture, teacher, student } from "../db";
import { Batch } from '../Model/model';
import { execFileSync } from 'child_process';

route.get('/', (req: Request, res: Response) => {
    course.findAll()
        .then((course: any) => {
            res.status(200).send(course)
        }).catch(error => {
            res.send(400).send({
                error: "could not find courses"
            })
        })
})

route.post('/', (req: Request, res: Response) => {
    if (!req.body.name) {
        res.send("Please mention the name of the course")
    }
    else {
        course.create({
            name: req.body.name,
        }).then((course) => {
            res.send(course)
        }).catch((err) => res.send("error in creating course"))
    }
})


route.get('/:id', (req: Request, res: Response) => {
    course.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((course: any) => {
            res.status(200).send(course)
        }).catch(error => {
            res.send(400).send({
                error: "could not find courses"
            })
        })
})


route.put('/:id', (req, res) => {
    if (!req.body.name) {
        res.send("Please mention the name of the course")
    } else {
        course.update({
            name: req.body.name,
        }, {
                where: {
                    id: req.params.id
                }
            }).then(course => res.send(course))
    }
})

route.delete('/:id', (req, res) => {
    let courseId = req.params.id
    course.destroy({
        where: {
            id: courseId
        }
    }).then(teacher => res.send("teacher with id : " + courseId + "  deleted"))
})

route.get('/:id/batches', (req: Request, res: Response) => {
    batch.findAll({
        where: {
            courseId: req.params.id
        }, include: [{
            model: course
        }]
    })
        .then((course: any) => {
            res.status(200).send(course)
        }).catch(error => {
            res.send(400).send({
                error: "could not find courses"
            })
        })
})


route.post('/:id/batches', (req: Request, res: Response) => {
    if (!req.body.name) {
        res.send({
            error: 'Please enter the batch name'
        });
    } else {
        let courseId = req.params.id;
        course.findOne({
            where: {
                id: courseId
            },
        }).then((course: any) => {
            if (!course) {
                res.status(404).send({
                    error: 'Could not find course with id: ' + courseId
                });
            } else {
                batch.create({
                    name: req.body.name
                }).then((batch: any) => {
                    batch.setCourse(course, { save: false });
                    batch.save();
                    res.send(batch);
                }).catch((err: Error) => {
                    res.send({
                        error: 'Error while creating batch'
                    });
                });
            }
        }).catch((err: Error) => {
            res.status(500).send({
                error: 'Could not find course'
            });
        });
    }
});


route.get('/:courseId/batches/:batchId', (req: Request, res: Response) => {

    course.findOne({ where: { id: req.params.courseId } }).then((course: any) => {
        if (!course) {
            res.status(404).send("course not found")
        } else {

            batch.findOne({
                where: {
                    courseId: req.params.courseId,
                    id: req.params.batchId
                }, include: [{ model: course }]
            })
                .then((batch: any) => {
                    if (!batch) {
                        res.status(404).send("batch not found")
                    } else {
                        res.status(200).send(batch)
                    }
                }).catch(error => {
                    res.send(400).send({
                        error: "could not find courses"
                    })
                })

        }
    })
})

route.get('/:courseId/batches/:batchId/lectures', (req: Request, res: Response) => {
    course.findOne({ where: { id: req.params.courseId } }).then((course: any) => {
        if (!course) {
            res.status(404).send("course not found")
        } else {
            batch.findOne({
                where: {
                    id: req.params.batchId
                }, include: [{ model: course }]
            })
                .then((batch: any) => {
                    if (!batch) {
                        res.status(404).send("batch not found")
                    } else {
                        lecture.findAll({
                            where: {
                                batchId: req.params.batchId,
                                courseId: req.params.courseId
                            }, include: [{ model: course }, { model: subject }, { model: teacher }, { model: batch }]
                        })
                            .then((lectures: any) => {
                                res.status(200).send(lectures)
                            }).catch(error => {
                                res.send(400).send({
                                    error: "could not find lectures"
                                })
                            })

                    }
                }).catch(error => {
                    res.send(400).send({
                        error: "could not find courses"
                    })
                })

        }
    })
})

route.post('/:courseId/batches/:batchId/lectures', (req: Request, res: Response) => {
    if (!req.body.name) {
        res.send({
            error: 'Please enter the lecture name'
        });
    } else {
        let subjectId = req.body.subjectId;
        let teacherId = req.body.teacherId;
        let batchId = req.params.batchId;
        let courseId = req.params.courseId;
        course.findOne({
            where: {
                courseId: courseId
            }
        }).then(course => {
            if (!course) {
                res.status(404).send("Course with this id not found")
            }
            else {
                batch.findAll({ where: { id: batchId } }).then(batch => {
                    if (!batch) {
                        res.status(404).send("batch with this id does not found")
                    } else {
                        subject.findOne({
                            where: {
                                id: subjectId
                            },
                        }).then((subject: any) => {
                            if (!subject) {
                                res.status(404).send({
                                    error: 'Could not find subject with id: ' + subjectId
                                });
                            } else {
                                teacher.findOne({
                                    where: {
                                        id: teacherId
                                    },
                                }).then(teacher => {
                                    if (!teacher) {
                                        res.status(404).send({
                                            error: 'Could not find teacher with id: ' + teacherId
                                        });
                                    } else {
                                        lecture.create({
                                            name: req.body.name,
                                        }).then((lecture: any) => {
                                            lecture.setSubject(subject, { save: false });
                                            lecture.setTeacher(teacher, { save: false });
                                            lecture.setBatch(batch, { save: false });
                                            lecture.setCourse(course, { save: false })
                                            lecture.save();
                                            res.send(lecture);
                                        }).catch((err: Error) => {
                                            res.status(500).send({
                                                error: 'server error'
                                            });
                                        });
                                    }
                                }).catch((err: Error) => {
                                    res.status(500).send({
                                        error: 'Server Error'
                                    });
                                });

                            }
                        })
                    }
                })

            }
        })
    }
});


route.get('/:courseId/batches/:batchId/lectures/:lectureId', (req: Request, res: Response) => {
    let courseId = req.params.courseId;
    let batchId = req.params.batchId;
    let lectureId = req.params.lectureId;
    course.findOne({ where: { id: courseId } }).then((course:any) => {
        if (!course) {
            res.status(404).send('course with this id doesnt exists')
        } else {
            batch.findOne({ where: { id: batchId } }).then((batch:any) => {
                if (!batch) {
                    res.status(404).send('batch with this id doesnt exists')
                } else {
                    lecture.findOne({
                        where: { id: lectureId, courseId: courseId, batchId: batchId },
                        include: [{ model: subject }, { model: teacher }, { model: student },{model:course}]
                    }).then(lecture => {
                        if (!lecture) {
                            res.status(404).send('lecture with this id doesnt exists')
                        }
                        else {
                            res.send(lecture)
                        }
                    })
                }
            })
        }
    })

})


route.delete('/:courseId/batches/:batchId/lectures/:lectureId', (req: Request, res: Response) => {
    let batchId = req.params.batchId
    let lectureId = req.params.lectureId
    lecture.destroy({
        where: {
            id: lectureId,
            batchId: batchId
        }
    }).then(teacher => res.send("teacher with lecture id : " + lectureId + " and batch Id : " + batchId + "  deleted"))
})


route.get('/:courseId/batches/:batchId/students', (req: Request, res: Response) => {
    lecture.findAll({
        where: {
            courseId:req.params.courseId,
            batchId: req.params.batchId,
            id: req.params.lectureId
        }
    })
        .then((lecture: any) => {
            res.status(200).send(lecture)
        }).catch(error => {
            res.send(400).send({
                error: "could not find lectures"
            })
        })
})

route.get('/:courseId/batches/:batchId/teachers', (req: Request, res: Response) => {
    lecture.findAll({
        where: {
            courseId:req.params.courseId,
            batchId: req.params.batchId,
            id: req.params.lectureId
        }
    })
        .then((lecture: any) => {
            res.status(200).send(lecture)
        }).catch(error => {
            res.send(400).send({
                error: "could not find lectures"
            })
        })
})

export const courseRoute: Router = route;
//exports = module.exports = route