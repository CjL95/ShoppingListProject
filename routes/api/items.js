const express = require('express');
const router = express.Router();
//bruh ;uajsdfnbh;oplieakrnfgho;
//item model
var Item = require('../../models/Item');

//@route  GET api/items
//@get    all items
//@access Public
router
	.get('/', (req, res) =>{
		Item.find({})
			.sort({date: -1})
			.then(items => res.json(items))
	})
	//@route  POST api/items
	//@post   new items
	//@access Public
	.post('/', (req, res) =>{
		const newItem = new Item({
			name: req.body.name
		});
		newItem.save().then(item => res.json(item));
	})
	//@route  GET api/items
	//@desc   Delete an item
	//@access Public
	.delete('/:id', (req, res) =>{
		Item.findById(req.params.id)
			.then(item => item.remove().then(() => res.json({success: true})))
			.catch(err => res.status(404).json({success: false}))
	});
module.exports = router;