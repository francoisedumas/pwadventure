Rails.application.routes.draw do
  resources :quotes

  get "offline", to: "service_worker#offline"
  get "service_worker.js", to: "service_worker#service_worker"

  root "quotes#index"
end
