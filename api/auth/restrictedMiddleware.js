const express = require('express');
const bcrypt = require('bcryptjs');

module.exports = {
    userOnly,
    adminOnly,
    modOnly,
    banned
}

// restricted until login.
function userOnly(req, res, next){
    if(req.session && req.session.user){
        next()
    } else {
        res.status(401).json({message: `No user credentials or cookies provided.`});
    }
}

// restricted unless admin.
function adminOnly(req, res, next){
    if(req.session && req.session.user && req.session.user.is_admin){
        next()
    } else {
        res.status(401).json({message: `Administrator access only.`});
    }
}

// restricted unless mod.
function modOnly(req, res, next){
    if(req.session && req.session.user && (req.session.user.is_mod || req.session.user.is_admin)){
        next()
    } else {
        res.status(401).json({message: `Moderator access only.`});
    }
}

// restricted because banned.
function banned(req, res, next){
    if(req.session && req.session.user && req.session.user.is_banned){
        res.status(401).json({message: `User is banned. No access.`});
    } else {
        next();
    }
}