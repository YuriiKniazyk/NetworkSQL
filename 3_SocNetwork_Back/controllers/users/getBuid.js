const config = require('../config');

module.exports = async (req, res) => {
    try{
        const userId = req.params.id;
        await mongoose.connect(config.mongourl, {useNewUrlParser: true}, async function (err) {
            if (err) throw err;
                            
            await userModel.findById(userId)
            .exec(function(err, user) {
                if (err) throw err;
                if (!user) user = {Message: 'ERROR!!! User is not found!!!'};
                res.json(user);
            });
        })     
    } catch{
        console.log(e);
    }
};
