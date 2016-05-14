//configure system loader
System.config({
	map: {
		'rxjs': 'node_modules/rxjs',
		'@angular': 'node_modules/@angular',
		'app': 'dist',
		'firebase': 'node_modules/firebase/lib/firebase-web.js',
  	'angularfire2': 'node_modules/angularfire2'
	},
	packages: {
		'app': {
			main: 'main.js',
			defaultExtension: 'js'
		},
		'@angular/core': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/compiler': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/common': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/platform-browser': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/platform-browser-dynamic': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		},
		'angularfire2': {
			defaultExtension: 'js',
			main: 'angularfire2.js'
		}
	}
});