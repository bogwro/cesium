require 'test_helper'

class CesiumControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
