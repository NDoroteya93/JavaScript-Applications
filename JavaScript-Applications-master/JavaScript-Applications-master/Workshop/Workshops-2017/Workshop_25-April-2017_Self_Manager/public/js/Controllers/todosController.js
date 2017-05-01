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
        let todoData;
        const getList = this.todoModel.getList()
            .then(x => todoData = x);

        let lodaTemplate = new loadTemplate('todo');

        lodaTemplate.getTemplate()
            .then(renderer => {

                let output = renderer(todoData.result);

                this.container.html(output);
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

                this.updateState();
            });


    }

    addTodo() {

        let state = false;
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
                location.href = '#/todo';
            })
    }

    updateState() {
        let self = this;
        debugger;
        $('.todo-state').on('change', function() {
            var $checkbox = $(this).find('input');
            var isChecked = $checkbox.prop('checked');
            var id = $(this).attr('data-id');
            self.todoModel.changeState(id, {
                state: isChecked
            }).then(function(todo) {
                toastr.clear();
                toastr.error(`TODO ${todo.text} updated!`);
            });
        });
    }
}

export { ToDoController };