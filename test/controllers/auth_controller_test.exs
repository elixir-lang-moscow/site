defmodule ElixirLangMoscow.AuthControllerTest do
  use ElixirLangMoscow.ConnCase, async: false

  alias ElixirLangMoscow.Admin

  @valid_params %{
    username: "sobolevn",
    password: "password",
    password_confirmation: "password",
  }

  def failed_auth(conn, status \\ 200)
  def failed_auth(conn, status) do
    html_response(conn, status) =~ "Wrong username or password"
  end

  setup do
    changeset = Admin.changeset(%Admin{}, @valid_params)
    admin = Repo.insert!(changeset)

    on_exit fn ->
      Repo.delete_all(Admin)
    end

    {:ok, %{admin: admin}}
  end

  test "valid authorization", %{admin: admin} do
    conn = post conn, auth_path(conn, :create), login: %{
      username: admin.username,
      password: admin.password,
    }

    assert redirected_to(conn) == page_path(conn, :index)
  end

  test "invalid authorization" do
    conn = post conn, auth_path(conn, :create), login: %{
      username: "not-admin",
      password: "wrong",
    }

    assert failed_auth(conn)
  end

  test "invalid password", %{admin: admin} do
    conn = post conn, auth_path(conn, :create), login: %{
      username: admin.username,
      password: "wrong",
    }

    assert failed_auth(conn)
  end

  
end
