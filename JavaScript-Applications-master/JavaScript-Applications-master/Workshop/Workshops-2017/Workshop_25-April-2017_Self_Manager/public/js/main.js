'use strict';

import { UserController } from 'userController';
import { ToDoController } from 'todosController';
import { EventController } from 'eventsController';

// routes
let router = new Navigo('#/home', true);
const users = new UserController,
    todos = new ToDoController,
    events = new EventController;

router
    .on({
        '*': function() {
            $("#container").html('');
        },
        '#/events': function() {
            console.log('Events')
        },
        '#/todo': function() {
            console.log('todo');
        },
        '#/auth': function() {
            users.getTemplate();
        },
        '#/signin': function() {
            users.login();
        },

        // Register
        '#/register': function() {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $('#register-form-link').addClass('active');
        },
        '#/register/user': function() {
            users.register()
        },

        // Login
        '#/login': function() {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $('#login-form-link').addClass('active');
        },

        // Logout
        '#/signout': function() {
            users.logout();
        },

        // todos
        '#/todo': function() {
            todos.getTemplate();
        },
        '#/todo/add': function() {
            todos.addTodo()
        },
        //  events

        '#/events': function() {
            events.getTemplate();
        },
        "#/events/add": function() {
            events.addEvents();
        }
    })
    .resolve();