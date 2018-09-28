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
	AWS_PROFILE=jsawczuk aws s3 sync --acl=public-read --delete dist s3://${DOMAIN}

.PHONY: dev
