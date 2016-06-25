/**
 * Created by Ivan on 23-Jun-16.
 */
angular.module('myApp').factory('CommentService',
    ['$q', '$timeout', '$http', 'AuthService',
        function ($q, $timeout, $http) {
            var allCommentList = [];

            return ({
                getAllCommentList: getAllCommentList,
                createComment: createComment,
                getComments: getComments
            });

            function getAllCommentList() {
                return allCommentList;
            }

            function getComments(id) {
                var promise = $http.post("/getComments", {id: id})
                    .then(function (response) {
                        allCommentList = response.data.data
                        console.log("getComments in serivce");
                        console.log(allCommentList);
                        return response.data.data;
                    }, function (response) {
                        console.log("get comments error");
                    })
                return promise;
            }



            function createComment(comment) {
                var promise = $http.post('/createComment', {comment: comment})
                    .then(function (response) {
                        allCommentList.push(response.data.data);
                        return response.data.data;
                    }, function (response) {
                        console.log('error creating comment ', response.data);
                    });
                return promise;
            }



        }]);