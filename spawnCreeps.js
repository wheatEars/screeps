var SourceKeeper = require('SourceKeeper');
module.exports = {
	run:function(i){
		var j=Game.rooms[i];
		var transfers=0
		var miners=0
		var workers=0
		var upgraders=0
		var queens=0
		var carriers=0
		var minetransfers=0
		 //console.log(reportCreeps(i));
		 // j.memory.renewReport=2
		 function reportCreeps(roomname){
           //console.log("renewing report in"+ i);
	    	for(var m in Game.creeps){
	    		var creep=Game.creeps[m];
	    		if(creep.memory.role == 'transfer'&&creep.room.name==roomname){
	        		transfers++;
	        	}
	        	if(creep.memory.role == 'miner'&&creep.room.name==roomname){
	        		miners++;
	        	}
	        	if(creep.memory.role == 'worker'&&creep.room.name==roomname){
	        		workers++;
	        	}
	        	if(creep.memory.role == 'upgrader'&&creep.room.name==roomname){
	        		upgraders++;
	        	}
	        	if(creep.memory.role == 'queen'&&creep.room.name==roomname){
	        		queens++;
	        	}
	        	if(creep.memory.role == 'carrier'&&creep.room.name==roomname){
	        		carriers++;
	        		
	        	}
	        	if(creep.memory.role == 'mt'&&creep.room.name==roomname){
	        		minetransfers++;
	        	}
	    	}
	    	j.memory.report=new Array();
	    	j.memory.report.push(transfers);
	    	j.memory.report.push(miners);
	    	j.memory.report.push(workers);
	    	j.memory.report.push(upgraders);
	    	j.memory.report.push(queens);
	    	j.memory.report.push(carriers);
	    	j.memory.report.push(minetransfers);
	    	return j.memory.report
	    }
	    for(var spawnn in Game.spawns){
	    	if(Game.spawns[spawnn].spawning!=null){
	    		reportCreeps(i)
	    	}
	    }
		for(var name in Memory.creeps) {
	        if(!Game.creeps[name]&&Memory.creeps[name].roomname==i) {
	        	reportCreeps(i)
	            delete Memory.creeps[name];
	            console.log('Clearing non-existing creep memory:', name);
	        }
	    }
	   
		
		
	    var roomLevel=j.controller.level;
		//房间单位数量配置
		var roomCreepNum=[
			[0,0,0,0,0,1,1,1],
			[0,0,0,0,0,0,0,0],
			[0,1,2,1,1,1,2,1],
			[1,3,5,2,6,5,1,1],
			[0,0,0,0,0,1,1,1],
			[0,0,1,1,2,2,2,2],
			[1,1,3,3,3,0,0,0]
						];
		//身体配件配置
		//工人
		var wcreep=[
			[WORK,CARRY,MOVE,MOVE],
		    [WORK,CARRY,MOVE,MOVE],
		    [WORK,WORK,CARRY,CARRY,MOVE,MOVE],
		    [WORK,WORK,CARRY,CARRY,MOVE,MOVE],//[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
		    [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
		    [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],//[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
		    [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
		    [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
   				  ];
   		//升级者
		var ucreep=[
		 	[WORK,CARRY,MOVE,MOVE],
		 	[WORK,WORK,CARRY,MOVE,MOVE],
		 	[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY],
		 	[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
		 	[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
		 	[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
		 	[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
		 	[WORK,CARRY,MOVE]
		 			];
		//中央转运
		var qcreep=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE];
		//填东西的
		var ccreep=[
			[CARRY,CARRY,MOVE,MOVE],
			[CARRY,CARRY,MOVE,MOVE],
			[CARRY,CARRY,MOVE],
			[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
			[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
			[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
			[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE],
			[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
					];
		//矿机搬运工
		var mtcreep=[
			[CARRY,MOVE,CARRY,MOVE],
			[CARRY,MOVE,CARRY,MOVE],
            [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
            [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,MOVE],
			[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,CARRY,MOVE]
					];

		//生成部分

	    for(var flagName in Game.flags){
	        var flag = Game.flags[flagName]
	        if(flag.color == COLOR_YELLOW && (flag.secondaryColor == COLOR_YELLOW||flag.secondaryColor == COLOR_WHITE)&&flag.room.name==i){
	        	
	            main(flag)
	        }
	    }
	    
	    
	    if(j.memory.report[0] < roomCreepNum[0][roomLevel-1]&&Game.getObjectById(j.memory.mineral).mineralAmount>0) {
	        var newName = 'Transfer' + Game.time;
	        console.log(i+'Spawning new transfer: ' + newName);
	        getAvaliableSpawn(i).spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE], newName,
	            {memory: {role: 'transfer',roomname:i}});
	    }
	     
	    if(j.memory.report[1] < roomCreepNum[1][roomLevel-1]) {
	        var newName = 'Miner' + Game.time;
	        console.log(i+'Spawning new mineer: ' + newName);
	        getAvaliableSpawn(i).spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName,
	            {memory: {role: 'miner',roomname:i}});
	    }
	    
	    if(j.memory.report[2] < roomCreepNum[2][roomLevel-1]&&j.find(FIND_CONSTRUCTION_SITES).length) {
	        var newName = 'Worker' + Game.time;
	        console.log(i+'Spawning new worker: ' + newName);
	        getAvaliableSpawn(j.name).spawnCreep(wcreep[roomLevel-1], newName,
	            {memory: {role: 'worker',roomname:i}});
	    }
	    
	    if(j.memory.report[3] < roomCreepNum[3][roomLevel-1]) {
	        var newName = 'Upgrader' + Game.time;
	        console.log(i+'Spawning new upgrader: ' + newName);
	        getAvaliableSpawn(i).spawnCreep(ucreep[roomLevel-1], newName,
	            {memory: {role: 'upgrader',roomname:i}});
	    }
	   
	    if(j.memory.report[4] < roomCreepNum[4][roomLevel-1]) {
	        var newName = 'Queen' + Game.time;
	        console.log(i+'Spawning new queen: ' + newName);
	        getAvaliableSpawn(i).spawnCreep(qcreep, newName,
	            {memory: {role: 'queen',roomname:i}});
	    }
	    
	    if(j.memory.report[5] < roomCreepNum[5][roomLevel-1]) {
	        var newName = 'Carrier' + Game.time;
	        console.log(i+'Spawning new carrier: ' + newName);
	        getAvaliableSpawn(i).spawnCreep(ccreep[roomLevel-1], newName,
	            {memory: {role: 'carrier',roomname:i}});
	    }
	   
	    if(j.memory.report[6] < roomCreepNum[6][roomLevel-1]) {
	        var newName = 'Minetransfer' + Game.time;
	        console.log(i+'Spawning new minetransfer: ' + newName);
	        getAvaliableSpawn(j.name).spawnCreep(mtcreep[roomLevel-1], newName,
	            {memory: {role: 'mt',roomname:i}});
	    }
		function main(flag){
		    const creep0 = Game.creeps[flag.name + '_0']
		    const creep1 = Game.creeps[flag.name + '_1']
		    const dyingTick = 50;//其中一个寿命不足50就生产另一个，常数可以调整，也可以不用常数
		    var needToSpawnName = null;
		    if(!creep0 && !creep1){
		        needToSpawnName = flag.name + '_1'
		    }
		    if(creep0){
		        SourceKeeper.run(creep0,flag)
		        if(!creep1 & creep0.ticksToLive <= dyingTick){
		            needToSpawnName = flag.name + '_1';
		        }
		    }
		    if(creep1){
		        SourceKeeper.run(creep1,flag)
		        if(!creep0 & creep1.ticksToLive <= dyingTick){
		            needToSpawnName = flag.name + '_0';
		        }
		    }
		    if(needToSpawnName){

		        var spawn = getAvaliableSpawn(flag.room.name)
		        if(spawn){
		        	var body;
		        	if(flag.secondaryColor==COLOR_WHITE){
		        		if(!flag.memory.source){
		        			source = flag.pos.findInRange(FIND_MINERALS,1)[0]
            				flag.memory.source = source.id;
            			}
			        	if(Game.getObjectById(flag.memory.source).mineralAmount>0&&flag.room.controller.level>=6){
			        		body=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
			    		}
			    	}
		    		else{
			            switch(flag.room.controller.level){
			            	case 1: body=[WORK,MOVE];
			            			break;
			            	case 2: body=[WORK,WORK,MOVE];
			            			break;
			            	case 3: body=[WORK,WORK,WORK,WORK,MOVE];
			            			break;
			            	case 4: body=[WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE];
			            			break;
			            	case 5: body=[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
			            			break;
			            	case 6: body=[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
			            			break;
			            	case 7: body=[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
			            			break;
			            	case 8: body=[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
			            			break;
			            }
		    		}
		            spawn.spawnCreep(body,needToSpawnName,{memory: {roomname:i}})
		        }
		    }
		}
		var nukers = _.filter(Game.creeps, (creep) => creep.memory.role == 'nuker');
		    if(nukers.length < 0) {
		        var newName = 'Saber' + Game.time;
		        
		        console.log('Spawning new Saber: ' + newName);
		        getAvaliableSpawn('E15N48').spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE], newName,
		            {memory: {role: 'nuker',roomname:'E17N42'}});
		    }
		    var dms = _.filter(Game.creeps, (creep) => creep.memory.role == 'dm');
		    if(dms.length < 0) {
		        var newName = 'depo' + Game.time;
		        
		        console.log('Spawning new depo: ' + newName);
		        getAvaliableSpawn('E17N41').spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{memory:{role:'dm',roomname:'E17N41',working:'false'}})
		    }
            if(j.storage&&Game.time%5==1){
		    console.log('Storage report in '+i+'，energy left：'+j.storage.store[RESOURCE_ENERGY]);
            }
		       
		 
		//找到可以该房间内空闲的spawn
		function getAvaliableSpawn(roomName){
		    for (var spawnName in Game.spawns){
		        var spawn = Game.spawns[spawnName]
		        if(spawn.room.name == roomName && spawn.spawning == null){
		            return spawn
		        }
		    }
		     for (var spawnName in Game.spawns){
		        var spawn = Game.spawns[spawnName]
		        if(spawn.room.name == roomName){
		            return spawn
		        }
		    }
		}
		 
    }
}
