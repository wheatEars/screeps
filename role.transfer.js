var  roleTransfer={
    run: function(creep){
        var e;
        var target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) ;
                    }
        });
        if(!creep.memory.mine){
            creep.memory.mine=creep.pos.findPathTo(target[2],{serialize:true});
        }
        
         
        
       if(creep.store.getFreeCapacity() > 0 ) {
            e=creep.withdraw(target[2],Game.getObjectById(creep.room.memory.mineral).mineralType);
            if(!creep.memory.mine){
                creep.memory.mine=creep.pos.findPathTo(target[2]);
            }
            if(e == ERR_NOT_IN_RANGE) {
                e=creep.moveByPath(creep.memory.mine);      
            }
            if(e==ERR_NOT_FOUND){
                creep.memory.mine=creep.pos.findPathTo(target[2])
            }
            if(e==0&&!creep.memory.storage){
                creep.memory.storage=creep.pos.findPathTo(creep.room.storage,{serialize:true});
            }
        }
        else{
            e=creep.transfer(creep.room.storage, Game.getObjectById(creep.room.memory.mineral).mineralType);
            if(!creep.memory.storage){
                creep.moveTo(creep.room.storage);
            }
            if(e == ERR_NOT_IN_RANGE) {
                e=creep.moveByPath(creep.memory.storage);
            }
            if(e==ERR_NOT_FOUND){
                    creep.memory.storage=creep.pos.findPathTo(creep.room.storage)
                }
            if(e==0&&!creep.memory.mine){
                 creep.memory.mine=creep.pos.findPathTo(target[2],{serialize:true});
            }
            
        }
        
    }
};
module.exports = roleTransfer;