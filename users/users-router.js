const express = require('express')
const users = require('./users-model')

const usersRouter = express.Router()

module.exports = usersRouter
// the usersRouter module now inherits whatever prefix is specified when inmporting it into index.js with
// usersRouter.use('/some-prefix', module)
// this endpoint handles getting the entire array of users
usersRouter.get('/', (req, res) => {
	users
		.find()
		.then(users => {
			res.status(200).json(users)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'Error retrieving the users',
			})
		})
})

// this endpoint handles getting users by id
usersRouter.get('/:id', (req, res) => {
	users
		.findById(req.params.id)
		.then(user => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: 'User not found',
				})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'Error retrieving the` user',
			})
		})
})

usersRouter.post('/', (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: 'Missing user name or email',
		})
	}

	users
		.add(req.body)
		.then(user => {
			res.status(201).json(user)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'Error adding the user',
			})
		})
})
usersRouter.put('/:id', (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({
			message: 'Missing user name or email',
		})
	}

	users
		.update(req.params.id, req.body)
		.then(user => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: 'The user could not be found',
				})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'Error updating the user',
			})
		})
})

usersRouter.delete('/:id/posts', (req, res) => {
	users
		.remove(req.params.id)
		.then(count => {
			if (count > 0) {
				res.status(200).json({
					message: 'The user has been nuked',
				})
			} else {
				res.status(404).json({
					message: 'The user could not be found',
				})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'Error removing the user',
			})
		})
})

usersRouter.get('/:id/posts/:postId', (req, res) => {
	users
		.findUserPosts(req.params.id)
		.then(posts => {
			res.status(200).json(posts)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'could not get posts',
			})
		})
})

router.get('/:id/posts/:postId', (req, res) => {
	users
		.findUserPostById(req.params.id, req.params.postId)
		.then(post => {
			if (post) {
				res.json(post)
			} else {
				res.status(404).json({
					message: 'Post was not found',
				})
			}
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({
				message: 'Could not get user posts',
			})
		})
})

router.post('/:id/posts', (req, res) => {
	if (!req.body.text) {
		res.status(400).json({
			mesage: 'Need a value for text',
		})
	}
	users
		.addUserPost(req.params.id, req.body)
		.then(post => {
			res.status(201).json(post)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'could not create user post',
			})
		})
})
