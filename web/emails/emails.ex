defmodule ElixirLangMoscow.Emails do
  use Phoenix.Swoosh, view: ElixirLangMoscow.EmailView,
    layout: {ElixirLangMoscow.LayoutView, :email}

  alias ElixirLangMoscow.Mailer
  alias ElixirLangMoscow.{SuggestedTalk, Registration}
  alias ElixirLangMoscow.Repo

  @default_from {"Elixir Moscow Team", "no-reply@elixir-lang.moscow"}

  def create(%SuggestedTalk{} = talk, :sugested_talk) do
    new
    |> to("talk@elixir-lang.moscow")
    |> from(@default_from)
    |> subject("New talk suggested: " <> talk.topic)
    |> render_body("suggested_talk.html", %{talk: talk})
  end
  def create(%Registration{} = registration, :registration_confirmation) do
    registration = Repo.preload(registration, :event)

    new
    |> to({Registration.full_name(registration), registration.email})
    |> from(@default_from)
    |> subject("Your registration is completed")
    |> render_body(
      "registration_confirmation.html", %{registration: registration})
  end

  def send_email(email), do: Mailer.deliver(email)

  def create_and_send(object, action, :async) do
    Task.start(fn -> create(object, action) |> send_email() end)
  end
end
