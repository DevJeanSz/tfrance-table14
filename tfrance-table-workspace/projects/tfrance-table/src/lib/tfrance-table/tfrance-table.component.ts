import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'tfrance-table',
  templateUrl: './tfrance-table.component.html',
  styleUrls: ['./tfrance-table.component.scss'],
})
export class TfranceTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { field: string; label: string; sortable?: boolean }[] = [];
  @Input() enableCheckbox = false;
  @Input() itemsPerPage = 10;

  @Output() itemSelected = new EventEmitter<any[]>();

  searchTerm = '';
  currentPage = 1;
  sortField: string = '';
  sortAsc = true;
  selectedItems: Set<any> = new Set();

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

  goToFirstPage(): void {
    this.currentPage = 1;
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.paginatedData.forEach((item) => this.selectedItems.add(item));
    } else {
      this.paginatedData.forEach((item) => this.selectedItems.delete(item));
    }
    this.itemSelected.emit(Array.from(this.selectedItems));
  }

  isAllSelected(): boolean {
    return (
      this.paginatedData.length > 0 &&
      this.paginatedData.every((item) => this.selectedItems.has(item))
    );
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
    const numero = Number(pagina || this.currentPage);
    if (numero > 0 && numero <= this.totalPages) {
      this.currentPage = numero;
    }
  }

  ngOnInit(): void {}
}
