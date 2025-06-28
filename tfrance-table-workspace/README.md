🇧🇷 TFrance Table
Uma tabela Angular reutilizável, poderosa e sem frescura, feita para eliminar boilerplate, trazer ordenação nativa, paginação, checkbox de seleção, busca, exportação para Excel e suporte a headerTemplate customizado — tudo sem dor de cabeça.

🚀 Funcionalidades
Funcionalidade	Descrição
✅ Ordenação automática	Clique no <th> e o componente ordena a coluna
✅ Paginação	Controle total da quantidade por página
✅ Busca global	Campo de pesquisa para filtrar todos os dados
✅ Checkbox opcional	Marque/Desmarque todos ou apenas alguns itens com suporte a seleção em massa
✅ Exportação para Excel	Gera um .xlsx com os dados exibidos
✅ Template de cabeçalho	Totalmente customizável com suporte a ng-template
✅ Ícones automáticos	Ícones de ordenação são inseridos dinamicamente no <th>
✅ Colunas dinâmicas	Defina um array de colunas ou use ng-template

📦 Instalação
bash
Copiar
Editar


🧠 Como usar
1. Com colunas automáticas (via columns)
html
Copiar
Editar
<tfrance-table
  [data]="dados"
  [columns]="colunas"
  [enableCheckbox]="true"
  [enableSorting]="true"
  [enableSearch]="true"
  [enablePagination]="true"
  [enabledetail]="false" //desativar a coluna de detalhes por linha
>
</tfrance-table>
ts
Copiar
Editar
// No component.ts
colunas = [
  { field: 'id', label: 'ID' },
  { field: 'nome', label: 'Nome' },
  { field: 'email', label: 'E-mail', sortable: false }, // desativa sorting se quiser
];
2. Com <ng-template> no cabeçalho (header customizado)
html
Copiar
Editar
<ng-template #headerTemplate>
  <th data-field="id">ID</th>
  <th data-field="nome">Nome</th>
  <th data-field="email">E-mail</th>
</ng-template>

<tfrance-table
  [data]="dados"
  [enableCheckbox]="true"
  [enableSorting]="true"
  [headerTemplate]="headerTemplate"
>
</tfrance-table>
🧩 Basta colocar data-field="..." no <th> e o componente cuida do clique e do ícone de ordenação automaticamente.

🔧 Inputs disponíveis
Input	Tipo	Descrição
data	any[]	Dados da tabela
columns	Column[]	(Opcional) Array com campos e labels
enableCheckbox	boolean	Ativa coluna com checkboxes
enableSorting	boolean	Ativa ordenação por coluna
enableSearch	boolean	Ativa campo de busca global
enablePagination	boolean	Ativa paginação automática
headerTemplate	TemplateRef	Template customizado do cabeçalho (usa data-field nos <th>)

🎯 Eventos
Output	Descrição
rowClicked	Dispara ao clicar em uma linha
selectionChanged	Dispara ao selecionar/desmarcar itens
exported	Dispara após exportar para Excel

📁 Exemplo completo
html
Copiar
Editar
<tfrance-table
  [data]="usuarios"
  [columns]="[
    { field: 'nome', label: 'Nome' },
    { field: 'idade', label: 'Idade' },
    { field: 'email', label: 'E-mail' }
  ]"
  [enableCheckbox]="true"
  [enableSearch]="true"
  [enableSorting]="true"
  [enablePagination]="true"
  [enabledetail]="false"
/>


🛠 Roadmap futuro
 Suporte a ordenação multi-coluna

 Coluna de ações com templates

 Filtros por coluna

 Tradução para múltiplos idiomas

 Estilo dark mode / tema customizado



## 📦 Instalação | Installation

```bash
npm install tfrance-table14

## 📄 Licença | License
## MIT © Jean Lima
