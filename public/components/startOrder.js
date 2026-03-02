import { Component, xml } from "@odoo/owl";

export class StartOrder extends Component {
  static props = {
    order: {
      type: Array,
    },

    total: {
      type: Number,
    },
    start: {
      type: Function,
    },
  };
  static template = xml`
    <div class="container">
        <div class="row">
            <div class="col-xl-5 col-12 col-lg-8">
                <div class="bg-white d-flex gap-3 flex-column ps-3 rounded-2"  >
        <img class="align-self-start py-2 pt-3" src="../assets/images/icon-order-confirmed.svg" alt="..." style="width:25px"/>
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
