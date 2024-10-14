const API_KEY = "AIzaSyB-BZicHWUgPzWriX8DhEf4Ap4x6lrNB3o"; // Sua chave de API válida
        const API_URL = `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=${API_KEY}`;

        async function run() {
            const promptText = document.getElementById('prompt').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}` // Pode ser necessário se autenticar de maneira diferente
                    },
                    body: JSON.stringify({
                        prompt: {
                            text: promptText
                        },
                        temperature: 0.7,
                        maxOutputTokens: 256
                    })
                });

                const result = await response.json();

                if (result && result.candidates && result.candidates.length > 0) {
                    const generatedText = result.candidates[0].output;
                    document.getElementById('resposta').value = generatedText;
                    console.log(generatedText);
                } else {
                    throw new Error("Nenhuma resposta válida foi gerada pela API.");
                }

            } catch (error) {
                console.error("Erro ao gerar conteúdo: ", error);
                document.getElementById('resposta').value = "Erro ao gerar resposta. Tente novamente.";
            }
        }

        // Exponha a função run no escopo global
        window.run = run;