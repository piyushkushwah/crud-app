const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//load Person Model
require('../model/Person');
const Person = mongoose.model('person');

//Person Get Route
router.get('', (req, res) => {
    Person.find()
        .sort({ date: 'desc' })
        .then(person => {
            res.json({
                persons: person
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({ person: null });
        });
});

//Person Get single Route
router.get('/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json({
                person: person
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({ person: null });
        });
});


//Post request
router.post('', (req, res) => {
    const errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Please Enter Your Name' });
    }
    if (!req.body.age) {
        errors.push({ text: 'Please Enter Your Age' });
    }
    if (!req.body.gender) {
        errors.push({ text: 'Please Enter Your Gender' });
    }
    if (!req.body.mobno) {
        errors.push({ text: 'Please Enter Your Mobile No.' });
    }
    if (errors.length > 0) {
        res.json({
            errors: errors
        });

    } else {
        const newPerson = {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            mobno: req.body.mobno
        }
        new Person(newPerson)
            .save()
            .then((data) => {
                res.json({
                    person: data
                });
            })
            .catch(err => res.status(404).json({ person: null }));

    }

});

//Edit form Put request
router.put('/:id', (req, res) => {
    Person.findOneAndUpdate({
        _id: req.params.id
    }, {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            mobno: req.body.mobno
        }).then((data) => {
            res.json({
                person: data
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({ person: null });
        })
});

//Delete Person
router.delete('/:id', (req, res) => {
    Person.findByIdAndDelete({
        _id: req.params.id
    }).then(data => {
        res.json({ person: data });
    }).catch(err => {
        console.log(err);
        res.status(404).json({ person: null });
    });
});

module.exports = router;