var roleWorker={
    run: function(creep) {
var containers= creep.room.find(FIND_STRUCTURES, {

              filter: (structure) => {

                        return (structure.structureType == STRUCTURE_CONTAINER) ;

            }});
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say(' harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say(' work');
        }

        if(creep.memory.working) {
            var target=creep.room.find(FIND_CONSTRUCTION_SITES);
            if(target.length){
                if(creep.build(target[0])==ERR_NOT_IN_RANGE){
                    creep.moveTo(target[0]);
                 }
            }
        }
         var spawn = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN) ;
                    }
        });
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) ;
                    }
            
        });
         var de=creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
         if(containers&&!creep.room.storage){
            if(creep.store.getFreeCapacity() > 0 && !creep.memory.working) {
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
        else{
            if(creep.store.getFreeCapacity()  > 0&&!creep.memory.working) {
                if(creep.withdraw(targets[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};
module.exports = roleWorker;