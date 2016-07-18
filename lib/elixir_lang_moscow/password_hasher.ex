defmodule ElixirLangMoscow.PasswordHasher do
  import Ecto.Changeset, only: [put_change: 3]
  alias Comeonin.Bcrypt

  def hash_password(changeset, param \\ :password_hash, key \\ "password") do
    if changeset.valid? do
      hashed = Bcrypt.hashpwsalt(changeset.params[key])
      put_change(changeset, param, hashed)
    else
      changeset
    end
  end

  def check_hash(user, password) do
    case user do
      nil -> false
      _   -> Bcrypt.checkpw(password, user.password_hash)
    end
  end
end
