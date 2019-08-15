module.exports = (req, res)=> {
    res.status(404).json({Message: 'Oops....Something went wrong....'});
};