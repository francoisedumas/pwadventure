class WebpushNotificationsController < ApplicationController
  def create
    # In a real case the subscription should be find based on specific criteria
    subscription = WebpushSubscription.last
    response = subscription.payload_send

    if response.is_a?(Hash) && response[:error]
      # could add flash message here!
      render json: { error: response[:error] }, status: :unprocessable_entity
    else
      head :ok
    end
  end
end
