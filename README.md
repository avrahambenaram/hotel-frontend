Projeto frontend acadêmico da UMC (Universidade de Mogi das Cruzes), consiste em páginas web dedicado ao consumo da Rest API [Hotel Backend](https://github.com/avrahambenaram/hotel-backend)

## 🛠️ Tecnologias Utilizadas
- HTML
- CSS
- JS
- Tailwind CSS

## 🚀 Como Executar o Projeto

Primeiramente, clone o repositório e acessa a pasta
```bash
# Clone o repositório
git clone https://github.com/avrahambenaram/hotel-frontend.git

# Acesse a pasta do projeto
cd hotel-frontend
```

Antes de executar, você ter uma instância da Rest API citado acima rodando em alguma máquina, as páginas web estão configuradas para consumir da máquina local na porta 8080 `localhost:8080`, caso precisa modificar, acesse o arquivo `scripts/config.js` e modifique o conteúdo.
```js
const apiHost = "http://localhost:8080";
```

Com tudo configurado, basta abrir o arquivo `index.html` no navegador de sua preferência.


## 📌 Funcionalidades
- 👤 Clientes: Listagem, criação, atualização e exclusão
- 🛏️ Quartos: Listagem, criação, atualização e exclusão
- 🟢 Reservas: Listagem, criação e exclusão de reservas
