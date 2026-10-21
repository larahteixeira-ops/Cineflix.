# CineFlix 🎬

Projeto de catálogo de filmes desenvolvido em HTML, CSS, JavaScript, PHP e MySQL.

## Funcionalidades
- Página inicial com filmes em destaque.
- Catálogo com pesquisa por nome e filtros por gênero.
- Busca de filmes pela API pública iTunes usando `fetch`, `async/await`, JSON e `try/catch`.
- Mensagens de carregamento, resultado vazio e falha de conexão.
- Páginas de gêneros.
- Cadastro, edição e exclusão em PHP/MySQL para executar localmente com XAMPP.

## Estrutura
```text
CineFlix/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── pages/
│   ├── filmes.html
│   └── generos.html
└── php/
    ├── banco.sql
    ├── conexao.php
    ├── cadastro.php
    ├── editar.php
    └── excluir.php
```

## Executar no computador
1. Para ver as páginas HTML, abra `index.html` ou use a extensão Live Server no VS Code.
2. Para testar o PHP e o banco de dados, instale/inicie o XAMPP (Apache e MySQL).
3. Copie a pasta `CineFlix` para `xampp/htdocs/`.
4. Importe `php/banco.sql` pelo phpMyAdmin e confira as configurações em `php/conexao.php`.
5. Acesse `http://localhost/CineFlix/`.

A busca da API precisa de conexão com a internet. Para testar a mensagem de erro, fique sem conexão ou simule uma falha de rede nas ferramentas do navegador.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie os arquivos e pastas deste projeto para a raiz do repositório (o `index.html` deve ficar na raiz).
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**, escolha a branch `main` e a pasta `/ (root)`, depois salve.
5. Aguarde a publicação e abra o endereço informado pelo GitHub.

**Importante:** GitHub Pages hospeda somente arquivos estáticos. As páginas HTML/CSS/JS e a busca pela API funcionam online, mas os arquivos PHP e a conexão com MySQL não executam no GitHub Pages. Para usar o cadastro CRUD online, será necessário hospedar o PHP e o MySQL em um servidor compatível. O link “Cadastrar” funciona quando o projeto está no XAMPP/servidor PHP; no GitHub Pages, essa parte não estará disponível.

## API utilizada
A busca utiliza a API de pesquisa do iTunes:
`https://itunes.apple.com/search?term=TERMO&entity=movie&limit=8&country=br`

A API não exige chave para esta funcionalidade. Os resultados e as capas são fornecidos pelo serviço externo.
