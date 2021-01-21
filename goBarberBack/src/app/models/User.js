import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,//NUNCA VAI EEXISTIR NA BASE DE DADOS SÓ DO LADO DO CODIGO
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        }, {
            sequelize,
        })
        // pedacos de codigos que são executados de forma 
        // automatica baseado em açoes que acontec no model
        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })
        return this
    }
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User