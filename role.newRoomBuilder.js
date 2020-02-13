module.exports={
	run:function(creep){
	   if(creep.hits<creep.hitsMax){
            creep.heal(creep);
        }
		if(creep.room.name!='E15N48'){
		    const pos=new RoomPosition(9,39,'E15N48');
			//const pos=new RoomPosition(34,1,'E16N46');
            creep.moveTo(pos);
		}
	
		else{
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
	        if(!creep.memory.working){
			var sources = creep.room.find(FIND_SOURCES);
	            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
	                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
	            }
	        }
    	}
	}
};