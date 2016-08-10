defmodule ElixirLangMoscow.Router do
  use ElixirLangMoscow.Web, :router
  use ExAdmin.Router


  # Pipelines:

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


  # Scopes:

  scope "/", ElixirLangMoscow do
    pipe_through :browser

    # View and browse events:
    scope "/events" do
      resources "/", EventController, only: [:show, :index]
      get "/:event/talks/:slug", EventSpeakerController, :show
    end

    # Browse and list speakers:
    resources "/speakers", SpeakerController, only: [:show, :index]

    # Suggest new talk:
    resources "/suggest-talk", SuggestedTalkController,
      only: [:new, :create]

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

  if Mix.env == :dev do
    # Preview emails on development, but not send them:
    scope "/dev" do
      pipe_through [:browser]
      forward "/mailbox", Plug.Swoosh.MailboxPreview, [base_path: "/dev/mailbox"]
    end
  end

end
