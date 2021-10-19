const Database = require('../db/config');

function getRandom() {
    return Math.floor(Math.random() * 10).toString();
}

module.exports = {

    async create(req, res) {

        const db = await Database();

        let roomId = getRandom();
        let roomIdExist = true;

        const pass = req.body.password;

        while (roomIdExist) {

            for (var i = 0; i < 6; i++) {
                roomId += getRandom();
            }

            const roomsIds = await db.all(`SELECT id FROM rooms`);

            roomIdExist = roomsIds.some(id => id === roomId);

            if (!roomIdExist) {
                await db.run(`INSERT INTO rooms 
                (
                    id,
                    pass
                ) VALUES (
                    "${parseInt(roomId)}",
                    "${pass}"
                     );`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`);
    },

    async open(req, res) {
        const db = await Database();

        const roomId = req.params.room;

        const questions = await db.all(`SELECT id, title, read FROM questions WHERE room = ${roomId} AND read = 0`);

        const questionsRead = await db.all(`SELECT id, title, read FROM questions WHERE room = ${roomId} AND read = 1`);

        const hasQuestions = questions.length > 0 || questionsRead.length > 0;

        res.render("room", {
            roomId: roomId,
            questions: questions,
            questionsRead: questionsRead,
            hasQuestions: hasQuestions
        })


    },

    async enter(req,res) { 
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`);     
    }

}



