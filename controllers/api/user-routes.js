const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// get/api/users
router.get('/', (req, res)=>{
    //access User model and run findall()method
    User.findAll({
        attributes: {exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//get user by id 
router.get('/:id',(req,res)=>{
    User.findOne({
        attributes: { exclude: ['password'] },
        where:{
            id:req.params.id
        },
        include: [
            {
            model: Post,
            attributes:['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes:['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post to users
router.post('/',(req,res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(()=>{
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);

    })
    });
});

router.post('/login',(req, res) => {
    //. exoect email and password
    User.findOne({
        where: {
        email: req.body.email
        }
    }). then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({message: 'wrong information'});
            return;
        }
        // verfiy password 
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({message: 'Wrong information'})
            return;
        } 
        req.session.save(()=>{
            // declare session variables
            req.session.user_id = dbUserData.id
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user:dbUserData, message: 'You are now logged in!'})
        });
    });
});
router.post('/logout',(req,res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=> {
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
    }
});

// update the user by id
router.put('/:id',(req,res)=>{
    //req.body where the id = req.params.id
    User.update(req.body, {
        individualHooks:true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData =>{
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// delete user by id 
router.delete('/:id',(req,res)=>{
    User.destroy({
        where: { 
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id ' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;

