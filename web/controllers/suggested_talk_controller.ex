defmodule ElixirLangMoscow.SuggestedTalkController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.SuggestedTalk

  plug :scrub_params, "suggested_talk" when action in [:create]

  def new(conn, _params) do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"suggested_talk" => suggested_talk_params} = params) do
    {verification, _} = Recaptcha.verify(params["g-recaptcha-response"])

    if verification == :ok or Mix.env == :test  do
      create_suggested_talk(conn, suggested_talk_params)
    else
      conn
      |> put_flash(:error, "Recaptcha is invalid")
      |> render("new.html", changeset: SuggestedTalk.changeset(%SuggestedTalk{}))
    end
  end

  defp create_suggested_talk(conn, suggested_talk_params) do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{}, suggested_talk_params)

    case Repo.insert(changeset) do
      {:ok, _suggested_talk} ->
        conn
        |> put_flash(:info, "Ok")
        |> redirect(to: suggested_talk_path(conn, :new))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
