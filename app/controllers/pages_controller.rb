class PagesController < ApplicationController
  # If you are using devise with user, skip authenticate
  # skip_before_action :authenticate_user!, only: [:offline]

  def offline
    render 'offline', layout: false
  end
end
