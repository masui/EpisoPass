def get_file(file)
  File.read "#{settings.public}/#{file}"
end
