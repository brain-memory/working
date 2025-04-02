;(function(b) {

    function noop() {};

    b.working = function(key, callback = noop) {
        const memo = BrainMemory.temporary('__working__' +   key);
        
        let callable = function(...args) {
            if(memo.hasRecord(args.join(','))) {
                return memo.recall(args.join(','))
            }
            let result = callback(...args);
            memo.record(args.join(','), result);
            return result;
        }

        callable.reset = function() {
            memo.forgetAll();
        }

        return callable;
    }

}(BrainMemory));