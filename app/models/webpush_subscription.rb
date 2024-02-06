class WebpushSubscription < ApplicationRecord
  def payload_send
    WebPush.payload_send(
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
  end
end
