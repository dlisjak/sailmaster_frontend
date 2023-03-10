import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import raf from "raf";

class Container extends PureComponent {
  constructor(props) {
    super(props);

    this.events = [
      "resize",
      "scroll",
      "touchstart",
      "touchmove",
      "touchend",
      "pageshow",
      "load",
    ];

    this.subscribers = [];

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.notifySubscribers = this.notifySubscribers.bind(this);
    this.getParent = this.getParent.bind(this);
  }

  getChildContext() {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
      getParent: this.getParent,
    };
  }

  componentDidMount() {
    this.events.forEach((event) =>
      window.addEventListener(event, this.notifySubscribers)
    );
  }

  componentWillUnmount() {
    this.events.forEach((event) =>
      window.removeEventListener(event, this.notifySubscribers)
    );
  }

  subscribe(handler) {
    this.subscribers = this.subscribers.concat(handler);
  }

  unsubscribe(handler) {
    this.subscribers = this.subscribers.filter(
      (current) => current !== handler
    );
  }

  notifySubscribers(evt) {
    if (!this.framePending) {
      const { currentTarget } = evt;

      raf(() => {
        this.framePending = false;
        const { top, bottom } = this.node.getBoundingClientRect();

        this.subscribers.forEach((handler) =>
          handler({
            distanceFromTop: top,
            distanceFromBottom: bottom,
            eventSource: currentTarget === window ? document.body : this.node,
          })
        );
      });
      this.framePending = true;
    }
  }

  getParent() {
    return this.node;
  }

  render() {
    return (
      <div
        {...this.props}
        ref={(node) => (this.node = node)}
        onScroll={this.notifySubscribers}
        onTouchStart={this.notifySubscribers}
        onTouchMove={this.notifySubscribers}
        onTouchEnd={this.notifySubscribers}
      />
    );
  }
}

Container.childContextTypes = {
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
  getParent: PropTypes.func,
};

export default Container;
