module.exports={
	run:function(creep){
		var a=0
		for(var i in Game.flags){
			const flag=Game.flags[i]
			if(flag.name=='dismantle'){
				a=1
				if(creep.room==flag.room){
					wall=flag.pos.findClosestByRange(FIND_STRUCTURES,{filter:(o)=>{return o.structureType == STRUCTURE_WALL}})
					creep.memory.wall=wall.id
					if(creep.dismantle(Game.getObjectById(creep.memory.wall))==ERR_NOT_IN_RANGE){
						creep.moveTo(flag.pos)
					}
				}
				else{
					creep.moveTo(flag.pos,{reusePath:50,ignoreCreeps:false})
				}
			}
		}
		if(!a){
			var targets=creep.room.find(FIND_HOSTILE_STRUCTURES,{
				filter:(structure)=>{
					return structure.structureType==STRUCTURE_RAMPART
				}
			})
			if(creep.dismantle(targets[0])==ERR_NOT_IN_RANGE){
				creep.moveTo(targets[0])
			}
		}
	}
}