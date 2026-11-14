import { describe, it, expect } from "vitest"
import { montarMensagem, validarPedido } from "./montarMensagem.js"
import { formatarPreco } from "./formatarPreco.js"

const carrinho = [
  { chave: "especial-grande", nome: "Yakisoba Especial", detalhe: "Grande · 1,2 kg", preco: 53, quantidade: 1 },
  { chave: "refri-1l-Coca-Cola", nome: "Refrigerante 1 L", detalhe: "Coca-Cola", preco: 10, quantidade: 2 },
  { chave: "suco", nome: "Suco da fruta", detalhe: "", preco: 12, quantidade: 1 },
]

// Pedido válido de base. Cada teste troca só o campo que interessa.
const pedido = {
  carrinho,
  nome: "João",
  recebimento: "entrega",
  endereco: "Rua X, 123",
  pagamento: "pix",
  troco: "",
}

describe("montarMensagem", () => {
  it("começa com o nome do cliente", () => {
    expect(montarMensagem(pedido)).toContain("Meu nome é João")
  })

  it("lista cada item com quantidade, detalhe e subtotal", () => {
    const mensagem = montarMensagem(pedido)

    expect(mensagem).toContain(`• 1x Yakisoba Especial (Grande · 1,2 kg) — ${formatarPreco(53)}`)
    expect(mensagem).toContain(`• 2x Refrigerante 1 L (Coca-Cola) — ${formatarPreco(20)}`)
  })

  it("não coloca parênteses vazios em item sem detalhe", () => {
    const mensagem = montarMensagem(pedido)

    expect(mensagem).toContain(`• 1x Suco da fruta — ${formatarPreco(12)}`)
    expect(mensagem).not.toContain("()")
  })

  it("mostra o total do pedido", () => {
    expect(montarMensagem(pedido)).toContain(`Total: ${formatarPreco(85)}`)
  })

  it("mostra o endereço quando é entrega", () => {
    expect(montarMensagem(pedido)).toContain("Entrega: Rua X, 123")
  })

  it("mostra retirada na loja e não mostra endereço", () => {
    const mensagem = montarMensagem({ ...pedido, recebimento: "retirada" })

    expect(mensagem).toContain("Retirada na loja")
    expect(mensagem).not.toContain("Rua X, 123")
  })

  it("mostra o troco quando o pagamento é em dinheiro", () => {
    const mensagem = montarMensagem({ ...pedido, pagamento: "dinheiro", troco: "R$ 100,00" })

    expect(mensagem).toContain("Pagamento: Dinheiro (troco para R$ 100,00)")
  })

  it("ignora o troco quando o pagamento não é em dinheiro", () => {
    const mensagem = montarMensagem({ ...pedido, pagamento: "pix", troco: "R$ 100,00" })

    expect(mensagem).toContain("Pagamento: Pix")
    expect(mensagem).not.toContain("troco")
  })

  it("não fala de troco quando o campo fica vazio", () => {
    const mensagem = montarMensagem({ ...pedido, pagamento: "dinheiro", troco: "   " })

    expect(mensagem).not.toContain("troco")
  })

  it("tira os espaços sobrando do nome e do endereço", () => {
    const mensagem = montarMensagem({ ...pedido, nome: "  João  ", endereco: "  Rua X, 123  " })

    expect(mensagem).toContain("Meu nome é João e")
    expect(mensagem).toContain("Entrega: Rua X, 123")
  })
})

describe("validarPedido", () => {
  it("não aponta erro num pedido completo", () => {
    expect(validarPedido(pedido)).toEqual({})
  })

  it("aponta todos os campos que faltam de uma vez", () => {
    const erros = validarPedido({ nome: "", recebimento: null, endereco: "", pagamento: null })

    expect(Object.keys(erros).sort()).toEqual(["nome", "pagamento", "recebimento"])
  })

  it("exige endereço na entrega", () => {
    const erros = validarPedido({ ...pedido, endereco: "" })

    expect(Object.keys(erros)).toEqual(["endereco"])
  })

  it("não exige endereço na retirada", () => {
    expect(validarPedido({ ...pedido, recebimento: "retirada", endereco: "" })).toEqual({})
  })

  it("não aceita nome só com espaços", () => {
    expect(Object.keys(validarPedido({ ...pedido, nome: "   " }))).toEqual(["nome"])
  })
})
