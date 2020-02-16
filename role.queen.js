/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.queen');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    

    
    run:function(creep){
        var resource=[RESOURCE_ENERGY,
        RESOURCE_HYDROXIDE,
        RESOURCE_ZYNTHIUM_KEANITE,
        RESOURCE_UTRIUM_LEMERGITE,
        RESOURCE_UTRIUM_HYDRIDE,
        RESOURCE_UTRIUM_OXIDE,
        RESOURCE_KEANIUM_HYDRIDE,
        RESOURCE_KEANIUM_OXIDE,
        RESOURCE_LEMERGIUM_HYDRIDE,
        RESOURCE_LEMERGIUM_OXIDE,
        RESOURCE_ZYNTHIUM_HYDRIDE,
        RESOURCE_ZYNTHIUM_OXIDE,
        RESOURCE_GHODIUM_HYDRIDE,
        RESOURCE_GHODIUM_OXIDE];
        var fa = creep.room.find(FIND_STRUCTURES, {

                    filter: (structure) => {

                        return (structure.structureType == STRUCTURE_FACTORY) ;

                    }
        
        });
      const factory=fa[0]
        if(creep.x!=creep.room.memory.centerX||creep.y!=creep.room.memory.centerY){
            creep.moveTo(creep.room.memory.centerX,creep.room.memory.centerY);
        }
        if(creep.ticksToLive>=5){
        

        creep.withdraw(creep.room.storage,'XZH2O')
        creep.transfer(creep.room.terminal,'XZH2O')
        creep.withdraw(creep.room.terminal,'ghodium_melt')
        creep.withdraw(creep.room.terminal,'battery')
        creep.transfer(creep.room.storage,'battery')
        creep.transfer(creep.room.storage,'G')
        creep.withdraw(creep.room.terminal,'GO')
        creep.transfer(creep.room.storage,'GO')
        creep.transfer(creep.room.terminal,RESOURCE_OXIDANT);
        creep.transfer(creep.room.terminal,'purifier');
        creep.transfer(creep.room.terminal,'reductant');
        creep.transfer(creep.room.terminal,'utrium_bar');
        creep.transfer(creep.room.storage,RESOURCE_ENERGY);
        if(factory!=null){
             if(factory.store.getUsedCapacity(RESOURCE_ENERGY)<20000){
                if(creep.store.getUsedCapacity('energy') == 0) {
                creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
            }
            else{
                creep.transfer(factory,RESOURCE_ENERGY);
            }
            }
            creep.transfer(factory,'ghodium_melt')
            creep.withdraw(factory,'G')
            //压缩o
            creep.withdraw(factory,RESOURCE_OXIDANT);
            creep.withdraw(factory,'utrium_bar');
            creep.withdraw(factory,'reductant');
            creep.withdraw(factory,'purifier');
            creep.withdraw(factory,'battery');
        
         if(factory.store.getUsedCapacity('O')<25000){
              creep.withdraw(creep.room.storage,'O');
              creep.transfer(factory,'O');
          }
          if(factory.store.getUsedCapacity('H')<25000){
              creep.withdraw(creep.room.storage,'H');
              creep.transfer(factory,'H');
          }
          if(factory.store.getUsedCapacity('U')<25000){
              creep.withdraw(creep.room.storage,'U');
              creep.transfer(factory,'U');
          }
          if(factory.store.getUsedCapacity('X')<25000){
              creep.withdraw(creep.room.storage,'X');
              creep.transfer(factory,'X');
          }
        //  creep.withdraw(factory,'O');
           
        
        //if(factory.store.getUsedCapacity(RESOURCE_OXIDANT)<30000){
        //     creep.withdraw(creep.room.terminal,RESOURCE_OXIDANT);
        //     creep.transfer(factory,RESOURCE_OXIDANT);
        // }

         }
        if(creep.room.terminal!=null){
        if(creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY)<120000){
            if(creep.store.getUsedCapacity('energy') == 0) {
                creep.withdraw(creep.room.storage,RESOURCE_ENERGY);
            }
            else{
                creep.transfer(creep.room.terminal,RESOURCE_ENERGY);
            }
        }
        if(creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY)>140000){
            creep.withdraw(creep.room.terminal,RESOURCE_ENERGY);
            creep.transfer(creep.room.storage,RESOURCE_ENERGY);
        }
        }
        creep.withdraw(Game.getObjectById(creep.room.memory.endlink),RESOURCE_ENERGY);
        
        }
    }
};