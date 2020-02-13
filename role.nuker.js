module.exports={
	run:function(creep){
		var nuker=Game.getObjectById('5e33ee447271c2b95a67b3cf')
		if(creep.store.getUsedCapacity('XLHO2')==0&&nuker.store.getUsedCapacity('XLHO2')<1000&&creep.ticksToLive>=50){
			creep.say('饿了')
			if(creep.withdraw(creep.room.terminal,'XLHO2')==ERR_NOT_IN_RANGE){
				creep.moveTo(creep.room.terminal)
			}
			
		}
		if(creep.store.getUsedCapacity('XLHO2')!=0){
				if(creep.transfer(nuker,'XLHO2')==ERR_NOT_IN_RANGE){
				creep.moveTo(nuker)
			}
		}
		// var nuker=creep.room.find(FIND_STRUCTURES,{
		// 	filter:(a)=>{
  //                       return (a.structureType == STRUCTURE_POWER_SPAWN) ;
  //                   }
		// })
		// if(creep.store.getUsedCapacity('power')==0&&nuker[0].store.getUsedCapacity('power')==0&&creep.ticksToLive>=50){
		// 	creep.say('饿了')
		// 	if(creep.withdraw(creep.room.terminal,'power')==ERR_NOT_IN_RANGE){
		// 		creep.moveTo(creep.room.terminal)
		// 	}
			
		// }
		// if(creep.store.getUsedCapacity('power')!=0){
		// 		if(creep.transfer(nuker[0],'power')==ERR_NOT_IN_RANGE){
		// 		creep.moveTo(nuker[0])
		// 	}
		// }
	}
}