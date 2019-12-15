const Sequalize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        let client = new Sequalize('social', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        });
        let models = {};

        function getModels() {
            fs.readdir('./db/models', (err, files) => {
                files.forEach((file) => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(resolve(`./db/models/${modelName}`))
                });
            });
        }

        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels(),
            getClient: () => client
        };
    }

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    }
})();
