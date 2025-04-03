;(function(b) {

    "use strict"

    if(b == null) {
        return;
    }

    function noop() {};

    class WorkingBuilders {
        static callable(memo, callback) {
            return function(...args) {
                let joinedArgs = args.join(',');
                if(memo.hasRecord(joinedArgs)) {
                    return memo.recall(joinedArgs)
                }
                let result = callback(...args);
                memo.record(joinedArgs, result);
                return result;
            }
        }

        static reseter(memo) {
            return function(condition = false) {
                if(condition == true) {
                    memo.forgetAll();
                }
            }
        }
    }

    class Working {
        constructor(key, callback = noop) {
            this.memo = BrainMemory.temporary('__working__' +   key);
            this.callback = callback;
        }

        build() {
            let callable = WorkingBuilders.callable(this.memo, this.callback);
            callable.reset = WorkingBuilders.reseter(this.memo);
            return callable
        }
    }

    b.working = function(key, callback) {
        return new Working(key, callback).build();
    }

}(BrainMemory));