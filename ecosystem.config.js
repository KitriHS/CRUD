module.exports = {
  apps : [{
      name      : 'flylist_react_app',
      script    : 'npm',
      args      : 'run start:production',
      env_production : {
        NODE_ENV: 'production'
      }
  }],

  deploy : {
    production : {
      user: 'app',
      host: [
        { 
          "host": "43.231.129.18", 
          "port" : "3011"
        }
      ],
      ref: 'origin/master',
      repo: 'git@bitbucket.org:ekaflylist/webtravelagent.git',
      path: '/home/app/flylist-ta/',
      // key: '/home/user1/.ssh/authorized_keys',
      ssh_options: ['ForwardAgent=yes'],
      'post-deploy': 'npm install && npm run-script build'
    }
  }
};
