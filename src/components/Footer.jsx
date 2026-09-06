function Footer() {
  return (
    <footer className="bg-madeira py-10 px-4 text-center text-creme/70">
      <p className="font-display text-creme text-xl mb-2">CANTINHO DO YAKISOBA</p>
      <p className="text-sm">Praça Ruy Barbosa, ao lado do Bob's</p>
      <p className="text-sm">(75) 99968-3710</p>

      <div className="flex justify-center gap-5 mt-4 text-lg">
        <a href="https://www.instagram.com/cantinhodoyakisoba1/" className="hover:text-pimenta transition-colors">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://wa.me/557599683710" className="hover:text-pimenta transition-colors">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      <p className="text-xs text-creme/40 mt-6">
        © {new Date().getFullYear()} Cantinho do Yakisoba
      </p>
    </footer>
  )
}

export default Footer