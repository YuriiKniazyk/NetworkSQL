module.exports = (params) => {
    let query = `SELECT u.id, u.email, u.name, u.surname FROM user u`;

    query = builder(params, query);

    return query;
};

function builder(params, query) {

    query += ' WHERE ';

    if (params.name) {
        query += `(u.name LIKE "%${params.name}%" OR u.surname LIKE "%${params.name}%") AND `
    }

    if (params.email) {
        query += `u.email LIKE "%${params.email}%" AND `
    }


    if (query.slice(-5) === ' AND ') {
        query = query.slice(0, -5);
    }

    if (query.slice(-7) === ' WHERE ') {
        query = query.slice(0, -7);
    }

    query += ';';

    return query;
}