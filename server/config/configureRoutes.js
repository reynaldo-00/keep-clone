const notesRouter = require('../routes/notesRouter');
const authRouter = require('../routes/authRouter');
const protected = require('../auth/protected');

module.exports = server => {
    server.use('/note', protected, notesRouter);
    server.use('/auth', authRouter);
}
