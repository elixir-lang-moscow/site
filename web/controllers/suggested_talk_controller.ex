defmodule ElixirLangMoscow.SuggestedTalkController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.SuggestedTalk

  plug :scrub_params, "suggested_talk" when action in [:create]

  def new(conn, _params) do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"suggested_talk" => suggested_talk_params}) do
    changeset = SuggestedTalk.changeset(%SuggestedTalk{}, suggested_talk_params)

    case Repo.insert(changeset) do
      {:ok, _suggested_talk} ->
        conn
        |> put_flash(:info, "Suggested talk created successfully.")
        |> redirect(to: suggested_talk_path(conn, :new))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    suggested_talk = Repo.get!(SuggestedTalk, id)
    render(conn, "show.html", suggested_talk: suggested_talk)
  end
end
