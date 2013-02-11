class ApplicationController < ActionController::Base
  helper RequirejsHelper
  protect_from_forgery
end
