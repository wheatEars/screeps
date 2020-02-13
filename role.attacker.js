var roleAttacker={
    run:function(creep){
              if(creep.hits<creep.hitsMax){
                  creep.heal(creep);
              }
else{
        if(creep.memory.boost==undefined||creep.memory.boost==null||!creep.memory.boost){
          if(Game.getObjectById('5e3400b25c8cddef8e453c6e').boostCreep(creep)==ERR_NOT_IN_RANGE){
            creep.moveTo(34,42)
          }
          if(Game.getObjectById('5e3400b25c8cddef8e453c6e').boostCreep(creep)==OK){
            Game.getObjectById('5e33dc1283e0213efc2ff1ea').boostCreep(creep)
            Game.getObjectById('5e429559aa995709a2ce7f7d').boostCreep(creep)
            Game.getObjectById('5e33ee447271c2b95a67b3cf').boostCreep(creep)
            creep.memory.boost=true
          }
        }
        else{
        var a=0
        for(var i in Game.flags){
          const flag=Game.flags[i]
          if(flag.name=='dismantle'){
            a=1
            if(creep.room==flag.room){
              wall=flag.pos.findClosestByRange(FIND_STRUCTURES,{filter:(o)=>{return o.structureType == STRUCTURE_WALL}})
              creep.memory.wall=wall.id     
              creep.say(Game.getObjectById(creep.memory.wall).hits,{public:true})
              if(Game.getObjectById(creep.memory.wall)==undefined||Game.getObjectById(creep.memory.wall)==null){
                flag.remove()
              }
              if(creep.dismantle(Game.getObjectById(creep.memory.wall))==ERR_NOT_IN_RANGE){
                creep.moveTo(flag.pos,{ignoreCreeps:false})
              }
            }
            else{
              creep.moveTo(flag.pos,{reusePath:50,ignoreCreeps:false})
            }
          }
        }
        if(!a){
          var targets=creep.room.find(FIND_HOSTILE_STRUCTURES/*{
            filter:(structure)=>{
              return structure.structureType==STRUCTURE_TOWER||
              structure.structureType==STRUCTURE_SPAWN//||
              //structure.structureType==STRUCTURE_RAMPART
            }
          }*/)
          if(creep.dismantle(targets[0])==ERR_NOT_IN_RANGE){
            creep.moveTo(targets[0],{ignoreCreeps:false})
          }
        }
        
      }
        //FIND_HOST_SPAWNS
}
    }
}

module.exports = roleAttacker;