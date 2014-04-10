'use strict';

module.exports = function(grunt){
	grunt.initConfig({
		nodemon: {
			dev: {}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.registerTask('default', ['nodemon']);
};
