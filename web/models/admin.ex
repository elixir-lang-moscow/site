defmodule ElixirLangMoscow.PasswordHasher do
  import Ecto.Changeset, only: [put_change: 3]
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  def hash_password(changeset, param \\ :password_hash, key \\ "password") do
    if changeset.valid? do
      put_change(changeset, param, hashpwsalt(changeset.params[key]))
    else
      changeset
    end
  end

  def check_hash(user, password) do
    case user do
      nil -> false
      _   -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
    end
  end
end


defmodule ElixirLangMoscow.Admin do
  use ElixirLangMoscow.Web, :model

  schema "admins" do
    field :username, :string
    field :password_hash, :string

    field :active, :boolean, default: true

    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps
  end

  @required_fields ~w(username password password_confirmation)
  @optional_fields ~w(active)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> unique_constraint(:username, on: ElixirLangMoscow.Repo, downcase: true)
    |> validate_length(:password, min: 8)
    |> validate_length(:password_confirmation, min: 8)
    |> validate_confirmation(:password)
    |> ElixirLangMoscow.PasswordHasher.hash_password
  end
end
