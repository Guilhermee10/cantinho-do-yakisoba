import { describe, it, expect } from "vitest"
import {
  yakisobas,
  bebidas,
  destaque,
  tamanhos,
  criarItemYakisoba,
  criarItemBebida,
  opcoesDeTamanho,
} from "./produtos.js"

const especial = yakisobas.find((produto) => produto.id === "especial")
const refrigerante = bebidas.find((produto) => produto.sabores)
const semSabor = bebidas.find((produto) => !produto.sabores)

describe("criarItemYakisoba", () => {
  it("monta a chave com produto e tamanho", () => {
    expect(criarItemYakisoba(especial, "mini").chave).toBe("especial-mini")
    expect(criarItemYakisoba(especial, "grande").chave).toBe("especial-grande")
  })

  it("usa o preço do tamanho escolhido", () => {
    expect(criarItemYakisoba(especial, "mini").preco).toBe(especial.precos.mini)
    expect(criarItemYakisoba(especial, "grande").preco).toBe(especial.precos.grande)
  })

  it("descreve o tamanho no detalhe", () => {
    expect(criarItemYakisoba(especial, "grande").detalhe).toBe("Grande · 1,2 kg")
  })
})

describe("criarItemBebida", () => {
  it("inclui o sabor na chave e no detalhe", () => {
    const item = criarItemBebida(refrigerante, "Fanta")

    expect(item.chave).toBe(`${refrigerante.id}-Fanta`)
    expect(item.detalhe).toBe("Fanta")
  })

  it("usa só o id quando a bebida não tem sabores", () => {
    const item = criarItemBebida(semSabor)

    expect(item.chave).toBe(semSabor.id)
    expect(item.detalhe).toBe("")
  })
})

describe("opcoesDeTamanho", () => {
  it("devolve uma opção por tamanho, na ordem do cardápio", () => {
    expect(opcoesDeTamanho(especial).map((opcao) => opcao.id)).toEqual(["mini", "grande"])
  })
})

// Testes do DADO: pegam erro de digitação no cardápio antes do cliente.
describe("cardápio", () => {
  it("não tem ids repetidos", () => {
    const ids = [...yakisobas, ...bebidas].map((produto) => produto.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it("todo yakisoba tem preço maior que zero em todos os tamanhos", () => {
    for (const produto of yakisobas) {
      for (const tamanho of Object.keys(tamanhos)) {
        expect(produto.precos[tamanho]).toBeGreaterThan(0)
      }
    }
  })

  it("o grande nunca é mais barato que o mini", () => {
    for (const produto of yakisobas) {
      expect(produto.precos.grande).toBeGreaterThan(produto.precos.mini)
    }
  })

  it("o destaque aponta para um yakisoba que existe", () => {
    expect(yakisobas.some((produto) => produto.id === destaque.idProduto)).toBe(true)
  })
})
