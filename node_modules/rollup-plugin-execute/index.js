
var spawn = require('child_process').spawn
var spawnSync = require('child_process').spawnSync


function execute (commands, sync) {
    if (typeof commands === 'string') {
        commands = [commands]
    }
    if (!Array.isArray(commands)) {
        throw new Error('Command(s) should be a string or an array')
    }
    return {
        name: 'execute',
        generateBundle: function () {
            var copy = commands.slice(0)
            var next = function () {
                var command
                if (!(command = copy.shift())) {
                    return
                }
                
                if ((sync !== undefined) && (sync == true)) {
                    let ret = spawnSync(command, {
                        shell: true,
                        stdio: 'inherit',
                        env: process.env
                    })
                    if (ret.status === 0) {
                        next()
                    }
                } else {
                    spawn(command, {
                        shell: true,
                        stdio: 'inherit',
                        env: process.env
                    }).on('close', function (code) {
                        if (code === 0) {
                            next()
                        }
                    })
                }
                
            }
            next()
        }
    }
}

module.exports = execute
