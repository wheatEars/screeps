module.exports = {
	run:function(creep){
		
		if(creep.memory.whichmine==null){
			creep.memory.whichmine=true;
		}
		var containers= creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) ;
            }});
		var ge=creep.room.find(FIND_DROPPED_RESOURCES,{
					filter:(pe)=>{
						return pe.amount>=creep.getActiveBodyparts(CARRY)*50;
					}
		});
		var de=creep.pos.findClosestByRange(ge);
		var targets=[]
            var list=creep.room.memory.structureToFill.filter(function(z){return (Game.getObjectById(z).structureType == STRUCTURE_EXTENSION ||
                                Game.getObjectById(z).structureType == STRUCTURE_SPAWN||
                                Game.getObjectById(z).structureType == STRUCTURE_POWER_SPAWN)&&
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 0 ||
                                Game.getObjectById(z).structureType == STRUCTURE_TOWER && 
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 600||
                                Game.getObjectById(z).structureType == STRUCTURE_NUKER && 
                                Game.getObjectById(z).store.getFreeCapacity(RESOURCE_ENERGY) > 000000;})
            for(var j of list){
                targets.push(Game.getObjectById(j));
            }

      
		//取
		if(creep.store.getUsedCapacity()==0){
          //creep.say(containers.length)
			if(containers.length<2){
				if(creep.pickup(de)==ERR_NOT_IN_RANGE){
					creep.moveTo(de);
				}
			}
			if(containers.length==2){
             // creep.say('wdnm')
				if(creep.memory.whichmine==0){
					if(creep.pickup(de)==ERR_NOT_IN_RANGE){
						creep.moveTo(de);
					}
				}
				else{
					if(!creep.memory.path2){
						var a=creep.withdraw(containers[1],RESOURCE_ENERGY)
						if(a==ERR_NOT_IN_RANGE){
							creep.moveTo(containers[1],{ignoreCreeps:false});
						}
						if(a==0){
							creep.memory.path0=creep.pos.findPathTo(containers[0],{serialize:true});
						}
					}
					else{
						if(creep.withdraw(containers[1],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                            e=creep.moveByPath(creep.memory.path2,{ignoreCreeps:false});
                            if(e==ERR_NOT_FOUND||e==-10){
                                creep.memory.path2=creep.pos.findPathTo(containers[1])
                            }
						}
					}
				}
			}
			if(containers.length==3){
             // creep.say("共产主义")
				if(creep.memory.whichmine){
					if(!creep.memory.path2){
						var a=creep.withdraw(containers[1],RESOURCE_ENERGY)
						if(a==ERR_NOT_IN_RANGE){
							creep.moveTo(containers[1],{ignoreCreeps:false});
						}
						if(a==0){
							creep.memory.path0=creep.pos.findPathTo(containers[0],{serialize:true});
						}
					}
					else{
						if(creep.withdraw(containers[1],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
							e=creep.moveByPath(creep.memory.path2,{ignoreCreeps:false});
                            if(e==ERR_NOT_FOUND||e==-10){
                                creep.memory.path2=creep.pos.findPathTo(containers[1])
                            }
						}
					}
				}
				if(!creep.memory.whichmine){
					if(creep.memory.path3!=null){
						var a=creep.withdraw(containers[2],RESOURCE_ENERGY)
						if(a==ERR_NOT_IN_RANGE){
							creep.moveTo(containers[2],{ignoreCreeps:false});
						}
						if(a==0){
							creep.memory.path1=creep.pos.findPathTo(containers[0],{serialize:true});
						}
					}
					else{
						if(creep.withdraw(containers[2],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
							e=creep.moveByPath(creep.memory.path3,{ignoreCreeps:false});
                            if(e==ERR_NOT_FOUND||e==-10){
                                creep.memory.path3=creep.pos.findPathTo(containers[2])
                            }
						}
					}
				}
			}
		}
		//放
		else{
			if(containers.length<1){
            
				if(creep.transfer(targets[0],RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
					creep.moveTo(targets[0]);
				}
			}
            if(containers.length==2){
                var a=creep.transfer(containers[0],RESOURCE_ENERGY);
                if(a==ERR_NOT_IN_RANGE){
                    creep.moveTo(containers[0])
                }
                if(a==0){
                    creep.memory.whichmine=!creep.memory.whichmine;
                }
            }
			if(containers.length>2&&creep.room.storage==null){
             
				var a=creep.transfer(containers[0],RESOURCE_ENERGY);
				if(a==-9 && creep.memory.whichmine){
					e=creep.moveByPath(creep.memory.path0);
                            if(e==ERR_NOT_FOUND||e==-10){
                                creep.memory.path0=creep.pos.findPathTo(containers[0])
                            }
				}
				if(a==-9&&!creep.memory.whichmine){

					e=creep.moveByPath(creep.memory.path1);
                 
                            if(e==ERR_NOT_FOUND||e==-10){
                                creep.memory.path1=creep.pos.findPathTo(containers[0])
                            }
				}
				if(a==0){
					creep.memory.whichmine=!creep.memory.whichmine;
					if(!creep.memory.whichmine){
						creep.memory.path3=creep.pos.findPathTo(containers[2])
					}
					if(creep.memory.whichmine){
						creep.memory.path2=creep.pos.findPathTo(containers[1])
					}
				}
			}
			else{
				var b=creep.transfer(creep.room.storage,RESOURCE_ENERGY);
				if(b==ERR_NOT_IN_RANGE){
					creep.moveTo(creep.room.storage);
				}
				if(b==0){
					creep.memory.whichmine=!creep.memory.whichmine;
					if(!creep.memory.whichmine){
						creep.memory.path3=creep.pos.findPathTo(containers[2])
					}
					if(creep.memory.whichmine){
						creep.memory.path2=creep.pos.findPathTo(containers[1])
					}
				}
			}
		}
	}
};