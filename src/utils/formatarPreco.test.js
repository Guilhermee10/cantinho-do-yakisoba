import { describe, it, expect } from "vitest"
import { formatarPreco } from "./formatarPreco.js"

// O Intl.NumberFormat coloca um ESPAÇO NÃO SEPARÁVEL ( ) entre "R$" e o
// número, para o valor nunca quebrar de linha. Na tela é igual a um espaço
// comum, mas numa comparação de texto é outro caractere: "R$ 46,00" digitado
// com a barra de espaço NÃO é igual ao que a função devolve.
const NBSP = " "

describe("formatarPreco", () => {
  it("formata em reais com vírgula e duas casas", () => {
    expect(formatarPreco(46)).toBe(`R$${NBSP}46,00`)
  })

  it("mantém os centavos", () => {
    expect(formatarPreco(12.5)).toBe(`R$${NBSP}12,50`)
  })

  it("usa ponto como separador de milhar", () => {
    expect(formatarPreco(1234.5)).toBe(`R$${NBSP}1.234,50`)
  })

  it("formata zero", () => {
    expect(formatarPreco(0)).toBe(`R$${NBSP}0,00`)
  })
})
