/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('claimer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run:function(creep){
        if(creep.hits<creep.hitsMax){
            creep.heal(creep);
        }
            const pos=new RoomPosition(39,18,'E15N41');
            creep.moveTo(pos);
            creep.claimController(creep.room.controller);
            
        
    }
};