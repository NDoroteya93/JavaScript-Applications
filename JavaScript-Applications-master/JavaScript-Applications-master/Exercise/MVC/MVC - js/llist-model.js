'use stric';

////////////////// MODEL ////////////////////
// The model stores items and notifies observers about changes

class ListModel {
    constructor(items) {
        this.items = items;
        this._selectedIndex = -1;

        this.itemAdded = new Event(this);
        this.itemRemoved = new Event(this);
        this.selectedIndexChanged = new Event(this);
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(value) {
        this._selectedIndex = value;
    }

    getItems() {
        return [].concat(this.items);
    }

    addItem(item) {
        this.items.push(item);
        this.itemAdded.notify({ item: item });
    }

    removeItemAt(index) {
        let item;
        item = this.items[index];
        this.items.splice(index, 1);
        this.itemRemoved.norify({ item: item })
        if (index === this.selectedIndex) {
            this.selectedIndex(-1);
        }
    }

    getSelectedIndex() {
        return this.selectedIndex;
    }

    setSelectedIndex(index) {
        let previousIndex;

        previousIndex = this.selectedIndex;
        this.selectedIndex = index;
        this.selectedIndexChanged.notify({ previous: previousIndex });
    }

}


// Event is simple class for implementing the Observer pattern 

class Event {
    constructor(sender) {
        this.sender = sender;
        this._listener = [];
    }

    get sender() {
        return this._sender;
    }

    set sender(value) {
        this._sender = value;
    }

    get listener() {
        this._listener;
    }

    attach(listener) {
        this.listener.push(listener);
    }

    notify(args) {
        let index;

        for (index = 0; index < this.listener.length; index++) {
            this.listener[index](this.sender, args);
        }
    }
}


//////////////////////////// VIEW ////////////////////////////////
// The View presents the model and provides the UI elements.
// The controller attached to these events to handle the user interaction 

class ListView {
    constructor(model, elements) {
        this.model = model;
        this.elements = elements;

        this.listModified = new Event(this);
        this.addButtonClicked = new Event(this);
        this.delButtonClicked = new Event(this);
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    attachModel() {
        let self = this;

        this.model.itemAdded.attach(() => {
            self.rebuildList();
        });

        this.model.itemRemoved.attach(() => {
            self.rebuildList();
        });

        return this;
    }

    attachListener() {
        let self = this;

        this.elements.list.change(() => {
            self.listModified.notify({ index: e.target.selectedIndex });
        });

        this.elements.addButton.click(() => {
            self.addButtonClicked.notify();
        });

        this.elements.delButton.click(() => {
            self.delButtonClicked.notify();
        })
    }

    show() {
        this.rebuildList();
    }

    rebuildList() {
        let list, items, key;

        list = this.elements.list;
        list.html('');

        items = this.model.getItems();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                list.append($('<option>' + items[key] + '</option>'))
            }
        }

        this.model.selectedIndex(-1);
    }
}


//////////////////////////////// CONTROLLER ////////////////////////////////////////

//  The Controller responds to user actions and invokes changes on the model

class ListController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        return this._model = value;
    }

    get view() {
        return this._view;
    }

    set view(value) {
        this._view = value;
    }

    attach() {
        let self = this;

        this.view.listModified.attach((sender, args) => {
            self.updateSelected(args.index);
        });

        this.view.addButtonClicked.attach(() => {
            self.addItem();
        });

        this.view.addButtonClicked.attach(() => {
            self.delItem();
        });


        return this;
    }
    addItem() {
        let item = window.prompt('Add Item', '');
        if (item) {
            this.model.addItem(item);
        }
    }

    delItem() {
        let index;
        index = this.model.getSelectedIndex();

        if (index !== -1) {
            this.model.removeItemAt(this.model.getSelectedIndex());
        }
    }

    updateSelected(index) {
        this.model.setSelectedIndex(index);
    }
}

$(function() {
    let model = new ListModel(['PHP', 'JavaScript']),
        view = new ListView(model, {
            'list': $('#list'),
            'addButton': $('#plusBtn'),
            'delButton': $('#minusBtn')
        }).attachListener().attachModel(),
        controller = new ListController(model, view).attach();
    console.log(model);
    view.show();

});