export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addNewItem(element){
        this._container.prepend(element);
    }

    addItem(element){
        this._container.append(element);
    }

    renderCard(cards) {
        cards.forEach(item => {
            this._renderer(item);
        });
    }
}