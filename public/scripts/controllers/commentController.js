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

            self.showEditCommentForm = function (comment) {                
               
                if (comment == null) {
                    comment = oldComment;
                } else {
                    oldComment = comment;
                }
                
                $('p.comment-text').replaceWith($('p.comment-text'));
                $('p.comment-text').replaceWith("<textarea name='edit-comment-field' ng-model='cc.commentText'>"+  comment.text + "</textarea>");
                $('button[name="edit-comment-btn"]').replaceWith($('button[name="edit-comment-btn"]'));
                $('button[name="edit-comment-btn"]').html("Save");
                $('button[name="edit-comment-btn"]').attr("ng-click", "cc.editComment(comment)");
                $('button[name="edit-comment-btn"]').after("<button name='cancel-edit-comment-btn' class='btn btn-default' ng-click='cc.hideEditCommentForm()'>Cancel</button>")
                
                $compile($(comment))($scope);
                $compile($('p.comment-text'))($scope);
                $compile($('button[name="edit-comment-btn"]'))($scope);
                $compile($('button[name="cancel-edit-comment-btn"]'))($scope);
            }

            self.hideEditCommentForm = function (comment) {
                $('textarea[name="edit-comment-field"]').replaceWith($('textarea[name="edit-comment-field"]'));
                $('textarea[name="edit-comment-field"]').replaceWith("<p class='comment-text'>"+ oldComment.text + "</p>");
                $compile($('textarea[name="edit-comment-field"]'))($scope);

                oldComment.text = $("p.comment-text").text();
                comment = oldComment;

                $('button[name="edit-comment-btn"]').replaceWith($('button[name="edit-comment-btn"]'));
                $('button[name="edit-comment-btn"]').html("Edit");
                $('button[name="edit-comment-btn"]').attr("ng-click", "cc.showEditCommentForm(comment)");
                $compile($('button[name="edit-comment-btn"]'))($scope);

                $('button[name="cancel-edit-comment-btn"]').remove();
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