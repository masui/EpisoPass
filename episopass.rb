# -*- coding: utf-8 -*-
# -*- ruby -*-

$:.unshift File.expand_path 'lib', File.dirname(__FILE__)

require 'sinatra'
require 'sinatra/cross_origin'

require 'mongo'

require 'json'

require 'defaultdata'

require 'db'
require 'file'

# require 'data'
# require 'defaultdata'
# require 'app'
# require 'expand'
# require 'config'

enable :cross_origin # Chrome拡張機能から読めるようにするため

configure do
  set :root, File.dirname(__FILE__) # + '/../..'
  set :public_folder, settings.root + '/public'
end

get '/:name.json' do |name|
  getdata(name).to_json
end
  
get '/:name.html' do |name|
  @data = {}
  @data['data'] = getdata(name)
  @data['data']['seed'] = params[:seed] if params[:seed]
  @data['fav'] =  Base64.encode64(get_file('images/favicon.png')).gsub("\n",'')
  @data['bg'] =   Base64.encode64(get_file('images/exclusive_paper.gif')).gsub("\n",'')
  @data['jquery'] =   get_file('javascripts/jquery.js')
  @data['episodas'] = get_file('javascripts/episodas.js')
  @data['md5'] =      get_file('javascripts/md5.js')
  @data['crypt'] =    get_file('javascripts/crypt.js')

  erb :episodas
end
  
get '/:name/:seed.html' do |name,seed|
  redirect "/#{name}.html?seed=#{seed}"
end
  
get '/search/:name' do
  @data = getdata(params[:name])
  erb :search
end

#get '/:name/:quiz' do
#  name = params[:name]
#  quiz = params[:quiz]
#  episodb.delete_many({name: name})
#  d = { name: name, quiz: quiz }
#  episodb.insert_one(d)
#
#  result = episodb.find()
#  s = []
#  result.each do |doc|
#    puts doc
#    s << doc.to_s
#  end
#  # puts result
#  @result = s.join(', ')
#  
#  erb :episopass
#end

# get '/clear' do
#   result = episodb.delete_many()
#   'cleared'
# end
  
# get '/list' do
#   result = episodb.find()
#   s = []
#   result.each do |doc|
#     puts doc
#     s << doc.to_s
#   end
#   # puts result
#   s.join(', ')
# end

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

