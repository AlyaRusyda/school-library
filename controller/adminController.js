const { request, response } = require('express')
const adminModel = require('../models/index').admin
const Op = require('sequelize').Op
const md5 = require(`md5`)
let password = md5('password')

exports.getAllAdmin = async (req, res) => {
    let admins = await adminModel.findAll()
    return res.json({
        success: true,
        data: admins,
        message: 'All Admin have been loaded'
    })
}

exports.findAdmin = async (req, res) => {
    let name = request.body.name
    let contact = request.body.contact
    let address = request.body.address

    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: name } },
                { contact: { [Op.substring]: contact } },
                { address: { [Op.substring]: address } },
            ]
        }
    })
    return response.json({
        success: true,
        data: admins,
        message: 'All Admins have been loaded'
    })
}

exports.addAdmin = (request, response) => {
    let newAdmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request.body.password)
    }
    console.log(newAdmin)
    adminModel.create(newAdmin)
        .then(result => {
        return response.json({
            success: true,
            data: result,
            message: `New admin has been inserted`
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updateAdmin = (request, response) => {
    let dataAdmin = {
        name: request.body.name,
        contact: request.body.contact,
        address: request.body.address,
        username: request.body.username,
        password: md5(request.body.password)
    }
    console.log(dataAdmin)
    let idAdmin = request.params.id
    adminModel.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
        })
    })
}

exports.deleteAdmin = (request, response) => {
    let idAdmin = request.params.id
    adminModel.destroy({ where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message,
            })
        })
    }        