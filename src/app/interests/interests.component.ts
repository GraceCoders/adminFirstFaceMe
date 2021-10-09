import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  messageError = false;
  interests = [];
  msg = "";
  data = {
    subscription_name: '',
    subscription_type: '',
    subscription_id: '',
    subscription_price: '',
    subscription_priceid: '',
    subscription_productid: '',
    type: ''
  }
  public formData = new FormData();
  categoryForm: FormGroup;
  public isImage = false;
  subCatMessage: Boolean = false;
  message;
  subscription_id;
  urls_photo = [];
  total = 0
  where = {
    filter: '',
    limit: 10,
    page: 1,
    order: -1
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: AppService) { }


  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  ngOnInit() {
    this.getsubscription();
    this.urls_photo.push('../../assets/img/4-3.png');
  }

  getsubscription() {
    this.spinner.show();
    this.userService.allplans(this.where).subscribe((data) => {
      if (data.statusCode == 200) {
        this.interests = data.data;
        this.total = data.data.total
        this.spinner.hide();
      }

    })
  }


  editsubcription(id) {
    var data = {
      planId: id
    }
    this.data.subscription_name = '';
    this.data.subscription_type = '';
    this.data.subscription_price = '';
    this.data.subscription_priceid = '';
    this.data.subscription_productid = '';
    this.data.type = '';
    this.userService.subscription(data).subscribe((data) => {
      if (data.statusCode == 200) {
        this.data.subscription_name = data.data.name;
        this.data.subscription_id = data.data._id;
        this.data.subscription_type = data.data.type;
        this.data.subscription_price = data.data.price;
        this.data.subscription_priceid = data.data.priceId;
        this.data.subscription_productid = data.data.productId;
      } else {
        console.log("");
      }

    })

  }


  updatesubscription(subscription, price, priceId, productId) {
    if (!subscription.value) {
      subscription.value = this.data.subscription_name;
    }
    if (!price.value) {
      price.value = this.data.subscription_price;
    }
    if (!priceId.value) {
      priceId.value = this.data.subscription_priceid;
    }
    if (!productId.value) {
      productId.value = this.data.subscription_productid;
    }
    var newdata = {
      name: subscription.value,
      price: price.value,
      priceId: priceId.value,
      productId: productId.value,
      planId: this.data.subscription_id
    }

    this.userService.updatesubscription(newdata).subscribe((data) => {
      if (data.statusCode == 200) {
        document.getElementById('id01').style.display = 'none';
        subscription.value = "";
        this.getsubscription();
      }
    },
      (err) => {
        console.log(err);
      })
  }


  deletesubscription(subscription_id, index) {
    var consent = confirm("Do you want to delete this plan ?");
    if (consent) {
      this.userService.deletesubscription({ planId: subscription_id }).subscribe((data) => {
        if (data.statusCode == 200) {
          this.interests.splice(index, 1);
        } else {
          console.log("=== error in delete category ===");
        }
      })
    }

  }

  subscriptionId(subscription) {
    this.subscription_id = subscription;
    this.subCatMessage = false;
  }

  empty() {
    this.data.subscription_name = '';
    this.data.subscription_price = '';
    this.data.subscription_priceid = '';
    this.data.subscription_productid = '';
  }

  addsubscription(subscription, price, priceId, productId) {
    this.msg = " "
    if (subscription.value == '') {
      this.messageError = true;
      this.msg = "Please fill required field."
    }
    else if (price.value == '') {
      this.messageError = true;
      this.msg = "Please fill required field."
    }
    else if (priceId.value == '') {
      this.messageError = true;
      this.msg = "Please fill required field."
    }
    else if (productId.value == '') {
      this.messageError = true;
      this.msg = "Please fill required field."
    }
    else {
      var newdata = {
        name: subscription.value,
        price: price.value,
        priceId: priceId.value,
        productId: productId.value
      }
    }
    this.userService.addsubscription(newdata).subscribe((data) => {
      console.log("===responce adata====", data);
      if (data.statusCode == 200) {
        document.getElementById('id02').style.display = 'none';
        subscription.value = "";
        this.getsubscription();
      }
    },
      (err) => {
        console.log(err);
      })
  }

}
