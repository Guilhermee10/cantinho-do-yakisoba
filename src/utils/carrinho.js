// Regras do carrinho como funções puras: recebem o carrinho atual e
// devolvem um carrinho NOVO, sem alterar o que receberam. Não dependem
// do React, então dá para testar cada regra sem abrir o site.

// Cada linha é identificada pela "chave" (produto + tamanho ou sabor):
// Especial Mini e Especial Grande são linhas diferentes.
export function adicionarItem(carrinho, novoItem) {
  const jaExiste = carrinho.some((item) => item.chave === novoItem.chave)

  if (jaExiste) {
    return carrinho.map((item) =>
      item.chave === novoItem.chave
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    )
  }

  return [...carrinho, { ...novoItem, quantidade: 1 }]
}

// Diminui 1 da linha; se chegar a zero, a linha sai do carrinho.
export function removerUmItem(carrinho, chave) {
  return carrinho
    .map((item) =>
      item.chave === chave ? { ...item, quantidade: item.quantidade - 1 } : item
    )
    .filter((item) => item.quantidade > 0)
}

export function calcularQuantidade(carrinho) {
  return carrinho.reduce((soma, item) => soma + item.quantidade, 0)
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((soma, item) => soma + item.quantidade * item.preco, 0)
}

// Confere se o que veio do armazenamento tem o formato de um carrinho.
// O localStorage pode ter sido editado, corrompido ou salvo por uma
// versão antiga do site, então nunca confiamos nele sem checar.
export function ehCarrinhoValido(valor) {
  return (
    Array.isArray(valor) &&
    valor.every(
      (item) =>
        item &&
        typeof item.chave === "string" &&
        typeof item.nome === "string" &&
        typeof item.preco === "number" &&
        Number.isInteger(item.quantidade) &&
        item.quantidade > 0
    )
  )
}
