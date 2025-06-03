# TfranceTable

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## Code scaffolding

Run `ng generate component component-name --project tfrance-table` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project tfrance-table`.
> Note: Don't forget to add `--project tfrance-table` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build tfrance-table` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build tfrance-table`, go to the dist folder `cd dist/tfrance-table` and run `npm publish`.

## Running unit tests

Run `ng test tfrance-table` to execute the unit tests via [Karma](https://karma-runner.github.io).

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
npm install tfrance-table

## 📄 Licença | License
## MIT © Jean Lima
