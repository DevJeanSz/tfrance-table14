# TfranceTableWorkspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## 🚀 Como usar | How to Use
1. Importe o módulo no seu app | Import the module into your app
ts
Copiar
Editar
import { TfranceTableModule } from 'tfrance-table';

@NgModule({
  imports: [TfranceTableModule],
})
export class AppModule {}

## Exemplo de uso | Usage Example
2. <tfrance-table
  [data]="meusDados"
  [columns]="[
    { field: 'id', label: 'ID', sortable: true },
    { field: 'nome', label: 'Nome', sortable: true },
    { field: 'email', label: 'Email' }
  ]"
  [enableCheckbox]="true"
  [itemsPerPage]="5"
  (itemSelected)="receberSelecionados($event)"
>
</tfrance-table>

3. Dados esperados | Expected Input
✅ data: any[]
Array de objetos com os dados da tabela.
Object array with table data.

✅ columns: { field: string; label: string; sortable?: boolean }[]
Define quais colunas serão exibidas, seus rótulos e se são ordenáveis.
Defines which columns will be shown, their labels, and whether they are sortable.

✅ enableCheckbox: boolean
Mostra ou oculta checkboxes por linha.
Shows or hides checkboxes per row.

✅ itemsPerPage: number
Define o número de itens por página.
Sets the number of items per page.

✅ itemSelected: EventEmitter<any[]>
Evento emitido sempre que um item é (des)selecionado.
Event emitted when an item is selected or deselected.

📤 Exportar para Excel | Export to Excel
O botão “Exportar Excel” exporta os dados filtrados em formato .xlsx.
The “Export Excel” button exports filtered data to .xlsx format.



## 📦 Instalação | Installation

```bash
npm install tfrance-table14

## 📄 Licença | License
## MIT © Jean Lima
