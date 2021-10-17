module.exports = {
    create(req,res) {
        const roomId = req.body.password;
        res.redirect(`/room/${roomId}`);
    }
}