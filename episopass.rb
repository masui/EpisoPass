# -*- coding: utf-8 -*-
# -*- ruby -*-

$:.unshift File.expand_path 'lib', File.dirname(__FILE__)

# 標準ライブラリ
require 'sinatra'
require 'sinatra/cross_origin'
require 'mongo'
require 'json'

# ローカルライブラリ
require 'defaultdata'
# require 'db' # mongo利用
require 'file'

enable :cross_origin # Chrome拡張機能から読めるようにするため

configure do
  set :root, File.dirname(__FILE__)
  set :public_folder, settings.root + '/public'
end

#before do
#  content_type :json
#  headers 'Access-Control-Allow-Origin' => '*',
#          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
#end


#get '/episodasmaker' do
#  scheme = request.scheme
#  host = request.host
#  port = request.port
#  if scheme == 'http' && host =~ /^episopass\.com$/i
#    scheme = 'https'
#    port = 443
#  end
#  redirect "#{scheme}://#{host}:#{port}/episodasmaker.html"
#end

#
# CORS対策実験
#
get '/:name.json' do |name|
  content_type :json
  headers 'Access-Control-Allow-Origin' => '*',
          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST'],
          'Access-Control-Allow-Credentials' => true 
  getdata(name).to_json
end
  
get '/:name.box.html' do |name| # Jump to Scrapbox page
  @data = getdata(name)
  @data['name'] = name
  @data['seed'] = params[:seed] if params[:seed]

  erb :episobox
end
  
get '/:name.html' do |name| # DAS
  @data = getdata(name)
  @data['name'] = name
  @data['seed'] = params[:seed] if params[:seed]

  erb :episodas
end
  
#get '/:name.box' do |name| # Jump to Scrapbox page
#  @data = getdata(name)
#  @data['name'] = name
#  @data['seed'] = params[:seed] if params[:seed]
#
#  erb :episobox
#end
  
get '/:name/:seed.html' do |name,seed|
  redirect "/#{name}.html?seed=#{seed}"
end
  
get '/:name/' do |name|
  redirect "/#{name}"
end

get '/:name' do |name|
  @data = getdata(name)
  @data['name'] = name
  @data['seed'] = params[:seed] if params[:seed]
  erb :episopass
end

get '/:name/__read' do |name|
  getdata(name).to_json
end

post '/:name/__write' do |name|
  data = JSON.parse(params[:data])
  writedata(name,data)
  ''
end

get '/:name/:seed' do |name,seed|
  redirect "/#{name}?seed=#{seed}"
end
  
get '/' do
  redirect "/index.html"
end

# get '/:name.apk' do |name|
#   # return "- Service Temporarily Unavailable -"
#   content_type 'application/vnd.android.package-archive'
#   apk(name)
# end
