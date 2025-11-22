# 🎸 Music History

**Music History** é uma aplicação web interativa desenvolvida para exibir um catálogo detalhado sobre bandas de rock clássicas e modernas. O projeto foca na experiência do usuário, oferecendo navegação fluida, busca em tempo real e persistência de dados locais.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 & CSS3:** Estrutura e estilização.
* **JavaScript (Vanilla ES6+):** Lógica de manipulação do DOM e rotas.
* **JSON:** Armazenamento e consumo de dados das bandas.
* **LocalStorage API:** Persistência de identificação do usuário.

---

## ✨ Funcionalidades Principais

* **Sistema de Boas-vindas:** Identificação do usuário com salvamento local.
* **Saudação Dinâmica:** Mensagem personalizada baseada no horário do sistema (Bom dia/tarde/noite).
* **Catálogo Visual:** Exibição de bandas em formato de *cards* e *carrossel*.
* **Busca Instantânea:** Filtragem de bandas pelo nome sem recarregar a página.
* **Página de Detalhes:** Visão completa com biografia, discografia e integração de links externos (Spotify, YouTube, Site Oficial).

---

## 📂 Documentação Técnica

O projeto é alimentado por um arquivo central de dados e dividido em scripts específicos para cada responsabilidade.

### 1. Estrutura de Dados (`data.json`)
Fonte central de informações. Contém um array de objetos com a seguinte estrutura:

```json
{
  "nome": "Identificador único da banda",
  "descricao": "História completa, estilo e membros",
  "descricao_curta": "Resumo para exibição nos cards",
  "link": "URL do site oficial",
  "imagem": "Caminho do logo (assets/img...)",
  "video": "Link para clipe/youtube",
  "spotify": "Link para perfil no Spotify",
  "documentario": "Link para documentário",
  "imagens_carousel": [
    { "caminho": "url_img", "alt": "texto alternativo" }
  ]
}
