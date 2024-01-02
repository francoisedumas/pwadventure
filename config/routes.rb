Rails.application.routes.draw do
  resources :quotes

  get "offline", to: "pages#offline"

  root "quotes#index"
end
