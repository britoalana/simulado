const tb_user = require('../models/tb_user')

module.exports = class authController {
    static async login(request, response){
    return response.render('login')
    }
}
