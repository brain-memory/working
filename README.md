# 🧠 working - A Brain Memory Plugin

**`working`** is a simple and efficient plugin for the [`brain-memory`](https://github.com/brain-memory/brain-memory) library that helps you **cache** function results in a temporary memory store, making your code faster and more efficient. It is designed to make memoization easy by automatically handling the caching and invalidation of function results.

---

## 🔧 Installation

Ensure you have the [`brain-memory`](https://github.com/brain-memory/brain-memory) library set up in your project. Then, include the `working` plugin **after** loading `BrainMemory` in your script.

1. Include `brain-memory` by adding the following script to your HTML:

    ```html
    <script src="https://cdn.jsdelivr.net/gh/brain-memory/brain-memory@latest/dist/brain-memory.js"></script>
    ```

2. Include the `working` plugin by adding the following script to your HTML:

    ```html
    <script src="https://cdn.jsdelivr.net/gh/brain-memory/working@latest/dist/brain-memory.working.js"></script>
    ```

After including the plugin, `working()` will be globally available for use in your JavaScript code.

## 🚀 Quick Example

```js
// Create a memoized function using 'working'
const multiply = working('math:multiply', (a, b) => {
  console.log('Calculating...');
  return a * b;
});

// Call it the first time
multiply(2, 3);  // Logs "Calculating..." and returns 6

// Call it again with the same arguments
multiply(2, 3);  // Returns the cached result: 6 (no log)

// Unset the cached result
multiply.unset(2, 3); // Removes the cached result

// Call it again; this time it will recalculate
multiply(2, 3);  // Logs "Calculating..." and returns 6
```

---

## 🧩 What Does `working()` Do?

The `working()` function:
- **Caches** the result of a function using `brain-memory`'s temporary memory.
- **Remembers** inputs and their corresponding outputs.
- **Supports cache invalidation** through methods like `.reset()` and `.unset()`.

It leverages the `BrainMemory.temporary()` method to store the cached results and ensures that each key is scoped for a particular function.

---

## ✨ Features

- **Simple to use**: Wraps any function with memoization with just a single call.
- **Fast caching**: Recalls previous results without re-running expensive logic.
- **Flexible cache invalidation**: Reset all results or remove specific ones.
- **Uses `brain-memory`'s scoped memory system**: Automatically handles scoped memory for better organization.

---

## 📘 API

### `working(key: string, callback: Function) → Function`

The `working()` function takes two arguments:

1. **`key`** (string) - A unique identifier for the cached results (used internally by `brain-memory`).
2. **`callback`** (Function) - The function whose results will be cached.

#### The returned function (`fn`) has the following methods:

| Method           | Description                                  |
|------------------|----------------------------------------------|
| `fn.reset()`     | Clears all cached results for this function. |
| `fn.unset(...args)` | Removes the cached result for specific input arguments. |

---

## 📊 Use Case Comparison

| Use Case                             | Without `working`                              | With `working`                               |
|-------------------------------------|------------------------------------------------|----------------------------------------------|
| **Expensive computation**           | Runs the computation every time.              | Computes once, caches, and reuses result.    |
| **Clearing all cached memory**     | Requires manual tracking of keys and values.   | Simply call `.reset()` to clear all caches.  |
| **Removing specific cache entries** | Needs complex logic to target specific keys.   | Just call `.unset(arg1, arg2, ...)`.         |
| **Scoped memory per feature/module**| Manually add prefixes for each module.        | Automatically done with `key` and prefix.    |
| **Integration with `brain-memory`** | Requires extra setup and tracking of memory.   | Seamlessly integrates with `brain-memory`.   |

---

## 🧪 Example Use Cases

Here are a few common use cases where `working` can improve your code:

- **Memoizing expensive mathematical functions** (e.g., Fibonacci, prime number generation).
- **Caching API call results** (but be mindful with async code).
- **Storing results of complex data-processing operations**.
- **Reducing repeated work in render loops** for UI updates.
- **Quick prototyping** where you need temporary storage for computed values.

### Example: Memoizing a Data Fetch

```js
const fetchData = working('api:fetchData', async (url) => {
  console.log('Fetching data...');
  const response = await fetch(url);
  return response.json();
});

fetchData('https://jsonplaceholder.typicode.com/todos/1'); // Logs 'Fetching data...' and returns data
fetchData('https://jsonplaceholder.typicode.com/todos/1'); // Returns cached data (no log)
```

---

## 🧹 Resetting and Unsetting Caches

- **Reset all caches**:
  
  If you want to clear all cached results for a particular function, just call the `.reset()` method:

  ```js
  multiply.reset(); // Clears all cached results for 'multiply'
  ```

- **Unset a specific cache entry**:
  
  To remove a cached result for specific arguments, call `.unset()` with the same arguments:

  ```js
  multiply.unset(2, 3); // Removes the cached result for multiply(2, 3)
  ```

---

## 🧩 Notes

- **Key creation**: By default, `working` creates a cache key by joining the function's arguments with commas: `args.join(',')`. If you need more advanced keying (e.g., deep objects or arrays), you can customize this behavior.
- **Async functions**: If you need to memoize async functions, you may need to extend or modify the logic to handle async/await properly (currently, this plugin doesn't handle asynchronous calls out-of-the-box).

---

## 🙌 Contributing

Contributions are always welcome! Feel free to fork this repository, make improvements, and create a pull request.

You can help by adding:
- Advanced key serialization (for deep objects).
- Async support for caching async functions.
- Debugging tools or utilities.

---

## 🧠 Made for [brain-memory](https://github.com/brain-memory/brain-memory)

This plugin is built on top of the awesome [brain-memory](https://github.com/brain-memory/brain-memory) library, which provides an easy-to-use in-memory storage system for JavaScript.

---

## License

MIT License. See [LICENSE](./LICENSE) for more details.

```
