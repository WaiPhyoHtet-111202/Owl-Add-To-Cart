import { Component, xml, useState } from "@odoo/owl";

export class OrderCard extends Component {
  static props = {
    count: {
      type: Number,
    },
    order: {
      type: Array,
    },

    total: {
      type: Number,
    },

    deleteItem: {
      type: Function,
    },

    confirm: {
      type: Function,
    },
  };

  static template = xml`
        <div class="bg-white d-flex flex-column justify-content-center rounded-3 g-3">
            <h5 class="text-danger pt-3 ps-3" >Your Cart(<t t-esc="this.props.count"/>)</h5>
            <div t-if="this.props.count === 0" class="d-flex flex-column align-items-center pb-5">
              <img class="img-fluid" src="../assets/images/illustration-empty-cart.svg" alt="..."/> 
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
                <img class="py-3"  src="../assets/images/icon-carbon-neutral.svg" alt="..."/>
                <span>This is a <span class="fw-bold">carbon-netural</span> delivery</span>
              </div>
              <button class="mx-3  d-flex align-items-center rounded-5 mb-3 justify-content-center py-3 text-white" style="background-color : hsl(14, 86%, 42%)" t-on-click="this.props.confirm">
                  <span>Confirm Order</span>
              </button>
            </div>
            
        </div>
    `;

  deleteId(id, quantity) {
    this.props.deleteItem({ id: id, count: quantity });
  }
}
