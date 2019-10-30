.PHONY: all install deploy deploy-local dry-run dry-run-local clean

HTTP_SERVER_HOSTNAME = $(DEPLOY_HOST)
HTTP_DOCROOT_BASE_PATH = /var/www
HTTP_VHOST = $(VHOST)
HTTP_DOCROOT_SITE_PATH = $(HTTP_DOCROOT_BASE_PATH)/$(HTTP_VHOST)/htdocs
HTTP_USER  ?= www-data
HTTP_GROUP ?= $(HTTP_USER)

DEPLOY_PROJECT_NAME = $(DEPLOY_PROJECT)
DEPLOY_ENVIRONMENT_NAME = $(DEPLOY_ENVIRONMENT)

DEPLOY_USER  ?= ubuntu
DEPLOY_GROUP ?= $(DEPLOY_USER)

RSYNC_FLAGS = -avz --exclude=.git* --exclude=Makefile* --exclude=README.md --exclude=license.txt
CHOWN_FLAGS = -R $(HTTP_USER):$(HTTP_GROUP)

all: install deploy

install:
	npm install parcel && npm install && npm run build

deploy:
	ssh $(HTTP_SERVER_HOSTNAME) "sudo chown -R $(DEPLOY_USER):$(DEPLOY_GROUP) $(HTTP_DOCROOT_SITE_PATH)"
	rsync $(RSYNC_FLAGS) ./dist/ $(HTTP_SERVER_HOSTNAME):$(HTTP_DOCROOT_SITE_PATH)
	ssh $(HTTP_SERVER_HOSTNAME) "sudo chown $(CHOWN_FLAGS) $(HTTP_DOCROOT_SITE_PATH)"

deploy-local:
	rsync $(RSYNC_FLAGS) ./dist/ $(HTTP_DOCROOT_SITE_PATH)
	chown $(CHOWN_FLAGS) $(HTTP_DOCROOT_SITE_PATH)

dry-run:
	rsync $(RSYNC_FLAGS) ./dist/ $(HTTP_SERVER_HOSTNAME):$(HTTP_DOCROOT_SITE_PATH) --dry-run

dry-run-local:
	rsync $(RSYNC_FLAGS) ./dist/ $(HTTP_DOCROOT_SITE_PATH) --dry-run

clean:
	@echo "nothing to be done"
