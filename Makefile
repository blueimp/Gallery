.PHONY: default css js

default: css js

css:
	node_modules/.bin/lessc --yui-compress css/blueimp-gallery.css > css/blueimp-gallery.min.css

js:
	node_modules/.bin/uglifyjs js/blueimp-gallery.js -c -m -o js/blueimp-gallery.min.js
	node_modules/.bin/uglifyjs js/jquery.blueimp-gallery.js -c -m -o js/jquery.blueimp-gallery.min.js
