var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        require('prototype.Creep.move');
        require('prototype.Creep.move').moveCache.clear();
        var containers= creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) ;
            }});
        var spawn = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN) ;
                    }
        });
             //your codes go here
        var containers= creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) ;
        }});
        if(creep.room.storage!=null){
	        if(creep.store[RESOURCE_ENERGY] == 0) {
                
                if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                
                }
        
            }
            else {
                if(creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
                else if(Game.time%10==1){
                    creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
            } 
        }
        if(containers.length&&!creep.room.storage){
            if(creep.store[RESOURCE_ENERGY] == 0) {
                if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                
                }
        
            }
            else {
                if(creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
                else if(Game.time%10==1){
                    creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
            } 
        }
        if(containers.length==0){

            if(creep.store[RESOURCE_ENERGY]!=0) {
                if(creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
                else if(Game.time%10==1){
                    creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
            }
            else{
            var sources = creep.room.find(FIND_SOURCES);
                var ge=creep.room.find(FIND_DROPPED_RESOURCES,{
                    filter:(pe)=>{
                        return pe.amount>=creep.getActiveBodyparts(CARRY)*50;
                    }
             });
            var de=creep.pos.findClosestByRange(ge);
                if(creep.pickup(de)==ERR_NOT_IN_RANGE){
                    creep.moveTo(de);
                }
            }
        }           
    }
        
};

module.exports = roleUpgrader;