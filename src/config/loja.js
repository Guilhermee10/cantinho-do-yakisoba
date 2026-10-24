// Fonte única de verdade com as informações da loja.
// Se o número, endereço ou horário mudar, altera só aqui.
export const loja = {
  nome: "Cantinho do Yakisoba",
  whatsapp: "557599683710", // DDI + DDD + número, sem espaços
  telefoneExibicao: "(75) 99968-3710",
  endereco: "Praça Ruy Barbosa, ao lado do Bob's",
  instagram: "https://www.instagram.com/cantinhodoyakisoba1/",
  horario: {
    dias: [0, 2, 3, 4, 5, 6], // 0 = domingo ... 6 = sábado (segunda fechado)
    abre: 18,
    fecha: 23,
    texto: "Terça a domingo · 18h às 23h",
  },
}

export const linkWhatsApp = (mensagem = "") =>
  `https://wa.me/${loja.whatsapp}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`
