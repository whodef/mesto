export default class Section {
    _items;
    _renderer;
    _containerSelector;

    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._containerSelector.prepend(item);
    }

    render() {
        this._items.forEach(item => this._renderer(item));
    }
}