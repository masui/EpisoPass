# -*- coding: utf-8 -*-
# -*- ruby -*-

require 'mongo'
require 'json'

require './ids'

ids = {}
setid(ids)

MONGODB_URI = 'mongodb://heroku_.....'

episodb = Mongo::Client.new(MONGODB_URI)[:episopass] # このあたり全くわからず

# Dir.open("/Users/masui/EpisoPass-vps/data/"){ |dir|
Dir.open("./data/"){ |dir|
  dir.each { |f|
    if f =~ /^[0-9a-f]{32}$/ then
      json = File.read("./data/#{f}")
      id = ids[f]
      if json.to_s != '' then
        begin
          episodb.delete_many({name: id})
          data = JSON.parse(json)
          d = {}
          d['name'] = id
          d['seed'] = data['seed']
          d['qas'] = data['qas']
          episodb.insert_one(d)
        rescue
          puts "==========================="
          puts f
          puts json
        end
      end
    end
  }
}
