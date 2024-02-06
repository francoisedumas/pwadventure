class WebpushNotificationsController < ApplicationController
  def create
    # In a real case the subscription should be find based on specific criteria
    WebpushSubscription.last.payload_send
  end
end
