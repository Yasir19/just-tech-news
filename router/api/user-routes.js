const router = require('express').Router();
const {User} = require('../../models');

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
        }
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
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// update the user by id
router.put('/:id',(req,res)=>{
    //req.body where the id = req.params.id
    User.update(reg.body, {
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

