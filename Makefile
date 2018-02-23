#
# ローカルにSinatraを走らせる
# データベースはHerokuのMongoを使う
#
local:
	MONGODB_URI=`heroku config -a episopass | grep MONGODB_URI | ruby -n -e 'puts $$_.split[1]'` ruby episopass.rb

clean:
	/bin/rm -f *~ */*~

push:
	git push git@github.com:masui/EpisoPass.git
#	git push pitecan.com:/home/masui/git/EpisoPass.git

js:
	coffee -c -b public/javascripts/episopass.coffee
	coffee -c public/javascripts/crypt.coffee

backup:
	cd backups; ruby backup.rb


