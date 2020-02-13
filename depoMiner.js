module.exports={
	isNeed: function () {
            var targetFlag = Game.flags['depo'];
            if (!targetFlag) {
                console.log("\u627E\u4E0D\u5230\u540D\u79F0\u4E3A " + 'depo' + " \u7684\u65D7\u5E1C");
                return false;
            }
            if (Game.flags['depo'].memory.depositCooldown >= 100) {
                delete Memory.flags[targetFlag.name];
                targetFlag.remove();
                return false;
            }
            return true;
        },
    source: function (creep) {
            var targetFlag = Game.flags['depo'];
            if (!targetFlag) {
                console.log("[" + creep.name + "] \u627E\u4E0D\u5230\u540D\u79F0\u4E3A " + 'depo' + " \u7684\u65D7\u5E1C");
                return creep.say('旗呢？');
            }
            if (!targetFlag.pos.isNearTo(creep.pos)) {
                if (targetFlag.memory.travelTime == undefined)
                    targetFlag.memory.travelTime = 0;
                else if (!targetFlag.memory.travelComplete)
                    targetFlag.memory.travelTime++;
                return creep.moveTo(targetFlag.pos, {reusepath:50});
            }
            else
                targetFlag.memory.travelComplete = true;
            var target;
            if (targetFlag.memory.sourceId)
                target = Game.getObjectById(targetFlag.memory.sourceId);
            else {
                target = targetFlag.pos.lookFor(LOOK_DEPOSITS)[0];
                if (target)
                    targetFlag.memory.sourceId = target.id;
                else {
                    delete Memory.flags[targetFlag.name];
                    targetFlag.remove();
                    creep.suicide();
                }
            }
            if (target.cooldown)
                return;
            var harvestResult = creep.harvest(target);
            if (harvestResult == OK) {
                targetFlag.memory.depositCooldown = target.lastCooldown;
                if (!creep.memory.depositType)
                    creep.memory.depositType = target.depositType;
            }
            else
                creep.say("\u91C7\u96C6 " + harvestResult);
        },
    target: function (creep) {
            var target;
            target = Game.getObjectById('5e12c523395703785f6f8bd9');
            if (!target)
                return console.log("[" + creep.name + "] target \u9636\u6BB5\uFF0C\u627E\u4E0D\u5230\u76EE\u6807\u5EFA\u7B51");
            var transferResult = creep.transfer(target, creep.memory.depositType);
            if (transferResult == ERR_NOT_IN_RANGE)
                creep.moveTo(target.pos,{reusepath:50});
            else if (transferResult !== OK)
                creep.say("\u8F6C\u79FB " + transferResult);
        },
    switch: function (creep) {
            var targetFlag = Game.flags['depo'];
            if (!targetFlag)
                return (creep.memory.working = false);
            if (creep.ticksToLive <= (targetFlag.memory.travelTime * 2) + 20) {
                if (creep.store[creep.memory.depositType] == 0)
                    creep.suicide();
                else
                    return (creep.memory.working = true);
            }
            if (!creep.memory.depositType)
                creep.memory.working = false;
            else {
                if (creep.store.getFreeCapacity(creep.memory.depositType) > 0 && creep.memory.working) {
                    creep.say('🍎 挖矿');
                    creep.memory.working = false;
                }
                else if ((creep.store.getFreeCapacity(creep.memory.depositType) <= 0 && !creep.memory.working) ||
                    (targetFlag.memory.depositCooldown >= 100 && !creep.memory.working)) {
                    creep.say('🚛 回家');
                    creep.memory.working = true;
                }
            }
            return creep.memory.working;
        },
	run: function (creep) {
        // 获取是否工作，没有 switch 的话直接执行 target
        const working =  this.switch(creep) 

        // 执行对应操作
        if (working) {
            if (this.target) this.target(creep)
        }
        else {
            if (this.source) this.source(creep)
        }
	}
}