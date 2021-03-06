// Generated by IcedCoffeeScript 108.0.11
(function() {
  var LAST_FORK, colors, exec, fs, iced, keypress, log, runfast, shelljs, _, __iced_k, __iced_k_noop,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  log = function() {
    var x;
    x = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    try {
      return console.log.apply(console, x);
    } catch (_error) {}
  };

  _ = require('lodash');

  fs = require('fs');

  colors = require('colors');

  keypress = require('keypress');

  shelljs = require('shelljs');

  exec = shelljs.exec;

  LAST_FORK = new Date().getTime();

  module.exports = runfast = {
    init: function(file) {
      this.file = file;
      try {
        this.file = require('path').resolve(file);
      } catch (_error) {
        process.exit(1);
      }
      this.waiting = false;
      keypress(process.stdin);
      process.stdin.setRawMode(true);
      return process.stdin.on('keypress', (function(_this) {
        return function(ch, key) {
          var killed, ___iced_passed_deferral, __iced_deferrals, __iced_k, _ref;
          __iced_k = __iced_k_noop;
          ___iced_passed_deferral = iced.findDeferral(arguments);
          if ((_ref = key.name) === 'f5' || _ref === 'r') {
            log("(reloading)".blue);
            _this.fork();
          }
          if (key.name === 'c') {
            (function(__iced_k) {
              try {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "/home/taky/www/linux-runfast/module.iced"
                  });
                  exec("kill -9 " + _this.child.pid, {
                    silent: true,
                    async: true
                  }, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return killed = arguments[0];
                      };
                    })(),
                    lineno: 33
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "/home/taky/www/linux-runfast/module.iced"
                    });
                    _this.kill(__iced_deferrals.defer({
                      lineno: 34
                    }));
                    __iced_deferrals._fulfill();
                  })(function() {
                    return process.exit(0);
                  });
                });
              } catch (_error) {}
            })(__iced_k);
          } else {
            return __iced_k();
          }
        };
      })(this));
    },
    kill: function(cb) {
      var e, killed, pid, pids, r, x, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/home/taky/www/linux-runfast/module.iced"
          });
          exec("ps aux | grep '" + _this.file + "'", {
            silent: true,
            async: true
          }, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                e = arguments[0];
                return r = arguments[1];
              };
            })(),
            lineno: 38
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          var _i, _len, _ref;
          if (e) {
            throw e;
          }
          pids = [];
          _ref = r.split('\n');
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            while (x.includes('  ')) {
              x = x.split('  ').join(' ');
            }
            x = x.trim();
            pid = x.split(' ')[1];
            pids.push(pid);
          }
          pids = _.uniq(pids);
          (function(__iced_k) {
            if (pids) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/home/taky/www/linux-runfast/module.iced"
                });
                exec("kill -9 " + pids.join(' '), {
                  silent: true,
                  async: true
                }, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return killed = arguments[0];
                    };
                  })(),
                  lineno: 53
                }));
                __iced_deferrals._fulfill();
              })(__iced_k);
            } else {
              return __iced_k();
            }
          })(function() {
            return cb(null, false);
          });
        };
      })(this));
    },
    fork: function() {
      var bin, killed, str, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(_this) {
        return (function(__iced_k) {
          if (_this.child) {
            _this.child.removeAllListeners('exit');
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/home/taky/www/linux-runfast/module.iced"
              });
              exec("kill -9 " + _this.child.pid, {
                silent: true,
                async: true
              }, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return killed = arguments[0];
                  };
                })(),
                lineno: 60
              }));
              __iced_deferrals._fulfill();
            })(function() {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "/home/taky/www/linux-runfast/module.iced"
                });
                _this.kill(__iced_deferrals.defer({
                  lineno: 61
                }));
                __iced_deferrals._fulfill();
              })(__iced_k);
            });
          } else {
            return __iced_k();
          }
        });
      })(this)((function(_this) {
        return function() {
          _this.waiting = false;
          if (_this.file.match('.coffee')) {
            bin = shelljs.which('coffee');
          }
          if (_this.file.match('.iced')) {
            bin = shelljs.which('iced');
          }
          if (_this.file.match('.js')) {
            bin = shelljs.which('node');
          }
          str = "" + bin + " " + _this.file;
          log(("(" + str + ")").blue);
          _this.child = exec(str, {
            async: true
          });
          return _this.child.on('exit', function() {
            var killed, ___iced_passed_deferral1, __iced_deferrals, __iced_k;
            __iced_k = __iced_k_noop;
            ___iced_passed_deferral1 = iced.findDeferral(arguments);
            if (!_this.waiting) {
              _this.waiting = true;
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral1,
                  filename: "/home/taky/www/linux-runfast/module.iced"
                });
                exec("kill -9 " + _this.child.pid, {
                  silent: true,
                  async: true
                }, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return killed = arguments[0];
                    };
                  })(),
                  lineno: 76
                }));
                __iced_deferrals._fulfill();
              })(function() {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral1,
                    filename: "/home/taky/www/linux-runfast/module.iced"
                  });
                  _this.kill(__iced_deferrals.defer({
                    lineno: 77
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  try {
                    exec("play ~/beep.mp3", {
                      async: true,
                      silent: true
                    });
                  } catch (_error) {}
                  return __iced_k(log("(waiting)".blue));
                });
              });
            } else {
              return __iced_k();
            }
          });
        };
      })(this));
    },
    watch: function() {
      var e, item, list, stat, throttled_handler, ___iced_passed_deferral, __iced_deferrals, __iced_k, _handler;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      _handler = ((function(_this) {
        return function(event, filename) {
          var extension, valid;
          valid = ['coffee', 'js', 'iced'];
          extension = filename.split('.').pop();
          if (__indexOf.call(valid, extension) >= 0) {
            if (new Date().getTime() - LAST_FORK < 1000) {
              return;
            }
            LAST_FORK = new Date().getTime();
            return _this.fork();
          }
        };
      })(this));
      throttled_handler = _.throttle(_handler, 1000);
      fs.watch(shelljs.pwd(), _handler);
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/home/taky/www/linux-runfast/module.iced"
          });
          fs.readdir(shelljs.pwd(), __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                e = arguments[0];
                return list = arguments[1];
              };
            })(),
            lineno: 96
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          if (_.size(list)) {
            (function(__iced_k) {
              var _i, _len, _ref, _results, _while;
              _ref = list;
              _len = _ref.length;
              _i = 0;
              _while = function(__iced_k) {
                var _break, _continue, _next;
                _break = __iced_k;
                _continue = function() {
                  return iced.trampoline(function() {
                    ++_i;
                    return _while(__iced_k);
                  });
                };
                _next = _continue;
                if (!(_i < _len)) {
                  return _break();
                } else {
                  item = _ref[_i];
                  (function(__iced_k) {
                    if (item.substr(1) === '.') {
                      (function(__iced_k) {
_continue()
                      })(__iced_k);
                    } else {
                      return __iced_k();
                    }
                  })(function() {
                    (function(__iced_k) {
                      if (item === 'node_modules') {
                        (function(__iced_k) {
_continue()
                        })(__iced_k);
                      } else {
                        return __iced_k();
                      }
                    })(function() {
                      (function(__iced_k) {
                        __iced_deferrals = new iced.Deferrals(__iced_k, {
                          parent: ___iced_passed_deferral,
                          filename: "/home/taky/www/linux-runfast/module.iced"
                        });
                        fs.stat(shelljs.pwd() + '/' + item, __iced_deferrals.defer({
                          assign_fn: (function() {
                            return function() {
                              e = arguments[0];
                              return stat = arguments[1];
                            };
                          })(),
                          lineno: 103
                        }));
                        __iced_deferrals._fulfill();
                      })(function() {
                        (function(__iced_k) {
                          if (e) {
                            (function(__iced_k) {
_continue()
                            })(__iced_k);
                          } else {
                            return __iced_k();
                          }
                        })(function() {
                          return _next(stat.isDirectory() ? fs.watch(shelljs.pwd() + '/' + item, _handler) : void 0);
                        });
                      });
                    });
                  });
                }
              };
              _while(__iced_k);
            })(__iced_k);
          } else {
            return __iced_k();
          }
        };
      })(this));
    },
    run: function() {
      var cli, pkg, v, valid, _i, _len;
      cli = process.argv.slice(2);
      if (!cli.length) {
        try {
          pkg = JSON.parse(require('fs').readFileSync(shelljs.pwd() + '/package.json'));
          if (pkg.main) {
            valid = ['.coffee', '.js', '.iced'];
            for (_i = 0, _len = valid.length; _i < _len; _i++) {
              v = valid[_i];
              if (pkg.main.indexOf(v) > -1) {
                cli.push(require('path').resolve(shelljs.pwd() + '/' + pkg.main));
                break;
              }
            }
          }
        } catch (_error) {}
      }
      if (!cli.length || cli.join(' ').match('help')) {
        log("Usage ./ [file]").blue;
        return process.exit(0);
      } else {
        this.init(cli.pop());
        this.fork();
        return this.watch();
      }
    }
  };

  if (process.env.TAKY_DEV) {
    log(/TAKY_DEV/);
  }

}).call(this);
