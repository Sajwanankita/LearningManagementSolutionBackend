import { Router, Request, Response } from 'express';
const route: Router = Router();
import { subject, lecture, batch, teacher, course } from "../db";


route.get('/', (req: Request, res: Response) => {
    subject.findAll()
        .then((subjects: any) => {
            res.status(200).send(subjects)
        }).catch(error => {
            res.send(400).send({
                error: "could not find subjects"
            })
        })
})

route.get('/:id', (req: Request, res: Response) => {
    subject.findAll({
        where: {
            id: req.params.id
        }
    })
        .then((subject: any) => {
            res.status(200).send(subject)
        }).catch(error => {
            res.send(400).send({
                error: "could not find subject"
            })
        })
})

route.get('/:id/teachers', (req: Request, res: Response) => {
    lecture.findAll({
        where: {
            subjectId: req.params.id
        },
        include: [{
            model: teacher
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
    let courseId = req.body.courseId;
    course.findOne({
        where: { id: courseId }
    }).then(course => {
        if (!course) {
            res.status(400).send('course not found')
        }
        else {
            subject.create({ name: req.body.name }).then((subject: any) => {
                subject.setCourse(course, { save: false });
                subject.save()
                res.send(subject)
            })
        }
    }).then((subject) => {
        res.send(subject)
    }).catch((err) => res.send("server error"))
})


route.put("/:id", (req: Request, res: Response) => {

});

export const subjectRoute: Router = route;
//exports = module.exports = route