Object.defineProperty(Object.prototype, "each", {
  writable: false,
  enumerable: false,
  configurable: false,
  value: function each(callback) {
    var i, key, ret;

    // check callback
    if (typeof callback !== "function") {
      console.error("callback should be a function");
      return this;
    }

    // Array
    if (Array.isArray(this) === true) {
      for (i = 0; i < this.length; i++) {
        ret = callback.call(this, i, this[i]);

        if      (ret === "break")     break;
        else if (ret === "continue")  continue;
      }
    }

    // Object
    else {
      for (key in this) {
        ret = callback.call(this, key, this[key]);

        if      (ret === "break")     break;
        else if (ret === "continue")  continue;
      }
    }

    return this;
  }
});
