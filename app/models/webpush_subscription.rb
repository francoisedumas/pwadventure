class WebpushSubscription < ApplicationRecord
  def payload_send
    begin
      response = WebPush.payload_send(
        message: "A cool message",
        endpoint: endpoint,
        p256dh: p256dh_key,
        auth: auth_key,
        vapid: {
          subject: "mailto:sender@example.com",
          public_key: Rails.application.credentials.webpush.public_key,
          private_key: Rails.application.credentials.webpush.private_key
        }
      )

      logger.info "WebPush: #{response.inspect}"
      response
    rescue WebPush::ExpiredSubscription,
            WebPush::InvalidSubscription => e
      logger.warn "WebPush: #{e.message}"
      { error: e.message }
    rescue WebPush::ResponseError => e
      logger.error "WebPush: #{e.message}"
      return { error: e.message }
    end
  end
end
