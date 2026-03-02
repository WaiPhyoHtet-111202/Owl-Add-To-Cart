import { Component, xml, useState } from "@odoo/owl";

export class ItemCard extends Component {
  static props = {
    data: {
      type: Array,
    },
    order: {
      type: true,
    },

    selectedId: {
      type: Function,
    },
    getOrder: {
      type: Function,
    },
    count: {
      type: Number,
    },
    cart: {
      type: Object,
    },
  };

  static template = xml`
  <div class="container-fluid">
    <div class="row g-3">
        <div class="col-12 col-xl-4 col-lg-6" t-foreach="props.data" t-as="item" t-key="item.id">
            <div class="d-flex flex-column gap-3 position-relative">
                <img t-att-src="item.image.desktop" class="img-fluid rounded-3 d-none d-xl-block" alt="..."/>
                <img  t-att-src="item.image.mobile" class="img-fluid rounded-3 d-md-none" alt="..."/>
                <img  t-att-src="item.image.tablet" class="img-fluid rounded-3 d-md-block d-none d-xl-none" alt="..."/>
                <div t-if="!this.props.cart[item.id]">
                  <button class="rounded-5 w-lg-50  p-lg-1 p-2 p-md-0 p-md-3 position-absolute bottom-25 start-50 
                   translate-middle-x mb-5" t-on-click="() => this.add(item.id)" style="bottom : 40px">
                    <img src="../assets/images/icon-add-to-cart.svg" alt="custom-add-to-cart"/>
                    <span>Add to cart</span>
                  </button>  
                </div>
                <div t-else="">
                  <div class="rounded-5 d-flex justify-content-between gap-4 align-items-center p-lg-1 p-2 w-50 p-md-0 p-md-3 w-md-50 btn-add-to-cart position-absolute bottom-25 start-50 
                   translate-middle-x mb-5 bg-danger" style="bottom : 40px;width:9rem;">
                  
                  <button class="border-white rounded-circle p-0 ms-2" style="width:20px;height:20px;background-color:hsl(14, 86%, 42%);" t-on-click="() => this.decreaseQuantity(item.id)">
                    <img  class="pb-2" src="../assets/images/icon-decrement-quantity.svg" alt="..." style="width:10 px"/>
                  </button>
                  <span class="text-white"><t t-esc="this.props.cart[item.id]"/></span>
                  <button class="border-white rounded-circle p-0 me-2" style="width:20px;height:20px;background-color:hsl(14, 86%, 42%);" t-on-click="() => this.addQuantity(item.id)">
                    <img class="pb-2" src="../assets/images/icon-increment-quantity.svg" alt="..." style="width:10 px"/>
                  </button>
                  </div>  
                </div>           
                <div>
                    <span class="text-muted"><t t-esc="item.category"/></span>
                    <h1 class="h5 fs-6"><t t-esc="item.name"/></h1>
                    <span class="text-danger">$<t t-esc="item.price"/></span>
                </div>
            </div>
        </div>
    </div>
  </div>`;

  add(id) {
    this.props.count++;
    this.props.selectedId({ id: id, count: this.props.count });
    this.props.data.map((item) => {
      if (item.id === id) {
        let id = item.id;
        let name = item.name;
        let quantity = 1;
        let price = item.price;
        let total = item.price;
        let image = item.image.thumbnail;
        let newOrder = {
          id,
          name,
          quantity,
          price,
          total,
          image,
        };
        this.props.cart[id] = 1;
        this.props.getOrder(newOrder);
      }
    });
  }

  addQuantity(id) {
    this.props.count++;
    this.props.selectedId({ count: this.props.count });
    this.props.order.map((item) => {
      if (item.id === id) {
        item.quantity++;
        item.total = item.price * item.quantity;
        this.props.cart[id] = item.quantity;
      }
    });
    this.props.getOrder(this.props.order);
  }

  decreaseQuantity(id) {
    this.props.count--;
    this.props.selectedId({ count: this.props.count });
    if (this.props.cart[id] > 1) {
      this.props.order.map((item) => {
        if (item.id === id) {
          item.quantity--;
          item.total = item.price * item.quantity;
          this.props.cart[id] = item.quantity;
        }
      });
      this.props.getOrder(this.props.order);
    } else {
      delete this.props.cart[id];
      const deleteOrder = this.props.order.findIndex((item) => item.id === id);
      this.props.order.splice(deleteOrder, 1);
      this.props.getOrder(this.props.order);
    }
  }
}
