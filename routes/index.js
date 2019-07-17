
const router = require('../router')
router('index',(req,res,next)=>{
  profileName : res.session.user.profileName
});
module.exports = router;
