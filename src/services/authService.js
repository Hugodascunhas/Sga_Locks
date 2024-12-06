// AuthService.js

const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const crypto = require('crypto');
const { sendConfirmationEmail, sendPasswordResetEmail } = require('./sendEmail');

class AuthService {
    // Função para encontrar usuário pelo RM e ETEC
    async findUserByRmAndEtec(rm, etec) {
        return prisma.user.findFirst({
            where: { rm: Number(rm), etec },
        });
    }

    // Função para encontrar usuário pelo email
    async findUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    // Criação do novo usuário
    async createUser(email, password, nome, sobrenome, rm, etec, curso) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('Email já registrado.');
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const token = crypto.randomBytes(20).toString('hex');

        const user = await prisma.user.create({
            data: {
                rm: Number(rm),
                Nome: nome,
                Sobrenome: sobrenome,
                email,
                password: hashedPassword,
                etec,
                curso,
                emailVerified: false,
                verificationToken: token,
            },
        });

        await sendConfirmationEmail(email, token);
        return user;
    }

    // Função para verificar a senha
    async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }

    // Solicitação de recuperação de senha
    async requestPasswordReset(email) {
        const user = await this.findUserByEmail(email);
        if (user) {
            const token = crypto.randomBytes(20).toString('hex');
            await prisma.user.update({
                where: { email },
                data: { resetToken: token },
            });
            await sendPasswordResetEmail(email, token);
            return true;
        }
        return false;
    }

    // Redefinir a senha
    async resetPassword(token, newPassword) {
        const user = await prisma.user.findFirst({
            where: { resetToken: token },
        });

        if (!user) {
            return false;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
            },
        });

        return true;
    }

    // Verificar o token de verificação de e-mail
    async verifyEmailToken(token) {
        const user = await prisma.user.findFirst({
            where: { verificationToken: token },
        });

        if (!user) {
            return false;
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationToken: null,
            },
        });

        return true;
    }

    // Login do usuário com RM, senha e ETEC
    async login(rm, password, etec) {
        const user = await this.findUserByRmAndEtec(rm, etec);

        if (!user) {
            throw new Error('Usuário não encontrado ou ETEC incorreta.');
        }

        if (!user.emailVerified) {
            throw new Error('E-mail não confirmado. Por favor, verifique seu e-mail.');
        }

        const isPasswordValid = await this.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha incorreta.');
        }

        return user;
    }
}

module.exports = new AuthService();
