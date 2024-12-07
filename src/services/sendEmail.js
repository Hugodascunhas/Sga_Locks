const nodemailer = require('nodemailer');

// Configuração do transporte para envio de e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Carrega do arquivo .env
    pass: process.env.EMAIL_PASS,  // Carrega do arquivo .env
  },
});

// Função para enviar e-mail de confirmação de registro
const sendConfirmationEmail = (to, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmação de Registro',
    html: `<h3>Bem-vindo ao nosso sistema! Clique no link abaixo para confirmar seu e-mail:</h3>
           <a href="${process.env.APP_URL}/confirm/${token}">Confirmar E-mail</a>`,
  };

  return transporter.sendMail(mailOptions);
};

// Função para enviar e-mail de recuperação de senha
const sendPasswordResetEmail = (to, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Recuperação de Senha',
    html: `<h3>Para redefinir sua senha, clique no link abaixo:</h3>
           <a href="${process.env.APP_URL}/reset-password/${token}">Redefinir Senha</a>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail, sendPasswordResetEmail };
