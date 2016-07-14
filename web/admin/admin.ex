defmodule ElixirLangMoscow.ExAdmin.Admin do
  use ExAdmin.Register

  register_resource ElixirLangMoscow.Admin do

    form admin do
      inputs do
        input admin, :username
        input admin, :password, type: :password
        input admin, :password_confirmation, type: :password
      end
    end

  end
end
