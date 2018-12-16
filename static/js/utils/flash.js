class Loader {
    constructor(message) {
        this.message = message;
        this._id = this.generateId();
        this.init();
    }
    init() {
        const container = document.createElement('div');
        container.setAttribute('id', this._id);
        container.setAttribute('style', `
        position: absolute;
        top: 30px;
        left: 30px;
        background: white;
        border: 0.5px solid lightgray;
        z-index: 1;
        border-radius: 10px;
        padding: 30px;
       `);
        container.innerText = this.message;
        document.body.appendChild(container);
    }
    generateId() {
        const time = new Date().getTime();
        return `loader_${time}`;
    }
    destroy() {
        document.getElementById(this._id).remove();
    }
}