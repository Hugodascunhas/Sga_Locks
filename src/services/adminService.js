const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { sendRegistrationApprovalEmail } = require('../services/emailService');

class AdminService {
    async findUserByAdmin(admin) {
        return prisma.admin.findUnique({
            where: { admin },
        });
    }

    async findUserByEmail(email) {
        return prisma.admin.findUnique({
            where: { email },
        });
    }

    async createUser(admin, email, etec, password, approvalToken) {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newAdmin = await prisma.admin.create({
            data: {
                admin,
                email,
                etec,
                password: hashedPassword,
                approvalToken, // Incluir o approvalToken
            },
        });

        // Envia o e-mail de aprovação
        await sendRegistrationApprovalEmail({
            name: admin,
            email,
            etec,
            approvalToken, // Enviar o token de aprovação gerado
        });

        return newAdmin;
    }

    verifyPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

module.exports = new AdminService();
