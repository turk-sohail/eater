import * as bcrypt from "bcrypt"

export class Bcrypt {
    async hashUserPassword(password) {
        return await bcrypt.hash(password, process.env.SALT_ROUNDS);
        console.log(password)
    }
}