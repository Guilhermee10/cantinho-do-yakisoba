import { loja } from "../config/loja.js"

// Recebe a data como parâmetro (com "agora" como padrão) para que a
// função possa ser testada com qualquer dia e hora, sem depender do relógio.
export function estaAberto(agora = new Date(), horario = loja.horario) {
  const hora = agora.getHours()
  return (
    horario.dias.includes(agora.getDay()) &&
    hora >= horario.abre &&
    hora < horario.fecha
  )
}

export function textoStatus(agora = new Date(), horario = loja.horario) {
  if (estaAberto(agora, horario)) return `Aberto até ${horario.fecha}h`

  const abreHoje =
    horario.dias.includes(agora.getDay()) && agora.getHours() < horario.abre
  return abreHoje ? `Abre hoje às ${horario.abre}h` : "Fechado agora"
}
