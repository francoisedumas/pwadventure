class ServiceWorkerController < ApplicationController
  # If you are using devise with user, skip authenticate
  # skip_before_action :authenticate_user!
  # without skipping CSRF ActionController::InvalidCrossOriginRequest
  # (Security warning: an embedded <script> tag on another site requested protected JavaScript.
  # If you know what you're doing, go ahead and disable forgery protection
  # on this action to permit cross-origin JavaScript embedding.):

  protect_from_forgery except: :service_worker

  def service_worker
    # different tests to try to solve MIME issue
    # render partial: '/service_worker', status: 200
    # respond_to do |format|
    #   format.js { render content_type: 'text/javascript', status: 200 }
    # end
    # respond_to do |format|
    #   format.js { render file: File.read(Rails.root.join('app', 'views', 'service-worker.js'), content_type: 'application/javascript') }
    # end
    # respond_to do |format|
    #   format.js { render layout: false }
    # end
    # respond_to do |format|
    #   format.js { }
    # end
    # render 'service-worker', layout: false
  end
end
