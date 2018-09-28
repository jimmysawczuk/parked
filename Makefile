default: dev

clean:
	rm -rf dist .cache

dev:
	tmpl -o index.html index.tmpl
	parcel index.html

.PHONY: dev
