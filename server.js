const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/chatcar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir esquema de conversa
const messageSchema = new mongoose.Schema({
    role: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint para enviar mensagem ao chatbot
app.post('/api/send-message', async (req, res) => {
    const { message } = req.body;

    // Adicionar mensagem do usuário ao histórico
    const userMessage = new Message({ role: 'user', content: message });
    await userMessage.save();

    // Aqui você chamaria a API do chatbot para obter a resposta
    const botResponseText = "Simulação de resposta do bot para: " + message;

    // Adicionar resposta do bot ao histórico
    const botMessage = new Message({ role: 'bot', content: botResponseText });
    await botMessage.save();

    res.json({ response: botResponseText });
});

// Endpoint para buscar respostas do chatbot
app.get('/api/get-response', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter respostas.' });
    }
});

// Endpoint para buscar histórico de conversas
app.get('/api/chat-history', async (req, res) => {
    try {
        const chatHistory = await Message.find().sort({ timestamp: -1 });
        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar histórico de conversas.' });
    }
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
