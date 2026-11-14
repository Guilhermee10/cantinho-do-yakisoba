import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Cardapio from './components/Cardapio'
import BarraCarrinho from './components/BarraCarrinho'
import Carrinho from './components/Carrinho'
import Footer from './components/Footer'

function App() {
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [pulsando, setPulsando] = useState(false)

  // Cada linha do carrinho é identificada pela "chave" (produto + tamanho),
  // e não só pelo id do produto: Especial Mini e Especial Grande são linhas diferentes.
  function adicionarAoCarrinho(novoItem) {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find((item) => item.chave === novoItem.chave)

      if (itemExistente) {
        return carrinhoAtual.map((item) =>
          item.chave === novoItem.chave
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...carrinhoAtual, { ...novoItem, quantidade: 1 }]
    })

    setPulsando(true)
    setTimeout(() => setPulsando(false), 250)
  }

  function removerUmDoCarrinho(chave) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.chave === chave ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    )
  }

  return (
    <div className="pb-24">
      <ToastContainer position="top-center" theme="dark" autoClose={1500} hideProgressBar />

      <Header />
      <Cardapio
        carrinho={carrinho}
        aoAdicionar={adicionarAoCarrinho}
      />
      <Footer />

      <BarraCarrinho
        carrinho={carrinho}
        aoClicar={() => setCarrinhoAberto(true)}
        pulsando={pulsando}
      />

      {carrinhoAberto && (
        <Carrinho
          carrinho={carrinho}
          aoFechar={() => setCarrinhoAberto(false)}
          aoAdicionar={adicionarAoCarrinho}
          aoRemoverUm={removerUmDoCarrinho}
        />
      )}
    </div>
  )
}

export default App