# rollup-plugin-execute

Execute shell command(s) sequentially when the bundle is generated.

```
npm i rollup-plugin-execute -D
```

## Examples

```javascript
// rollup.config.js
import execute from 'rollup-plugin-execute'

export default {
    entry: 'src/app.js',
    dest: 'public/app.js',
    plugins: [
        // Open the browser when the bundle is generated
        execute('start chrome --new-window http://localhost/')
    ]
}
```

```javascript
// rollup.config.js
import execute from 'rollup-plugin-execute'
import path from 'path'

export default {
    entry: 'src/app.js',
    dest: 'public/app.js',
    plugins: [
        execute([
            // Copy index.html from src to public if index.html is not modified
            'robocopy src public index.html',
            // Then open the browser
            'start firefox -new-window "' + path.join(process.cwd(), 'public', 'index.html') + '"'
        ])
    ]
}
```

Enjoy!
