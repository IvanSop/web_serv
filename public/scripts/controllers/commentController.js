/**
 * Created by Ivan on 23-Jun-16.
 */
angular.module('myApp').controller('commentController',
    ['$scope','$compile', '$http', '$timeout', 'AuthService', '$filter', 'CommentService',
        function ($scope, $compile, $http, $timeout, AuthService, $filter, CommentService) {
            var self = this;
            
            self.init = function () {
                
                self.allComments = [];


                CommentService.getComments()
                    .then(function (response) {
                        self.allComments = CommentService.getAllCommentList();
                        //console.log(response);
                    })
                

            }
            self.init();

            self.postComment = function () {
                // thjis actually works, accessing parents variables
                var comment1 = {};
                comment1.parent = $scope.tc.selectedId; // possible andgular.copy>
                comment1.text = self.commentText;
                comment1.author = $scope.tc.me.username;

                // timestamp defaults to now
                CommentService.createComment(comment1)
                    .then(function (response) {
                        console.log("comment posted");
                        console.log(response);
                        var comment = {};
                        comment.parent = response.parent;
                        comment.author = response.author;
                        comment.text = response.text;
                        comment.timestamp = response.timestamp;
                    }, function (response) {
                        
                    })
                
            }
            
            self.deleteComment = function (comment) {
                CommentService.deleteComment(comment)
                    .then(function (response) {
                        // --
                    })
            }

            self.confirmDeletion = function (comment) {
                if (confirm('Are you sure you want to delete selected comment?')) {
                    self.deleteComment(comment);
                } else {
                }
            }

            self.editComment = function (comment) {
                CommentService.editComment(comment)
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {
                        console.log(response);
                    })
            }
            
        }]);