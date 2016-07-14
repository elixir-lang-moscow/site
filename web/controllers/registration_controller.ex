defmodule ElixirLangMoscow.RegistrationController do
  use ElixirLangMoscow.Web, :controller

  alias ElixirLangMoscow.Event
  alias ElixirLangMoscow.Registration

  plug :put_layout, "empty.html"

  def new(conn, map) do
    json_body =
      map
      |> Map.keys
      |> List.first

    compare_headers conn, json_body
  end

  defp compare_headers(conn, timepad_body) when is_bitstring(timepad_body) do
    # TODO: replace this key to the real one and hide it:
    incoming_value = :crypto.hmac(:sha, "test-me", timepad_body) |> Base.encode16

    sha_value = conn.req_headers
      |> Enum.into(%{})
      |> Map.get("x-hub-signature")
      |> String.replace_prefix("sha1=", "")
      |> String.upcase

    if incoming_value == sha_value do
      complete conn, Poison.Parser.parse!(timepad_body)
    else
      handle_error conn, :unauthorized
    end
  end

  defp compare_headers(conn, _) do
    handle_error conn, :internal_server_error
  end

  defp handle_registration(conn, %{"status_raw" => "ok"} = timepad_json, event) do
    [
      %{"id" => 1357809, "value" => email},
      %{"id" => 1357810, "value" => last_name},
      %{"id" => 1357811, "value" => first_name},
      %{"id" => 1357819, "value" => company}
    ] = timepad_json["answers"]


    registration_params = %{
      "email" => email,
      "first_name" => first_name,
      "last_name" => last_name,
      "company" => company,

      "uid" => timepad_json["id"],
      "barcode" => timepad_json["barcode"],
      "code" => timepad_json["code"],

      "event_id" => event.id,
    }
    changeset = Registration.changeset(%Registration{}, registration_params)

    case Repo.insert(changeset) do
      {:ok, _event} ->
        conn
        |> assign(:registration_result, "Success")
        |> put_status(:ok)
        |> render("registration.json")
      {:error, _changeset} ->
        handle_error conn, :internal_server_error
    end
  end
  defp handle_registration(conn, %{"status_raw" => "deleted", "id" => uid}, _) do
    cancel conn, uid
  end
  defp handle_registration(conn, %{"status_raw" => "inactive", "id" => uid}, _) do
    cancel conn, uid
  end
  defp handle_registration(conn, %{"status_raw" => "rejected", "id" => uid}, _) do
    cancel conn, uid
  end
  defp handle_registration(conn, _params, _) do
    handle_error conn, :not_found
  end


  defp handle_error(conn, status) do
    conn
    |> put_status(status)
    |> assign(:registration_result, "Error")
    |> render("registration.json")
  end

  defp handle_cancel(conn, registration) do
    registration = Ecto.Changeset.change registration, active: false
    Repo.update! registration

    conn
    |> put_status(:ok)
    |> assign(:registration_result, "Canceled")
    |> render("registration.json")
  end

  defp cancel(conn, uid) do
    case Repo.get_by(Registration, uid: to_string(uid)) do
      nil -> handle_error conn, :not_found
      registration -> handle_cancel conn, registration
    end
  end

  defp complete(conn, %{"event_id" => event_id} = timepad_json) do
    case Repo.get_by(Event, uid: to_string(event_id)) do
      nil -> handle_error conn, :not_found
      event -> handle_registration(conn, timepad_json, event)
    end
  end
end
