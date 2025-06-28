import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  TemplateRef,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import * as XLSX from 'xlsx';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tfrance-table',
  templateUrl: './tfrance-table.component.html',
  styleUrls: ['../styles/_table-styles.scss', './tfrance-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TfranceTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() enableCheckbox = false;
  @Input() enableCheckboxAll = false;
  @Input() itemsPerPage = 10;
  @Input() rowTemplate?: TemplateRef<any>;
  @Input() checkboxClass: string = 'tfr-checkbox';
  @Input() columns: { field: string; label: string; sortable?: boolean }[] = [];
  @Input() headerTemplate?: TemplateRef<any>;
  @Input() enableSorting: boolean = true;
  @Input() exportarExcel: boolean = true;
  @Input() enablesearching: boolean = true;
  @Input() noSortingForColumns: string[] = [];
  @ViewChild('theadContainer', { read: ElementRef })
  theadContainer!: ElementRef;
  @Input() detailTemplate?: TemplateRef<any>;
  @Input() enabledetail: boolean = false;

  @Output() itemSelected = new EventEmitter<any>();
  hasInitializedHeader = false;
  searchTerm = '';
  currentPage = 1;
  sortField: string = '';
  sortAsc = true;
  selectedItems: Set<any> = new Set();
  expandedRows = new Set<number>();
  @ViewChild('theadContainer', { static: false })
  theadRef!: ElementRef;
  observer: MutationObserver | null = null;
  pagesToShow: number[] = [];
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  get filteredData(): any[] {
    const term = this.searchTerm.toLowerCase();
    return this.data.filter((item) =>
      Object.values(item).some(
        (val) =>
          (typeof val === 'string' && val.toLowerCase().includes(term)) ||
          (typeof val === 'number' &&
            val.toString().toLowerCase().includes(term))
      )
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setupCustomSorting());
    setTimeout(() => this.autoAlignCells(), 0);
    const table = this.elRef.nativeElement.querySelector('table');
    if (!table) return;
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => this.autoAlignCells());
      this.observer.observe(table, { childList: true, subtree: true });
      this.autoAlignCells();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private autoAlignCells() {
    const table = this.elRef.nativeElement.querySelector('table');
    if (!table) return;

    const cells: NodeListOf<HTMLTableCellElement> =
      table.querySelectorAll('th, td');

    cells.forEach((cell) => {
      cell.style.setProperty('text-align', 'start');
    });
  }

  setupCustomSorting(): void {
    if (!this.enableSorting || !this.theadRef) return;

    const ths = this.theadRef.nativeElement.querySelectorAll('th');

    ths.forEach((th: HTMLElement, index: number) => {
      if (this.enableCheckbox && index === 0) return;

      const field = th.dataset['field'];
      if (!field) return;

      this.renderer.setStyle(th, 'cursor', 'pointer');

      this.renderer.listen(th, 'click', () => {
        this.sortBy(field);
        this.updateSortIcons();
      });
    });

    this.updateSortIcons();
  }

  updateSortIcons(): void {
    const ths = this.theadRef.nativeElement.querySelectorAll('th');

    ths.forEach((th: HTMLElement) => {
      const field = th.dataset['field'];
      if (!field) return;

      // Remove ícones anteriores
      const oldIcon = th.querySelector('.feather');
      if (oldIcon) this.renderer.removeChild(th, oldIcon);

      // Adiciona o ícone correto se for o campo ordenado
      if (this.sortField === field) {
        const icon = this.renderer.createElement('i');
        this.renderer.addClass(icon, 'feather');
        this.renderer.addClass(
          icon,
          this.sortAsc ? 'icon-arrow-down' : 'icon-arrow-up'
        );
        this.renderer.setStyle(icon, 'margin-left', '5px');
        this.renderer.appendChild(th, icon);
      }
    });
  }

  toggleExpand(index: number): void {
    if (this.expandedRows.has(index)) {
      this.expandedRows.delete(index);
    } else {
      this.expandedRows.add(index);
    }
  }

  updatePagesToShow() {
    const maxPages = 5;
    const pages: number[] = [];

    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + maxPages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    this.pagesToShow = pages;
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagesToShow();
  }

  onGoToPage(value: any) {
    const page = Number(value);
    if (!isNaN(page) && page >= 1 && page <= this.totalPages) {
      this.goToPage(page);
    }
  }

  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let sorted = [...this.filteredData];

    if (this.sortField) {
      sorted.sort((a, b) => {
        const aVal = a[this.sortField];
        const bVal = b[this.sortField];

        if (aVal < bVal) return this.sortAsc ? -1 : 1;
        if (aVal > bVal) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }

    return sorted.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get TotalRegistros(): number {
    return this.filteredData.length;
  }

  goToFirstPage(): void {
    this.currentPage = 1;
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Selecionar todos da lista original
      this.data.forEach((item) => this.selectedItems.add(item));
    } else {
      this.data.forEach((item) => this.selectedItems.delete(item));
    }

    this.emitSelection(); // dispara o itemSelected
  }

  isAllSelected(): boolean {
    return this.data.every((item) => this.selectedItems.has(item));
  }

  emitSelection() {
    this.itemSelected.emit(Array.from(this.selectedItems));
  }

  toggleItem(item: any): void {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
    this.itemSelected.emit(Array.from(this.selectedItems));
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'exportacao.xlsx');
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  pesquisaPagina$ = new Subject<string>();
  pesquisaSub: Subscription | null = null;

  private ignorarDebounce = false;

  onPaginaInput(event: any) {
    if (!this.pesquisaSub) {
      this.pesquisaSub = this.pesquisaPagina$
        .pipe(debounceTime(5000))
        .subscribe((valor) => {
          if (!this.ignorarDebounce) {
            this.goToNextPage(valor);
          }
          this.ignorarDebounce = false; // reseta após execução
        });
    }

    this.pesquisaPagina$.next(event);
  }

  onPaginaEnter() {
    this.ignorarDebounce = true;
    this.goToNextPage(this.currentPage);
  }

  goToNextPage(pagina?: any): void {
    const numero = Number(pagina || this.currentPage++);
    if (numero > 0 && numero <= this.totalPages) {
      this.currentPage = numero;
    }
  }

  itemsPerPageOptions: number[] = [10, 20, 30, 50, 100, 200, 500, 1000];

  onItemsPerPageChange() {
    this.currentPage = 1;
  }

  isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  ngOnInit(): void {}
}
