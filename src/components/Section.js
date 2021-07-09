export default class Section {
    _id;
    _items;
    _renderer;
    _containerSelector;

    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    addItem(item, isPrepend) {
        isPrepend ? this._containerSelector.prepend(item) : this._containerSelector.append(item);
    }

    render() {
        this._items.forEach(item => {
            this._renderer({
                name: item.name,
                link: item.link,
                _id: item._id,
                owner: item.owner,
                likes: item.likes
            });
        })
    }
}