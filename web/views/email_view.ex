defmodule ElixirLangMoscow.EmailView do
  use ElixirLangMoscow.Web, :view
  alias ElixirLangMoscow.Registration

  def full_name(registration), do: Registration.full_name(registration)
end
