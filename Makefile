#
# ローカルにSinatraを走らせる
# データベースはHerokuのMongoを使う
#
# Chromebookで動くように3000番を使う
#
RUBY=/home/tmasui/.rbenv/shims/ruby
local:
	MONGODB_URI=`heroku config -a episopass | grep MONGODB_URI | $(RUBY) -n -e 'puts $$_.split[1]'` ruby episopass.rb -p 3000

clean:
	/bin/rm -f *~ */*~

push:
	git push git@github.com:masui/EpisoPass.git
#	git push pitecan.com:/home/masui/git/EpisoPass.git

js:
	coffee -c -b public/javascripts/episopass.coffee
	coffee -c public/javascripts/crypt.coffee

backup:
	cd backups; make


