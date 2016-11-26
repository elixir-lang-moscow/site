# TODO: create abstract behaviour for any kind of
# registration provider, and implement in for the Timepad at first.

defmodule ElixirLangMoscow.RegistrationController.Timepad do
  defstruct [:id, :code, :barcode, :status_raw, :event_id, :answers]

  use ExConstructor
end


defmodule ElixirLangMoscow.RegistrationController do
  use ElixirLangMoscow.Web, :controller

  alias Ecto.Changeset
  alias ElixirLangMoscow.{Event, Registration}
  alias ElixirLangMoscow.Emails
  alias ElixirLangMoscow.RegistrationController.Timepad

  def new(conn, json_body) do
    json_body =
      json_body
      |> Map.keys
      |> List.first

    with {:ok, timepad_json} <- validate_request(conn, json_body),
         {:ok, _registration} <- handle_registration(timepad_json) do
      return_response(conn, :ok)
    else
      {:error, status} -> return_response(conn, :error, status)
    end
  end

  defp validate_request(conn, timepad_body) when is_binary(timepad_body) do
    timepad_key =
      :elixir_lang_moscow
      |> Application.get_env(:timepad)
      |> Keyword.get(:key)

    incoming_value =
      :sha
      |> :crypto.hmac(timepad_key, timepad_body)
      |> Base.encode16
      |> String.downcase

    sha_value =
      conn.req_headers
      |> Enum.into(%{})
      |> Map.get("x-hub-signature", "")
      |> String.replace_prefix("sha1=", "")
      |> String.downcase

    if incoming_value == sha_value do
      {:ok, Timepad.new(Poison.Parser.parse!(timepad_body))}
    else
      {:error, :unauthorized}
    end
  end
  defp validate_request(_, _) do
    {:error, :internal_server_error}
  end

  defp handle_registration(%Timepad{status_raw: "ok"} = timepad) do
    case Repo.get_by(Event, uid: to_string(timepad.event_id)) do
      nil -> {:error, :not_found}
      event -> create_new(event, timepad)
    end
  end
  defp handle_registration(%Timepad{status_raw: "deleted"} = timepad) do
    cancel timepad.id
  end
  defp handle_registration(%Timepad{status_raw: "inactive"} = timepad) do
    cancel timepad.id
  end
  defp handle_registration(%Timepad{status_raw: "rejected"} = timepad) do
    cancel timepad.id
  end
  defp handle_registration(_params) do
    {:error, :not_found}
  end

  defp cancel(uid) do
    {:ok, tuple} = Repo.transaction(fn ->
      case Repo.get_by(Registration, uid: to_string(uid)) do
        nil -> {:error, :not_found}
        registration ->
          registration = Changeset.change(registration, active: false)
          Repo.update!(registration)
          # TODO: send email about canceled registration

          {:ok, registration}
      end
    end)

    tuple
  end

  defp create_new(event, %Timepad{} = timepad) do
    [
      %{"name" => "E-mail", "value" => email},
      %{"name" => "Фамилия", "value" => last_name},
      %{"name" => "Имя", "value" => first_name},
      %{"name" => "Компания", "value" => company}
    ] = timepad.answers

    registration_params = %{
      "email" => email,
      "first_name" => first_name,
      "last_name" => last_name,
      "company" => company,

      "uid" => timepad.id,
      "barcode" => timepad.barcode,
      "code" => timepad.code,

      "event_id" => event.id,
    }
    changeset = Registration.changeset(%Registration{}, registration_params)

    case Repo.insert(changeset) do
      {:ok, registration} ->
        # Create email that everything is fine:
        Emails.create_and_send(
          registration, :registration_confirmation, :async)

        {:ok, registration}
      {:error, _changeset} -> {:error, :conflict}
    end
  end

  defp return_response(conn, :error, status) do
    conn
    |> put_status(status)
    |> assign(:registration_result, "Error")
    |> render("registration.json")
  end
  defp return_response(conn, :ok) do
    conn
    |> put_status(:ok)
    |> assign(:registration_result, "Success")
    |> render("registration.json")
  end
end
