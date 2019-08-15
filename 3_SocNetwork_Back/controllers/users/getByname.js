const config = require('../config');

module.exports = async (req, res) => {
    try{
        const {name} = req.query;

        await mongoose.connect(config.mongourl, {useNewUrlParser: true}, async function (err) {
            if (err) throw err;
                        
            await userModel.find({name: new RegExp(name, 'i')})
            .exec(function(err, users) {
                if (err) throw err;
                
                if (!users.length){
                    users = {Message: 'ERROR!!! User is not found!!!'};
                    res.json(users);
                } else {
                    res.json(users);
                }
            });
        })
    } catch (e){
        console.log(e);
    }    
};
