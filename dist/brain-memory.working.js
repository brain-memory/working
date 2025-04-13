;(function(b) {

    "use strict"

    if(b == null) {
        return;
    }

    function noop() {};

    function keyFromArgs(args) {
        return args.join(',')
    }

    class WorkingBuilders {
        static callable(memo, callback) {
            return function(...args) {
                let key = keyFromArgs(args);
                if(memo.hasRecord(key)) {
                    return memo.recall(key)
                }
                let result = callback(...args);
                memo.record(key, result);
                return result;
            }
        }

        static reseter(memo) {
            return function(condition = true) {
                if(condition == true) {
                    memo.forgetAll();
                }
            }
        }

        static unset(memo) {
            return function(...args) {
                memo.forget(keyFromArgs(args));
            }
        }
    }

    class Working {

        TEMP_WORKING_PREFIX = "__temp_working__";

        constructor(key, callback = noop) {
            this.memo = BrainMemory.temporary(this.TEMP_WORKING_PREFIX + key);
            this.callback = callback;
        }

        build() {
            let callable = WorkingBuilders.callable(this.memo, this.callback);
            callable.reset = WorkingBuilders.reseter(this.memo);
            callable.unset = WorkingBuilders.unset(this.memo);
            return callable
        }
    }

    b.working = function(key, callback) {
        return new Working(key, callback).build();
    }

}(BrainMemory));