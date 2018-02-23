def get_file(file)
  File.read "#{settings.public_folder}/#{file}"
end
