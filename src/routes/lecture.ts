import { Router, Request, Response } from 'express';
const route: Router = Router();
import { lecture, course, subject, teacher, batch } from "../db";
import { cursorTo } from 'readline';

route.get('/', (req: Request, res: Response) => {
    lecture.findAll({ include: [{ model: course }, { model: subject }, { model: teacher }, { model: batch }] })
        .then((lectures: any) => {
            res.status(200).send(lectures)
        }).catch(error => {
            res.send(400).send({
                error: "could not find lectures"
            })
        })
})

route.get('/:id', (req: Request, res: Response) => {
    lecture.findAll({
        where: {
            id: req.params.id
        }, include: [{ model: course }, { model: subject }, { model: teacher }, { model: batch }]
    })
        .then((lecture: any) => {
            res.status(200).send(lecture)
        }).catch(error => {
            res.send(400).send({
                error: "could not find lecture"
            })
        })
})

route.post('/', (req: Request, res: Response) => {

    batch.findOne({ where: { id: req.body.batchId } }).then(batch => {
        if (!batch) {
            res.status(400).send("Please enter the batch")
        } else {
            teacher.findOne({ where: { id: req.body.teacherId } }).then(teacher => {
                if (!teacher) {
                    res.status(200).send("Please enter the teacher")
                } else {
                    subject.findOne({ where: { id: req.body.subjectId } }).then(subject => {
                        if (!subject) {
                            res.status(200).send("please enter the subject")
                        } else {
                            course.findOne({ where: { id: req.body.courseId } }).then(course => {
                                if (!course) {
                                    res.status(200).send("please enter the course")
                                } else {
                                    lecture.create({
                                        name: req.body.name
                                    }).then((lecture: any) => {
                                        lecture.setTeacher(teacher, { save: false });
                                        lecture.setSubject(subject, { save: false });
                                        lecture.setBatch(batch, { save: false });
                                        lecture.setCourse(course, { save: false });
                                        lecture.save();
                                        res.send(lecture)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

route.put("/:id", (req: Request, res: Response) => {

});

export const lectureRoute: Router = route;
//exports = module.exports = route