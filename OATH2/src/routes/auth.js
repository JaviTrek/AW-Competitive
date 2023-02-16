const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req,res) => {
    res.send(req.user);
});

// router.get('/redirect', passport.authenticate('discord'));
// router.get('/', (req, res) => {
//     res.json({
//         msg: 'Auth',
//         status: 200
//     });
// });

// router.get('/success', (req, res) => {
//     res.json({
//         msg: 'Success',
//         status: 200
//     });
// });
module.exports = router;