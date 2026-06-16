const board = document.getElementById("board");

// 25 tags HTML + explicação simples
const items = [
  { tag: "html", desc: "Raiz do documento HTML" },
  { tag: "head", desc: "Configurações da página" },
  { tag: "body", desc: "Conteúdo visível da página" },
  { tag: "title", desc: "Título da aba do navegador" },
  { tag: "meta", desc: "Metadados da página" },

  { tag: "h1", desc: "Título principal" },
  { tag: "h2", desc: "Subtítulo" },
  { tag: "p", desc: "Parágrafo de texto" },
  { tag: "div", desc: "Bloco genérico" },
  { tag: "span", desc: "Texto em linha" },

  { tag: "button", desc: "Botão clicável" },
  { tag: "a", desc: "Link de navegação" },
  { tag: "img", desc: "Imagem" },
  { tag: "ul", desc: "Lista não ordenada" },
  { tag: "li", desc: "Item da lista" },

  { tag: "form", desc: "Formulário" },
  { tag: "input", desc: "Campo de entrada" },
  { tag: "label", desc: "Rótulo de formulário" },
  { tag: "table", desc: "Tabela" },
  { tag: "tr", desc: "Linha da tabela" },

  { tag: "td", desc: "Coluna da tabela" },
  { tag: "header", desc: "Cabeçalho da página" },
  { tag: "footer", desc: "Rodapé" },
  { tag: "section", desc: "Seção da página" },
  { tag: "article", desc: "Conteúdo independente" }
];

// embaralhar
items.sort(() => Math.random() - 0.5);

items.forEach((item, i) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.dataset.tag = item.tag;
  cell.dataset.desc = item.desc;

  cell.dataset.state = "hidden"; // hidden -> tag -> answer

  cell.textContent = i + 1;

  cell.addEventListener("click", () => {

    // 1º clique → mostra TAG
    if (cell.dataset.state === "hidden") {
      cell.classList.add("show-tag");
      cell.textContent = item.tag;
      cell.dataset.state = "tag";
    }

    // 2º clique → mostra RESPOSTA
    else if (cell.dataset.state === "tag") {
      cell.classList.remove("show-tag");
      cell.classList.add("show-answer");
      cell.textContent = item.desc;
      cell.dataset.state = "answer";
    }

  });

  board.appendChild(cell);
});