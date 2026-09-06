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

  function adicionarAoCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const itemExistente = carrinhoAtual.find((item) => item.id === produto.id)

      if (itemExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...carrinhoAtual, { ...produto, quantidade: 1 }]
    })

    setPulsando(true)
    setTimeout(() => setPulsando(false), 250)
  }

  function removerUmDoCarrinho(idProduto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.id === idProduto ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    )
  }

  function removerItemDoCarrinho(idProduto) {
    setCarrinho((carrinhoAtual) => carrinhoAtual.filter((item) => item.id !== idProduto))
  }

  return (
    <div>
      <ToastContainer position="top-center" theme="dark" autoClose={1500} hideProgressBar />

      <Header />
      <Cardapio
        carrinho={carrinho}
        aoAdicionar={adicionarAoCarrinho}
        aoRemoverUm={removerUmDoCarrinho}
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
          aoRemover={removerItemDoCarrinho}
        />
      )}
    </div>
  )
}

export default App