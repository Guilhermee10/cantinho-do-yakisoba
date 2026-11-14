import { formatarPreco } from "./formatarPreco.js"

export const formasDeRecebimento = [
  { id: "entrega", rotulo: "Entrega" },
  { id: "retirada", rotulo: "Retirar na loja" },
]

export const formasDePagamento = [
  { id: "pix", rotulo: "Pix" },
  { id: "cartao", rotulo: "Cartão" },
  { id: "dinheiro", rotulo: "Dinheiro" },
]

export function calcularTotal(carrinho) {
  return carrinho.reduce((soma, item) => soma + item.quantidade * item.preco, 0)
}

// Confere o que falta preencher. Devolve um objeto só com os campos
// que têm problema: { nome: "Digite seu nome." }. Objeto vazio = tudo certo.
export function validarPedido({ nome, recebimento, endereco, pagamento }) {
  const erros = {}
  if (!recebimento) erros.recebimento = "Escolha entrega ou retirada."
  if (nome.trim().length < 2) erros.nome = "Digite seu nome."
  if (recebimento === "entrega" && endereco.trim().length < 5) {
    erros.endereco = "Digite seu endereço completo."
  }
  if (!pagamento) erros.pagamento = "Escolha a forma de pagamento."
  return erros
}

// Função pura: recebe os dados do pedido e devolve o texto do WhatsApp.
// Não lê estado nem abre janela, por isso dá para testar sem navegador.
export function montarMensagem({ carrinho, nome, recebimento, endereco, pagamento, troco }) {
  const linhas = carrinho.map((item) => {
    const detalhe = item.detalhe ? ` (${item.detalhe})` : ""
    const subtotal = formatarPreco(item.quantidade * item.preco)
    return `• ${item.quantidade}x ${item.nome}${detalhe} — ${subtotal}`
  })

  const rotuloPagamento = formasDePagamento.find((f) => f.id === pagamento)?.rotulo ?? ""
  const textoTroco =
    pagamento === "dinheiro" && troco.trim() ? ` (troco para ${troco.trim()})` : ""

  const linhaRecebimento =
    recebimento === "entrega" ? `Entrega: ${endereco.trim()}` : "Retirada na loja"

  return [
    `Olá! Meu nome é ${nome.trim()} e quero fazer o pedido:`,
    "",
    ...linhas,
    "",
    `Total: ${formatarPreco(calcularTotal(carrinho))}`,
    `Pagamento: ${rotuloPagamento}${textoTroco}`,
    linhaRecebimento,
  ].join("\n")
}
