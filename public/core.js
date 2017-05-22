/*
* core.js
* ====================
* Our main Angluar file
* Module
* Controller
* Functions to handle todos
* Apply to view
*/

// Setup this main module
var TodoApp = angular.module('TodoApp', []);

// Main Controller - Handles all operations of Todo App
function mainController($scope, $http) {

    $scope.formData = {};

    // When we first get to index.html we will instantly get all of the todos
    $http.get('api/todos')
        .success(function (data) {
            $scope.todos = data;

            console.log(data);
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

    // When we click submit on the add form send the text to the Create part of our API
    $scope.createTodo = function () {
        $http.post('api/todos', $scope.formData)
            .success(function (data) {

                // Clear the form data so the user can enter another item in
                $scope.formData = {};

                $scope.todos = data;

                console.log(data);

            })
            .error(function (err) {
                console.log('Error: ' + err);
            });
    };

    
}
