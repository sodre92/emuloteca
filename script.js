document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona os elementos. Usando querySelectorAll para ser mais robusto se houver mais de um.
    const inputBusca = document.querySelector('.input-busca');
    const botaoBusca = document.querySelector('.botao-busca');
    const listaDownloads = document.querySelector('.lista-downloads');

    // Verifica se os elementos necessários existem na página atual (ex: uma página de catálogo)
    if (!inputBusca || !listaDownloads) {
        // Se a busca não existe (ex: na página index.html ou guias.html), a função sai.
        return; 
    }

    // 2. Função principal que filtra os cards
    const filtrarDownloads = () => {
        // Converte o texto de busca para minúsculas. 
        // Se o campo estiver vazio, 'termoBusca' será uma string vazia ('').
        const termoBusca = inputBusca.value.toLowerCase();
        
        // Seleciona todos os cards de download na página
        const downloadCards = listaDownloads.querySelectorAll('.download-card');

        downloadCards.forEach(card => {
            // Pega o título do jogo dentro do card (tag h4)
            const tituloJogo = card.querySelector('h4').textContent.toLowerCase();

            // Verifica se o título do jogo inclui o termo de busca.
            // Se termoBusca for '', isso é sempre true, restaurando a lista.
            if (tituloJogo.includes(termoBusca)) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 3. Adiciona ouvintes de evento
    
    // A. Filtrar ao digitar (melhor experiência do usuário). 
    // Isto também trata a restauração quando o input fica vazio.
    inputBusca.addEventListener('keyup', filtrarDownloads);
    inputBusca.addEventListener('input', filtrarDownloads); // Adicionado 'input' para capturar mudanças que não sejam teclas (colar, autofill)

    // B. Filtrar ao clicar no botão
    botaoBusca.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão
        filtrarDownloads();
    });

    // C. Filtrar se o usuário usar o botão Enter
    inputBusca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            filtrarDownloads();
        }
    });
});
