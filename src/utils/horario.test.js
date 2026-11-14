import { describe, it, expect } from "vitest"
import { estaAberto, textoStatus } from "./horario.js"

// Horário fixo nos testes: se a loja mudar o horário real em config/loja.js,
// estes testes continuam valendo, porque testam a REGRA e não o dado.
const horario = { dias: [0, 2, 3, 4, 5, 6], abre: 18, fecha: 23 }

// new Date(ano, mês, dia, hora, minuto) usa o fuso de quem roda o teste,
// igual ao getHours() do código. O mês começa em 0: 10 = novembro.
const sabado = (hora, minuto = 0) => new Date(2026, 10, 14, hora, minuto)
const segunda = (hora, minuto = 0) => new Date(2026, 10, 16, hora, minuto)

describe("estaAberto", () => {
  it("está aberto num dia de funcionamento, dentro do horário", () => {
    expect(estaAberto(sabado(19), horario)).toBe(true)
  })

  it("abre exatamente na hora de abertura", () => {
    expect(estaAberto(sabado(17, 59), horario)).toBe(false)
    expect(estaAberto(sabado(18, 0), horario)).toBe(true)
  })

  it("fecha exatamente na hora de fechamento", () => {
    expect(estaAberto(sabado(22, 59), horario)).toBe(true)
    expect(estaAberto(sabado(23, 0), horario)).toBe(false)
  })

  it("fica fechado na segunda, mesmo dentro do horário", () => {
    expect(estaAberto(segunda(19), horario)).toBe(false)
  })
})

describe("textoStatus", () => {
  it("mostra até que horas fica aberto", () => {
    expect(textoStatus(sabado(19), horario)).toBe("Aberto até 23h")
  })

  it("avisa que abre hoje quando ainda não deu a hora", () => {
    expect(textoStatus(sabado(10), horario)).toBe("Abre hoje às 18h")
  })

  it("mostra fechado depois do horário", () => {
    expect(textoStatus(sabado(23, 30), horario)).toBe("Fechado agora")
  })

  it("mostra fechado no dia em que a loja não abre", () => {
    expect(textoStatus(segunda(10), horario)).toBe("Fechado agora")
  })
})
