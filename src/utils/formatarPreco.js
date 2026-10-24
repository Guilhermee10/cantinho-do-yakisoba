// Intl.NumberFormat é a API nativa do JavaScript para formatar números
// conforme o idioma/país. Criamos o formatador uma vez só (fora da função)
// porque criá-lo é mais caro do que usá-lo.
const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

// 46 → "R$ 46,00" | 1234.5 → "R$ 1.234,50"
export function formatarPreco(valor) {
  return formatador.format(valor)
}
