# 💰 Projeto Nology — Calculadora de Cashback

Aplicação web fullstack para cálculo de cashback de uma fintech, com registro de consultas por IP e histórico personalizado.

- **Frontend:** https://projetonology.vercel.app
- **Backend (API):** https://projetonology.onrender.com/consultas

---

## 📋 Cenário de Negócio

O sistema implementa as regras de cashback definidas por três documentos internos da empresa:

| Documento | Regra |
|---|---|
| **Especificação do Product Owner** | Cashback base de **5%** sobre o valor final (após descontos). Clientes **VIP** recebem **10% de bônus adicional** sobre o cashback base. |
| **Email do Diretor Comercial** | Promoção: compras com valor final **acima de R$ 500** ganham o **dobro** do cashback. Vale para todos os clientes, inclusive VIPs. |
| **Anotação da Reunião** | Ordem de cálculo: primeiro o cashback base, depois o bônus VIP, e por último a promoção de dobro. |

### Fluxo de Cálculo

```
Valor Final = Valor da Compra × (1 - Desconto / 100)
                          ↓
        Cashback Base = Valor Final × 5%
                          ↓
          Se VIP → Cashback += Cashback × 10%
                          ↓
    Se Valor Final > R$ 500 → Cashback × 2
                          ↓
                  Cashback Final (arredondado)
```

---

**Explicação passo a passo:**

1. **Valor Final:** Calcula o valor após aplicar o desconto percentual do cupom.
2. **Cashback Base (5%):** Aplica a taxa de 5% sobre o valor final.
3. **Bônus VIP (+10%):** Se o cliente for VIP, adiciona 10% sobre o cashback base (resultando em 5,5% efetivo).
4. **Promoção (×2):** Se o valor final for maior que R$ 500, o cashback total é dobrado.


## 🚀 Aplicação Web

### Arquitetura

```
┌─────────────────────┐         ┌─────────────────────────┐         ┌──────────────┐
│  Frontend (Vercel)  │  HTTP   │   Backend (Render)      │   SQL   │  MySQL (DB)  │
│  HTML/CSS/JS puro   │ ──────► │   Flask API (Python)    │ ──────► │  Aiven Cloud │
│                     │ ◄────── │                         │ ◄────── │              │
└─────────────────────┘         └─────────────────────────┘         └──────────────┘
```

### Funcionalidades

- **Calcular Cashback:** O usuário seleciona o tipo de cliente (Normal/VIP), insere o valor da compra e o desconto. A API calcula e retorna o cashback.
- **Histórico por IP:** Cada consulta é registrada no banco de dados com o IP do usuário. O histórico exibe apenas as consultas do IP que acessa a página.

---

## 🗂 Estrutura do Projeto

```
projetonology/
├── frontend/
│   ├── index.html              # Página principal (SPA com abas)
│   ├── css/
│   │   └── style.css           # Estilos customizados (glassmorphism)
│   └── js/
│       └── script.js           # Lógica do frontend (fetch API)
│
├── backend/
│   ├── app.py                  # Entry point Flask
│   ├── config.py               # Configuração do banco (MySQL)
│   ├── requirements.txt        # Dependências Python
│   ├── .env.example            # Variáveis de ambiente (modelo)
│   ├── database/
│   │   └── db.py               # Instância SQLAlchemy
│   ├── models/
│   │   └── consulta.py         # Model: Consulta (id, ip, tipo, valor, desconto, cashback)
│   ├── routes/
│   │   ├── cashback_routes.py  # POST /cashback → calcula e salva
│   │   └── consulta_routes.py  # GET  /consultas → retorna histórico por IP
│   ├── services/
│   │   └── cashback_service.py # Lógica de cálculo do cashback
│   └── migrations/             # Migrações do banco (Alembic/Flask-Migrate)
│
└── README.md
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição | Body (JSON) |
|--------|------|-----------|-------------|
| `POST` | `/cashback` | Calcula o cashback e registra a consulta no banco | `{ "tipo_cliente": "VIP", "valor": 600, "desconto": 15 }` |
| `GET` | `/consultas` | Retorna o histórico de consultas do IP do usuário | — |

### Exemplo de resposta — `POST /cashback`

```json
{
  "cashback": 56.1
}
```

### Exemplo de resposta — `GET /consultas`

```json
{
  "consultas": [
    {
      "id": "a1b2c3d4-...",
      "tipo_cliente": "VIP",
      "valor_compra": 600,
      "desconto": 15,
      "cashback": 56.1
    }
  ]
}
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- Python 3.10+
- MySQL (local ou remoto)

### Backend

```bash
cd backend

# Criar e ativar ambiente virtual
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate         # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com as credenciais do seu banco MySQL:
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=projetonology

# Rodar migrações
flask db upgrade

# Iniciar servidor
python app.py
# API disponível em http://localhost:8080
```

### Frontend

Basta abrir o arquivo `frontend/index.html` no navegador, ou servir com qualquer servidor estático.

> **Nota:** Para uso local, altere a constante `API_URL` em `frontend/js/script.js` para `http://localhost:8080/`.

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript puro, Bootstrap 5 |
| **Backend** | Python 3, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS |
| **Banco de Dados** | MySQL (PyMySQL) |
| **Hospedagem Frontend** | Vercel |
| **Hospedagem Backend** | Render |
| **Banco de Dados Cloud** | Aiven (MySQL) |
