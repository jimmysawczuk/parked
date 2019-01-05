include .env
export $(shell sed 's/=.*//' .env)

default: dev

clean:
	rm -rf dist .cache index.html

dev:
	tmpl -o index.html index.tmpl
	parcel index.html

production: clean
	DOMAIN=${DOMAIN} tmpl -o index.html index.tmpl
	parcel build index.html

deploy: production
	cp _headers dist
	netlify deploy -p -s ${NETLIFY_SITE_ID} -d dist

.PHONY: dev clean
