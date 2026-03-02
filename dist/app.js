import { mount as O } from "@odoo/owl";
import { Component as v, onWillStart as w, useState as d } from "@odoo/owl";
import { Component as h, xml as f, useState as j } from "@odoo/owl";
class i extends h {
  static props = {
    data: { type: Array },
    order: { type: !0 },
    selectedId: { type: Function },
    getOrder: { type: Function },
    count: { type: Number },
    cart: { type: Object },
  };
  static template = f`
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
                    <img src="./assets/images/icon-add-to-cart.svg" alt="custom-add-to-cart"/>
                    <span>Add to cart</span>
                  </button>  
                </div>
                <div t-else="">
                  <div class="rounded-5 d-flex justify-content-between gap-4 align-items-center p-lg-1 p-2 w-50 p-md-0 p-md-3 w-md-50 btn-add-to-cart position-absolute bottom-25 start-50 
                   translate-middle-x mb-5 bg-danger" style="bottom : 40px;width:9rem;">
                  
                  <button class="border-white rounded-circle p-0 ms-2" style="width:20px;height:20px;background-color:hsl(14, 86%, 42%);" t-on-click="() => this.decreaseQuantity(item.id)">
                    <img  class="pb-2" src="./assets/images/icon-decrement-quantity.svg" alt="..." style="width:10 px"/>
                  </button>
                  <span class="text-white"><t t-esc="this.props.cart[item.id]"/></span>
                  <button class="border-white rounded-circle p-0 me-2" style="width:20px;height:20px;background-color:hsl(14, 86%, 42%);" t-on-click="() => this.addQuantity(item.id)">
                    <img class="pb-2" src="./assets/images/icon-increment-quantity.svg" alt="..." style="width:10 px"/>
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
  add(e) {
    (this.props.count++,
      this.props.selectedId({ id: e, count: this.props.count }),
      this.props.data.map((t) => {
        if (t.id === e) {
          let { id: s, name: n } = t,
            c = 1,
            l = t.price,
            p = t.price,
            m = t.image.thumbnail,
            u = { id: s, name: n, quantity: c, price: l, total: p, image: m };
          ((this.props.cart[s] = 1), this.props.getOrder(u));
        }
      }));
  }
  addQuantity(e) {
    (this.props.count++,
      this.props.selectedId({ count: this.props.count }),
      this.props.order.map((t) => {
        if (t.id === e)
          (t.quantity++,
            (t.total = t.price * t.quantity),
            (this.props.cart[e] = t.quantity));
      }),
      this.props.getOrder(this.props.order));
  }
  decreaseQuantity(e) {
    if (
      (this.props.count--,
      this.props.selectedId({ count: this.props.count }),
      this.props.cart[e] > 1)
    )
      (this.props.order.map((t) => {
        if (t.id === e)
          (t.quantity--,
            (t.total = t.price * t.quantity),
            (this.props.cart[e] = t.quantity));
      }),
        this.props.getOrder(this.props.order));
    else {
      delete this.props.cart[e];
      let t = this.props.order.findIndex((s) => s.id === e);
      (this.props.order.splice(t, 1), this.props.getOrder(this.props.order));
    }
  }
}
import { Component as g, xml as y, useState as F } from "@odoo/owl";
class a extends g {
  static props = {
    count: { type: Number },
    order: { type: Array },
    total: { type: Number },
    deleteItem: { type: Function },
    confirm: { type: Function },
  };
  static template = y`
        <div class="bg-white d-flex flex-column justify-content-center rounded-3 g-3">
            <h5 class="text-danger pt-3 ps-3" >Your Cart(<t t-esc="this.props.count"/>)</h5>
            <div t-if="this.props.count === 0" class="d-flex flex-column align-items-center pb-5">
              <img class="img-fluid" src="./assets/images/illustration-empty-cart.svg" alt="..."/> 
              <span>Your added items will appear here</span>
            </div>
            <div t-else="" class="d-flex flex-column gap-1">
              <div class="d-flex flex-row justify-content-between border-bottom" t-foreach="this.props.order" t-as="item" t-key="item.id" style="border:#b8d1bf">
                  <div class="ps-3 d-flex flex-column gap-1 ">
                      <h1 class="h5 pt-3"><t t-esc="item.name"/></h1>
                      <div class="d-flex gap-3 pb-3">
                          <span class="text-danger">$<t t-esc="item.quantity"/></span>
                          <span class="text-secondary">@ <t t-esc="item.price"/>$</span>
                          <span class="text-secondary"><t t-esc="item.total"/>$   </span>
                      </div>
                  </div>
                  <button class="border rounded-circle bg-white p-0 mt-3 me-3" style="width:20px;height:20px;" t-on-click="() => this.deleteId(item.id,item.quantity)">
                      <img class="img-fluid fs-1 pb-2" src="../assets/images/icon-remove-item.svg" alt="..."/>
                  </button>
              </div>
              <div class="d-flex justify-content-between align-items-center px-3  ">
                <span>Order Total</span>
                <span class="fw-bold fs-4">$<t t-esc="this.props.total"/></span>
              </div>
              <div class="d-flex gap-2 justify-content-center align-items-center mx-3 my-3 rounded-3" style="background-color : hsl(13, 31%, 94%)">
                <img class="py-3"  src="./assets/images/icon-carbon-neutral.svg" alt="..."/>
                <span>This is a <span class="fw-bold">carbon-netural</span> delivery</span>
              </div>
              <button class="mx-3  d-flex align-items-center rounded-5 mb-3 justify-content-center py-3 text-white" style="background-color : hsl(14, 86%, 42%)" t-on-click="this.props.confirm">
                  <span>Confirm Order</span>
              </button>
            </div>
            
        </div>
    `;
  deleteId(e, t) {
    this.props.deleteItem({ id: e, count: t });
  }
}
import { Component as x, xml as b } from "@odoo/owl";
class r extends x {
  static props = {
    order: { type: Array },
    total: { type: Number },
    start: { type: Function },
  };
  static template = b`
    <div class="container">
        <div class="row">
            <div class="col-xl-6 col-12 col-lg-8">
                <div class="bg-white d-flex gap-3 flex-column ps-3 rounded-2"  >
        <img class="align-self-start py-2 pt-3" src="./assets/images/icon-order-confirmed.svg" alt="..." style="width:25px"/>
        <div class="d-flex flex-column">
            <span class="fw-bold fs-3">Order Comfirmed</span>
            <span class="text-secondary">We hope you enjoy your food!</span>
        </div>
        
        <div  class="d-flex flex-column gap-3 rounded-2  me-4 px-3 py-3" style="background-color : hsl(13, 31%, 94%);">
            <div class="d-flex justify-content-between align-items-center border-bottom pb-3" style="border:#b8d1bf;" t-foreach="this.props.order" t-as="item" t-key="item.id">
                <div class="d-flex gap-2">
                <img t-att-src="item.image" alt="..." class="img-fluid" style="width:60px;height:60px;"/>
                <div class="d-flex flex-column ">
                    <h1 class="h5"><t t-esc="item.name"/></h1>
                    <div class="d-flex gap-3">
                        <span class="text-danger"><t t-esc="item.quantity"/>x</span>
                        <span class="text-secondary">@ $<t t-esc="item.price"/></span>
                    </div>
                </div>
            </div>
            <h1 class="h5">$<t t-esc="item.total"/></h1>
            </div>
             <div class="d-flex justify-content-between align-items-center px-3  ">
                <span>Order Total</span>
                <span class="fw-bold fs-4">$<t t-esc="this.props.total"/></span>
              </div>
        </div>
        <button class="d-flex  align-items-center rounded-5 justify-content-center py-2 text-white me-4 mb-3" style="background-color : hsl(14, 86%, 42%)" t-on-click="this.props.start">
                  <span>Start New Order</span>
        </button>
    </div>
            </div>
        </div>
    </div>
       
    `;
}
class o extends v {
  static template = "Root";
  static components = { ItemCard: i, OrderCard: a, StartOrder: r };
  setup() {
    ((this.list = d({ item: [], newOrder: [] })),
      (this.item = d({ count: 0, cart: {}, total: 0, confirm: !1 })),
      w(async () => {
        await this.dataFetching();
      }));
  }
  async dataFetching() {
    try {
      let t = (await fetch("data.json")).json();
      this.list.item = await t;
    } catch (e) {
      console.log(`Fetching ERROR ${e}`);
    }
  }
  getId = (e) => {
    this.item.count = e.count;
  };
  getNewOrder = (e) => {
    if (!Array.isArray(e)) this.list.newOrder.push(e);
    else this.list.newOrder = e;
    this.item.total = this.list.newOrder.reduce((t, s) => {
      return t + s.total;
    }, 0);
  };
  deleteOrder = (e) => {
    ((this.item.count = this.item.count - e.count),
      delete this.item.cart[e.id]);
    let t = this.list.newOrder.findIndex((s) => s.id === e.id);
    this.list.newOrder.splice(t, 1);
  };
  confirmOrder = () => {
    this.item.confirm = !this.item.confirm;
  };
  startNewOrder = () => {
    (this.list.newOrder.map((e) => {
      delete this.item.cart[e.id];
    }),
      (this.item.count = 0),
      (this.list.newOrder = []),
      (this.item.total = 0),
      (this.item.confirm = !this.item.confirm));
  };
}
var k = await FETCH_TEMPLATES();
O(o, document.body, { templates: k, dev: DEV });
