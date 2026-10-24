import { loja, linkWhatsApp } from '../config/loja'

function Footer() {
  return (
    <footer className="bg-madeira py-10 px-4 text-center text-creme/70">
      <p className="font-display text-creme text-xl mb-2">{loja.nome.toUpperCase()}</p>
      <p className="text-sm">{loja.endereco}</p>
      <p className="text-sm">{loja.telefoneExibicao}</p>

      <div className="flex justify-center gap-5 mt-4 text-lg">
        <a href={loja.instagram} className="hover:text-pimenta transition-colors">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href={linkWhatsApp()} className="hover:text-pimenta transition-colors">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      <p className="text-xs text-creme/40 mt-6">
        © {new Date().getFullYear()} {loja.nome}
      </p>
    </footer>
  )
}

export default Footer