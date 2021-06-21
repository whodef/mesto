export default class Section {

    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    _clear() {
        this._containerSelector.innerHTML = '';
    }

    // Метод отвечает за отрисовку всех элементов и добавляет его в контейнер
    addItem(item, isPrepend) {
        isPrepend ? this._items.unshift(item) : this._items.push(item);
    }

    // Перебор каждого элемента массива
    render() {
        this._clear();
        this._items.forEach(item => {
            this._containerSelector.append(this._renderer(item));
        });
    }
}