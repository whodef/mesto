export default class Section {
    // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this.containerSelector = containerSelector;
    }

    // Метод отвечает за отрисовку всех элементов и добавляет его в контейнер
    addItem = (item, arr) => {
        arr ? this.containerSelector.append(item) : this.containerSelector.prepend(item);
    }

    // Отрисовка каждого отдельного элемента
    renderItem = (item) => this._renderer(item);

    // Перебор каждого элемента массива
    rendererItem = () => {
        this._items.forEach(item => {
            this._renderer({
                name: item.name,
                link: item.link
            });
        })
    }
}