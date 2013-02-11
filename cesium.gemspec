$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "cesium/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "cesium"
  s.version     = Cesium::VERSION
  s.authors     = ["TODO: Your name"]
  s.email       = ["TODO: Your email"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of Cesium."
  s.description = "TODO: Description of Cesium."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.11"
  s.add_dependency "jquery-rails"
  s.add_dependency "requirejs-rails"

  s.add_development_dependency "sqlite3"
end
