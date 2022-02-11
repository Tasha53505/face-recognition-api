const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '96bdbd89e075492990b7d32b09edf1ac'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            return res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json("can't get entries"))
        .then(count => {
            this.setState(Object.assign(this.state.user, count))
        })
}

module.exports = {
    handleImage,
    handleApiCall
}