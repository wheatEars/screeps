var  roleCarrier={
    run: function(creep){
//const pos=new RoomPosition(43,16,'E17N43');
          //  creep.moveTo(pos);
        var containers= creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) ;
            }});
                    
        
        if(creep.store.getUsedCapacity() == 0) {
            if(creep.room.storage){
                if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}},{ignoreCreeps:false});
                }
            }
            if(containers.length>0&&creep.room.storage==null){
                if(creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}},{ignoreCreeps:true});
                }
            }
        }
        else {
            var targets=[]
            var list=creep.room.memory.structureToFill.filter(function(z){return (Game.getObjectById(z).structureType == STRUCTURE_EXTENSION ||
                                Game.getObjectById(z).structureType == STRUCTURE_SPAWN||
                                Game.getObjectById(z).structureType == STRUCTURE_POWER_SPAWN)&&
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 0 ||
                                Game.getObjectById(z).structureType == STRUCTURE_LAB&&
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 0 ||
                                Game.getObjectById(z).structureType == STRUCTURE_TOWER && 
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 600||
                                Game.getObjectById(z).structureType == STRUCTURE_NUKER && 
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 300000;})
            for(var j of list){
                targets.push(Game.getObjectById(j));
            }
            if(targets.length!=0){
            var target=creep.pos.findClosestByRange(targets)
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target,{visualizePathStyle: {stroke: '#ffffff'}},{ignoreCreeps:false});
            }
            }
        }
    }
}
module.exports = roleCarrier;