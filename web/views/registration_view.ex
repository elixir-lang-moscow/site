defmodule ElixirLangMoscow.RegistrationView do
  use ElixirLangMoscow.Web, :view

  def render("registration.json", %{conn: conn}) do
    %{"result" => conn.assigns.registration_result}
  end

  def registration_result(conn) do
    if Map.has_key? conn.assigns, :registration_result do
      conn.assigns.registration_result
    else
      "Fail"
    end
  end
end
