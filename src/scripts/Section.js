export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element){
        this._container.prepend(element);
    }

    renderCard(cards) {
        cards.forEach(item => {
            this._renderer(item);
        });
    }
}