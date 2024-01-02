require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get offline page" do
    get offline_url
    assert_response :success
  end
end
