import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/Models/department';
import { Product } from 'src/app/Models/product';
import { Seller } from 'src/app/Models/seller';
import { SubDepartment } from 'src/app/Models/sub-department';
import { SubSubDepartment } from 'src/app/Models/sub-sub-department';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  allDepartments: Department[] = [];
  allSubDepartments: SubDepartment[] = [];
  allSubSubDepartments: SubSubDepartment[] = [];
  sellers: any = [];
  prodDetails: any = {};
  productWillUpdate: object = {};
  productValue: any = {};
  editProductForm!: FormGroup;
  // addProductForm: FormGroup;
  loading: boolean = false;
  file: any;
  resp: any;

  prod: any = {
    name: { ar: '', en: '' }, //done
    priceBefore: 0,
    priceAfter: 0, //done
    brand: { ar: '', en: '' }, //done
    quantity: 0, //done
    variety: {
      colors: {
        ar: [],
        en: [],
      },
    }, //done
    sizes: {
      ar: [],
      en: [],
    }, //done
    photos: [''],
    mainPhoto: '',
    badges: {
      ar: [],
      en: [],
    }, //done
    productDetails: {
      ar: '',
      en: '',
    }, //done
    specifications: {
      ar: '',
      en: '',
    }, //done
    warranty: {
      ar: '',
      en: '',
    }, //done
    isActive: true,
    // departmentID: '6437279f17066f527269744d',
    departmentID: '', //done
    // subDepartmentID: '6437279f17066f527269744d',
    subDepartmentID: '', //done
    // nestedSubDepartment: '6439046995a45fbd57914d6d',
    nestedSubDepartment: '', //done
    sellerID: '', //done
  };

  constructor(
    private service: ServiceService,
    private build: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.editProductForm = this.build.group({
      name: ['', [Validators.required]],
      priceAfter: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      productDetails: ['', [Validators.required]],
    });

    this.getProducts();
    this.getAllDepartments();
    this.getAllSubDepartments();
    this.getAllSubSubDepartments();
    this.getAllSellers();
  }

  getphoto(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  addProduct() {
    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', 'walmart');

    this.http
      .post('https://api.cloudinary.com/v1_1/dsfjtwsiz/upload', formData)
      .subscribe((res) => {
        this.resp = res;
        this.prod.photos = this.resp.url;
        this.prod.mainPhoto = this.prod.photos;
        this.service.addNewProduct(this.prod).subscribe((res) => {
          window.location.reload();
        });
      });
  }

  editProduct(productId: object, product: object) {
    this.productWillUpdate = productId;
    this.productValue = product;
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe((result: any) => {
      this.products = result.products;
      this.loading = false;
      console.log(this.products);
    });
  }

  viewDetails(index: number) {
    this.prodDetails = this.products[index];
  }

  getAllDepartments() {
    this.service.getAllDepartments().subscribe((result: any) => {
      this.allDepartments = result;
    });
  }

  getAllSubDepartments() {
    this.service.getAllSubDepartment().subscribe((result: any) => {
      this.allSubDepartments = result;
    });
  }

  getAllSubSubDepartments() {
    this.service.getAllSubSubDepartment().subscribe((result: any) => {
      this.allSubSubDepartments = result;
    });
  }

  removeProduct(id: object) {
    this.service.deleteProduct(id).subscribe((res) => {
      this.getProducts();
      alert('Product Deletde Successfully');
    });
  }

  updateProduct() {
    const modal = this.editProductForm.value;
    console.log(this.productWillUpdate);
    console.log(modal);
    this.service
      .updateProduct(this.productWillUpdate, modal)
      .subscribe((res) => {
        this.getProducts();
        window.location.reload();
      });
  }

  getAllSellers() {
    this.service.getAllSellers().subscribe((res) => {
      this.sellers = res;
      console.log(this.sellers);
    });
  }
}
