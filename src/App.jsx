import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Cardapio from './components/Cardapio'
import BarraCarrinho from './components/BarraCarrinho'
import Carrinho from './components/Carrinho'
import Footer from './components/Footer'
import { useCarrinho } from './hooks/useCarrinho'

function App() {
  const { carrinho, adicionar, removerUm, quantidadeTotal, valorTotal } = useCarrinho()
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [pulsando, setPulsando] = useState(false)

  // A animação da barra é coisa da tela, não do carrinho,
  // por isso fica aqui e não dentro do hook.
  function adicionarComAnimacao(item) {
    adicionar(item)
    setPulsando(true)
    setTimeout(() => setPulsando(false), 250)
  }

  return (
    <div className="pb-24">
      <ToastContainer position="top-center" theme="dark" autoClose={1500} hideProgressBar />

      <Header />
      <Cardapio carrinho={carrinho} aoAdicionar={adicionarComAnimacao} />
      <Footer />

      <BarraCarrinho
        quantidadeTotal={quantidadeTotal}
        valorTotal={valorTotal}
        aoClicar={() => setCarrinhoAberto(true)}
        pulsando={pulsando}
      />

      {carrinhoAberto && (
        <Carrinho
          carrinho={carrinho}
          valorTotal={valorTotal}
          aoFechar={() => setCarrinhoAberto(false)}
          aoAdicionar={adicionar}
          aoRemoverUm={removerUm}
        />
      )}
    </div>
  )
}

export default App
