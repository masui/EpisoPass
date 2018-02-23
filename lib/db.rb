#
# EpisoPass問題データベース
#
#  - Mongo利用
#  - アカウント情報はHerokuの環境変数MONGODB_URI
#  - % heroku config -a episopass で取得可能
#

$episodb = Mongo::Client.new(ENV['MONGODB_URI'])[:episopass]

def getdata(name)
  data = {}
  data['name'] = name
  data['seed'] = default_seed
  data['qas'] = default_qas
  d = $episodb.find({name: data['name']}).limit(1).first
  if d
    data['qas'] = d['qas']
    data['seed'] = d['seed']
  end
  data
end

def writedata(name,data)
  puts "_________writedata name=#{name}"
  $episodb.delete_many({name: name})
  d = { name: name, seed: data['seed'], qas: data['qas'] }
  $episodb.insert_one(d)
end
