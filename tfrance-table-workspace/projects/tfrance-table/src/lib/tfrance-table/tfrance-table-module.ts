import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TfranceTableComponent } from './tfrance-table.component';

@NgModule({
  declarations: [TfranceTableComponent],
  imports: [CommonModule, FormsModule],
  exports: [TfranceTableComponent],
})
export class TfranceTableModule {}
