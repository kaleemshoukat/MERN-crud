const fs=require('fs')
const User=require('../models/user')

exports.add=async (req, res) => {
    try{
        console.log(req.files);
        console.log(req.body);
        const body=req.body
        const user=new User()

        if (req.files){
            var profileImage = req.files.profileImage
            var newName=Date.now()+'-'+profileImage.name
            // Use the mv() method to place the file somewhere on your server
            profileImage.mv('./public/uploads/'+newName, function(err) {
                if (err){
                    return res.status(200).json({
                        'status':false,
                        'message': err.message
                    })
                }
                console.log('File uploaded!')
            });

            //insert new image name in db
            user.profileImage=newName
        }

        user.name= body.name
        user.email= body.email
        user.gender= body.gender
        user.password= body.password
        user.cgpa= body.cgpa
        user.country= body.country
        await user.save()

        res.status(200).json({
            status:true,
            message: 'User created successfully!'
        });
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.list=async (req, res)=> {
    try {
        const limit=req.query.limit
        const offset=req.query.offset

        const items=await User.find({}).limit(limit).skip(offset)
        const itemCount =await User.count({})

        return res.status(200).json({
            status:true,
            message: "Success",
            items: items,
            itemCount: itemCount
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.update= async (req, res) => {
    try{
        const body=req.body
        const user=await User.findById(req.params.id)
        console.log(req.files)
        if (req.files){
            var profileImage = req.files.profileImage
            var newName=Date.now()+'-'+profileImage.name
            // Use the mv() method to place the file somewhere on your server
            profileImage.mv('./public/uploads/'+newName, function(err) {
                if (err){
                    return res.status(200).json({
                        'status':false,
                        'message': err.message
                    })
                }
                console.log('File uploaded!')
            });

            //delete old file
            const oldProfileImage=user.profileImage
            if (oldProfileImage){
                fs.unlink('./public/uploads/'+oldProfileImage, (err) => {
                    if (err){
                        return res.status(200).json({
                            'status':false,
                            'message': err.message
                        })
                    }
                    console.log('File deleted!');
                });
            }

            //insert new image name in db
            user.profileImage=newName
        }

        //update in DB
        user.name= body.name
        user.gender= body.gender
        user.password= body.password
        user.cgpa= body.cgpa
        user.country= body.country
        await user.save()

        return res.status(200).json({
            'status':true,
            'message': "Details updated successfully."
        })
    }
    catch (error) {
        res.status(error.status || 500).json({
            status:false,
            message: error.message
        });
    }
}

exports.delete= async (req, res) => {
    try{
        const user=await User.findById(req.params.id)

        //delete old file
        const oldProfileImage=user.profileImage
        if (oldProfileImage){
            fs.unlink('./public/uploads/'+oldProfileImage, (err) => {
                if (err){
                    return res.status(200).json({
                        'status':false,
                        'message': err.message
                    })
                }
                console.log('File deleted!');
            });
        }

        await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            status:true,
            message: "Deleted successfully."
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.edit= async (req, res) => {
    try{
        const user=await User.findById(req.params.id)

        return res.status(200).json({
            status:true,
            message: "Success!",
            data: user
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}

exports.chart= async (req, res) => {
    try{
        const chart=await User.aggregate([ // User is the model of userSchema
            {
                $group: {
                    _id: { $month: "$createdAt" }, // group by the month *number*, mongodb doesn't have a way to format date as month names
                    numberofdocuments: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: false, // remove _id
                    month: { // set the field month as the month name representing the month number
                        $arrayElemAt: [
                            [
                                "", // month number starts at 1, so the 0th element can be anything
                                "january",
                                "february",
                                "march",
                                "april",
                                "may",
                                "june",
                                "july",
                                "august",
                                "september",
                                "october",
                                "november",
                                "december"
                            ],
                            "$_id"
                        ]
                    },
                    numberofdocuments: true // keep the count
                }
            }
        ])

        return res.status(200).json({
            status:true,
            message: "Success!",
            data: chart
        })
    }
    catch (error) {
        res.status(500).json({
            status:false,
            message: error.message
        });
    }
}