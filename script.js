document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona o campo de busca e o botão
    const inputBusca = document.querySelector('.input-busca');
    const botaoBusca = document.querySelector('.botao-busca');
    const listaDownloads = document.querySelector('.lista-downloads');

    // Verifica se os elementos existem na página atual (pode ser a index ou downloads)
    if (!inputBusca || !listaDownloads) {
        // Se a busca não existe (ex: na página index.html), a função não faz nada.
        return; 
    }

    // 2. Função principal que filtra os cards
    const filtrarDownloads = () => {
        // Converte o texto de busca para minúsculas
        const termoBusca = inputBusca.value.toLowerCase();
        
        // Seleciona todos os cards de download na página
        const downloadCards = listaDownloads.querySelectorAll('.download-card');

        downloadCards.forEach(card => {
            // Pega o título do jogo dentro do card (tag h4)
            const tituloJogo = card.querySelector('h4').textContent.toLowerCase();

            // Verifica se o título do jogo inclui o termo de busca
            if (tituloJogo.includes(termoBusca)) {
                // Se incluir, mostra o card
                card.style.display = 'flex'; // Volta ao display flex original
            } else {
                // Se não incluir, esconde o card
                card.style.display = 'none';
            }
        });
    };

    // 3. Adiciona ouvintes de evento
    
    // A. Filtrar ao digitar (melhor experiência do usuário)
    inputBusca.addEventListener('keyup', filtrarDownloads);

    // B. Filtrar ao clicar no botão (também necessário para compatibilidade)
    botaoBusca.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão
        filtrarDownloads();
    });

    // C. Filtrar se o usuário usar o botão Enter (opcional, mas bom)
    inputBusca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filtrarDownloads();
        }
    });

    // D. Limpar busca: se o input ficar vazio, restaura todos os cards
    inputBusca.addEventListener('input', () => {
        if (inputBusca.value === '') {
            filtrarDownloads(); // Chama a função para restaurar a lista
        }
    });
});
