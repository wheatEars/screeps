/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run:function(creep){
        if(creep.x!=23,creep.y!=25){
            creep.moveTo(23,25);
        }
        var mineral=creep.pos.findClosestByRange(FIND_MINERALS);
        creep.harvest(mineral);
    }
};