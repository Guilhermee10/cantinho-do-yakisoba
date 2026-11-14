import { describe, it, expect } from "vitest"
import {
  adicionarItem,
  removerUmItem,
  calcularQuantidade,
  calcularTotal,
  ehCarrinhoValido,
} from "./carrinho.js"

const especialMini = { chave: "especial-mini", nome: "Yakisoba Especial", detalhe: "Mini · 700 g", preco: 41 }
const especialGrande = { chave: "especial-grande", nome: "Yakisoba Especial", detalhe: "Grande · 1,2 kg", preco: 53 }

describe("adicionarItem", () => {
  it("cria uma linha com quantidade 1 quando o item ainda não está no carrinho", () => {
    const carrinho = adicionarItem([], especialMini)

    expect(carrinho).toHaveLength(1)
    expect(carrinho[0].quantidade).toBe(1)
  })

  it("aumenta a quantidade quando o item já está no carrinho", () => {
    const carrinho = adicionarItem(adicionarItem([], especialMini), especialMini)

    expect(carrinho).toHaveLength(1)
    expect(carrinho[0].quantidade).toBe(2)
  })

  it("trata o mesmo sabor em tamanhos diferentes como linhas separadas", () => {
    const carrinho = adicionarItem(adicionarItem([], especialMini), especialGrande)

    expect(carrinho.map((item) => item.chave)).toEqual(["especial-mini", "especial-grande"])
  })

  it("não altera o carrinho original", () => {
    const original = [{ ...especialMini, quantidade: 1 }]

    adicionarItem(original, especialMini)

    expect(original).toEqual([{ ...especialMini, quantidade: 1 }])
  })
})

describe("removerUmItem", () => {
  it("diminui a quantidade em 1", () => {
    const carrinho = removerUmItem([{ ...especialMini, quantidade: 3 }], "especial-mini")

    expect(carrinho[0].quantidade).toBe(2)
  })

  it("remove a linha quando a quantidade chega a zero", () => {
    const carrinho = removerUmItem([{ ...especialMini, quantidade: 1 }], "especial-mini")

    expect(carrinho).toEqual([])
  })

  it("não muda nada quando a chave não existe", () => {
    const original = [{ ...especialMini, quantidade: 2 }]

    expect(removerUmItem(original, "nao-existe")).toEqual(original)
  })
})

describe("totais", () => {
  const carrinho = [
    { ...especialMini, quantidade: 2 },
    { ...especialGrande, quantidade: 1 },
  ]

  it("soma as quantidades de todas as linhas", () => {
    expect(calcularQuantidade(carrinho)).toBe(3)
  })

  it("soma quantidade x preço de todas as linhas", () => {
    expect(calcularTotal(carrinho)).toBe(135)
  })

  it("devolve zero para o carrinho vazio", () => {
    expect(calcularQuantidade([])).toBe(0)
    expect(calcularTotal([])).toBe(0)
  })
})

describe("ehCarrinhoValido", () => {
  it("aceita um carrinho bem formado e o carrinho vazio", () => {
    expect(ehCarrinhoValido([{ ...especialMini, quantidade: 1 }])).toBe(true)
    expect(ehCarrinhoValido([])).toBe(true)
  })

  it("rejeita o que não é uma lista", () => {
    expect(ehCarrinhoValido(null)).toBe(false)
    expect(ehCarrinhoValido("abc")).toBe(false)
    expect(ehCarrinhoValido({})).toBe(false)
  })

  it("rejeita itens no formato antigo, sem chave", () => {
    expect(ehCarrinhoValido([{ id: 1, nome: "Yakisoba", preco: 46, quantidade: 1 }])).toBe(false)
  })

  it("rejeita quantidade zero, negativa ou quebrada", () => {
    expect(ehCarrinhoValido([{ ...especialMini, quantidade: 0 }])).toBe(false)
    expect(ehCarrinhoValido([{ ...especialMini, quantidade: -1 }])).toBe(false)
    expect(ehCarrinhoValido([{ ...especialMini, quantidade: 1.5 }])).toBe(false)
  })
})
