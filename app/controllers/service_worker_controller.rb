class ServiceWorkerController < ApplicationController
  # If you are using devise with user, skip authenticate
  # skip_before_action :authenticate_user!

  def service_worker
  end

  def offline
    render "offline", layout: false
  end
end
