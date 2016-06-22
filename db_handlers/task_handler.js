/**
 * Created by Ivan on 12-Jun-16.
 */
var Task = require('../models/task');
var Project = require('../models/project');

module.exports = {
    createTask: function (task, callback) {
        task.save(function (err, data) {
            if (err) {
                callback('err')
                return 'err';
            }
            callback(data);
        })
    },
    taskExists: function (task, callback) {
        Task.findOne({title: task.title, project: task.project}, function (err, data) {
            callback(data);
        })
    },
    getAllTasks: function (callback) {
        Task.find({}, function (err, data) {
            callback({"data": data})
        })

    },
    updateTask: function (task, callback) {
        Task.findOneAndUpdate({_id: task._id}, {$set: {title: task.title, description: task.description, project: task.project, priority: task.priority, status: task.status, target: task.target}}, function (err, data) {
            callback({"data": data});
        })
    },
    deleteTask: function (task, callback) {
        Task.findOneAndRemove({_id: task._id}, function (err, data) {
            callback({ "data" : data })
        })
    },
    partlyEdit: function (task, callback) {
        Task.findOneAndUpdate({_id: task._id}, {$set: {priority: task.priority, status: task.status, target: task.target}}, function (err, data) {
            console.log(data);
            callback({"data": data});
        })
    }
}