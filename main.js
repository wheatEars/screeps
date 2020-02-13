var roleUpgrader = require('role.upgrader');
var spawnCreeps=require('spawnCreeps')
var roleClaimer = require('role.claimer');
var roleQueen = require('role.queen');
var roleMiner = require('role.miner');
var roleDoctor = require('role.doctor');
var roleTransfer = require('role.transfer');
var roleWorker = require('role.worker');
var roleCarrier = require('role.carrier');
var roleAttacker = require('role.attacker');
var roleMinetransfer = require('role.mineTransfer');
var roleNewRoomBuilder = require('role.newRoomBuilder');
var roleNewRoomupgrader = require('role.newRoomUpgrader');
var Visualizer_1 = require("./Visualizer");
var labCtrl = require('labCtrl');

module.exports.loop = function () {
 labCtrl.run('E17N42','ZH',500)
    // labCtrl.run('E17N42','XZHO2',2001)
    //delete Memory.rooms['E15N48'].structureToFill
	require('prototype.Creep.move');
     require('prototype.Creep.move').moveCache.clear();
    //delete Memory.flags['depo']
    // for(i in Game.creeps){
    // 	Game.creeps[i].memory.roomname=Game.creeps[i].room.name
    // }
    if(Game.time%1==0){
  	Game.getObjectById('5e00dbbe48a65bacf122c64f').processPower()
    }
    function factory(rn){return Game.rooms[rn].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_FACTORY) ;
                    }
        });}
    if(Game.rooms['E17N43'].storage.store.getUsedCapacity('energy')>=500000){
        factory('E17N43')[0].produce('battery');
    }
  if(Game.rooms['E17N42'].storage.store.getUsedCapacity('energy')>=500000){
        factory('E17N42')[0].produce('battery');
    }
    //if(Game.rooms['E17N41'].storage.store.getUsedCapacity('energy')>=500000){
    //    factory('E17N41')[0].produce('battery');
    //}
    factory('E17N42')[0].produce(RESOURCE_OXIDANT);
   var Myrooms=['E17N42','E17N43','E17N41','E15N48'];
   for(var i of Myrooms){
   	var r=Game.rooms[i]
   	if (!r.memory.mineral){
   			r.memory.mineral=r.find(FIND_MINERALS)[0].id
   	}
    	spawnCreeps.run(i);
    	//Game.rooms['E17N43'].memory.structureToFill=null
    	if(!Game.rooms[i].memory.structureToFill){
            var list = Game.rooms[i].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return  structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN||
                                structure.structureType == STRUCTURE_TOWER||
                                structure.structureType == STRUCTURE_NUKER||
                                structure.structureType == STRUCTURE_LAB||
                                structure.structureType == STRUCTURE_POWER_SPAWN;
                    }
            });
            Game.rooms[i].memory.structureToFill=[]
            for(j of list){
                Game.rooms[i].memory.structureToFill.push(j.id);
            }
        }
    	if(!Game.rooms[i].memory.tower){
    		Game.rooms[i].memory.tower=Game.rooms[i].find(FIND_STRUCTURES,{
    			filter:(structure)=>{
    				return structure.structureType==STRUCTURE_TOWER;
    			}
    		});
    	}
    	for(var j of Game.rooms[i].memory.tower){
    		const towers=Game.getObjectById(j.id)
        		var closestHostile = towers.pos.findClosestByRange(FIND_HOSTILE_CREEPS,{
            		filter: (target)=>{
               			 return target.owner.username!="EricGuo";
            		}
        		});
        		var closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            		filter: (structure) => {
                			return (structure.hits < structure.hitsMax*0.6&&structure.structureType!=STRUCTURE_WALL&&structure.structureType!=STRUCTURE_RAMPART||
                					structure.hits < structure.room.controller.level*180000 &&structure.structureType==STRUCTURE_WALL||structure.hits <structure.room.controller.level*200000 &&structure.structureType==STRUCTURE_RAMPART);
            			}
        		});
        		if(closestHostile) {
        		    towers.attack(closestHostile);
        		}
        		else if(closestDamagedStructure) {
        		    towers.repair(closestDamagedStructure);
        		}

    		
    	}
	}
    for(i in Game.spawns){
        if(i.spawning) {
            var spawningCreep = Game.creeps[i.spawning.name];
            i.room.visual.text(
                '' + spawningCreep.memory.role,
                i.pos.x + 1,
                i.pos.y,
                {align: 'left', opacity: 0.8});
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role){
        	case 'upgrader':roleUpgrader.run(creep);
        					break;
        	case 'worker':  roleWorker.run(creep);
        					break;
        	case 'transfer':roleTransfer.run(creep);
        					break;
        	case 'carrier': roleCarrier.run(creep);
        					break;
        	case 'attacker':roleAttacker.run(creep);
        					break;
        	case 'doctor':  roleDoctor.run(creep);
        					break;
        	case 'queen':   roleQueen.run(creep);
        					break;
        	case 'miner':   roleMiner.run(creep);
        					break;
        	case 'claimer': roleClaimer.run(creep);
        					break;
        	case 'mt':      roleMinetransfer.run(creep);
        					break;
        	case 'nb':      roleNewRoomBuilder.run(creep);
        					break;
        	case 'nu':      roleNewRoomupgrader.run(creep);
        					break;
        	case 'nuker':   require("role.nuker").run(creep);
        					break;
        	case 'ds':   require("dismantler").run(creep);
        					break;
        	case 'dm':   require("depoMiner").run(creep);
        					break;
        }
    
    }
    const link1=Game.rooms['E17N42'].lookForAt('structure',39,27)[0];
    const link2=Game.rooms['E17N42'].lookForAt('structure',6,27)[0];
    const link3=Game.rooms['E17N43'].lookForAt('structure',26,24)[0];
    const link4=Game.rooms['E17N43'].lookForAt('structure',38,5)[0];
    link2.transferEnergy(Game.getObjectById('5dc9e988658b93e397b2c60c'));
    link1.transferEnergy(Game.getObjectById('5dc9e988658b93e397b2c60c'));
    link4.transferEnergy(Game.getObjectById('5df332eb65ce6628504802ca'));
    link3.transferEnergy(Game.getObjectById('5df332eb65ce6628504802ca'));
    Game.getObjectById('5e130c7e26765a2e0c1ca029').transferEnergy(Game.getObjectById('5e127311f8e2184a13cd9f66'))
    Game.getObjectById('5e12ffb0f8e218725ccdd7e1').transferEnergy(Game.getObjectById('5e127311f8e2184a13cd9f66'))
    Game.getObjectById('5e310130f698f2c736b35b99').transferEnergy(Game.getObjectById('5e2ee71283bdf376fad27eda'))
    Game.getObjectById('5e3107c334750b32dc29059c').transferEnergy(Game.getObjectById('5e2ee71283bdf376fad27eda'))
    //PowerCreep By EricGuo
    const powerSpawn=Game.getObjectById("5e00dbbe48a65bacf122c64f")
    for(const creepName in Game.powerCreeps)
    {
        const creep=Game.powerCreeps[creepName]
        if(!creep.room)
        {
            creep.spawn(powerSpawn)
        }
        else if(creep.ticksToLive<=500)
        {
            if(creep.renew(powerSpawn)==ERR_NOT_IN_RANGE)
            {
                creep.moveTo(powerSpawn)
            }
        }
        
        else if(creep.store.ops>=200)
        {
            if(creep.transfer(creep.room.terminal,RESOURCE_OPS)==ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.room.terminal)
            }
        }
        else {
            if (creep.powers[PWR_GENERATE_OPS].cooldown == 0) {
                console.log(creep.usePower(PWR_GENERATE_OPS))
                
            }
        }
    }
    //PowerCreep Code End
    Visualizer_1.Visualizer.visuals();
    
}