Rails.application.routes.draw do
  resources :quotes

  get "offline", to: "pages#offline"
  get "service-worker.js", to: "service_worker#service_worker"

  root "quotes#index"
end
