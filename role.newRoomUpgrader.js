module.exports={
	run:function(creep){
	    if(creep.hits<creep.hitsMax){
            creep.heal(creep);
        }
		if(creep.room.name!='E15N48'){
		    const pos=new RoomPosition(9,39,'E15N48');
			//const pos=new RoomPosition(33,1,'E16N46');
            creep.moveTo(pos);
		}
		
		else{
			if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
	            creep.memory.working = false;
	            creep.say(' harvest');
	        }
	        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
	            creep.memory.working = true;
	            creep.say(' upgrade');
	        }

	        if(creep.memory.working) {
	            if(creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
                	creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                }
	        }
	        if(!creep.memory.working){
			var sources = creep.room.find(FIND_SOURCES);
	            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
	            }
	        }
    	}
	}
};