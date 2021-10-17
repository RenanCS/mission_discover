const Database = require('../db/config');

function getRandom() {
    return Math.floor(Math.random() * 10).toString();
}

module.exports = {

    async create(req, res) {

        const db = await Database();

        let roomId = getRandom();
        const pass = req.body.password;

        for (var i = 0; i < 6; i++) {
            roomId += getRandom();
        }
        debugger;

        await db.run(`INSERT INTO rooms 
        (
            id,
            pass
        ) VALUES (
            "${parseInt(roomId)}",
            "${pass}"
             );`);

        await db.close();

        res.redirect(`/room/${roomId}`);
    }
}



