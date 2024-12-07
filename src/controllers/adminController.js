const adminService = require('../services/adminService');
const { sendRegistrationApprovalEmail } = require('../services/emailService');  // Corrigir importação
const { generateToken } = require('../utils/tokenGenerator');
const prisma = require('../config/database');

exports.getLogin = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/tasks");
    }
    res.render("content/loginAdm", {
        title: 'Login',
        error: req.query.error || null
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    // Verifica se o email foi fornecido
    if (!email) {
        return res.redirect("/loginAdm?error=email_required");
    }

    try {
        const user = await adminService.findUserByEmail(email);

        // Verifica se o usuário foi encontrado e a senha está correta
        if (user && adminService.verifyPassword(password, user.password)) {
            req.session.userId = user.id;
            req.session.userEmail = user.email;
            return res.redirect("/tasks");
        }

        res.redirect("/loginAdm?error=invalid");
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.redirect("/loginAdm?error=server");
    }
};

exports.getRegister = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/tasks");
    }
    res.render("content/registerAdm", {
        title: 'Registrar-se',
        error: req.query.error || null
    });
};

exports.postRegister = async (req, res) => {
    const { admin, email, etec, password } = req.body;

    try {
        // Gera o token de aprovação
        const approvalToken = generateToken();

        // Cria o usuário no banco com o token
        const user = await adminService.createUser(admin, email, etec, password, approvalToken);

        // Envia o e-mail de aprovação para o administrador
        await sendRegistrationApprovalEmail(user);  // Corrigir nome da função

        res.redirect('/loginAdm?isRegister=true');
    } catch (error) {
        console.error("Erro ao registrar administrador:", error.message);
        res.redirect('/registerAdm?error=unknown');
    }
};




exports.approveUser = async (req, res) => {
    const { token } = req.params;

    try {
        // Use findFirst() para buscar o usuário pelo approvalToken
        const user = await prisma.admin.findFirst({
            where: { approvalToken: token }, // Buscando pelo approvalToken
        });

        // Se o usuário não for encontrado, retorne um erro
        if (!user) {
            return res.status(404).send("Usuário não encontrado.");
        }

        // Atualize o usuário aprovando e removendo o approvalToken
        const updatedUser = await prisma.admin.update({
            where: { id: user.id }, // Usando o id para atualização
            data: { approved: true, approvalToken: null },
        });

        res.send(`<h3>O usuário ${updatedUser.admin} foi aprovado com sucesso.</h3>`);
    } catch (error) {
        console.error("Erro ao aprovar usuário:", error.message);
        res.status(500).send("Erro ao aprovar usuário.");
    }
};


exports.rejectUser = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await prisma.user.delete({
            where: { approvalToken: token },
        });

        res.send(`<h3>O usuário ${user.name} foi rejeitado com sucesso.</h3>`);
    } catch (error) {
        console.error("Erro ao rejeitar usuário:", error.message);
        res.status(500).send("Erro ao rejeitar usuário.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao encerrar sessão:", err);
            return res.redirect("/tasks");
        }
        res.redirect("/loginAdm");
    });
};
