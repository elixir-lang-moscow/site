defmodule ElixirLangMoscow.Router do
  use ElixirLangMoscow.Web, :router

  use ExAdmin.Router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers

    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  pipeline :require_auth do
    plug Guardian.Plug.EnsureAuthenticated,
      handler: ElixirLangMoscow.AuthController
  end

  scope "/", ElixirLangMoscow do
    pipe_through :browser

    # View and browse events:
    scope "/events" do
      resources "/", EventController, only: [:show, :index]
      get "/:event/talks/:slug", EventSpeakerController, :show
    end

    resources "/speakers", SpeakerController, only: [:show, :index]

    # Index page:
    get "/", PageController, :index
  end

  scope "/registration/new", ElixirLangMoscow do
    pipe_through :api

    # Create new registration form TimePad:
    post "/", RegistrationController, :new
  end

  scope "/auth", ElixirLangMoscow do
    pipe_through :browser

    # Authentication:
    get "/login", AuthController, :new
    post "/login", AuthController, :create
    get "/logout", AuthController, :destroy
    patch "/logout", AuthController, :destroy
    delete "/logout", AuthController, :destroy
  end

  scope "/admin", ExAdmin do
    pipe_through [:browser, :require_auth]
    admin_routes
  end

end
