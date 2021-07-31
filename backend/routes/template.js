const express = require('express')
const Template = require('../models/template.js')
const mongoose = require('mongoose')

const router = express.Router();

router.post('/add', async (req, res) => {
    const post = req.body;
    console.log(req.body)
    const newTemplate = new Template(post);

    try {
        await newTemplate.save();

        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params
        const temp = req.body
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No template with that id" })

        const updatedTemplate = await Template.findByIdAndUpdate(_id, temp, { new: true })
        res.status(200).json(updatedTemplate)

    } catch (e) {
        res.status(404).json({ message: e.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const templates = await Template.find();

        res.status(200).json(templates);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
})

router.get('/:id', async (req, res) => {
    Template.findById(req.params.id)
        .then(template => res.json(template))
        .catch(error => res.status(400).json({ message: error.message }))
})


module.exports = router;