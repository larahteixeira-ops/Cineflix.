// CineFlix: filtros do catálogo + busca de filmes pela API pública iTunes.
document.addEventListener("DOMContentLoaded", () => {
  const busca = document.getElementById("busca");
  const filmes = document.querySelectorAll(".filme");
  const botoes = document.querySelectorAll(".filtros button");

  function filtrar() {
    if (!busca) return;
    const texto = busca.value.trim().toLocaleLowerCase("pt-BR");
    const generoAtivo = document.querySelector(".filtros button.ativo")?.dataset.genero || "Todos";

    filmes.forEach((filme) => {
      const nome = filme.querySelector("h3")?.textContent.toLocaleLowerCase("pt-BR") || "";
      const genero = filme.dataset.genero || "";
      filme.hidden = !(nome.includes(texto) && (generoAtivo === "Todos" || genero === generoAtivo));
    });
  }

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoes.forEach((item) => item.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtrar();
    });
  });
  busca?.addEventListener("input", filtrar);
  document.querySelector('.filtros button[data-genero="Todos"]')?.classList.add("ativo");

  const formApi = document.getElementById("form-api");
  const inputApi = document.getElementById("busca-api");
  const resultados = document.getElementById("resultados-api");
  const mensagem = document.getElementById("mensagem-api");

  if (!formApi || !inputApi || !resultados || !mensagem) return;

  formApi.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const termo = inputApi.value.trim();
    resultados.replaceChildren();

    if (termo.length < 2) {
      mensagem.textContent = "Digite pelo menos 2 caracteres para pesquisar.";
      return;
    }

    mensagem.textContent = "Buscando filmes...";
    const botao = formApi.querySelector("button");
    botao.disabled = true;

    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termo)}&entity=movie&limit=8&country=br`;
      const resposta = await fetch(url);

      if (!resposta.ok) throw new Error("A API respondeu com erro.");

      const dados = await resposta.json();
      const filmesEncontrados = (dados.results || []).filter((item) => item.trackName);

      if (filmesEncontrados.length === 0) {
        mensagem.textContent = "Não encontramos filmes com esse nome. Tente outra busca.";
        return;
      }

      mensagem.textContent = `${filmesEncontrados.length} resultado(s) encontrado(s).`;
      filmesEncontrados.forEach((filme) => {
        const card = document.createElement("article");
        card.className = "card api-card";

        const imagem = document.createElement("img");
        imagem.className = "poster-api";
        imagem.src = (filme.artworkUrl100 || "").replace("100x100bb", "400x400bb");
        imagem.alt = `Capa do filme ${filme.trackName}`;
        imagem.loading = "lazy";
        imagem.onerror = () => { imagem.style.display = "none"; };

        const conteudo = document.createElement("div");
        conteudo.className = "api-card-conteudo";
        const titulo = document.createElement("h4");
        titulo.textContent = filme.trackName;
        const ano = document.createElement("p");
        ano.textContent = filme.releaseDate ? `Lançamento: ${new Date(filme.releaseDate).getFullYear()}` : "Ano não informado";
        const genero = document.createElement("p");
        genero.textContent = filme.primaryGenreName || "Gênero não informado";
        conteudo.append(titulo, ano, genero);
        if (filme.trackViewUrl) {
          const link = document.createElement("a");
          link.href = filme.trackViewUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "Ver detalhes";
          conteudo.append(link);
        }
        card.append(imagem, conteudo);
        resultados.append(card);
      });
    } catch (erro) {
      console.error("Falha ao consultar a API:", erro);
      mensagem.textContent = "Não foi possível buscar os filmes agora. Confira sua conexão e tente novamente.";
    } finally {
      botao.disabled = false;
    }
  });
});
