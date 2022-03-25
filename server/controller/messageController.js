import Messagedb from '../model/messageModel';


//create and save new blog
export const postMessage = (req,res) =>{
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        });
    }
    // console.log(req.body);
    //new blog
  else {
    const message = new Messagedb({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })
    //save blog to database
    message
    .save(message)
    .then ((data) =>{
        // console.log(data);
        res.status(201).send(data);
    })
    .catch((error)=>{
        // console(req.body);
        res.status(500).send({
            message: "Some error occured while creating a create operation"
        });
    });
  }

}

export const getMessage = (req, res) =>{
    Messagedb.find()
    .then((message)=>{
        res.status(202).send(message);
    })
    .catch((error)=>{
        // res.status(500).send({message:error.message || 'Error Occured while retrieving blog information'})
        res.status(500).json({message:error.message || 'Error Occured while retrieving message information'})
    })
}

export const deleteMessage = (req, res) =>{
    const id = req.params.id;
    Messagedb.findByIdAndDelete(id)
    .then((data)=>{
        if(!data){
            res.status(403).send({mesage: `Content to delete already doesn't exist`})
        }
        else {
            res.status(202).send({
                message: 'Messages deleted Successfuly!!'
            })
        }
    })
    .catch((error) =>{
        res.status(500).send({
            message: `Error occured while deleting the message`
        });
    });
}