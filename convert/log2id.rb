out = false
ARGF.each { |line|
  line.chomp!
  puts line if out
  if line =~ /\-\-\-\-\-/
    out = true
  else
    out = false
  end
}

