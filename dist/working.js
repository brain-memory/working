;(function(b) {

    function noop() {};

    b.working = function(key, callback = noop) {
        const memo = BrainMemory.temporary('__working__' +   key);
        
        return function(...args) {
            if(memo.hasRecord(args.join(','))) {
                return memo.recall(args.join(','))
            }
            let result = callback(...args);
            memo.record(args.join(','), result);
            return result;
        }
    }

}(BrainMemory));