// require Post model
const Post = require('../models/Post');
// require User model
const User = require('../models/User');
// require jwt 
const jwt = require('jsonwebtoken');



exports.getAllPosts = async (req, res) => { 
try {
    // get user from cookies
    const token = req.cookies.token;
    //  Check is token is valid
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Check if user still exists
    const user = await User.findById(decoded.id);
    // get all posts of user
    const posts = await Post.find({ author: user._id }).populate('author');
  
    res.status(200).json({  
        status: 'success',
        data: {
            posts
        }
    });

} catch (error) {
    res.status(404).json({ status: "error", message: "Something went wrong" })
}
}

exports.getPost = async (req,res) => {  
    try {
        // get user from cookie
        const token = req.cookies.token;
        //  Check is token is valid
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // Check if user still exists
        const user = await User.findById(decoded.id);
        // get single post of user using post id
        const post = await Post.findById(req.params.id).populate('author');
        
        // if post does not exist
          if (!post) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        }
        // if post belongs to user then return post
        if (post.author.toString() === user._id.toString()) {
            res.status(200).json({
                status: 'success',
                data: {
                    post
                }
            });
        } else {
            res.status(403).json({
                status: 'error',
                message: 'Unauthorized to view this post'
            });
        }


        res.status(200).json({  
            status: 'success',
            data: {
                post
            }
        });
    
    } catch (error) {
        res.status(400).json({ status: "error", message: "Something went wrong" })
    }
}

exports.createPost = async (req,res) => {
    try {
        //  destructure the body
        const { amount, category, type, date } = req.body;
        // check if fields are valid
        if (!amount || !category || !type || !date ) {
            return res.status(400).json({
                status: "error",
                message: "Please enter all fields"
            });
        }
        const token = req.cookies.token;
    //  Check is token is valid
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // Check if user still exists
        const user = await User.findById(decoded.id);
      let author = user
  

    //  post's author is the user that is logged in
    const post = await Post.create({
        amount,
        category,
        date,
        type,
        author
    })
//   add post to user's posts array
    user.posts.push(post);
    await user.save();

    res.status(201).json({
        status: "success",
        data: {
            post
        }
    });

        
    } catch (error) {
        res.status(400).json({ status: "error", message: "Something went wrong"});
    }
}

exports.deletePost = async (req,res) => {
    try {
        // Delete post
        const post = await Post.findByIdAndDelete(req.params.id);
        // if post does not exist
        if (!post) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        }

        res.status(200).json({  
            status: 'success',
            data: {
                post
            }
        });
    
    } catch (error) {
        res.status(404).json({ status: "error", message: "Something went wrong" })
    }
}

