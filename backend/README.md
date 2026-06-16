# Backend Projeto Nology

Backend simples em Python usando Flask, Flask-Migrate e SQLAlchemy para conectar-se a um banco de dados MySQL.

## Visão geral

Este projeto fornece uma API básica com configuração de banco de dados a partir de variáveis de ambiente e um modelo `Consulta` para armazenar informações de consultas.

## Estrutura principal

- `app.py` - aplicação Flask principal
- `config.py` - configuração do Flask e conexão com o banco de dados
- `database/db.py` - instância do SQLAlchemy
- `models/consulta.py` - definição do modelo `Consulta`

## Requisitos

- Python 3.10+ (ou versão compatível)
- MySQL ou MariaDB
- `pip` para instalar dependências

## Dependências

Instale as dependências do projeto:

```bash
pip install flask flask-sqlalchemy flask-migrate python-dotenv pymysql
```

> Se você estiver usando um `requirements.txt`, adicione estas dependências ao arquivo.

## Configuração de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo:

```env
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_NAME=seu_banco_de_dados
```

## Executando o projeto

1. Ative seu ambiente virtual (recomendado)
2. Instale as dependências
3. Execute a aplicação:

```bash
python app.py
```

A aplicação será iniciada em `http://0.0.0.0:8080`.

## Endpoints

- `GET /hello` - retorna `Hello, World!`

## Banco de dados e migrações

Para inicializar e aplicar migrações, use:

```bash
flask db init
flask db migrate -m "create consultas table"
flask db upgrade
```

> Certifique-se de que o `FLASK_APP` esteja configurado para `app.py` ou exporte a variável de ambiente antes de executar os comandos de migração.

## Modelo de dados

O modelo `Consulta` possui os campos:

- `id` - UUID
- `ip` - endereço IP
- `tipo_cliente` - tipo de cliente
- `valor_compra` - valor da compra
- `desconto` - desconto aplicado
- `cashback` - cashback calculado

## Observações

- A conexão com o banco de dados usa `pymysql` em `config.py`.
- As variáveis sensíveis devem ficar fora do controle de versão.
