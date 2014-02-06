$:.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'cesium/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'cesium'
  s.version     = Cesium::VERSION
  s.authors     = ['Bogumil Wrona']
  s.email       = %w(b.wrona@cre8newmedia.com)
  s.homepage    = 'http://bogwro.github.com/cesium'
  s.summary     = "WebGL Virtual Globe and Map Engine as Rails' Engine"
  s.description = "WebGL Virtual Globe and Map Engine as Rails' Engine"
  s.license     = 'ALv2'

  s.files = Dir['{app,config,db,lib}/**/*'] + ['LICENSE.md', 'Rakefile', 'README.rdoc']
  s.test_files = Dir['test/**/*']

  s.add_dependency 'railties', '>= 3.1.1'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'requirejs-rails'

  s.add_development_dependency 'rails', '~> 3.2.14'
  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'thin'
  s.add_development_dependency 'quiet_assets'
  s.add_development_dependency 'better_errors'
  s.add_development_dependency 'binding_of_caller'
  s.add_development_dependency 'meta_request'
end
