Gem::Specification.new do |spec|
  spec.name          = 'notepads'
  spec.version       = '0.1.0'
  spec.summary       = 'CLI for reading notepads from the API'
  spec.authors       = ['OpenCode']
  spec.files         = Dir['lib/**/*', 'bin/**/*']
  spec.executables   = ['notepad']
  spec.require_paths = ['lib']

  spec.add_dependency 'net-http', '~> 0.6'
end
