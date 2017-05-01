'use strict';

import { EventModel } from 'eventsModel';
import { loadTemplate } from 'loadTemplate';
import { userModel } from 'userModel';

class EventController {
    constructor() {
        this._eventModel = new EventModel;
        this._userModel = new userModel;
        this._container = $('#container');
    }

    get eventModel() {
        return this._eventModel;
    }

    get userModel() {
        return this._userModel;
    }

    get container() {
        return this._container;
    }

    getTemplate() {

        // render template
        let eventData,
            self = this;
        const users = this.userModel.getList();

        // load template
        const getList = this.eventModel.getList()
            .then(x => eventData = x);

        let lodaTemplate = new loadTemplate('event');

        lodaTemplate.getTemplate()
            .then(renderer => {

                let output = renderer(eventData.result);

                this.container.html(output);

                $('[data-action="filter"]').filterTable();

                // show panel forr add Events
                $('#eventcontainer').on('click', '.panel-heading span.filter', function(e) {
                    debugger;
                    var $this = $(this),
                        $panel = $this.parents('.panel');

                    $panel.find('.panel-body').slideToggle();
                    if ($this.css('display') != 'none') {
                        $panel.find('.panel-body input').focus();
                    }
                });
                $('[data-toggle="tooltip"]').tooltip();

                // Initialize autocomplete with custom appendTo:
                $("#users-events").autocomplete({
                    source: users,
                    appendTo: "#auto-container",
                    multiselect: true,
                });

                // datepicker
                $("#date-events").datepicker();
            });
    }

    addEvents() {
        let $elements = $('.ui-autocomplete-multiselect-item'),
            users = [];
        let $date = $("#date-events").datepicker({ dateFormat: 'dd,MM,yyyy' }).val();

        $elements.each(function() {
            users.push($(this).text());
        });

        let event = {
            title: $("#title-events").val(),
            description: $("#description-events").val(),
            data: $date,
            category: $("#category-events").val(),
            users: users
        }
        this.eventModel.createEvents(event)
            .then((event) => {
                toastr.success(`Event "${event.title}" added!`);
                location.href = '#/events'
            });
    }


}

export { EventController };