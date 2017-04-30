'use strict';

import { ToDoModel } from 'todosModel';
import { loadTemplate } from 'loadTemplate';

class ToDoController {
    constructor() {
        this._todoModel = new ToDoModel;
        this._container = $('#container');
    }
    get todoModel() {
        return this._todoModel;
    }

    get container() {
        return this._container;
    }

    getTemplate() {
        const getList = this.todoModel.getList();
        let lodaTemplate = new loadTemplate('todo');
        console.log(getList.result);
        lodaTemplate.getTemplate()
            .then(template => {
                this.container.html(template(getList));
                // attach table filter plugin to inputs
                $('[data-action="filter"]').filterTable();

                $('#todocontainer').on('click', '.panel-heading span.filter', function(e) {
                    debugger;
                    var $this = $(this),
                        $panel = $this.parents('.panel');

                    $panel.find('.panel-body').slideToggle();
                    if ($this.css('display') != 'none') {
                        $panel.find('.panel-body input').focus();
                    }
                });
                $('[data-toggle="tooltip"]').tooltip();
            });

    }

    addTodo() {

        let state = false;
        debugger;
        if ($("#check-state").is(":checked")) {
            state = true;
        } else {
            state = false;
        }
        let todo = {
            text: $("#text-todo").val(),
            category: $("#category-todo").val(),
            state: state
        };

        this.todoModel.createToDo(todo)
            .then((todo) => {
                toastr.success(`TODO "${todo.text}" added!`);
                location.href = '#/todo'
            });
    }
}

export { ToDoController };