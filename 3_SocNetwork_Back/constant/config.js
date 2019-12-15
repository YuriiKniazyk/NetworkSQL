module.exports = {
    itsStartupServer: true,
    port: 3300,
    secret: 'NastyaMasha',
    refreshSecret: 'NastyaMashaSuperSecret',
    strongRegex: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
};
