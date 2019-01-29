# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
log = (x...) -> try console.log x...

_ = require 'lodash'

fs = require 'fs'
colors = require 'colors'
keypress = require 'keypress'

shelljs = require 'shelljs'
exec = shelljs.exec

LAST_FORK = new Date().getTime()

module.exports = runfast =

  init: (@file) ->
    try
      @file = require('path').resolve file
    catch
      process.exit 1

    @waiting = no

    keypress process.stdin

    process.stdin.setRawMode yes
    process.stdin.on 'keypress', (ch,key) =>
      if key.name in ['f5','r']
        log "(reloading)".blue
        @fork()
      if key.name is 'c'
        try
          await exec "kill -9 #{@child.pid}", {silent:yes,async:yes}, defer killed
          await @kill defer()
          process.exit 0

  kill: (cb) ->
    await exec "ps aux | grep '#{@file}'", {silent:yes,async:yes}, defer e,r
    if e then throw e

    pids = []

    for x in r.split '\n'
      while x.includes('  ')
        x = x.split('  ').join(' ')
      x = x.trim()
      pid = x.split(' ')[1]
      pids.push pid

    pids = _.uniq pids

    if pids
        await exec "kill -9 " + pids.join(' '), {silent:yes,async:yes}, defer killed

    return cb null, false

  fork: ->
    if @child
      @child.removeAllListeners 'exit'
      await exec "kill -9 #{@child.pid}", {silent:yes,async:yes}, defer killed
      await @kill defer()

    @waiting = no

    if @file.match '.coffee' then bin = shelljs.which 'coffee'
    if @file.match '.iced' then bin = shelljs.which 'iced'
    if @file.match '.js' then bin = shelljs.which 'node'

    str = "#{bin} #{@file}"
    log "(#{str})".blue

    @child = exec str, {async:yes}
    @child.on 'exit', =>
      if !@waiting
        @waiting = yes
        await exec "kill -9 #{@child.pid}", {silent:yes,async:yes}, defer killed
        await @kill defer()
        try
          exec """play ~/beep.mp3""", {async:yes,silent:yes}
        log "(waiting)".blue

  watch: ->
    _handler = ((event,filename) =>
      valid = ['coffee','js','iced']
      extension = filename.split('.').pop()
      if extension in valid
        return if new Date().getTime() - LAST_FORK < 1000
        LAST_FORK = new Date().getTime()
        return @fork()
    )

    throttled_handler = _.throttle(_handler,1000)

    fs.watch shelljs.pwd(), _handler

    await fs.readdir shelljs.pwd(), defer e,list

    if _.size(list)
      for item in list
        continue if item.substr(1) is '.'
        continue if item is 'node_modules'

        await fs.stat shelljs.pwd() + '/' + item, defer e,stat
        continue if e

        if stat.isDirectory()
          fs.watch shelljs.pwd() + '/' + item, _handler

  # parse cli
  run: ->
    cli = process.argv.slice 2

    if !cli.length
      try
        pkg = JSON.parse(require('fs').readFileSync(shelljs.pwd() + '/package.json'))
        if pkg.main
          valid = ['.coffee','.js','.iced']
          for v in valid
            if pkg.main.indexOf(v) > -1
              cli.push require('path').resolve(shelljs.pwd() + '/' + pkg.main)
              break

    if !cli.length or cli.join(' ').match 'help'
      log("Usage ./ [file]").blue
      process.exit 0
    else
      @init cli.pop()
      @fork()
      @watch()

##
if process.env.TAKY_DEV
  log /TAKY_DEV/

