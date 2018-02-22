# -*- coding: utf-8 -*-
# -*- ruby -*-

$:.unshift File.expand_path 'lib', File.dirname(__FILE__)

require 'sinatra'
require 'sinatra/cross_origin'

require 'mongo'

# require 'data'
# require 'defaultdata'
# require 'app'
# require 'expand'
# require 'config'
# 
# enable :cross_origin
#

# collection = ''
episodb = ''

configure do
  # db = Mongo::Client.new(ENV['MONGODB_URI'], :database => 'episopass')
  # set :mongo_db, db[:episopass]

  episodb = Mongo::Client.new(ENV['MONGODB_URI'])[:episopass]

  # db.use(:episopass)
  # collection = db[:episopass]
end

get '/:name/:quiz' do
  name = params[:name]
  quiz = params[:quiz]
  d = { name: name, quiz: quiz }
  episodb.insert_one(d)
  quiz
end

get '/clear' do
  result = episodb.delete_many()
  'cleared'
end
  
get '/list' do
  # result = collection.find('name' => 'masui')
  # collection.update_one({'name' => 'masui'}, { quiz: 'xxxzxxxxxxx'})
  #result = collection.delete_one({ quiz: 'xxxzxxxxxxx'})
  # result = collection.find('name' => 'masui').limit(1).first
  result = episodb.find()
  s = []
  result.each do |doc|
    puts doc
    s << doc.to_s
  end
  # puts result
  s.join(', ')
end

get '/collections' do
 result = collection.find()
 
 result.each do |doc|
   puts doc
 end

 "xxxxxx"
 
  # content_type :json
  # settings.mongo_db.database.collection_names.to_json
end

get '/' do
  redirect "/index.html"
end

# post '/:name/__write' do |name|
#   data = params[:data]
#   log(name,data)
#   writedata(name,params[:data])
# end
# 
# get '/:name.apk' do |name|
#   # return "- Service Temporarily Unavailable -"
#   content_type 'application/vnd.android.package-archive'
#   apk(name)
# end
# 
# #get '/EpisoDAS/:name.html' do |name|
# #  @name = name
# #  @json = readdata(name)
# #  @json = defaultdata.to_json if @json.nil?
# #  erb :episodas
# #end
# 
# get '/DAS/' do |name|
#   redirect "/DAS"
# end
# 
# get '/EpisoDAS/' do |name|
#   redirect "/DAS"
# end
# 
# get '/EpisoDAS' do |name|
#   redirect "/DAS"
# end
# 
# get '/DAS' do |name|
#   redirect "http://scrapbox.io/masui/EpisoDAS"
# end
# 
# get '/DAS/:name/:seed' do |name,seed|
#   @name = name
#   @seed = seed
#   redirect "/EpisoDAS.html?name=#{name}&seed=#{seed}"
# end
# 
# get '/DAS/:name' do |name|
#   @name = name
#   redirect "/EpisoDAS.html?name=#{name}"
# end
# 
# get '/:name.html' do |name|
#   @name = name
#   @json = readdata(name)
#   @json = defaultdata.to_json if @json.nil?
#   expand
#   # erb :app
# end
# 
# get '/:name/:seed.html' do |name,seed|
#   @name = name
#   @seed = seed
#   @json = readdata(name)
#   @json = defaultdata.to_json if @json.nil?
#   expand
# end
# 
# get '/:name.json' do |name|
#   # cross_origin
#   json = readdata(name)
#   json = defaultdata.to_json if json.nil?
#   json
# end
# 
# get '/:name/:seed' do |name,seed|
#   @name = name
#   @json = readdata(name)
#   @json = defaultdata.to_json if @json.nil?
#   @seed = seed
#   @seed = JSON.parse(@json)['seed'] if @seed == ''
#   erb :episopass
# end
# 
# get '/:name/' do |name|
#   redirect "/#{name}"
# end
# 
# get '/:name' do |name|
#   @name = name
#   @json = readdata(name)
#   @json = defaultdata.to_json if @json.nil?
#   @seed = params[:seed].to_s
#   @seed = JSON.parse(@json)['seed'] if @seed == ''
#   erb :episopass
# end

