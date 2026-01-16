class Component {
  constructor(componentId, name, type, year, status) {
    this.componentId = componentId;
    this.name = name;
    this.type = type;
    this.year = year;
    this.status = status;
  }

  isAvailable() {
    return this.status === "Available";
  }
}

module.exports = Component;