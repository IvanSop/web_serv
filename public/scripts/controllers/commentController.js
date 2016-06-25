/**
 * Created by Ivan on 23-Jun-16.
 */
angular.module('myApp').controller('commentController',
    ['$scope', '$http', '$timeout', 'AuthService', '$filter', 'CommentService',
        function ($scope, $http, $timeout, AuthService, $filter, CommentService) {
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
                var comment = {};
                comment.parent = $scope.tc.selectedId; // possible andgular.copy>
                comment.text = self.commentText;
                comment.author = $scope.tc.me;
                // timestamp defaults to now
                console.log(comment);
                CommentService.createComment(comment)
                    .then(function (response) {
                        console.log("comment posted");
                    }, function (response) {
                        
                    })
                
            }
            
        }]);