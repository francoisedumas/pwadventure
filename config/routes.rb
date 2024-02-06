Rails.application.routes.draw do
  resources :quotes

  resources :webpush_subscriptions, only: [:create]
  resources :webpush_notifications, only: [:create]

  get "offline", to: "service_worker#offline"
  get "service_worker.js", to: "service_worker#service_worker"

  root "quotes#index"
end
