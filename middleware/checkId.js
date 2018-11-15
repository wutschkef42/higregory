
'use strict';
var mongoose = require('mongoose');
var List = mongoose.model('Lists');

async function checkId(req, res, next) {
    let listId = null;
    console.log(typeof req.params.listId);
    if (req.params.listId != undefined)
        listId = req.params.listId
    else
         listId = req.body.listId;
    console.log(listId)
    const list = await List.findById(listId);
    if (list.owner_id != req.userId)
        res.status(403).send('You are not authorized to see this list.');
    next();    
}

module.exports = checkId;