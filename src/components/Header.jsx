function Header() {
  return (
    <header className="relative w-full h-[480px] overflow-hidden">
      <img
        src="/assets/yakisobaaa.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-carvao/80" />

      <div className="relative w-full h-full flex flex-col justify-center items-center px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl text-creme tracking-wide">
          CANTINHO DO YAKISOBA
        </h1>
        <p className="text-creme/80 mt-4">
          Praça Ruy Barbosa, ao lado do Bob's
        </p>
        <div className="bg-pimenta px-5 py-2 rounded-full mt-6">
          <span className="text-creme font-semibold text-sm">
            Terça a domingo · 18h às 23h
          </span>
        </div>

        <a
          href="#menu"
          className="mt-8 text-creme/70 flex flex-col items-center gap-1 hover:text-creme transition-colors"
        >
          <span className="text-sm">Ver cardápio</span>
          <i className="fa fa-chevron-down"></i>
        </a>
      </div>
    </header>
  )
}

export default Header