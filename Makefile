#
# ローカルにSinatraを走らせる
# データベースはHerokuのMongoを使う
#
run:
	MONGODB_URI=`heroku config -a episopass | grep MONGODB_URI | ruby -n -e 'puts $$_.split[1]'` ruby episopass.rb




