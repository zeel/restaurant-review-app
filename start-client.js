const opts = {
	stdio: 'inherit',
	cwd: 'client',
	shell: true
};
require('child_process').spawn('npm', ['run', process.argv[2]], opts);