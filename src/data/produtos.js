import { formatarPreco } from "../utils/formatarPreco.js"

// Tamanhos em que todo yakisoba é vendido.
// Antes havia 8 produtos (4 sabores x 2 tamanhos) escritos um a um;
// agora o sabor é o produto e o tamanho é uma opção dele.
export const tamanhos = {
  mini: { rotulo: "Mini", peso: "700 g" },
  grande: { rotulo: "Grande", peso: "1,2 kg" },
}

export const yakisobas = [
  {
    id: "tradicional",
    nome: "Tradicional",
    nomeCompleto: "Yakisoba Tradicional",
    descricao: "Carne e frango, com legumes e o molho da casa.",
    precos: { mini: 34.0, grande: 46.0 },
    imagem: "/assets/yakisoba-tradicional.jpg",
  },
  {
    id: "especial",
    nome: "Especial",
    nomeCompleto: "Yakisoba Especial",
    descricao: "O tradicional com camarão: carne, frango, camarão e legumes.",
    precos: { mini: 41.0, grande: 53.0 },
    imagem: "/assets/yakisoba-especial.jpg",
  },
  {
    id: "especial-da-casa",
    nome: "Especial da casa",
    nomeCompleto: "Yakisoba Especial da casa",
    descricao: "Carne, frango, camarão, lula e ovo de codorna. Tem de tudo.",
    precos: { mini: 48.0, grande: 64.0 },
    imagem: "/assets/yakisoba-especial-da-casa.jpg",
  },
  {
    id: "camarao",
    nome: "Camarão",
    nomeCompleto: "Yakisoba de Camarão",
    descricao: "Camarão bem temperado com legumes.",
    precos: { mini: 46.0, grande: 60.0 },
    imagem: "/assets/yakisoba-camarao.jpg",
  },
]

export const bebidas = [
  {
    id: "refri-1l",
    nome: "Refrigerante 1 L",
    descricao: "Garrafa de 1 litro.",
    preco: 10.0,
    sabores: ["Coca-Cola", "Fanta", "Kuat"],
    imagem: "/assets/coca-cola-1-litro.jpg",
  },
  {
    id: "refri-lata",
    nome: "Refrigerante lata",
    descricao: "Em lata.",
    preco: 6.0,
    sabores: ["Coca-Cola", "Fanta", "Kuat"],
    imagem: "/assets/refri-1.png",
  },
  {
    id: "suco",
    nome: "Suco da fruta",
    descricao: "O sabor você combina com a loja no WhatsApp.",
    preco: 12.0,
    imagem: "/assets/suco1.webp",
  },
]

// Produto que aparece no destaque acima do cardápio.
export const destaque = {
  idProduto: "especial",
  selo: "Favorito da casa",
}

// Transforma "produto + tamanho" num item de carrinho.
// A chave identifica a linha do pedido: o mesmo sabor em tamanhos
// diferentes vira duas linhas ("especial-mini" e "especial-grande").
export function criarItemYakisoba(produto, tamanho) {
  const { rotulo, peso } = tamanhos[tamanho]
  return {
    chave: `${produto.id}-${tamanho}`,
    idProduto: produto.id,
    nome: produto.nomeCompleto,
    detalhe: `${rotulo} · ${peso}`,
    preco: produto.precos[tamanho],
  }
}

// O sabor entra na chave pelo mesmo motivo do tamanho: Coca e Fanta
// são linhas diferentes do pedido. Bebida sem sabores usa só o id.
export function criarItemBebida(produto, sabor = null) {
  return {
    chave: sabor ? `${produto.id}-${sabor}` : produto.id,
    idProduto: produto.id,
    nome: produto.nome,
    detalhe: sabor ?? "",
    preco: produto.preco,
  }
}

// Monta as opções de tamanho de um yakisoba no formato do SeletorOpcoes.
export function opcoesDeTamanho(produto) {
  return Object.entries(tamanhos).map(([id, { rotulo, peso }]) => ({
    id,
    rotulo: `${rotulo} · ${peso}`,
    valor: formatarPreco(produto.precos[id]),
  }))
}
