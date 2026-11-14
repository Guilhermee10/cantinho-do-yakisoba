import { useEffect, useState } from 'react'
import {
  adicionarItem,
  calcularQuantidade,
  calcularTotal,
  ehCarrinhoValido,
  removerUmItem,
} from '../utils/carrinho'

// O "v2" faz parte do nome de propósito: se o formato dos itens mudar
// no futuro, troca-se para "v3" e os carrinhos antigos são ignorados.
const CHAVE_ARMAZENAMENTO = "cantinho-yakisoba:carrinho:v2"

function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO))
    return ehCarrinhoValido(salvo) ? salvo : []
  } catch {
    // JSON inválido ou localStorage bloqueado (aba anônima, por exemplo).
    return []
  }
}

// Hook customizado: junta o estado do carrinho, as ações e os totais
// num lugar só. Quem usa não precisa saber que existe localStorage.
export function useCarrinho() {
  // Passar a FUNÇÃO (sem parênteses) faz o React chamá-la só na
  // primeira renderização, e não a cada vez que o componente redesenha.
  const [carrinho, setCarrinho] = useState(carregarCarrinho)

  // Salva sempre que o carrinho mudar.
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(carrinho))
    } catch {
      // Sem armazenamento disponível o site continua funcionando,
      // só não lembra o pedido ao recarregar.
    }
  }, [carrinho])

  function adicionar(item) {
    setCarrinho((atual) => adicionarItem(atual, item))
  }

  function removerUm(chave) {
    setCarrinho((atual) => removerUmItem(atual, chave))
  }

  function limpar() {
    setCarrinho([])
  }

  return {
    carrinho,
    adicionar,
    removerUm,
    limpar,
    quantidadeTotal: calcularQuantidade(carrinho),
    valorTotal: calcularTotal(carrinho),
  }
}
