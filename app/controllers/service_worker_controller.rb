class ServiceWorkerController < ApplicationController
  # If you are using devise with user, skip authenticate
  # skip_before_action :authenticate_user!
  # without skipping CSRF you get next error message
  # ActionController::InvalidCrossOriginRequest
  # (Security warning: an embedded <script> tag on another site requested protected JavaScript.
  # If you know what you're doing, go ahead and disable forgery protection
  # on this action to permit cross-origin JavaScript embedding.):

  protect_from_forgery except: :service_worker

  def service_worker
  end

  def offline
    render "offline", layout: false
  end
end
