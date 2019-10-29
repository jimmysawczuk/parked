include .env
export $(shell sed 's/=.*//' .env)

default: dev

clean:
	rm -rf dist .cache index.html .netlify

dev:
	tmpl -o index.html index.tmpl
	parcel --global api index.html

production: clean
	DOMAIN=${DOMAIN} tmpl -o index.html index.tmpl
	yarn production

deploy: production
	cp _headers dist
	netlify deploy -p -s ${NETLIFY_SITE_ID} -d dist

.PHONY: dev clean
