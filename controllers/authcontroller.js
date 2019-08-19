const controller = module.exports = {}
const render = require('../app/render');
controller.signin = function(req, res) {
    render(res,'signin',{'message' :req.flash('message')});
}

controller.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}