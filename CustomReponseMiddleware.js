
module.exports = (req, res, next) => {
    res.sendValidationError = (errors) => res.status(422).send(errors)

    res.sendSuccess = (msg) => res.send(msg || true)

    res.sendNotFoundError = (msg) => res.status(404).send(msg)

    next()
}