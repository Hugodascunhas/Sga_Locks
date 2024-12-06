const nodemailer = require('nodemailer');

// Configuração do transporte para envio de e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar e-mail de aprovação ao administrador
const sendRegistrationApprovalEmail = async (user) => {
  const approveUrl = `${process.env.APP_URL}/approve/${user.approvalToken}`;
  const rejectUrl = `${process.env.APP_URL}/reject/${user.approvalToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'Aprovação de Registro Necessária',
    html: `
      <h3>Um novo usuário solicitou registro:</h3>
      <p><strong>Nome:</strong> ${user.name}</p>
      <p><strong>E-mail:</strong> ${user.email}</p>
      <p><strong>ETEC:</strong> ${user.etec}</p>
      <p>Para aprovar o registro, clique <a href="${approveUrl}">aqui</a>.</p>
      <p>Para rejeitar o registro, clique <a href="${rejectUrl}">aqui</a>.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendRegistrationApprovalEmail };  // Correção do nome exportado
