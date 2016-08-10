defmodule ElixirLangMoscow.RegistrationControllerTest do
  use ElixirLangMoscow.ConnCase, async: false

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.{Event, Registration}

  @fixture_dir "test/fixtures/registrations"

  defp generate_sha(body) do
    timepad_key =
      Application.get_env(:elixir_lang_moscow, :timepad)
      |> Keyword.get(:key)

    :crypto.hmac(:sha, timepad_key, body)
    |> Base.encode16
    |> String.downcase
  end

  defp create_registration(fixture \\ "create_valid.json", sha \\ nil) do
    body =
      @fixture_dir <> "/" <> fixture
      |> Path.expand
      |> File.read!

    hash_value = sha || generate_sha(body)

    conn
    |> put_req_header("content-type", "application/x-www-form-urlencoded")
    |> put_req_header("x-hub-signature", "sha1=" <> hash_value)
    |> put_req_header("accept", "*/*")
    |> post(registration_path(conn, :new), body)
  end

  describe "event exist" do
    setup do
      on_exit fn ->
        Repo.delete_all(Registration)
        Repo.delete_all(Event)
      end

      {:ok, %{event: BaseTest.create_event()}}
    end

    test "create valid registration" do
      response = create_registration()
      assert response.status == 200
    end

    test "delete valid registration" do
      # creating:
      response = create_registration()
      assert response.status == 200

      # canceling:
      response = create_registration("cancel_valid.json")
      assert response.status == 200

      # fetching:
      canceled = Repo.one(Registration)
      assert canceled.active == false
    end

    test "create double registration" do
      create_registration()
      response = create_registration()
      assert response.status == 409
    end
  end

  test "valid registration, but missing event" do
    response = create_registration()
    assert response.status == 404
  end

  test "invalid sign" do
    response = create_registration("create_valid.json", "invalid-sha")
    assert response.status == 401
  end

  test "delete non-existing registration" do
    response = create_registration("cancel_valid.json")
    assert response.status == 404
  end

end
