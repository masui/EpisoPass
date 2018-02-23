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
# require 'app'

enable :cross_origin # Chrome拡張機能から読めるようにするため

ROOT = "/Users/masui/EpisoPass"

configure do
  set :root, File.dirname(__FILE__)
  set :public_folder, settings.root + '/public'
end

get '/:name.json' do |name|
  getdata(name).to_json
end
  
get '/:name.html' do |name| # DAS
  @data = getdata(name)
  @data['seed'] = params[:seed] if params[:seed]

  erb :episodas
end
  
get '/:name/:seed.html' do |name,seed|
  redirect "/#{name}.html?seed=#{seed}"
end
  
get '/:name/' do |name|
  redirect "/#{name}"
end

get '/:name' do |name|
  @data = getdata(name)
  @data['seed'] = params[:seed] if params[:seed]
  erb :episopass
end

get '/:name/:seed' do |name,seed|
  redirect "/#{name}?seed=#{seed}"
end
  
# get '/remove_all_data' do
#   result = episodb.delete_many()
#   'cleared'
# end

get '/' do
  redirect "/index.html"
end

post '/:name/__write' do |name|
  data = JSON.parse(params[:data])
  writedata(name,data)
  ''
end

# get '/:name.apk' do |name|
#   # return "- Service Temporarily Unavailable -"
#   content_type 'application/vnd.android.package-archive'
#   apk(name)
# end

