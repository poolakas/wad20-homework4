const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize,  (request, response) => {

    // Endpoint to create a new post

    let text = request.body.text;
    let media = request.body.media.url;

    if (!text && !media) {
        response.status(400).json();
        return
    }

    PostModel.create( {
        "userId": request.currentUser.id,
        "text": request.body.text,
        "media": request.body.media
        },
        callback => {console.log(callback);}
    )
    response.json([]);
});


router.put('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to like a post

    let userID = request.currentUser.id;
    let postID = request.params.postId;

    PostModel.like(userID, postID, (liked) => {
        response.status(200).json(liked)
    });
});

router.delete('/:postId/likes', authorize, (request, response) => {
    
    // Endpoint for current user to unlike a post

    let userID = request.currentUser.id;
    let postID = request.params.postId;

    PostModel.unlike(userID, postID, (liked) => {
        response.status(200).json(liked)
    });
});

module.exports = router;
