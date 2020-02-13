
module.exports = {
    run: function(creep){
         var target=creep.pos.findClosestByRange(FIND_MY_CREEPS,{
            filter: (targets)=>{
                return targets.hits<targets.hitsMax;
            }
        });
        if(target){
            if(creep.rangedHeal(target)==ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }    
        else{
            //moveTo(Game.getObjectById('').pos)
            const pos=new RoomPosition(48,47,'E14N47');
            creep.moveTo(pos);
        }
    }
};