<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Campo Minado - HTML & CSS Fácil</title>
<style>
:root {
--grid-gap: 8px;
--background-color: #212529;
--cell-color-initial: #6c757d;
--cell-color-named-html: #e34f26; /* Laranja HTML */
--cell-color-named-css: #007acc; /* Azul CSS */
--cell-color-revealed: #ffffff;
--text-color-light: #ffffff;
--text-color-dark: #000000;
--border-color: #dee2e6;
--border-radius: 8px;
}

body {
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
background-color: var(--background-color);
margin: 0;
padding: 20px;
box-sizing: border-box;
}

h1 {
color: #f8f9fa;
margin-bottom: 20px;
text-align: center;
}

.grid-container {
display: grid;
width: 100%;
max-width: 1400px;
grid-template-columns: repeat(10, 1fr);
gap: var(--grid-gap);
}

.cell {
aspect-ratio: 1 / 1;
width: 100%;
border-radius: var(--border-radius);
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
font-weight: bold;
padding: 5px;
box-sizing: border-box;
transition: transform 0.3s ease, background-color 0.3s, color 0.3s;
user-select: none;
background-color: var(--cell-color-initial);
color: var(--text-color-light);
font-size: clamp(14px, 3vw, 24px);
}

.cell:not(.revealed):hover {
transform: scale(1.05);
z-index: 10;
}

.cell.named.type-html {
background-color: var(--cell-color-named-html);
}

.cell.named.type-css {
background-color: var(--cell-color-named-css);
}

.cell.named {
color: var(--text-color-light);
font-size: clamp(10px, 1.6vw, 16px);
word-break: break-word;
}

.cell.revealed {
background-color: var(--cell-color-revealed);
color: var(--text-color-dark);
border: 1px solid var(--border-color);
font-weight: normal;
cursor: default;
justify-content: center;
align-items: center;
padding: 8px;
font-size: clamp(9px, 1.2vw, 14px);
line-height: 1.2;
}
</style>
</head>
<body>

<h1>Campo Minado: HTML & CSS (Básico)</h1>
<div class="grid-container" id="minefield"></div>

<script>
const minefield = document.getElementById('minefield');

// Lista com termos simplificados e fáceis de lembrar
const items = [
// --- 25 TAGS HTML MAIS FÁCEIS ---
{ type: 'html', name: '<html>', answer: 'Começa e fecha todo o documento do site.' },
{ type: 'html', name: '<head>', answer: 'Guarda as configurações ocultas e o título da aba.' },
{ type: 'html', name: '<title>', answer: 'Define o nome que aparece na aba do navegador.' },
{ type: 'html', name: '<body>', answer: 'Guarda toda a parte visível do site (textos, imagens).' },
{ type: 'html', name: '<h1>', answer: 'Título principal da página (o maior de todos).' },
{ type: 'html', name: '<h2>', answer: 'Subtítulo para organizar o texto.' },
{ type: 'html', name: '<h3>', answer: 'Título de terceira importância.' },
{ type: 'html', name: '<p>', answer: 'Usado para escrever parágrafos de texto.' },
{ type: 'html', name: '<a>', answer: 'Cria um link para clicar e ir para outro site.' },
{ type: 'html', name: '<img>', answer: 'Usado para colocar uma imagem no site.' },
{ type: 'html', name: '<button>', answer: 'Cria um botão simples que pode ser clicado.' },
{ type: 'html', name: '<ul>', answer: 'Cria uma lista com bolinhas (não numerada).' },
{ type: 'html', name: '<ol>', answer: 'Cria uma lista numerada (1, 2, 3...).' },
{ type: 'html', name: '<li>', answer: 'É o item de uma lista (vai dentro do ul ou ol).' },
{ type: 'html', name: '<div>', answer: 'Uma caixa genérica para organizar elementos em bloco.' },
{ type: 'html', name: '<span>', answer: 'Uma caixinha em linha usada para pintar ou mudar só uma palavra.' },
{ type: 'html', name: '<br>', answer: 'Quebra a linha do texto (pula para a linha de baixo).' },
{ type: 'html', name: '<hr>', answer: 'Desenha uma linha horizontal reta na tela.' },
{ type: 'html', name: '<b>', answer: 'Deixa o texto em negrito (grosso).' },
{ type: 'html', name: '<i>', answer: 'Deixa o texto em itálico (inclinado).' },
{ type: 'html', name: '<form>', answer: 'Cria uma área de formulário para o usuário preencher.' },
{ type: 'html', name: '<input>', answer: 'Caixa de texto para o usuário digitar dados.' },
{ type: 'html', name: '<header>', answer: 'O topo ou cabeçalho principal do site.' },
{ type: 'html', name: '<footer>', answer: 'O rodapé (a parte final lá embaixo na página).' },
{ type: 'html', name: '<video>', answer: 'Usado para colocar um player de vídeo na página.' },

// --- 25 PROPRIEDADES CSS MAIS FÁCEIS ---
{ type: 'css', name: 'color', answer: 'Muda a cor das letras do texto.' },
{ type: 'css', name: 'background-color', answer: 'Muda a cor do fundo de uma caixa ou da página.' },
{ type: 'css', name: 'font-size', answer: 'Aumenta ou diminui o tamanho da letra.' },
{ type: 'css', name: 'font-family', answer: 'Muda o estilo/tipo da letra (ex: Arial).' },
{ type: 'css', name: 'font-weight', answer: 'Controla a grossura da letra (deixa em negrito).' },
{ type: 'css', name: 'text-align', answer: 'Alinha o texto no centro, esquerda ou direita.' },
{ type: 'css', name: 'text-decoration', answer: 'Coloca ou tira riscos do texto (como sublinhado).' },
{ type: 'css', name: 'width', answer: 'Define a largura de uma imagem ou caixa.' },
{ type: 'css', name: 'height', answer: 'Define a altura de uma imagem ou caixa.' },
{ type: 'css', name: 'border', answer: 'Coloca uma borda (linha ao redor da caixa).' },
{ type: 'css', name: 'border-radius', answer: 'Arredonda os cantos de uma caixa ou botão.' },
{ type: 'css', name: 'margin', answer: 'Empurra o elemento para longe dos outros (espaço fora).' },
{ type: 'css', name: 'padding', answer: 'Dá espaço entre o texto e a borda (espaço dentro).' },
{ type: 'css', name: 'display', answer: 'Muda o comportamento do bloco (como flex ou none para sumir).' },
{ type: 'css', name: 'cursor', answer: 'Muda o desenho da setinha do mouse (ex: virar a mãozinha).' },
{ type: 'css', name: 'opacity', answer: 'Deixa as coisas transparentes.' },
{ type: 'css', name: 'box-shadow', answer: 'Coloca uma sombra ao redor da caixa.' },
{ type: 'css', name: 'text-shadow', answer: 'Coloca uma sombra atrás das letras do texto.' },
{ type: 'css', name: 'background-image', answer: 'Coloca uma foto como papel de parede de fundo.' },
{ type: 'css', name: 'line-height', answer: 'Aumenta o espaço entre as linhas de um parágrafo.' },
{ type: 'css', name: 'list-style', answer: 'Tira ou muda as bolinhas de uma lista.' },
{ type: 'css', name: 'letter-spacing', answer: 'Aumenta o espaço entre cada letra da palavra.' },
{ type: 'css', name: 'max-width', answer: 'Define o tamanho máximo que uma caixa pode abrir.' },
{ type: 'css', name: 'gap', answer: 'Cria espaço automático entre itens usando flex/grid.' },
{ type: 'css', name: 'transition', answer: 'Faz as cores mudarem de forma suave e lenta.' }
];

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
}

shuffle(items);

items.forEach((item, index) => {
const cell = document.createElement('div');
cell.classList.add('cell');
cell.textContent = index + 1;
cell.dataset.name = item.name;
cell.dataset.answer = item.answer;
cell.dataset.type = item.type;

cell.addEventListener('click', function() {
if (this.classList.contains('revealed')) return;

if (this.classList.contains('named')) {
this.classList.remove('named', 'type-html', 'type-css');
this.classList.add('revealed');
this.textContent = this.dataset.answer;
return;
}

this.classList.add('named', `type-${this.dataset.type}`);
this.textContent = this.dataset.name;
});

minefield.appendChild(cell);
});
</script>

</body>
</html>
