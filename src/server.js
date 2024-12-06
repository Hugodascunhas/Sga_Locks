const app = require('./app');
const PORT = process.env.PORT || 3000;

// Escutando em todas as interfaces de rede para permitir acesso na rede local
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
