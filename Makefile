BIN = ./node_modules/.bin
package_name = fun
tarball_name = $(package_name).tar.gz
temp_directory = /tmp/builds/$(package_name)
application_path = ~/www/$(package_name)
project_path = .
src_path = $(project_path)/src
dist_path = $(project_path)/public/dist
server_name = $(env_server_name)
server_user = $(env_server_user)
ssh = ssh $(server_user)@$(server_name)
node_test_env = NODE_ENV=test
node_dev_env = NODE_ENV=dev
node_prod_env = NODE_ENV=production
sass_path = $(project_path)/src/public/scss
css_path = $(project_path)/src/public/dist/css

kill:
	$(BIN)/pm2 kill

watch_sass_dev:
	$(node_dev_env) $(BIN)/node-sass -w $(sass_path) -o $(css_path)

logs_dev:
	$(node_dev_env) $(BIN)/pm2 logs fun

webpack_dev:
	$(node_dev_env) $(BIN)/webpack --progress --colors --watch

test_dev:
	$(node_test_env) $(BIN)/karma start

production_server:
	$(node_prod_env) $(BIN)/pm2 startOrRestart ./services/pm2_prod_config.json

test:
	$(node_test_env) $(BIN)/karma start --single-run

clean:
	rm -rf node_modules
	rm -rf $(dist_path)

install:
	npm install

build:
	$(node_prod_env) $(BIN)/node-sass $(sass_path) -o $(css_path) --output-style compressed
	$(node_prod_env) $(BIN)/webpack

dev:
	rm -rf $(dist_path)
	$(BIN)/pm2 kill
	$(node_dev_env) $(BIN)/node-sass $(sass_path) -o $(css_path)
	$(BIN)/pm2 flush
	$(node_dev_env) $(BIN)/pm2 startOrRestart ./services/pm2_dev_config.json
	foreman start -f ./Procfile_dev

run_remote_server_install_and_run:
	$(ssh) 'source ~/.profile; cd $(application_path)/$(package_name) && npm install --production'
	$(ssh) 'source ~/.profile; cd $(application_path)/$(package_name) && $(node_prod_env) $(BIN)/pm2 startOrRestart ./services/pm2_prod_config.json'

deploy:
	make install
	make build
	mkdir -p $(temp_directory)
	tar --exclude='.git' --exclude='Makefile' --exclude='./node_modules' -zcvf $(temp_directory)/$(tarball_name) $(project_path)/*
	$(ssh) 'rm -rf $(application_path)/$(tarball_name) $(application_path)/$(package_name)'
	scp -rp $(temp_directory)/$(tarball_name) $(server_user)@$(server_name):$(application_path)
	$(ssh) 'mkdir -p $(application_path)/$(package_name)'
	$(ssh) 'tar -C $(application_path)/$(package_name) -xvf $(application_path)/$(tarball_name)'
	make run_remote_server_install_and_run