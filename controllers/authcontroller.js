const controller = module.exports = {}
 
controller.signin = function(req, res) {
    res.render('signin',{'message' :req.flash('message')});
}

controller.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}