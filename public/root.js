import { Component, onWillStart, useState } from "@odoo/owl";
import { ItemCard } from "./components/ItemCard";
import { OrderCard } from "./components/orderCard";
import { StartOrder } from "./components/startOrder";
export class Root extends Component {
  static template = "Root";
  static components = { ItemCard, OrderCard, StartOrder };

  setup() {
    this.list = useState({
      item: [],
      newOrder: [],
    });

    this.item = useState({
      count: 0,
      cart: {},
      total: 0,
      confirm: false,
    });

    onWillStart(async () => {
      await this.dataFetching();
    });
  }

  async dataFetching() {
    try {
      const response = await fetch("data.json");
      const data = response.json();
      this.list.item = await data;
    } catch (error) {
      console.log(`Fetching ERROR ${error}`);
    }
  }

  getId = (data) => {
    this.item.count = data.count;
  };

  getNewOrder = (order) => {
    if (!Array.isArray(order)) {
      this.list.newOrder.push(order);
    } else {
      this.list.newOrder = order;
    }
    this.item.total = this.list.newOrder.reduce((sum, item) => {
      return sum + item.total;
    }, 0);
  };

  deleteOrder = (data) => {
    this.item.count = this.item.count - data.count;
    delete this.item.cart[data.id];
    const deleteItem = this.list.newOrder.findIndex(
      (item) => item.id === data.id,
    );
    this.list.newOrder.splice(deleteItem, 1);
  };

  confirmOrder = () => {
    this.item.confirm = !this.item.confirm;
  };

  startNewOrder = () => {
    this.list.newOrder.map((item) => {
      delete this.item.cart[item.id];
    });
    this.item.count = 0;
    this.list.newOrder = [];
    this.item.total = 0;
    this.item.confirm = !this.item.confirm;
  };
}
