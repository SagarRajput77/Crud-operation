import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart-data',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './chart-data.component.html',
  styleUrl: './chart-data.component.scss'
})
export class ChartDataComponent implements OnInit {

  chartData: { name: string; value: number }[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Subscribe to product data changes and update chart data
    this.productService.productObservable.subscribe(products => {
      this.chartData = products.map(product => ({
        name: product.name,
        value: product.price
      }));
    });
  }
}
