import { Router, Request, Response } from 'express';
const route: Router = Router();
import { batch, course } from "../db";

route.get('/', (req: Request, res: Response) => {
    batch.findAll({ include: [{ model: course }] })
        .then((batches: any) => {
            res.status(200).send(batches)
        }).catch(error => {
            res.send(400).send({
                error: "could not find batches"
            })
        })
})

route.get('/:id', (req: Request, res: Response) => {
    batch.findAll({
        where: {
            id: req.params.id
        }, include: [{ model: course }]
    })
        .then((batch: any) => {
            res.status(200).send(batch)
        }).catch(error => {
            res.send(400).send({
                error: "could not find batch"
            })
        })
})

route.post('/', (req: Request, res: Response) => {
    let courseId = req.body.courseId;
    course.findOne({ where: { id: courseId } })
        .then(course => {
            if (!course) {
                res.status(404).send("course not found")
            }
            else {

                batch.create({
                    name: req.body.name,
                }).then((batch:any) => {
                    batch.setCourse(course,{save:false})
                    batch.save();
                    res.send(batch)
                }).catch((err) => res.send("error creating batch"))
            }
        })

})

export const batchRoute: Router = route;
//exports = module.exports = route