var _ = require('lodash');
var Interface = require('./interface.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function(entity) {
            var updated = _.merge(entity, updates);
        console.log(updated);
            return updated.saveAsync()
                .spread(function(){return updated});
};
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.removeAsync()
                .then(res.status(204).end());
    }
};
}

var controller={};
controller.create = function(req,res){
    Interface.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));

}
// Gets a list of Replys
controller.index = function(req, res) {

    Interface.findAsync(req.query)
        .then(responseWithResult(res))
        .catch(handleError(res));
}
// Gets a single Thing from the DB
controller.show = function(req, res) {
    Interface.findByIdAsync(req.params.id)
        .then(handleEntityNotFund(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}
//Gets a single Thing by url from the DB
controller.getByUrl = function(req,res){
    Interface.findAsync({url:"/"+req.params.url})
        .then(handleEntityNotFound(res))
        .then(responseWithResult(ores))
        .catch(handleError(res));
}

// Updates an existing Thing in the DB
controller.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    console.log(req.body);
    Interface.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Thing from the DB
controller.destroy = function(req, res) {
    Interface.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

module.exports = controller;
